export default {
    chart: {
        type: "column",
    },
    credits: { enabled: false },
    title: {
        text: "",
        floating: true,
        align: "left",
    },
    colors: ["#d14a2c"],
    tooltip: {
        shared: true,
        headerFormat:
            '<span style="font-size: 15px">{point.point.name}</span><br/>' +
            '<tr><td style="padding:0">Incidencias:</td></tr><br/> ',
        pointFormat:
            '<span style="color:{point.color}">\u25CF</span> <b>{point.abreviatura}: => </b><b>{point.y}%</b><br/>',

    },
    legend: {
        enabled: false,
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
    },
    plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0,
        },
    },

    xAxis: {
        type: "category",
    },
    yAxis: [
        {
            title: {
                text: "%",
            },
            plotOptions: {
                series: {
                    grouping: false,
                    borderWidth: 0,
                },
            },

            tooltip: {
                shared: true,
                headerFormat:
                    '<span style="font-size: 15px">{point.point.name}</span><br/>',
                pointFormat:
                    '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} %</b><br/>',
            },

            showFirstLabel: false,
        },
    ],
    series: [{
        color: "#00aae4",
        pointPlacement: -0.2,
        linkedTo: "main",
        data: [],
    },
    {
        id: "main",
        dataSorting: {
            enabled: true,
            matchByName: true,
        },
        dataLabels: [
            {
                enabled: true,
                inside: true,
                style: {
                    fontSize: "16px",
                },
            },
        ],
        data: [],
    },],
}