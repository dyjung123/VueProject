// import CanvasJS from 'canvasjs'
var graphRender = {}

graphRender.create = function(id,config) {
    var chart = new CanvasJS.Chart(id, config)
    chart.render()
    return chart
}

export default graphRender