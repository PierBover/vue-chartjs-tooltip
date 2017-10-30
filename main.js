let canvasContext = null;
let chart = null;

new Vue({
	el: '#app',
	data () {
		return {
			showTooltip: false,
			tooltipValue: 'Pepito',
			tooltipSubtext: 'Pepito',
			x: 0,
			y: 0
		}
	},
	mounted () {
		this.renderChart([12, 19, 3]);
	},
	computed: {
		tooltipStyle () {
			return `top: ${this.y}px; left: ${this.x}px`;
		}
	},
	methods: {
		renderChart (data) {
			canvasContext = document.getElementById('the-canvas').getContext('2d');

			const vueInstance = this;

			chart = new Chart(canvasContext, {
				type: 'bar',
				data: {
					labels: ['Things', 'Other things', 'Thingies'],
					datasets: [{
						label: 'Somet hings',
						data: data,
						borderWidth: 1
					}]
				},
				options: {
					tooltips: {
						enabled: false,
						custom: function (tooltipModel) {
							console.log(tooltipModel);

							if (tooltipModel.opacity === 0) {
								vueInstance.showTooltip = false;
								return;
							} else {
								vueInstance.showTooltip = true;
							}

							vueInstance.tooltipValue = tooltipModel.dataPoints[0].yLabel;
							vueInstance.tooltipSubtext = tooltipModel.title[0];
							vueInstance.x = tooltipModel.x;
							vueInstance.y = tooltipModel.y;

							console.log(vueInstance);
						}
					}
				}
			});
		}
	}
});