import React from 'react';
import {
  Chart, Series, CommonSeriesSettings, Legend, Export, Tooltip, Title, Margin
} from 'devextreme-react/chart';
// import service from './data.ts';

// const dataSource = service.dataSource();

function customizeTooltip(arg: { percentText: string; valueText: string; }) {
  return {
    text: `${arg.percentText} years: ${arg.valueText}`,
  };
}

const dataSource = [{
  country: 'DUNG QUAT',
  hydro: 900,
  oil: 937.6,
}, {
  country: 'HOA THO - DONG DA',
  hydro: 100,
  oil: 308.6,
}, {
  country: 'HUONG TRA',
  hydro: 40,
  oil: 128.5,
}, {
  country: 'VINATEXT TU NGHIA',
  hydro: 120,
  oil: 241.5,
}];


function LoadingChart() {
  return (
    <Chart
      id="chart"
      dataSource={dataSource}
      palette={["#7ec5ff", "#bbe0ff"]}
      rotated
    >
      <Title
        text="Productivity Loading"
        subtitle=""
      />
      <CommonSeriesSettings argumentField="country" type="fullstackedbar" />
      <Series valueField="hydro" name="Hydro-electric" />
      <Series valueField="oil" name="Oil" />

      <Legend
        visible={false}
        verticalAlignment="top"
        horizontalAlignment="center"
        itemTextPosition="right"
      />
      <Export enabled={false} />
      <Tooltip
        enabled
        customizeTooltip={customizeTooltip}
      />
      <Margin
        top={2}
        bottom={2}
        left={10}
        right={10}
      />
    </Chart>
  );
}

export default LoadingChart;

