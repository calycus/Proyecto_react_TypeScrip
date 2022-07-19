export default {
    chart: {
        polar: true,
        reflow: true,
        type: "line",
    },
    title: {
        text: "",
        x: -80,
    },
    subtitle: {
        text: ""
    },
    credits: { enabled: false },
    pane: {
        size: "70%",
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
        enabled: false,
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
    },

    series: [
        {
            name: "Tasa de Repitencia",
            data: [],
            pointPlacement: "on",
        },
    ],

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
                        size: "60%",
                    },
                },
            },
        ],
    },
}