<template>
	<div>
		<div class="totalChart" :id="mid" style="width: 100%;"></div>
	</div>
</template>

<script>
import graphRender from '../../assets/js/graph'
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
	props: {
		mid: { type: String, default: () => 'chartContainer1' }
	},
	data() {
		return {
			settingData: {
				// theme: "light1", // "light1", "light2", "dark1", "dark2"
				animationEnabled: true,
				title:{
					text: "week analysis"  
				},
				subtitles: [{
					text: "Try Clicking and Hovering over Legends!"
				}],
				axisX: {
					lineColor: "black",
					labelFontColor: "black"
				},
				axisY2: {
					gridThickness: 0,
					title: "% of Emotion",
					suffix: "%",
					titleFontColor: "black",
					labelFontColor: "black"
				},
				legend: {
					cursor: "pointer",
					itemmouseover: function(e) {
						e.dataSeries.lineThickness = e.chart.options.data[e.dataSeriesIndex].lineThickness * 2;
						e.dataSeries.markerSize = e.chart.options.data[e.dataSeriesIndex].markerSize + 2;
						e.chart.render();
					},
					itemmouseout: function(e) {
						e.dataSeries.lineThickness = e.chart.options.data[e.dataSeriesIndex].lineThickness / 2;
						e.dataSeries.markerSize = e.chart.options.data[e.dataSeriesIndex].markerSize - 2;
						e.chart.render();
					},
					itemclick: function (e) {
						console.log("e : ",e)
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						} else {
							e.dataSeries.visible = true;
						}
						e.chart.render();
					}
				},
				toolTip: {
					shared: true
				}
			},
			gData: {data:[]},
			dataCategory: ['happy','angry','sad','calm','disgusted','surprised','confused','confidence'],
			term: 7
		}
	},
	created() {
		// this.$refs.day.id = 'chartContainer1'
		// this.$refs.month.id = 'chartContainer2'
		// this.$refs.half.id = 'chartContainer3'
		// const dataCategory = ['happy','angry','sad','calm','disgusted','surprised','confused','confidence']

		for (var i=0; i<this.dataCategory.length; i++) {
			this.gData.data.push({
				type: "spline",
				name: this.dataCategory[i].toUpperCase(),
				markerSize: 5,
    		  	axisYType: "secondary",
				xValueFormatString: "YYYY-MM-DD",
				yValueFormatString: "#,##0.0\"%\"",
				showInLegend: true,
				dataPoints: []
			})
		}
		console.log("created")
	
	},
	mounted() {
		// const dataCategory = ['happy','angry','sad','calm','disgusted','surprised','confused','confidence']
		// var gData = {data:[]}
		// for (var i=0; i<dataCategory.length; i++) {
		// 	gData.data.push({
		// 		type: "spline",
		// 		name: dataCategory[i].toUpperCase(),
		// 		markerSize: 5,
    	// 	  	axisYType: "secondary",
		// 		xValueFormatString: "YYYY-MM-DD",
		// 		yValueFormatString: "#,##0.0\"%\"",
		// 		showInLegend: true,
		// 		dataPoints: []
		// 	})
		// }

		// this.FETCH_AVGDATA({term: 7, uid: firebase.auth().currentUser.uid}).then(x => {
		// 	x.forEach(result => {

		// 		var year = parseInt(result.createDate.substring(0,4))
		// 		var month = parseInt(result.createDate.substring(5,7))
		// 		var day = parseInt(result.createDate.substring(8))
		// 		for (var i=0; i<dataCategory.length; i++) {
		// 			gData.data[i].dataPoints.push({ x: new Date(year, month, day), y: result[dataCategory[i]+'avg'] })
		// 		}
		// 	})
		// }).catch(res=>{
		// 	console.log(res)
      	// 	alert("ERROR "+res)
		// })
		
		this.$nextTick(() => {
			console.log('this.mid : ',this.mid)
			switch (this.mid) {
			case 'chartContainer1':
				// this.chartRender(this.mid, gData)
				this.term = 7
				this.settingData.title.text = "week analysis"
				break
			case 'chartContainer2':
				// this.chartRender(this.mid, gData)
				this.term = 30
				this.settingData.title.text = "month analysis"
				break
			case 'chartContainer3':
				// this.chartRender(this.mid, gData)
				this.term = 180
				this.settingData.title.text = "half analysis"
				break
			}
			this.FETCH_AVGDATA({'term': this.term, 'uid': firebase.auth().currentUser.uid}).then(x => {
				x.forEach(result => {
					var year = parseInt(result.createDate.substring(0,4))
					var month = parseInt(result.createDate.substring(5,7)) - 1
					var day = parseInt(result.createDate.substring(8))
					for (var i=0; i<this.dataCategory.length; i++) {
						this.gData.data[i].dataPoints.push({ x: new Date(year, month, day), y: result[this.dataCategory[i]+'avg'] })
					}
				})
			}).then(() => {
				this.chartRender(this.mid, this.gData)
				console.log('rendered')
			}).catch(res=>{
				console.log(res)
      			alert("ERROR "+res)
			})
		})
	},
	methods: {
		...mapActions([
			'FETCH_AVGDATA'
		]),
		chartRender(graphID, graphData) {
			console.log('data configuration', {...this.settingData, ...graphData})
			let chart = graphRender.create(graphID ,{...this.settingData, ...graphData})
			this.$emit('init-chart', chart)
		}
	}
}
</script>

<style>
.totalChart {
  height: 350px;
}

@media (min-width: 865px) {
	.totalChart {
    height: 450px;
	}
}
</style>
