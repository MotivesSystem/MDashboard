import { Card, Grid, Typography, Stack } from "@mui/material";
import PieChart, { Connector, Export, Font, IPieChartOptions, Label, Legend, Margin, Series, Size, Tooltip, Title } from 'devextreme-react/pie-chart';
import { useEffect, useState } from "react";
import { fNumber } from "../../../utils/formatNumber";

function customizeText(arg: { valueText: string; percentText: string; }) {
    return `${arg.argumentText} (${arg.percentText})`;
}

function OverviewPieChart({ dataSource = [] }) {
    const [inspQuantity, setInspQuantity] = useState({
        totalInsp: 0,
        inspectedQuantity: 0
    })

    useEffect(() => {
        setInspQuantity({
            totalInsp: dataSource.reduce((total, insp) => total + insp.total_insp, 0),
            inspectedQuantity: dataSource.reduce((total, insp) => total + insp.inspected_qty, 0),
        });
    }, [dataSource])

    return (
        <Grid container>
            <Grid item sm={6} textAlign={'center'} alignSelf={"center"}>
                <Stack p={5}>
                    <Typography variant="h2" sx={{ color: "#2a8fe0" }}>{fNumber(inspQuantity.totalInsp)}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 30, color: "gray" }}>{"Total Inspection".toUpperCase()}</Typography>
                </Stack>
                <Stack p={5}>
                    <Typography variant="h2" sx={{ color: "#2a8fe0" }}>{fNumber(inspQuantity.inspectedQuantity)}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 30, color: "gray" }}>{"Inspected Quantity".toUpperCase()}</Typography>
                </Stack>
            </Grid>
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

                    <Series argumentField="inspection_name" valueField="inspected_percent">
                        <Label
                            visible
                            position="columns"
                            customizeText={customizeText}>
                            <Font size={16} />
                            <Connector visible width={0.5} />
                        </Label>
                    </Series>

                    {/* <Title text="Chargeback Defect Rate" font={{ size: 20 }} /> */}

                    <Size height={350} />

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

export default OverviewPieChart;