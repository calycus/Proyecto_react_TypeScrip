export default {
    chart: {
        polar: true,
        type: "line",
        width: 800,
        height: 800,
    },
    credits: { enabled: false },
    title: {
        text: "",
        x: -80,
    },

    pane: {
        size: "80%",
    },

    xAxis: {
        categories: [],
        tickmarkPlacement: "on",
        lineWidth: 0,
    },

    yAxis: {
        gridLineInterpolation: "polygon",
        lineWidth: 0,
        min: 0,
    },

    tooltip: {
        shared: true,
        pointFormat:
            '<span style="color:{series.color}">{series.name}:</span> <b>{point.y:,.0f} %</b><br/>',
    },

    legend: {
        align: "center",
        horizontalAlign: "top",
        layout: "horizontal",
    },
    series: [],

    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 500,
                },
                chartOptions: {
                    legend: {
                        align: "center",
                        verticalAlign: "bottom",
                        layout: "horizontal",
                    },
                    pane: {
                        size: "70%",
                    },
                },
            },
        ],
    },
}