import React, { useCallback, useState } from 'react';
import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin,
    Title,
    Subtitle,
    Tooltip,
    Grid,
} from 'devextreme-react/chart';
import { Properties as ChartPropsType } from 'devextreme/viz/chart';

const types: (ChartPropsType['commonSeriesSettings']['type'])[] = ['line', 'stackedline', 'fullstackedline'];
const seriesTypeLabel = { 'aria-label': 'Series Type' };

const energySources = [
    { value: 'hydro', name: 'DUNG QUAT' },
    { value: 'oil', name: 'HOA THO - DONG DA' },
    { value: 'gas', name: 'VINATEXT TU NGHIA' },
    { value: 'coal', name: 'DUNG QUAT 2' },
    { value: 'nuclear', name: 'HUONG TRA' },
];

const countriesInfo = [{
    country: 'May 1',
    hydro: 71.2,
    oil: 910.4,
    gas: 483.2,
    coal: 564.3,
    nuclear: 216.1,
}, {
    country: 'May 2',
    hydro: 72.5,
    oil: 223.6,
    gas: 36,
    coal: 956.9,
    nuclear: 11.3,
}, {
    country: 'May 3',
    hydro: 47.7,
    oil: 149.4,
    gas: 432.3,
    coal: 105,
    nuclear: 29.3,
}, {
    country: 'May 4',
    hydro: 17.9,
    oil: 283.6,
    gas: 61.8,
    coal: 120.8,
    nuclear: 52.8,
}, {
    country: 'May 5',
    hydro: 14.4,
    oil: 86.4,
    gas: 25.1,
    coal: 204.8,
    nuclear: 3.8,
}, {
    country: 'May 6',
    hydro: 6.6,
    oil: 101.7,
    gas: 92.7,
    coal: 85.7,
    nuclear: 30.8,
}];

function QtyAndTrendingChart() {
    const [type, setType] = useState(types[0]);

    const handleChange = useCallback((e: SelectBoxTypes.ValueChangedEvent) => {
        setType(e.value);
    }, []);

    return (
        <Chart palette="Violet" dataSource={countriesInfo}>
            <CommonSeriesSettings argumentField="country" type={type} />
            {energySources.map((item) => (
                <Series key={item.value} valueField={item.value} name={item.name} />
            ))}
            <Margin
                top={2}
                bottom={2}
                left={10}
                right={10}
            />
            <ArgumentAxis valueMarginsEnabled={false} discreteAxisDivisionMode="crossLabels">
                <Grid visible />
            </ArgumentAxis>
            <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
                itemTextPosition="bottom"
            />
            <Export enabled={false} />
            <Title text="Total Qty & Trending">
                <Subtitle text="" />
            </Title>
            <Tooltip enabled />
        </Chart>
    );
}

export default QtyAndTrendingChart;
