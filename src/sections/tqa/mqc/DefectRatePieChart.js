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

function DefectRatePieChart({ dataSource = [] }) {
    return (
        <PieChart id="pie"
            palette="Bright"
            dataSource={dataSource}
            resolveLabelOverlapping="shift"
        // title="Inspected Defect Rate"
        >

            <Legend
                visible
                orientation="horizontal"
                itemTextPosition="right"
                horizontalAlignment="center"
                verticalAlignment="bottom"
                columnCount={4} />

            <Export enabled={false} />

            <Series argumentField="defect_name" valueField="defect_value">
                <Label
                    visible
                    position="columns"
                    customizeText={customizeText}>
                    <Font size={10} />
                    <Connector visible width={0.5} />
                </Label>
            </Series>

            <Title text="Inspected Defect Rate" font={{ size: 20 }} />

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

export default DefectRatePieChart;
