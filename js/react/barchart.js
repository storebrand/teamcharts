/** @jsx React.DOM */
(function() {

  var BarChart = ReactD3.BarChart;

    //TODO: Fungerer ikke
  var colorScale = d3.scale.ordinal()
    .domain(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    .range(["#404040", "#819f2b", "#bb1b18", "#404040", "#819f2b", "#bb1b18", "#404040"]);


  var barChartData = [{
    label: 'somethingA',
    values: [{x: 'Monday', y: 10}, {x: 'Tuesday', y: 4}, {x: 'Wednesday', y: 3}, {x: 'Thursday', y: 3}, {
      x: 'Friday', y: 3}, {x: 'Saturday', y: 3}, {x: 'Sunday', y: 3}]
  }];

  var barChartMountPoint = document.getElementById('barchart');

  var BarChartComponent = React.createClass({
    mixins: [window.teamcharts.mixins.SetIntervalMixin],

    handleResize: function () {
      this.setState({
        width: barChartMountPoint.offsetWidth,
        height: barChartMountPoint.offsetHeight
      });
    },

    loadChartDataFromServer: function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function (data) {
          if (this.isMounted()) {
            var blah = _.clone(barChartData);
            this.setState({barChartData: blah});
          }
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    componentDidMount: function () {
      this.setState({width: barChartMountPoint.offsetWidth, height: barChartMountPoint.offsetHeight});
      this.setInterval(this.loadChartDataFromServer, this.props.pollInterval);
      window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function () {
      window.removeEventListener('resize', this.handleResize);
    },

    getInitialState: function () {
      return {
        barChartData: barChartData,
        width: 650,
        height: 300
      }
    },
    render: function () {
      return (
        <BarChart
          colorScale={colorScale}
          data={this.state.barChartData}
          width={this.state.width}
          height={this.state.height}
          yAxis={{label: "hits"}}
          margin={{top: 50, bottom: 50, left: 50, right: 50}}/>
      );
    }
  });

  React.render(<BarChartComponent url="http://date.jsontest.com" pollInterval={2000} />, barChartMountPoint);
}());

