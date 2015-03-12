/** @jsx React.DOM */

(function() {
  var LineChart = ReactD3.LineChart;

  var lineChartData = [
    {
      label: 'Salg',
      values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}]
    }
  ];
  var counter = 2;
  var lineChartMountPoint = document.getElementById('linechart');

  var colorScale = d3.scale.ordinal().domain(["somethingA", "somethingB"]).range(["#404040", "#819f2b"]);

  var LineChartComponent = React.createClass({

    mixins: [window.teamcharts.mixins.SetIntervalMixin],

    loadChartDataFromServer: function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function (data) {
          if (this.isMounted()) {
             var mapped = [];
              mappedValues = [];
              _.each(_.last(data.dailyHitsList).hourlyHitsList, function(item){
                 mappedValues.push({x: item.hour,y:item.count});
              })
             var lineChartData = [{
                label: 'somethingA',
                values: mappedValues
              }];
             this.setState({lineChartData: lineChartData});
           }
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    handleResize: function (e) {
      this.setState({
        width: lineChartMountPoint.offsetWidth,
        height: lineChartMountPoint.offsetHeight
      });
    },

    componentDidMount: function () {
      window.addEventListener('resize', this.handleResize);
      this.loadChartDataFromServer();
      this.setInterval(this.loadChartDataFromServer, this.props.pollInterval);
      this.setState({width: lineChartMountPoint.offsetWidth, height: lineChartMountPoint.offsetHeight});
    },

    componentWillUnmount: function () {
      window.removeEventListener('resize', this.handleResize);
    },

    getInitialState: function () {
      return {
        lineChartData: lineChartData,
        width: 500,
        height: 300
      }
    },

    render: function () {
      return (
        <LineChart
          colorScale={colorScale}
          data={this.state.lineChartData}
          width={this.state.width}
          height={this.state.height}
          xAxis={{innerTickSize: 6, label: "day"}}
          yAxis={{label: "hits"}}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
      );
    }
  });

  React.render(<LineChartComponent url="/api/open/elasticsearch/search?application_id=skade&transaction_id1=skadeinsurance&transaction_id2=saveacceptoninsuranceoffer&lastDays=7" pollInterval={5000} />, lineChartMountPoint);

}());
