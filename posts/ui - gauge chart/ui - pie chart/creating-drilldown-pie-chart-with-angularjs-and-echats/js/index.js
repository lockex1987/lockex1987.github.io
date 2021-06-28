angular
  .module('demo', [])
  .controller("MyCtrl", function($scope) {
    $scope.profits = [{
      name: '2014',
      value: 35400,
      data: [{
        name: 'Q1',
        value: 7500,
        data: [{
          name: 'Jan',
          value: 2000
        }, {
          name: 'Feb',
          value: 2500
        }, {
          name: 'Mar',
          value: 3000
        }]
      }, {
        name: 'Q2',
        value: 7600,
        data: [{
          name: 'Apr',
          value: 2600
        }, {
          name: 'May',
          value: 2800
        }, {
          name: 'Jun',
          value: 2200
        }]
      }, {
        name: 'Q3',
        value: 10400,
        data: [{
          name: 'Jul',
          value: 4000
        }, {
          name: 'Aug',
          value: 3600
        }, {
          name: 'Sep',
          value: 2800
        }]
      }, {
        name: 'Q4',
        value: 9900,
        data: [{
          name: 'Oct',
          value: 3200
        }, {
          name: 'Nov',
          value: 2900
        }, {
          name: 'Dec',
          value: 3800
        }]
      }]
    }, {
      name: '2015',
      value: 41200,
      data: [{
        name: 'Q1',
        value: 9400,
        data: [{
          name: 'Jan',
          value: 2300
        }, {
          name: 'Feb',
          value: 3500
        }, {
          name: 'Mar',
          value: 3600
        }]
      }, {
        name: 'Q2',
        value: 9600,
        data: [{
          name: 'Apr',
          value: 4600
        }, {
          name: 'May',
          value: 2800
        }, {
          name: 'Jun',
          value: 2100
        }]
      }, {
        name: 'Q3',
        value: 10500,
        data: [{
          name: 'Jul',
          value: 3000
        }, {
          name: 'Aug',
          value: 3800
        }, {
          name: 'Sep',
          value: 3700
        }]
      }, {
        name: 'Q4',
        value: 11700,
        data: [{
          name: 'Oct',
          value: 4200
        }, {
          name: 'Nov',
          value: 3900
        }, {
          name: 'Dec',
          value: 3600
        }]
      }]
    }, {
      name: '2016',
      value: 43300,
      data: [{
        name: 'Q1',
        value: 10000,
        data: [{
          name: 'Jan',
          value: 2500
        }, {
          name: 'Feb',
          value: 4500
        }, {
          name: 'Mar',
          value: 3000
        }]
      }, {
        name: 'Q2',
        value: 10700,
        data: [{
          name: 'Apr',
          value: 4800
        }, {
          name: 'May',
          value: 2700
        }, {
          name: 'Jun',
          value: 3200
        }]
      }, {
        name: 'Q3',
        value: 10600,
        data: [{
          name: 'Jul',
          value: 3500
        }, {
          name: 'Aug',
          value: 3600
        }, {
          name: 'Sep',
          value: 3500
        }]
      }, {
        name: 'Q4',
        value: 12000,
        data: [{
          name: 'Oct',
          value: 4500
        }, {
          name: 'Nov',
          value: 3600
        }, {
          name: 'Dec',
          value: 3900
        }]
      }]
    }];

    $scope.paths = ['All'];
    var profits = angular.copy($scope.profits);

    $scope.drillDown = function(profit) {
      if (profit.data) {
        $scope.profits = profit.data;
        $scope.paths.push(profit.name);
      }
    };

    $scope.go = function(path) {
      if (path == 'All') {
        $scope.paths = ['All'];
      } else {
        var index = $scope.paths.indexOf(path);
        $scope.paths = $scope.paths.slice(0, index + 1);
      }
      $scope.profits = downSearch(profits, path);
    };

    /**
     *  Downwards and recursively search
     * @param arr
     * @param searchKey
     * @returns {*}
     */
    function downSearch (arr, searchKey) {
      if (searchKey == 'All') {
        return arr;
      }
      for (var i in arr) {
        var item = arr[i];
        if (item.name == searchKey) {
          if (item.data) {
            return item.data;
          }
          return [];
        } else {
          downSearch(item.data, searchKey)
        }
      }
    }
  })
  /**
   * Define drillTable directive
   * @param headers {Array} th data provider
   * @param source {Array} td data provider
   * @param drillDown {Function} click to drill down
   */
  .directive('drillTable', function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        headers: '=',
        source: '=',
        drillDown: '&'
      },
      template: '<table class="table table-bordered">\n' +
      '  <thead ng-if="source && source.length > 0">\n' +
      '    <tr>\n' +
      '      <th ng-repeat="item in headers">{{item}}</th>\n' +
      '    </tr>\n' +
      '  </thead>\n' +
      '  <tbody>\n' +
      '    <tr ng-repeat="item in source"\n' +
      '      ng-init="hasData=item.data"\n' +
      '      ng-if="source && source.length > 0">\n' +
      '      <td>{{$index + 1}}</td>\n' +
      '      <td title="{{hasData ? \'Drill Down\' : \'\'}}" ng-click="drillDown({profit: item})">\n' +
      '       <span  ng-style="{\'cursor\': hasData ? \'pointer\' : \'auto\'}">{{item.name}} {{hasData ? \'...\' : \'\'}}</span>\n' +
      '      </td>\n' +
      '      <td>{{item.value|number}}</td>\n' +
      '    </tr>\n' +
      '    <tr ng-if="source.length == 0">\n' +
      '      <td>No Data</td>\n' +
      '    <tr>\n' +
      '  </tbody>\n' +
      '</table>'
    };
  })
  /**
   * define breadcrumb directive
   * @param paths {Array} breadcrumb data provider
   * @param labelField {String} path field name
   * @param jump {Function} click to go to new view
   */
  .directive('breadcrumb', function() {
    return {
      restrict: 'EA',
      replace: true,

      scope: {
        paths: '=',
        labelField: '@',
        go: '&'
      },
      template: '<div class="breadcrumb" ng-show="paths.length > 1">\n' +
      '  <span class="back">\n' +
      '    <a ng-click="go()(paths[paths.length - 2])">Back</a>\n' +
      '    <span class="splitter"> | </span>\n' +
      '  </span>\n' +
      '  <ul ng-repeat="item in paths">\n' +
      '    <li ng-init="path=(item[labelField] || item)">\n' +
      '      <a class="ellipsis" title="{{path}}" ng-click="go()(path)"\n' +
      '        ng-if="!$last">{{path}}</a>\n' +
      '      <span class="ellipsis" title="{{path}}" ng-if="$last">{{path}}</span>\n' +
      '      <span class="splitter" ng-if="!$last"> &gt; </span>\n' +
      '    </li>\n' +
      '  </ul>\n' +
      '</div>',
      compile: function(element, attr) {
        if (attr.labelField == undefined) {
          attr.labelField = 'name';
        }
      }
    }
  })
  /**
   * Define pie echart directive
   * @param source {Array} chart data provider
   * @param drillDown {Function} click to drill down
   */
  .directive('pieChart', function($filter) {
    return {
      restrict: 'EA',
      scope: {
        source: '=',
        drillDown: '&'
      },
      link: function($scope, element, attrs) {
        var myChart = echarts.init(element[0]);
        /**
         * watch data source
         */
        $scope.$watchCollection('source', function(newValue, oldValue) {
          if (newValue) {
            var legend = [];
            angular.forEach(newValue, function(val) {
              legend.push(val.name);
            });
            var option = {
              tooltip: {
                trigger: 'item',
                formatter: function(params) {
                  return params.name + ' : ' +
                    $filter('number')(params.value) +
                    ' (' + params.percent.toFixed(2) + '%)';
                }
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: legend
              },
              series: [{
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: newValue,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
            };
            myChart.setOption(option);
          }
          myChart.resize();
        });

        /**
         * click chart item to drill down
         */
        myChart.on('click', function(params) {
          $scope.$apply(function() {
            $scope.drillDown({profit: params.data});
          });
        });

        /**
         * adjust the chart size when resizing the window
         */
        window.onresize = function() {
          myChart.resize();
        };
      }
    };
  })