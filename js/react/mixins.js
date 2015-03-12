(function() {
  window.teamcharts =  window.teamcharts || {};
  window.teamcharts.mixins =  window.teamcharts.mixins || {};
  window.teamcharts.mixins.SetIntervalMixin = {
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
}());