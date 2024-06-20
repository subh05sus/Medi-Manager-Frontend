import React from 'react';
import Chart from "react-apexcharts";

const GrowthChart = ({state}) => {
 return <div style={{'width':'100%','height':'80%'}}>
            <Chart
            options={state.options}
            series={state.series}
            width="100%"
            height="100%"
            />
</div>;
};

export default GrowthChart;
