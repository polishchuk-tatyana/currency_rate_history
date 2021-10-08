//adding chart design to page
$(document).ready(function () {
    var data = $("#chart_id").val();
    var json_data = JSON.parse(data);

    Highcharts.chart('id_container', {

        title: {
            text: 'UAH to USD Chart'
        },

        yAxis: {
            title: {
                text: 'Rate of UAH'
            }
        },

        xAxis: {
            categories: json_data.date
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },

        series: [{
            name: 'Currency rate',
            data: json_data.rateUAH
        }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
});