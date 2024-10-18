import { useEffect, useState } from "react";
import { Card, Grid, Typography, Stack, Box } from "@mui/material";
import PieChart, { Connector, Export, Font, IPieChartOptions, Label, Legend, Margin, Series, Size, Tooltip, Title } from 'devextreme-react/pie-chart';
import { fNumber } from "../../../utils/formatNumber";


function customizeText(arg: { valueText: string; percentText: string; }) {
    return `${arg.argumentText} (${arg.percentText})`;
}

function OverView({ dataSource = {} }) {

    return (
        <Grid container >
            <Grid item sm={12} textAlign={'center'} justifyContent={'space-between'} display={'flex'} >
                <Stack p={2}>
                    <Typography variant="h3" sx={{ color: "#2a8fe0" }}>{`${fNumber(dataSource.total_insp)}`}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 20, color: "gray" }}>{"Total Inspection".toUpperCase()}</Typography>
                </Stack>
                <Box justifyContent={'center'} display={'flex'}>
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
                {/* </Grid>
            <Grid item sm={6} textAlign={'center'} display={'flex'} justifyContent={'center'}> */}
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
                </Stack>

            </Grid>
        </Grid>
    )
}

export default OverView;