import {
    Chart,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin,
    Series,
    Title,
    Tooltip,
    ValueAxis
} from 'devextreme-react/chart';

function customizeTooltip(arg: { seriesName: string; valueText: string; }) {
    return {
        text: `${arg.seriesName}: ${arg.valueText}`,
    };
}

function AuditorInspBarChart({ dataSource = [] }) {
    return (
        <Chart
            id="chart"
            // title="Inspection Auditor"
            dataSource={dataSource}
            palette={["#10e401", "#a0fe9a"]}
        >
            <CommonSeriesSettings argumentField="auditor_name" type="stackedbar" />
            <Series
                valueField="total_insp_finished"
                name="Total Inspection Finished"
            />
            <Series
                valueField="total_insp"
                name="Total Inspection"
            />
            <ValueAxis position="right">
                <Title text="Inspections" />
            </ValueAxis>
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

export default AuditorInspBarChart;
