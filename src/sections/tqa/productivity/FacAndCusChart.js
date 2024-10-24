import React from 'react';
import {
  Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip, Margin
} from 'devextreme-react/chart';
// import service from './data.ts';

// const dataSource = service.getMaleAgeData();

function customizeTooltip(arg: { seriesName: string; valueText: string; }) {
  return {
    text: `${arg.seriesName} years: ${arg.valueText}`,
  };
}

const maleAgeData = [{
  state: 'DUNG QUAT',
  young: 5.3,
  middle: 26,
  older: 8,
}, {
  state: 'HOA THO - DONG DA',
  young: 6.45,
  middle: 30.5,
  older: 11.22,
}, {
  state: 'HUONG TRA',
  young: 12.56,
  middle: 45.5,
  older: 6.5,
}, {
  state: 'VINATEXT TU NGHIA',
  young: 32,
  middle: 87,
  older: 15,
}];

function FacAndCusChart() {
  return (
    <Chart
      id="chart"
      title="Qty by Factory & Customer"
      dataSource={maleAgeData}
    >
      <CommonSeriesSettings argumentField="state" type="stackedbar" />
      <Series
        valueField="young"
        name="PEERLESS"
      />
      <Series
        valueField="middle"
        name="BLAUER"
      />
      <Series
        valueField="older"
        name="NEXT"
      />
      {/* <ValueAxis position="right">
        <Title text="millions" />
      </ValueAxis> */}
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="top"
      />
      <Export enabled={false} />
      <Tooltip
        enabled
        location="edge"
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

export default FacAndCusChart;