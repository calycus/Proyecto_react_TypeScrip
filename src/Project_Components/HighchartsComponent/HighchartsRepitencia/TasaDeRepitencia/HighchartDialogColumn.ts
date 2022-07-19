
export default {
    chart: {
        type: "bar",
    },
    title: {
        text: "",
    },
    xAxis: {
        categories: [],
        title: {
            text: null,
        },
    },
    yAxis: {
        min: 0,
        title: {
            text: "",
            align: "high",
        },
        labels: {
            overflow: "justify",
        },
    },
    tooltip: {
        valueSuffix: " %",
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
            },
        },
    },
    legend: {
        enabled: false,
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -40,
        y: 80,
    },
    credits: {
        enabled: false,
    },
    series: [
        {
            name: "Incidencia",
            data: [],
        },
    ],
};

