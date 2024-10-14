import { Card, Grid } from "@mui/material";
import PieChart, { Connector, Export, Font, IPieChartOptions, Label, Legend, Margin, Series, Size, Tooltip, Title } from 'devextreme-react/pie-chart';

const dataSource = [
    {
        "ProblemType": "Defect Issue",
        "NumberChargeback": 31
    },
    {
        "ProblemType": "Length Issue",
        "NumberChargeback": 1
    },
    {
        "ProblemType": "Other Issue",
        "NumberChargeback": 1
    },
    {
        "ProblemType": "Shade Issue",
        "NumberChargeback": 49
    },
    {
        "ProblemType": "Width Issue",
        "NumberChargeback": 4
    }
]

function customizeText(arg: { valueText: string; percentText: string; }) {
    return `${arg.argumentText} (${arg.percentText})`;
}

function InspectedPieChart({ connectorVisible = true, radialOffset = 0, title = "", customLegendLabel = true, ...props }) {
    return (
        <Grid container>
            <Grid item sm={6}>adas</Grid>
            <Grid item sm={6}>

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

                    <Series argumentField="ProblemType" valueField="NumberChargeback">
                        <Label
                            visible
                            position="columns"
                            customizeText={customizeText}>
                            <Font size={16} />
                            <Connector visible width={0.5} />
                        </Label>
                    </Series>

                    <Title text="Chargeback Defect Rate" font={{ size: 20 }} />

                    <Size height={350} width={350} />

                    <Margin
                        top={2}
                        bottom={2}
                        left={2}
                        right={2}
                    />

                </PieChart>

            </Grid>
        </Grid>
    )
}

export default InspectedPieChart;