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
    const defectListName = arg?.point?.data?.defect_area_name;
    let customText = `${arg.argumentText} (${arg.percentText}) \n`;
    defectListName.map((defect) => {
        customText = `${customText} + ${defect}\n`;
        return defect;
    })
    return customText;
}

function DefectEachDept({ dataSource = [] }) {
    return (
        <PieChart id="pie"
            palette="Bright"
            dataSource={dataSource}
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

            <Series argumentField="defect_category_name" valueField="total_qty">
                <Label
                    visible
                    position="columns"
                    customizeText={customizeText}>
                    <Font size={10} />
                    <Connector visible width={0.5} />
                </Label>
            </Series>

            <Title text="Defect Of Each Department" font={{ size: 20 }} />

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

export default DefectEachDept;
