/** @jsx React.DOM */

var colorScale = d3.scale.ordinal()
.domain(["SomethingA", "SomethingB", "SomethingC"])
.range(["#404040", "#819f2b" , "#bb1b18"]);

var width= 300;
var height= 300;

var PieChart = ReactD3.PieChart;

data = {
	label: 'somethingA',
	values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]

};

React.render(<PieChart
	colorScale={colorScale}
	data={data}
	width={width}
	height={height}
	margin={{top: 10, bottom: 10, left: 100, right: 100}}/>,
	document.getElementById('piechart')
	);
