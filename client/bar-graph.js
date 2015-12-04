/**
 * Created by stephen.hand on 03/12/2015.
 */
var barGraphGenerator = (function(){
    return function(element, data){
        if (data.length && data[0].category && data[0].val0)       {
            var series = [], i = 0;
            while(data[0]["val"+(i)]){
                series[i] = {
                    name: "Series "+i,
                    data: _.map(data, function(record){return record["val"+i];})
                }
                i++;
            }
            element.highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Graph',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Source: AdventureWorks 2014',
                    x: -20
                },
                xAxis: {
                    categories: _.map(data, function(record){return record["category"];})
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                tooltip: {
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: series
            });
        }

    }
})();