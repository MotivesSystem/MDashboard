import { useEffect, useState } from "react";
import { Card, Grid, Typography, Stack, Box } from "@mui/material";
import PieChart, { Connector, Export, Font, IPieChartOptions, Label, Legend, Margin, Series, Size, Tooltip, Title } from 'devextreme-react/pie-chart';


function customizeText(arg: { valueText: string; percentText: string; }) {
    return `${arg.argumentText} (${arg.percentText})`;
}

function DefectiveRate({ dataSource = {} }) {

    return (
        <Stack height={350} textAlign={'center'}>
            <Stack p={2}>
                <Typography variant="h3" sx={{ color: "#2a8fe0" }}>{`${(dataSource.pick_sample_qty / 1000).toFixed(1)}K`}</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: 20, color: "gray" }}>{"Samples".toUpperCase()}</Typography>
                <Typography variant="h3" sx={{ color: "#2a8fe0" }}>{`${(dataSource.pick_sample_percent * 100).toFixed(1)}%`}</Typography>
            </Stack>
            <Stack p={2}>
                <Typography variant="subtitle1" sx={{ fontSize: 20, color: "gray" }}>{"defective rate".toUpperCase()}</Typography>
                <Typography variant="h3" sx={{ color: "red" }}>{`${(dataSource.defect_rate * 100).toFixed(1)}%`}</Typography>
            </Stack>
        </Stack>
    )
}

export default DefectiveRate;