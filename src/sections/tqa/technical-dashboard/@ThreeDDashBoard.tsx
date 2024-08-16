import { Box, Card, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
// components
import { setColorSeries } from './index.tsx';
import LinearProgressWithLabel from './ProgressBarWithLabel.tsx';
import TechPieChart from './TechPieChart.tsx';
// utli
import { fNumber } from '../../../utils/formatNumber';
import TopBestEmployees from './TopBestEmployees.tsx';
// ----------------------------------------------------------------
const baseHosting = "https://test-dashboard-api.motivesfareast.com";


export default function ThreeDDashBoard({ startDate = "", endDate = "", }: { startDate: string, endDate: string }) {

    // Loading
    const [loadingDesignChart, setLoadingDesignChart] = useState(false);
    const [loadingTop5DesignBestWeek, setLoadingTop5DesignBestWeek] = useState(false);
    const [loadingTop5DesignBestYTD, setLoadingTop5DesignBestYTD] = useState(false);
    const [loadingTop5DesignWorstWeek, setLoadingTop5DesignWorstWeek] = useState(false);
    const [loadingTop5DesignWorstYTD, setLoadingTop5DesignWorstYTD] = useState(false);

    // data source
    const [dataDesign, setDataDesign] = useState([]);


    const [dataTop5DesignBestWeek, setDataTop5DesignBestWeek] = useState([]);

    const [dataTop5DesignBestYTD, setDataTop5DesignBestYTD] = useState([]);

    const [dataTop5DesignWorstWeek, setDataTop5DesignWorstWeek] = useState([]);

    const [dataTop5DesignWorstYTD, setDataTop5DesignWorstYTD] = useState([]);



    const getDataChart = useCallback(async () => {
        try {
            setLoadingDesignChart(true);
            const postData = {
                "module": "PROCESS_3D",
                "start_date": startDate,
                "end_date": endDate,
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-pie-chart-data`, postData)
            if (response && response.data.result === "success") {
                const newData = response.data.reply.items.map((val, i) => {
                    return { value: val.value, label: val.name, color: setColorSeries(val.name) }
                });

                const newDataDesign = {
                    total: response.data.reply.total_sum,
                    percent: response.data.reply.percentage,
                    data: newData
                }
                setDataDesign(newDataDesign);
            }
            setLoadingDesignChart(false);
        }
        catch (error) {
            console.error(error);
            setLoadingDesignChart(false);
        }
    }, [startDate, endDate,]);

    const getDataTop5DesignBestYTD = useCallback(async () => {
        try {
            setLoadingTop5DesignBestYTD(true);
            const postData = {
                "start_date": startDate,
                "end_date": endDate,
                "top_number": 100,
                "employee_list_type": "BEST",
                "module": "PROCESS_3D",
                "design_document": "EMPTY"
            };
            const response = await axios.post(`${baseHosting}/api/dashboard/get-top-employees-design-planning-3d-process-by-year`, postData);
            if (response && response.data.result === "success") {
                setDataTop5DesignBestYTD(response.data.reply || []);
            }
            setLoadingTop5DesignBestYTD(false);
        }
        catch (error) {
            console.error(error);
            setLoadingTop5DesignBestYTD(false);

        }
    }, [startDate, endDate,]);

    useEffect(() => {
        getDataChart();
        getDataTop5DesignBestYTD();
    }, [startDate, endDate,]);

    // custom fuctions
    const customizeLabelTextCharDesign = (arg) => {
        return `${arg.argumentText} (${arg.valueText})`
    }

    return (
        <Card
            sx={{ p: 1, pb: 3 }}
        >
            <Stack spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'} px={1}>
                    <Stack direction={'row'} justifyContent="center" spacing={3} alignContent={'center'}>
                        <Typography variant='h6'>3D</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="flex-end" spacing={2} alignContent={'center'} width={"100%"}>
                        <LinearProgressWithLabel value={dataDesign?.percent} height={'100%'} width={"75%"} />
                    </Stack>
                </Stack>

                <Box width={'100%'} justifyContent="center" sx={{ marginTop: "45px !important" }}>
                    <TechPieChart
                        dataSource={dataDesign?.data}
                        loading={loadingDesignChart}
                        series={{
                            argumentField: 'label',
                            valueField: 'value',
                        }}
                        showLegend
                        customLegendLabel={false}
                        height={220}
                        width={220}
                    />
                </Box>

                <Stack spacing={1} direction={'row'} justifyContent={'flex-end'}>
                    <Typography variant='h6'>Total Qty</Typography>
                    <Typography variant='h6'>{fNumber(dataDesign?.total)}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <TopBestEmployees
                        loadingYearly={loadingTop5DesignBestYTD}
                        dataYearly={dataTop5DesignBestYTD}
                        endDate={endDate}
                        title="Employee List"
                    />
                </Stack>

            </Stack>
        </Card>
    )
}
