function addDatepickerCallback() {
}

function changeUpdateDatePickerFunction() {
	var oldFunc = $.datepicker._updateDatepicker;
	$.datepicker._updateDatepicker = function(inst) {
		oldFunc(inst);
		
		alert("changeUpdateDatePickerFunction");
		if (this.datepickerUpdateCallback) {
			this.datepickerUpdateCallback();
		}
	};
}

//changeUpdateDatePickerFunction();

// Tách ra thành từng hàm con


/*
Tạo một dialog chọn khoảng thời gian.
Dialog chia làm 3 phần:
* Phần 1:
  * Người dùng có thể chọn cả năm, chọn theo mùa (xuân, hạ, thu, đông), chọn cả tháng (tháng Một, tháng Hai,..., tháng Mười Hai).
* Phần 2:
  * Người dùng có thể chọn theo tuần, theo ngày trên calendar
* Phần 3:
  * Người dùng có thể chọn theo ngày (hoặc theo từ ngày - đến ngày) mà người dùng nhập vào

@param pickerId
           ID vùng DIV mà khi click vào sẽ bật dialog lên, đồng thời cũng là nơi chứa nhãn của khoảng thời gian được chọn
@param backId
           ID của nút "Back period" (chuyển về khoảng thời gian liền trước)
@param nextId
           ID của nút "Next period" (chuyển tới khoảng thời gian tiếp theo)
@param callback
           Hàm callback sau khi người dùng kết thúc việc chọn.
		   Hàm này có các tham số là startDate, endDate, pickType, season
*/
function datePickerDialog(pickerId, backId, nextId, callback) {
	// Các loại chọn (theo ngày, theo tuần, theo tháng, theo mùa, theo năm, theo từ ngày - đến ngày)
	var CONFIG = {
		TYPE_DATE: 1,
		TYPE_WEEK: 2,
		TYPE_MONTH: 3,
		TYPE_SEASON: 4,
		TYPE_YEAR: 5,
		TYPE_PERIOD: 6
	};
	// Các mùa (1: Winter, 2: Spring, 3: Summer, 4: Fall)
	var SEASON = {
		WINTER: 1,
		SPRING: 2,
		SUMMER: 3,
		FALL: 4
	};
	
	// ID of the DIV element
	var divId = pickerId + 'Wrapper';
	// The dialog element
	var dialog;
	
	// Current date
	var today = new Date();
	// Current year
	var currentYear = today.getFullYear();
	
	// Loại chọn (ngày, tuần, tháng, mùa, năm, từ ngày - đến ngày)
	var pickType = CONFIG.TYPE_DATE;
	// Start date text (yyyyMMdd)
	var startDate = formatDateToString(today);
	// End date text (yyyyMMdd)
	var endDate = startDate;
	// Week of the year (1 -> 52)
	var weekNumber = 0;
	// Chosen month (1 -> 12)
	var chosenMonth = 0;
	// Chỉ số của mùa (1: Winter, 2: Spring, 3: Summer, 4: Fall)
	var season = 0;
	// Year cursor (to navigate between years)
	var yearCursor = currentYear;
	// Chosen year (to naviagate by period)
	var chosenYear = currentYear;

	/**
	 * Create a div element and insert to the page
	 */
	function createDialogDiv() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = `
		<div class="dialogDatePicker" id="${divId}">
			
				<!-- Fixed ranges -->
				<div class="dialog-row select-year">
					<div class="year-spinner">
						<div class="icon-img icon-back-horizontal"></div>
						<div class="year-selected">2016</div>
						<div class="icon-img icon-next-horizontal"></div>
					</div>
					<div pickType="5" class="btn-commit year-commit">
						${label.yearCommit}
					</div>
				</div>
				
				<div class="dialog-row select-period">
					<div class="period-block season-block">
						<div pickType="4" season="1" class="btn-commit">
							${label.winter}
						</div>
						<div pickType="4" season="2" class="btn-commit">
							${label.spring}
						</div>
						<div pickType="4" season="3" class="btn-commit">
							${label.summer}
						</div>
						<div pickType="4" season="4" class="btn-commit">
							${label.fall}
						</div>
					</div>
					
					<div class="period-block">
						<div pickType="3" class="btn-commit" month="1">
							${label.january}
						</div>
						<div pickType="3" class="btn-commit" month="2">
							${label.february}
						</div>
						<div pickType="3" class="btn-commit" month="3">
							${label.march}
						</div>
						<div pickType="3" class="btn-commit" month="4">
							${label.april}
						</div>
						<div pickType="3" class="btn-commit" month="5">
							${label.may}
						</div>
						<div pickType="3" class="btn-commit" month="6">
							${label.june}
						</div>
					</div>
					<div class="period-block">
						<div pickType="3" class="btn-commit" month="7">
							${label.july}
						</div>
						<div pickType="3" class="btn-commit" month="8">
							${label.august}
						</div>
						<div pickType="3" class="btn-commit" month="9">
							${label.september}
						</div>
						<div pickType="3" class="btn-commit" month="10">
							${label.october}
						</div>
						<div pickType="3" class="btn-commit" month="11">
							${label.november}
						</div>
						<div pickType="3" class="btn-commit" month="12">
							${label.december}
						</div>
					</div>
				</div>
				
				<!-- TODO: Image paths -->
				<!-- Calendar -->
				<div class="dialog-row select-day">
					<div class="navigation-month">
						<div class="wrapper-btn wrapper-btn-up">
							<img src="img/bt-up.png" class="btn-up"/>
						</div>
						<div class="navigation-seprate-top"></div>
						<div class="month-label"></div>
						<div class="year-picker-label"></div>
						<div class="navigation-seprate-bot"></div>
						<div class="wrapper-btn wrapper-btn-down">
							<img src="img/bt-down.png" class="btn-down"/>
						</div>
					</div>
					<div class="datepicker"></div>
				</div>
				
				<!-- Free pick -->
				<div class="dialog-row select-free">
					<div class="wrapper-select-free">
						<div class="select-free-title">
							${label.freeSelection}
						</div>
						<div class="select-free-content">
							<div class="input-block">
								<input type="text" class="txtStartDate" />
								<input type="text" class="txtEndDate" />
							</div>
							<div class="commit-block">
								<div class="btn-commit free-commit btnDayFree">
									${label.day}
								</div>
								<div class="btn-commit free-commit btnPeriodFree">
									${label.period}
								</div>
							</div>
						</div>
					</div>
				</div>
			
		</div>
		`;
		document.body.appendChild(wrapper);
	}
	
	/**
	 * Create the dialog
	 */
	function createDialogElement() {
		dialog = $('#' + divId).dialog({
			position: {
				my: "center",
				at: "center",
				of: window
			},
			autoOpen: false,
			height: 620,
			width: 550
		});
		
		document.getElementById(pickerId).onclick = function() {
			dialog.dialog('open');
		};
	}
	
	/**
	 * Create the inline calendar by jQuery UI
	 * Handle action choose date too.
	 */
	function createInlineCalendar() {
		$('#' + divId + ' .datepicker').datepicker({
			showWeek: true,
			firstDay: 1,
			maxDate: new Date(today.getFullYear(), 11, 31),
			onSelect: function(d) {
				var selectedDate = $(this).datepicker("getDate");
				startDate = formatDateToString(selectedDate);
				endDate = startDate;
				pickType = CONFIG.TYPE_DATE;
				
				callAjaxLoadData();
			},
			
			onChangeMonthYear: function(year, month, inst) {
				console.info("onChangeMonthYear: " + year + ", " + month);
				bindDataMonthChange();
			}
		});
	}
	
	/**
	 * Initialize two date-masked inputs
	 */
	function setupFreeInputs() {
		$("#" + divId + " .txtStartDate").mask("99/99/9999", { placeholder: "dd/mm/yyyy" });
		$("#" + divId + " .txtEndDate"  ).mask("99/99/9999", { placeholder: "dd/mm/yyyy" });
	}

	/**
	 * Choose year, season, month
	 */
	function setupFixedRange() {
		$('#' + divId + ' .btn-commit').not('.btnDayFree').not('.btnPeriodFree').unbind('click');
		$('#' + divId + ' .btn-commit').not('.btnDayFree').not('.btnPeriodFree').on('click', function() {
			handleFixedRange(this);
		});
	}
	
	/**
	 * Choose day, period
	 */
	function setupFreePick() {
		$('#' + divId + ' .btnDayFree').unbind('click');
		$('#' + divId + ' .btnDayFree').on('click', function() {
			validInputDate();
			$('#' + divId + ' .txtEndDate').val($('#' + divId + ' .txtStartDate').val());
			pickType = CONFIG.TYPE_DATE;
			handleFreePick();
		});
		
		$('#' + divId + ' .btnPeriodFree').unbind('click');
		$('#' + divId + ' .btnPeriodFree').on('click', function() {
			var isValid = validInputDate();
			if (isValid) {
				pickType = CONFIG.TYPE_PERIOD;
				handleFreePick();
			}
		});
	}
	
	/**
	 * Choose week
	 */
	function setupChooseWeek() {
		$('#' + divId + ' .ui-datepicker-week-col').unbind('click');
		$('#' + divId + ' .ui-datepicker-week-col').on('click', function() {
			weekNumber = parseInt($(this).text());
			var yearW = parseInt($('#' + divId + ' .year-picker-label').text());
			calculatePeriodByWeekNumberInYear(yearW);
			pickType = CONFIG.TYPE_WEEK;
			callAjaxLoadData();
		});
	}
	
	/**
	 * Handle fixed ranges (month, season, year)
	 */
	function handleFixedRange(element) {
		chosenYear = yearCursor;
		
		pickType = parseInt($(element).attr('pickType'));
		
		if (pickType == CONFIG.TYPE_MONTH) {
			chosenMonth = parseInt($(element).attr('month'));
			setupStartDateAndEndDateByMonth();
		} else if (pickType == CONFIG.TYPE_SEASON) {
			season = parseInt($(element).attr('season'));
			setupStartDateAndEndDateBySeason();
		} else if (pickType == CONFIG.TYPE_YEAR) {
			setupStartDateAndEndDateByYear();
		}
		
		
		callAjaxLoadData();
	}

	/**
	 * Thiết lập startDate, endDate dựa vào năm và mùa đang chọn
	 * Gọi khi click chọn mùa hoặc chuyển chu kỳ
	 */
	function setupStartDateAndEndDateBySeason() {
		if (season == SEASON.WINTER) {
			startDate = (chosenYear - 1) + "1221";
			endDate = chosenYear + "0319";
		} else if (season == SEASON.SPRING) {
			startDate = chosenYear + "0320";
			endDate = chosenYear + "0620";
		} else if (season == SEASON.SUMMER) {
			startDate = chosenYear + "0621";
			endDate = chosenYear + "0921";
		} else if (season == SEASON.FALL) {
			startDate = chosenYear + "0922";
			endDate = chosenYear + "1220";
		}
	}
	
	/**
	 * Thiết lập startDate, endDate dựa vào năm và tháng đang chọn
	 * Gọi khi click chọn tháng hoặc chuyển chu kỳ
	 */
	function setupStartDateAndEndDateByMonth() {
		startDate = chosenYear + (chosenMonth < 10 ? "0" : "") + chosenMonth + "01";
		endDate = chosenYear + (chosenMonth < 10 ? "0" : "") + chosenMonth + getNumberOfDays(chosenMonth, chosenYear);
	}
	
	/**
	 * Thiết lập startDate, endDate dựa vào năm đang chọn
	 * Gọi khi click chọn năm hoặc chuyển chu kỳ
	 */
	function setupStartDateAndEndDateByYear() {
		startDate = chosenYear + "0101";
		endDate = chosenYear + "1231";
	}

	/**
	 * Handle free pick
	 * Type date or period
	 */
	function handleFreePick() {
		var startDateFree = $('#' + divId + ' .txtStartDate').val();
		var endDateFree = $('#' + divId + ' .txtEndDate').val();
		
		startDate = getDateStringFromInput(startDateFree);
		endDate = getDateStringFromInput(endDateFree);
		
		callAjaxLoadData();
	}

	/**
	 * Validate input dates
	 */
	function validInputDate() {
		var startDateFree = $('#' + divId + ' .txtStartDate').val();
		var endDateFree = $('#' + divId + ' .txtEndDate').val();
		
		var startDateObj = getDateFromStringInput(startDateFree);
		var endDAteObj = getDateFromStringInput(endDateFree);
		
		// Nếu ngày bắt đầu không hợp lệ thì chuyển thành ngày hiện tại
		if (startDateObj == 'Invalid Date') {
			var todayStr = formatDateToString2(today);
			$('#' + divId + ' .txtStartDate').val(todayStr);
			return false;
		}
		// Nếu ngày kết thúc không hợp lệ thì chuyển thành ngày bắt đầu
		if (endDAteObj == 'Invalid Date') {
			$('#' + divId + ' .txtEndDate').val( $('#' + divId + ' .txtStartDate').val() );
			return false;
		}
		// Nếu ngày kết thúc nhỏ hơn ngày bắt đầu thì chuyển ngày kết thúc bằng ngày bắt đầu
		if (endDAteObj.getTime() < startDateObj.getTime()) {
			$('#' + divId + ' .txtEndDate').val( $('#' + divId + ' .txtStartDate').val() );
			return false;
		}
		
		return true;
	}

	/**
	 * Return year + month + date (from free inputs)
	 */
	function getDateStringFromInput(dateString) {
		var dateArr = dateString.split('/');
		var month = dateArr[1];
		var year = dateArr[2];
		var date = dateArr[0];
		var result = year + month + date;
		return result;
	}

	/**
	 * Bind data month change
	 */
	function bindDataMonthChange() {
		var month = $('#' + divId + ' .ui-datepicker-month').text();
		var year = $('#' + divId + ' .ui-datepicker-year').text();
		
		$('#' + divId + ' .month-label').text(month.substring(0, 3) + ".");
		$('#' + divId + ' .year-picker-label').text(year);
		
		// User cannot select next year
		//alert(year + ", " + currentYear + ", " + month.toLowerCase() + ", " + label.december.toLowerCase());
		if (year == currentYear && month.toLowerCase() == label.december.toLowerCase()) {
			$('#' + divId + ' .wrapper-btn-up').addClass("wrapper-btn-up-disabled");
		} else {
			$('#' + divId + ' .wrapper-btn-up').removeClass("wrapper-btn-up-disabled");
		}
		
		// Must call this function again because the weeks are refreshed
		// Không đảm bảo hàm này thực hiện sau khi calendar đã được build lại
		setupChooseWeek();
	}

	/**
	 * Bind the selected year
	 */
	function bindDataYearSelect() {
		// Display the text
		$('#' + divId + ' .year-selected').text(yearCursor);
		
		// User cannot select next year
		if (yearCursor >= currentYear) {
			$('#' + divId + ' .icon-next-horizontal').css("visibility", "hidden");
		} else {
			$('#' + divId + ' .icon-next-horizontal').css("visibility", "visible");
		}
	}

	/**
	 * Tính khoảng thời gian theo tuần trong một năm
	 * Hàm này không trả về gì, nhưng sẽ cập nhật 2 thuộc tính là startDate và endDate
	 */
	function calculatePeriodByWeekNumberInYear(year) {
		// Tính ngày đầu tiên của năm
		var firstDateOfYear = new Date("Jan 01, " + year + " 00:00:00");
		var dayOfWeek = firstDateOfYear.getDay();
		var oneDay = 86400000; // = 24 * 60 * 60 * 1000
		switch (dayOfWeek) {
			case 0:
				firstDateOfYear = new Date(firstDateOfYear.getTime() + oneDay);
				break;
			case 1:
				break;
			case 2:
				firstDateOfYear = new Date(firstDateOfYear.getTime() + oneDay * 6);
				break;
			case 3:
				firstDateOfYear = new Date(firstDateOfYear.getTime() + oneDay * 5);
				break;
			case 4:
				firstDateOfYear = new Date(firstDateOfYear.getTime() + oneDay * 4);
				break;
			case 5:
				firstDateOfYear = new Date(firstDateOfYear.getTime() + oneDay * 3);
				break;
			case 6:
				firstDateOfYear = new Date(firstDateOfYear.getTime() + oneDay * 2);
				break;
		}
		
		var oneWeek = 604800000; // = 7 * oneDay
		var week = firstDateOfYear.getTime() + oneWeek * (weekNumber - 1);
		var startWeekDate = new Date(week);
		var endWeekDate = new Date(week + 518400000); // 518400000 = 6 * oneDay
		
		startDate = formatDateToString(startWeekDate);
		endDate = formatDateToString(endWeekDate);
	}
	
	/**
	 * Click back and next year
	 */
	function setupNavigateYear() {
		$('#' + divId + ' .icon-back-horizontal').click(function() {
			backYear();
		});
		$('#' + divId + ' .icon-next-horizontal').click(function() {
			nextYear();
		});
	}
	
	/**
	 * Navigate back year
	 * Call when click back arrow (left of the year label) or click back period
	 */
	function backYear() {
		yearCursor--;
		bindDataYearSelect();
	}
	
	/**
	 * Navigate next year
	 * Call when click next arrow (right of the year label) or click next period
	 */
	function nextYear() {
		yearCursor++;
		bindDataYearSelect();
	}
	
	/**
	 * Click up and down month
	 */
	function setupNavigateMonth() {
		$('#' + divId + ' .wrapper-btn-up').click(function() {
			$('#' + divId + ' .ui-datepicker-next').click();
			bindDataMonthChange();
		});
		$('#' + divId + ' .wrapper-btn-down').click(function() {
			$('#' + divId + ' .ui-datepicker-prev').click();
			bindDataMonthChange();
		});
	}
	
	/**
	 * Click back and next period (in the top right corner of the page)
	 */
	function setupNavigatePeriod() {
		if (backId) {
			$('#' + backId).unbind('click');
			$('#' + backId).click(function() {
				changePeriod(-1);
			});
		}
		if (nextId) {
			$('#' + nextId).unbind('click');
			$('#' + nextId).click(function() {
				changePeriod(1);
			});
		}
	}
	
	/**
	 * Change back or next period
	 * @param alpha 1 if next, -1 if back
	 */
	function changePeriod(alpha) {
		var fromDateObj = getDateFromText(startDate);
		var toDateObj = getDateFromText(endDate);
		
		if (pickType == CONFIG.TYPE_DATE) {
			fromDateObj.setDate(fromDateObj.getDate() + alpha);
			startDate = formatDateToString(fromDateObj);
			endDate = startDate;
		} else if (pickType == CONFIG.TYPE_WEEK) {
			fromDateObj.setDate(fromDateObj.getDate() + alpha * 7);
			toDateObj.setDate(toDateObj.getDate() + alpha * 7);
			startDate = formatDateToString(fromDateObj);
			endDate = formatDateToString(toDateObj);
			
			weekNumber = fromDateObj.getWeek();
		} else if (pickType == CONFIG.TYPE_MONTH) {
			chosenMonth += alpha;
			if (chosenMonth > 12) {
				chosenMonth = 1;
				chosenYear++;
				nextYear();
			} else if (chosenMonth < 1) {
				chosenMonth = 12;
				chosenYear--;
				backYear();
			}
			setupStartDateAndEndDateByMonth();
		} else if (pickType == CONFIG.TYPE_SEASON) {
			season += alpha;
			if (season > SEASON.FALL) {
				season = SEASON.WINTER;
				chosenYear++;
				nextYear();
			} else if (season < SEASON.WINTER) {
				season = SEASON.FALL;
				chosenYear--;
				backYear();
			}
			setupStartDateAndEndDateBySeason();
		} else if (pickType == CONFIG.TYPE_YEAR) {
			if (alpha < 0) {
				chosenYear--;
				backYear();
			} else {
				chosenYear++;
				nextYear();
			}
			setupStartDateAndEndDateByYear();
		} else if (pickType == CONFIG.TYPE_PERIOD) {
			var diff = dateDiff(fromDateObj, toDateObj) + 1;
			fromDateObj.setDate(fromDateObj.getDate() + alpha * diff);
			toDateObj.setDate(toDateObj.getDate() + alpha * diff);
			startDate = formatDateToString(fromDateObj);
			endDate = formatDateToString(toDateObj);
		}
		
		callAjaxLoadData();
	}
	
	/**
	 * Lấy nhãn của khoảng thời gian.
	 * Loại ngày: <Thứ> dd/MM/yyyy
	 * Loại tuần: S<thứ tự của tuần>: du dd/MM/yyyy au dd/MM/yyyy
	 * Loại tháng: <Tháng> yyyy
	 * Loại mùa: <Mùa> yyyy
	 * Loại năm: yyyy
	 * Loại từ ngày - đến ngày: dd/MM/yyyy - dd/MM/yyyy
	 *
	 * @return Xâu label để hiện thị ra chỗ thẻ DIV picker
	 */
	function getLabelDatePicker() {
		// Date objects
		var fromDateObj = getDateFromText(startDate);
		var toDateObj = getDateFromText(endDate);

		if (pickType == CONFIG.TYPE_DATE) {
			var weekDays = [
					label.sunday,
					label.monday,
					label.tuesday,
					label.wednesday,
					label.thursday,
					label.friday,
					label.saturday
			];
			return weekDays[fromDateObj.getDay()] + " " + formatDateToString2(fromDateObj);
		} else if (pickType == CONFIG.TYPE_WEEK) {
			return "Tuần " + weekNumber
					+ ": từ " + formatDateToString2(fromDateObj)
					+ " đến " + formatDateToString2(toDateObj);
		} else if (pickType == CONFIG.TYPE_MONTH) {
			var months = [
					label.january,
					label.february,
					label.march,
					label.april,
					label.may,
					label.june,
					label.july,
					label.august,
					label.september,
					label.october,
					label.november,
					label.december
			];
			return months[fromDateObj.getMonth()] + " " + fromDateObj.getFullYear();
		} else if (pickType == CONFIG.TYPE_SEASON) {
			var seasons = [
					"_",
					label.winter,
					label.spring,
					label.summer,
					label.fall
			];
			return seasons[season] + " " + toDateObj.getFullYear();
		} else if (pickType == CONFIG.TYPE_YEAR) {
			return fromDateObj.getFullYear();
		} else if (pickType == CONFIG.TYPE_PERIOD) {
			return formatDateToString2(fromDateObj) + " - " + formatDateToString2(toDateObj);
		} else {
			return "Unknown type";
		}
	}
	
	/**
	 * Hiển thị thời gian đang được chọn
	 */
	function setLabel() {
		$("#" + pickerId).text(getLabelDatePicker());
	}

	/**
	 * Sau khi chọn sẽ:
	 * - Hiển thị thời gian
	 * - Đóng popup
	 * - Gọi callback
	 */
	function callAjaxLoadData() {
		setLabel();
		dialog.dialog('close');
		if (callback) {
			callback(startDate, endDate, pickType, season);
		}
	}

	// Initialize (entry function)
	function init() {
		createDialogDiv();
		createDialogElement();
		createInlineCalendar();
		
		setupFreeInputs();
		setupFixedRange();
		setupFreePick();
		setupChooseWeek();
		
		setupNavigateYear();
		setupNavigateMonth();
		setupNavigatePeriod();
			
		bindDataYearSelect();
		bindDataMonthChange();
		
		setLabel();
	}

	init();
	
	// Những hàm chìa ra bên ngoài
	function getData() {
		return {
			pickType: pickType,
			startDate: startDate,
			endDate: endDate,
			weekNumber: weekNumber,
			chosenMonth: chosenMonth,
			season: season,
			yearCursor: yearCursor,
			chosenYear: chosenYear
		};		
	}
	
	function setData(data) {
		pickType = data.pickType;
		startDate = data.startDate;
		endDate = data.endDate;
		weekNumber = data.weekNumber;
		chosenMonth = data.chosenMonth;
		season = data.season;
		yearCursor = data.yearCursor;
		chosenYear = data.chosenYear;
		
		setLabel();
	}
	
	return {
		getData: getData,
		setData: setData
	}
}
