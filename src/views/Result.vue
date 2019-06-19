<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div id="pieChart" style="height: 360px; width: 100%;">
                    </div>
                </div>
                <div class="col-md-6">
                    <div id="columnChart" style="height: 360px; width: 100%;">
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            roundGraphData: [{ 
                  y: 45.16,
                  exploded: true,
                  indexLabel: "Hello",
                  color: "#1f77b4"
                }, {
                  y: 18.8,
                  indexLabel: "Hi",
                  color: "#ff7f0e"
                }, {
                  y: 18.45,
                  indexLabel: "pk",
                  color: " #ffbb78"
                }, {
                  y: 5.56,
                  indexLabel: "one",
                  color: "#d62728"
                }, {
                  y: 5.38,
                  indexLabel: "two",
                  color: "#98df8a"
                }, {
                  y: 3.73,
                  indexLabel: "three",
                  color: "#bcbd22"
                }, {
                  y: 2.92,
                  indexLabel: "four",
                  color: "#f7b6d2"
            }],
            barGraphData: [{
                  y: 400.04,
                  label: "one",
                  color: "#1f77b4"
                }, {
                  y: 381.84,
                  label: "two",
                  color: "#ff7f0e"
                }, {
                  y: 375.76,
                  label: "three",
                  color: " #ffbb78"
                }, {
                  y: 97.48,
                  label: "four",
                  color: "#d62728"
                }, {
                  y: 94.2,
                  label: "five",
                  color: "#98df8a"
                }, {
                  y: 65.28,
                  label: "Hi",
                  color: "#bcbd22"
                }, {
                  y: 51.2,
                  label: "Hello",
                  color: "#f7b6d2"
            }]
        }
    },
    computed: {
        ...mapState({
            analyzeResult:'analyzeResult'
        })
    },
    created(){
        this.updateGraphData(this.$store.state.analyzeResult)
    },
    watch: {
        analyzeResult(val, oldval){
            this.updateGraphData(val)
        }
    },
    mounted() {
        //원형 그래프 값 정의
        this.renderPieChart(this.roundGraphData);

        // 막대 그래프 값 정의
        this.renderColumnChart(this.barGraphData);

    },
    methods: {
        updateGraphData(data) {
            var emotion = data.FaceDetails[0].Emotions
            console.log('result : ',data.FaceDetails[0].Emotions)
            console.log('graphData : ',this.roundGraphData)
            for (var i = 0; i < emotion.length; i++) { 
                this.roundGraphData[i].indexLabel = emotion[i].Type
                this.roundGraphData[i].y = emotion[i].Confidence
            }
        },
        renderPieChart(values) {
            var chart = new CanvasJS.Chart("pieChart", {
            backgroundColor: "white",
            colorSet: "colorSet2",

            title: {
              text: "Pie Chart",
              fontFamily: "Verdana",
              fontSize: 25,
              fontWeight: "normal",
            },
            animationEnabled: true,
            data: [{
              indexLabelFontSize: 15,
              indexLabelFontFamily: "Monospace",
              indexLabelFontColor: "darkgrey",
              indexLabelLineColor: "darkgrey",
              indexLabelPlacement: "outside",
              type: "pie",
              showInLegend: false,
              toolTipContent: "<strong>#percent%</strong>",
              dataPoints: values
            }]
            });
            chart.render();
        },
        renderColumnChart(values) {
            var chart = new CanvasJS.Chart("columnChart", {
                backgroundColor: "white",
                colorSet: "colorSet3",
                title: {
                  text: "Column Chart",
                  fontFamily: "Verdana",
                  fontSize: 25,
                  fontWeight: "normal",
                },
                animationEnabled: true,
                legend: {
                  verticalAlign: "bottom",
                  horizontalAlign: "center"
                },
                theme: "theme2",
                data: [{
                    indexLabelFontSize: 15,
                    indexLabelFontFamily: "Monospace",
                    indexLabelFontColor: "darkgrey",
                    indexLabelLineColor: "darkgrey",
                    indexLabelPlacement: "outside",
                    type: "column",
                    showInLegend: false,
                    legendMarkerColor: "grey",
                    dataPoints: values
                }]
            });
            chart.render();
        }
    }
}
</script>

<style>

</style>
