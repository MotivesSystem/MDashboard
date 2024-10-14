import React from 'react';
import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Connector,
    Size,
    Margin,
    Title
} from 'devextreme-react/pie-chart';
// import { dataSource } from './data.ts';

function customizeText(arg: { valueText: string; percentText: string; }) {
    return `${arg.argumentText} (${arg.percentText})`;
}

function ChargebackPieChart({ dataSource = [] }) {
    return (
        <PieChart id="pie"
            palette="Bright"
            dataSource={dataSource}
        // title="Chargeback Defect Rate"
        >

            <Legend
                orientation="horizontal"
                itemTextPosition="right"
                horizontalAlignment="center"
                verticalAlignment="bottom"
                columnCount={4} />

            <Export enabled={false} />

            <Series argumentField="problemtype_name" valueField="number_chargeback">
                <Label
                    visible
                    position="columns"
                    customizeText={customizeText}>
                    <Font size={16} />
                    <Connector visible width={0.5} />
                </Label>
            </Series>

            <Title text="Chargeback Defect Rate" font={{ size: 20 }} />

            <Size height={350} />

            <Margin
                top={2}
                bottom={2}
                left={2}
                right={2}
            />

        </PieChart>
    );
}

export default ChargebackPieChart;
