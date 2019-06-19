<template>
	<div>
		<div :id="mid" style="height: 300px; width: 100%;"></div>
	</div>
</template>

<script>
import graphRender from '../assets/js/graph'
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
	props: {
		mid: { type: String, default: () => 'chartContainer1' }
	},
	data() {
		return {
			settingData: {
				//theme: "light2", // "light1", "light2", "dark1", "dark2"
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
			// var settingData = {
			// 	//theme: "light2", // "light1", "light2", "dark1", "dark2"
			// 	animationEnabled: true,
			// 	title:{
			// 		text: "week analysis"  
			// 	},
			// 	subtitles: [{
			// 		text: "Try Clicking and Hovering over Legends!"
			// 	}],
			// 	axisX: {
			// 		lineColor: "black",
			// 		labelFontColor: "black"
			// 	},
			// 	axisY2: {
			// 		gridThickness: 0,
			// 		title: "% of Emotion",
			// 		suffix: "%",
			// 		titleFontColor: "black",
			// 		labelFontColor: "black"
			// 	},
			// 	legend: {
			// 		cursor: "pointer",
			// 		itemmouseover: function(e) {
			// 			e.dataSeries.lineThickness = e.chart.options.data[e.dataSeriesIndex].lineThickness * 2;
			// 			e.dataSeries.markerSize = e.chart.options.data[e.dataSeriesIndex].markerSize + 2;
			// 			e.chart.render();
			// 		},
			// 		itemmouseout: function(e) {
			// 			e.dataSeries.lineThickness = e.chart.options.data[e.dataSeriesIndex].lineThickness / 2;
			// 			e.dataSeries.markerSize = e.chart.options.data[e.dataSeriesIndex].markerSize - 2;
			// 			e.chart.render();
			// 		},
			// 		itemclick: function (e) {
			// 			console.log("e : ",e)
			// 			if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			// 				e.dataSeries.visible = false;
			// 			} else {
			// 				e.dataSeries.visible = true;
			// 			}
			// 			e.chart.render();
			// 		}
			// 	},
			// 	toolTip: {
			// 		shared: true
			// 	}
			// }
			console.log('data configuration', {...this.settingData, ...graphData})
			let chart = graphRender.create(graphID ,{...this.settingData, ...graphData})
			this.$emit('init-chart', chart)

		}
	}
}




// [{
// 				type: "spline",
// 				name: "Happy",
// 				markerSize: 5,
//     		  	axisYType: "secondary",
// 				xValueFormatString: "YYYY",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				showInLegend: true,
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: 47.5 },
// 					{ x: new Date(2019, 3, 2), y: 84.8 },
// 					{ x: new Date(2019, 3, 3), y: 91 },
// 					{ x: new Date(2019, 3, 4), y: 90 },
// 					{ x: new Date(2019, 3, 5), y: 92.8 },
// 					{ x: new Date(2019, 3, 6), y: 93.2 },
// 					{ x: new Date(2019, 3, 7), y: 94.8 },
// 					{ x: new Date(2019, 3, 8), y: 92.5 }
// 				]
// 			},
// 			{
// 				type: "spline",
// 				name: "Sad",
// 				markerSize: 5,
// 				axisYType: "secondary",
// 				xValueFormatString: "YYYY-MM-DD",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				showInLegend: true,
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: 26.8 },
// 					{ x: new Date(2019, 3, 2), y: 70 },
// 					{ x: new Date(2019, 3, 3), y: 83.6 },
// 					{ x: new Date(2019, 3, 4), y: 85 },
// 					{ x: new Date(2019, 3, 5), y: 85.4 },
// 					{ x: new Date(2019, 3, 6), y: 87.5 },
// 					{ x: new Date(2019, 3, 7), y: 89.8 },
// 					{ x: new Date(2019, 3, 9), y: 91.6 },
// 					{ x: new Date(2019, 3, 10), y: 91.6 },
// 					{ x: new Date(2019, 3, 11), y: 91.6 },
// 					{ x: new Date(2019, 3, 12), y: 91.6 },
// 					{ x: new Date(2019, 3, 13), y: 91.6 },
// 					{ x: new Date(2019, 3, 14), y: 91.6 },
// 					{ x: new Date(2019, 3, 15), y: 91.6 },
// 					{ x: new Date(2019, 3, 16), y: 91.6 },
// 					{ x: new Date(2019, 3, 17), y: 91.6 },
// 					{ x: new Date(2019, 3, 18), y: 91.6 },
// 					{ x: new Date(2019, 3, 19), y: 91.6 },
// 					{ x: new Date(2019, 3, 20), y: 91.6 },
// 					{ x: new Date(2019, 3, 21), y: 91.6 },
// 					{ x: new Date(2019, 3, 22), y: 91.6 },
// 					{ x: new Date(2019, 3, 23), y: 91.6 },
// 					{ x: new Date(2019, 3, 24), y: 91.6 },
// 					{ x: new Date(2019, 3, 25), y: 91.6 },
// 					{ x: new Date(2019, 3, 26), y: 91.6 },
// 					{ x: new Date(2019, 3, 27), y: 91.6 },
// 					{ x: new Date(2019, 3, 28), y: 91.6 },
// 					{ x: new Date(2019, 3, 29), y: 91.6 },
// 					{ x: new Date(2019, 3, 30), y: 91.6 },
// 					{ x: new Date(2019, 3, 31), y: 91.6 },
// 					{ x: new Date(2019, 4, 1), y: 91.6 },
// 					{ x: new Date(2019, 4, 2), y: 91.6 },
// 					{ x: new Date(2019, 4, 3), y: 91.6 },
// 					{ x: new Date(2019, 4, 4), y: 91.6 },
// 					{ x: new Date(2019, 4, 5), y: 91.6 },
// 					{ x: new Date(2019, 4, 6), y: 91.6 },
// 					{ x: new Date(2019, 4, 7), y: 91.6 },
// 					{ x: new Date(2019, 4, 8), y: 91.6 },
// 					{ x: new Date(2019, 4, 9), y: 91.6 },
// 					{ x: new Date(2019, 4, 10), y: 91.6 },
// 					{ x: new Date(2019, 4, 11), y: 91.6 },
// 					{ x: new Date(2019, 4, 12), y: 91.6 },
// 				]
// 			},
// 			{
// 				type: "spline",
// 				name: "Angry",
// 				markerSize: 5,
// 				axisYType: "secondary",
// 				xValueFormatString: "YYYY",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				showInLegend: true,
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: 23.6 },
// 					{ x: new Date(2019, 3, 2), y: 40 },
// 					{ x: new Date(2019, 3, 3), y: 64 },
// 					{ x: new Date(2019, 3, 4), y: 68 },
// 					{ x: new Date(2019, 3, 5), y: 78 },
// 					{ x: new Date(2019, 3, 6), y: 85 },
// 					{ x: new Date(2019, 3, 7), y: 86 },
// 					{ x: new Date(2019, 3, 8), y: 90.4 }
// 				]
// 			},
// 			{
// 				type: "spline",
// 				showInLegend: true,
// 				name: "Calm",
// 				markerSize: 5,
// 				axisYType: "secondary",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				xValueFormatString: "YYYY",
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: 43.1 },
// 					{ x: new Date(2019, 3, 2), y: 68 },
// 					{ x: new Date(2019, 3, 3), y: 71 },
// 					{ x: new Date(2019, 3, 4), y: 71.7 },
// 					{ x: new Date(2019, 3, 5), y: 69.7 },
// 					{ x: new Date(2019, 3, 6), y: 79.3 },
// 					{ x: new Date(2019, 3, 7), y: 84.2 },
// 					{ x: new Date(2019, 3, 8), y: 87 }
// 				]
// 			},
// 			{
// 				type: "spline",
// 				name: "Disgusted",
// 				markerSize: 5,
// 				axisYType: "secondary",
// 				xValueFormatString: "YYYY",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				showInLegend: true,
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: 47.1 },
// 					{ x: new Date(2019, 3, 2), y: 70.1 },
// 					{ x: new Date(2019, 3, 3), y: 81.3 },
// 					{ x: new Date(2019, 3, 4), y: 83.9 },
// 					{ x: new Date(2019, 3, 5), y: 85.2 },
// 					{ x: new Date(2019, 3, 6), y: 85.2 },
// 					{ x: new Date(2019, 3, 7), y: 86.7 },
// 					{ x: new Date(2019, 3, 8), y: 87 }
// 				]
// 			},
// 			{
// 				type: "spline",
// 				name: "Confused",
// 				markerSize: 5,
// 				axisYType: "secondary",
// 				xValueFormatString: "YYYY",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				showInLegend: true,
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: 27.8 },
// 					{ x: new Date(2019, 3, 2), y: 56.9 },
// 					{ x: new Date(2019, 3, 3), y: 69.4 },
// 					{ x: new Date(2019, 3, 4), y: 72 },
// 					{ x: new Date(2019, 3, 5), y: 72.2 },
// 					{ x: new Date(2019, 3, 6), y: 72.9 },
// 					{ x: new Date(2019, 3, 7), y: 74.2 },
// 					{ x: new Date(2019, 3, 8), y: 74.6 }
// 				]
// 			},
// 			{
// 				type: "spline",
// 				name: "Surprised",
// 				markerSize: 5,
// 				axisYType: "secondary",
// 				xValueFormatString: "YYYY",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				showInLegend: true,
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: 2 },
// 					{ x: new Date(2019, 3, 2), y: 15.2 },
// 					{ x: new Date(2019, 3, 3), y: 29 },
// 					{ x: new Date(2019, 3, 4), y: 43 },
// 					{ x: new Date(2019, 3, 5), y: 49 },
// 					{ x: new Date(2019, 3, 6), y: 63.8 },
// 					{ x: new Date(2019, 3, 7), y: 61.4 },
// 					{ x: new Date(2019, 3, 8), y: 70.5 }
// 				]
// 			},
// 			{
// 				type: "spline",
// 				name: "Confidence",
// 				markerSize: 5,
// 				axisYType: "secondary",
// 				xValueFormatString: "YYYY",
// 				yValueFormatString: "#,##0.0\"%\"",
// 				showInLegend: true,
// 				dataPoints: [
// 					{ x: new Date(2019, 3, 1), y: .7 },
// 					{ x: new Date(2019, 3, 2), y: 3.7 },
// 					{ x: new Date(2019, 3, 3), y: 17.9 },
// 					{ x: new Date(2019, 3, 4), y: 23.3 },
// 					{ x: new Date(2019, 3, 5), y: 28.7 },
// 					{ x: new Date(2019, 3, 6), y: 35.3 },
// 					{ x: new Date(2019, 3, 7), y: 41.8 },
// 					{ x: new Date(2019, 3, 8), y: 43.4 }
// 				]
// 			}]
</script>

<style>

</style>
