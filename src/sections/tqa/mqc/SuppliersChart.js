import React from 'react';
import Chart, {
  CommonSeriesSettings,
  Series,
  ValueAxis,
  Export,
  Legend,
  Tooltip,
  Title,
  Grid,
  Format,
  Margin,
  Size
} from 'devextreme-react/chart';

const customizeTooltip = (pointInfo) => {
  const items = pointInfo.valueText.split('\n');
  const color = pointInfo.point.getColor();

  items.forEach((item, index) => {
    if (item.indexOf(pointInfo.seriesName) === 0) {
      const element = document.createElement('span');

      element.textContent = item;
      element.style.color = color;
      element.className = 'active';

      items[index] = element.outerHTML;
    }
  });

  const element = document.createElement('span');
  element.textContent = pointInfo.argumentText;
  element.style.fontWeight = 600;
  items.unshift(element.outerHTML);

  return { text: items.join('\n') };
};

const labelData = [
  { value: 'ihqty', name: 'IHQty' },
  { value: 'inspected_qty', name: 'Inspected Qty' },
  // { value: 'percentage', name: 'percentage' },
]

function SuppliersChart({ dataSource = [] }) {
  return (
    <Chart
      id="chart"
      palette="Vintage"
      dataSource={dataSource}
    >
      <CommonSeriesSettings
        argumentField="supplier_name"
        type="bar"
      />
      {
        labelData.map((item) => <Series
          key={item.value}
          valueField={item.value}
          name={item.name} />)
      }
      <Series
        axis="defect_rate"
        type="spline"
        valueField="defect_rate"
        name="Defect Rate (%)"
        color="#008fd8"
      />

      <ValueAxis>
        <Grid visible />
      </ValueAxis>
      <ValueAxis
        name="defect_rate"
        position="right"
      // title="Total Population, billions"
      >
        <Grid visible />
      </ValueAxis>

      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
      />
      <Export enabled={false} />
      <Tooltip
        enabled
        shared
        customizeTooltip={customizeTooltip}
      >
        <Format
          type="largeNumber"
          precision={1}
        />
      </Tooltip>
      <Title text="Suppliers Quality" font={{ size: 20 }} />
      <Size height={350} />
      <Margin
        top={2}
        bottom={2}
        left={2}
        right={10}
      />
    </Chart>
  );
}

export default SuppliersChart;
