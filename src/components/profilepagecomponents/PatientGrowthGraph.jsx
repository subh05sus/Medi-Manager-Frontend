import React from 'react';
import Chart from "react-apexcharts";

const PatientGrowthGraph = ({data}) => {
    const options = {
        chart: {
            type: "line",
            stacked: false,
        },
        xaxis: {
            categories: ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"],
            axisBorder: {
                show: true,
                color: '#74C0C3',
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: '#74C0C3', 
            },
            axisTicks: {
                show: false,
            },
        },      
        stroke: {
            width: [3],
            curve: "smooth"
        },
        grid: {
            show: false,
        },
        markers: {
            size: 0
        },
    };
    
    return (
        <div style={{width:'100%', height:'100%', padding:'0'}}>
            <Chart
                options={options}
                series={data.series}
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default PatientGrowthGraph;
