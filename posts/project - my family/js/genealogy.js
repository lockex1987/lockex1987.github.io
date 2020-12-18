new Vue({
	el: '#app',

	data() {
		const peopleCodes = people.map(p => p.code);
		return {
			peopleCodes: peopleCodes,
			you: peopleCodes[0],
			relative: peopleCodes[1],
			linkType: '',
			personObj: {}
		};
	},

	mounted() {
		this.changed();
		this.initChart();

		document.querySelector('#treeContainer .tree').addEventListener('click', (evt) => {
			const target = evt.target;
			const person = target.closest('.person');
			if (person) {
				const personCode = person.id.replace('person-', '');
				this.viewPersonByCode(personCode);
			}
		});
	},

	methods: {
		changed() {
			this.linkType = calculateRelation(this.you, this.relative);
			this.highlightSelected();
		},
	
		swap() {
			const temp = this.you;
			this.you = this.relative;
			this.relative = temp;
			this.changed();
		},

        highlightSelected() {
			document.querySelectorAll('.graph .person').forEach(div => div.classList.remove('selected'));
			this.highlightDiv(this.you);
			this.highlightDiv(this.relative);
		},
		
		highlightDiv(personCode) {
			const personDiv = document.querySelector('.graph .p-' + personCode);
			if (personDiv) {
				personDiv.classList.add('selected');
			}
		},

		initChart() {
			// Vẽ biểu đồ
			const dTreeData = [
				personMap['ONGNGOAI']
			];

			const options = {
				target: '#graph',
				width: 1600,
				height: 600,
				callbacks: {
					nodeClick: (name, extra) => {
						const personCode = extra.code;
						this.viewPersonByCode(personCode);
					}
				},
				nodeWidth: 100
			};

			dTree.init(dTreeData, options);
		},

		viewPersonByCode(personCode) {
			this.personObj = personMap[personCode];
		},

		closePopup() {
			this.personObj = {};
		}
	}
});
