import { useEffect, useState } from "react";
import { Card, Grid, Typography, Stack, Box, useTheme } from "@mui/material";
import PieChart, { Connector, Export, Font, IPieChartOptions, Label, Legend, Margin, Series, Size, Tooltip, Title } from 'devextreme-react/pie-chart';
import GaugeChart from "./GaugeChart";
import { fNumber } from "../../../utils/formatNumber";


function customizeText(arg: { valueText: string; percentText: string; }) {
    return `${arg.argumentText} (${arg.percentText})`;
}

function OverView({ dataSource = {} }) {
    const theme = useTheme();
    return (
        <Grid container >
            <Grid item sm={12} textAlign={'center'} justifyContent={'space-evenly'} display={'flex'} >
                <Stack p={2}>
                    <Typography variant="h4" sx={{ color: "#2a8fe0" }}>{`${fNumber(17)}`}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 15, color: "gray" }}>{"Factory".toUpperCase()}</Typography>
                </Stack>
                <Box sx={{ borderRight: "1px solid gray", height: "80%", alignSelf: "center" }} />
                <Stack p={2}>
                    <Typography variant="h4" sx={{ color: "#2a8fe0" }}>{`${fNumber(658150)}`}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 15, color: "gray" }}>{"Total Qty".toUpperCase()}</Typography>
                </Stack>
                <Box sx={{ borderRight: "1px solid gray", height: "80%", alignSelf: "center" }} />
                <Stack p={2}>
                    <Typography variant="h4" sx={{ color: "#2a8fe0" }}>{`${fNumber(9860)} - 25%`}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 15, color: "gray" }}>{"Sample".toUpperCase()}</Typography>
                </Stack>
                <Box sx={{ borderRight: "1px solid gray", height: "80%", alignSelf: "center" }} />
                <Stack p={2}>
                    <Typography variant="h4" sx={{ color: "#2a8fe0" }}>{`${fNumber(1984)}`}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 15, color: "gray" }}>{"Defects".toUpperCase()}</Typography>
                </Stack>
                <Box sx={{ borderRight: "1px solid gray", height: "80%", alignSelf: "center" }} />
                <Stack p={2}>
                    <Typography variant="h4" sx={{ color: "#2a8fe0" }}>{`${fNumber(80)} - 8.12%`}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 15, color: "gray" }}>{"Critical Defects".toUpperCase()}</Typography>
                </Stack>
                <Box sx={{ borderRight: "1px solid gray", height: "80%", alignSelf: "center" }} />
                <Stack p={2}>
                    <Box>
                        <GaugeChart
                            chartColors={[
                                theme.palette.info.main
                            ]}
                            chartData={[
                                // Number(((summaryPO.totalMakingPO / (summaryPO.totalPlannedPO + 0.0000001)) * 100).toFixed(1)),
                                80
                            ]}
                        />
                        <Typography variant="subtitle1" sx={{ fontSize: 15, color: "gray",mt: -7 }}>{"Quality Score".toUpperCase()}</Typography>
                    </Box>
                </Stack>
                {/* <Box justifyContent={'center'} display={'flex'}>
                    <Stack p={2} >
                        <Typography variant="h5" sx={{ color: "#2a8fe0" }}>{`${fNumber(dataSource.insp_new)}`}</Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{"New Inline Inspection".toUpperCase()}</Typography>
                        <Box display={'flex'} justifyContent={'center'} gap={1}>
                            <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{`Last Month:`}</Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: 15, color: "red", fontWeight: 'bold' }}>
                                {` ${fNumber(dataSource.insp_new_growth_percent)}%`}
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ borderRight: "1px solid gray", height: "80%", alignSelf: "center" }} />
                    <Stack p={2}>
                        <Typography variant="h5" sx={{ color: "#2a8fe0" }}>{`${fNumber(dataSource.insp_complete)}`}</Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{"Completed Inline Inspection".toUpperCase()}</Typography>
                        <Box display={'flex'} justifyContent={'center'} gap={1}>
                            <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{`Last Month:`}</Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: 15, color: "red", fontWeight: 'bold' }}>
                                {` ${fNumber(dataSource.insp_complete_growth_percent)}%`}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Box sx={{ borderRight: "1px solid gray", height: "100%", alignSelf: "center" }} />
                <Stack p={2}>
                    <Typography variant="h3" sx={{ color: "#2a8fe0" }}>{`${fNumber(dataSource.inspected_qty)}`}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 20, color: "gray" }}>{"Inspected Inline Quantity".toUpperCase()}</Typography>
                </Stack>

                <Stack p={2}>
                    <Typography variant="h5" sx={{ color: "black" }}>New Defects</Typography>
                    <Typography variant="h5" sx={{ color: "#00AB55" }}>{`${fNumber(dataSource.defect_growth_percent)}%`}</Typography>
                    <Box display={'flex'} gap={1}>
                        <Stack>
                            <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{"Current Month"}</Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{`${fNumber(dataSource.previous_defect_qty)}`}</Typography>
                        </Stack>
                        <Box sx={{ borderRight: "1px solid gray", height: "80%", alignSelf: "center" }} />
                        <Stack>
                            <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{`Last Month`}</Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: 12, color: "gray" }}>{`${fNumber(dataSource.current_defect_qty)}`}</Typography>
                        </Stack>
                    </Box>
                </Stack> */}

            </Grid>
        </Grid>
    )
}

export default OverView;