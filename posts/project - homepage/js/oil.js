(function () {
	function formatThousands(num) {
		if (num == undefined) {
			return '';
		}
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

	function getUrlParam(paramName) {
		var urlString = window.location.href;
		var urlObj = new URL(urlString);
		var paramValue = urlObj.searchParams.get(paramName);
		return paramValue;
	}

	/**
	 * Lấy dữ liệu thay dầu.
	 */
	function getOilData() {
		fetch('data/motorbike-oil.json')
			.then(resp => resp.json())
			.then(data => {
				var isList = getUrlParam('isList');
				if (isList == 'true') {
					document.querySelector('#sumarySection').style.display = 'none';
					document.querySelector('#listSection').style.display = '';
				}

				normalizeData(data);
				displayData(data);
				warningNextMaintain(data);
			});
	}

	/**
	 * Chuẩn hóa dữ liệu thay dầu.
	 * @param {Array} data Dữ liệu
	 */
	function normalizeData(data) {
		for (var i = 0; i < data.length; i++) {
			var e = data[i];
			e.date = converStringToDate(e.dateStr);
			if (i > 0) {
				var prev = data[i - 1];
				e.dateDiff = dateDiff(prev.date, e.date);
				e.kmDiff = e.km - prev.km;
			}
		}
	}

	/**
	 * Hiển thị dữ liệu thay dầu.
	 * @param {Array} data Dữ liệu
	 */
	function displayData(data) {
		var html = `
				${data.map(e => `
					<tr>
						<td>
							${ e.dateStr }
						</td>
						<td class="text-right">
							${ formatThousands(e.km) }
						</td>
						<td class="text-right">
							${ formatThousands(e.dateDiff) }
						</td>
						<td class="text-right">
							${ formatThousands(e.kmDiff) }
						</td>
						<td class="d-none d-md-table-cell">
							${ e.note }
						</td>
					</tr>
				`).join('')}`;
		document.querySelector('#oilTableBody').innerHTML = html;
	}

	/**
	 * Cảnh báo lần thay dầu tiếp theo.
	 * @param {Array} oilData Dữ liệu
	 */
	function warningNextMaintain(oilData) {
		var last = oilData[oilData.length - 1];
		var nextDate = addDate(last.date, 60);
		var nextKm = last.km + 2000;
		var currentDate = new Date();
		var dd = dateDiff(currentDate, nextDate);
		if (dd < 10) {
			var html = `
						<div class="mb-3">
							Next date:
							<span class="badge badge-warning">${convertDateToString(nextDate)}</span>
						</div>
						<div class="mb-3">
							Next km:
							<span class="badge badge-info">${formatThousands(nextKm)}</span>
						</div>`;
			document.querySelector('#oilWarning').innerHTML = html;
		}
	}

	getOilData();

	document.querySelector('#listLink').addEventListener('click', function () {
		window.open('./oil.html?isList=true', '_blank', 'height=800,width=920,top=20,left=20');
	});
})();
