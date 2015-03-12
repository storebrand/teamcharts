/** @jsx React.DOM */

(function() {
  var colorScale = d3.scale.ordinal()
    .domain(["SomethingA", "SomethingB", "SomethingC"])
    .range(["#404040", "#819f2b", "#bb1b18"]);

  var PieChart = ReactD3.PieChart;

  pieChartData = {
    label: 'somethingA',
    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
  };
  var pieChartMountPoint = document.getElementById('piechart');

  var SetIntervalMixin = {
    componentWillMount: function () {
      this.intervals = [];
    },
    setInterval: function () {
      this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function () {
      this.intervals.map(clearInterval);
    }
  };

  var PieChartComponent = React.createClass({
    mixins: [SetIntervalMixin],

    getInitialState: function () {
      return {
        pieChartData: pieChartData,
        width: 300,
        height: 300
      }
    },

    handleResize: function (e) {
      this.setState({
        width: pieChartMountPoint.offsetWidth,
        height: pieChartMountPoint.offsetHeight
      });
    },

    loadChartDataFromServer: function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function (data) {
          if (this.isMounted()) {
            var blah = _.clone(pieChartData);
            //blah[0].values[0].y = ++counter;
            this.setState({pieChartData: blah});
          }
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    componentDidMount: function () {
      this.setState({
        width: pieChartMountPoint.offsetWidth,
        height: pieChartMountPoint.offsetHeight
      });
      this.setInterval(this.loadChartDataFromServer, this.props.pollInterval);
      window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function () {
      window.removeEventListener('resize', this.handleResize);
    },

    render: function () {
      return (
        <PieChart
          colorScale={colorScale}
          data={this.state.pieChartData}
          width={this.state.width}
          height={this.state.height}
          margin={{top: 20, bottom: 20, left: 100, right: 100}}/>
      );
    }
  });

  React.render(<PieChartComponent url="http://date.jsontest.com" pollInterval={2000} />, pieChartMountPoint);

}());
