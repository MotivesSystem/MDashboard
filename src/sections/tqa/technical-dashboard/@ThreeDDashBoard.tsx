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
                // "start_date": "2020/01/01",
                "end_date": endDate,
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-pie-chart-data`, postData)
            // console.log(response);
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




    const getDataTop5DesignBestWeek = useCallback(async () => {
        try {
            setLoadingTop5DesignBestWeek(true);
            const postData = {
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
                "top_number": 5,
                "employee_list_type": "BEST",
                "module": "PROCESS_3D",
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-top-employees-design-planning-3d-process-by-week`, postData);

            if (response && response.data.result === "success") {
                setDataTop5DesignBestWeek(response.data.reply || []);
            }
            setLoadingTop5DesignBestWeek(false);
        }
        catch (error) {
            console.error(error);
            setLoadingTop5DesignBestWeek(false);
        }
    }, [startDate, endDate,]);

    const getDataTop5DesignBestYTD = useCallback(async () => {
        try {
            setLoadingTop5DesignBestYTD(true);
            const postData = {
                // "start_date": startDate,
                "start_date": "2024/07/01",
                "end_date": endDate,
                "top_number": 100,
                "employee_list_type": "BEST",
                "module": "PROCESS_3D",
                "design_document": "EMPTY"
            };


            const response = await axios.post(`${baseHosting}/api/dashboard/get-top-employees-design-planning-3d-process-by-year`, postData);
            console.log(response)
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

    const getDataTop5DesignWorstWeek = useCallback(async () => {
        try {
            setLoadingTop5DesignWorstWeek(true);
            const postData = {
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
                "top_number": 5,
                "employee_list_type": "WORST",
                "module": "PROCESS_3D",
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-top-employees-design-planning-3d-process-by-week`, postData);

            if (response && response.data.result === "success") {
                setDataTop5DesignWorstWeek(response.data.reply || []);
            }
            setLoadingTop5DesignWorstWeek(false);

        }
        catch (error) {
            console.error(error);
            setLoadingTop5DesignWorstWeek(false);

        }
    }, [startDate, endDate,]);

    const getDataTop5DesignWorstYTD = useCallback(async () => {
        try {
            setLoadingTop5DesignWorstYTD(true);
            const postData = {
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
                "top_number": 5,
                "employee_list_type": "WORST",
                "module": "PROCESS_3D",
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-top-employees-design-planning-3d-process-by-year`, postData);
            if (response && response.data.result === "success") {
                setDataTop5DesignWorstYTD(response.data.reply || []);
            }
            setLoadingTop5DesignWorstYTD(false);
        }
        catch (error) {
            console.error(error);
            setLoadingTop5DesignWorstYTD(false);
        }
    }, [startDate, endDate,]);

    useEffect(() => {
        getDataChart();
        // getDataTop5DesignBestWeek();
        getDataTop5DesignBestYTD();
        // getDataTop5DesignWorstWeek();
        // getDataTop5DesignWorstYTD();
    }, [startDate, endDate,]);


    // custom fuctions
    const customizeLabelTextCharDesign = (arg) => {
        // console.log(arg);
        return `${arg.argumentText} (${arg.valueText})`
    }

    // console.log(dataDesign, dataTop5DesignBestWeek, dataTop5DesignBestYTD, dataTop5DesignWorstWeek, dataTop5DesignWorstYTD);


    return (
        <Card
            sx={{ p: 1, pb: 3 }}
        >
            <Stack spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'} px={1}>
                    <Stack direction={'row'} justifyContent="center" spacing={3} alignContent={'center'}>
                        <Typography variant='h6'>3D</Typography>
                        {/* <LinearProgressWithLabel value={dataDesign?.percent} /> */}
                    </Stack>
                    <Stack direction={'row'} justifyContent="center" spacing={3} alignContent={'center'}>
                        {/* <Typography variant='h6'>3D</Typography> */}
                        <LinearProgressWithLabel value={dataDesign?.percent} width={150} />
                    </Stack>
                </Stack>

                <Box width={'100%'} justifyContent="center">
                    <TechPieChart
                        dataSource={dataDesign?.data}
                        loading={loadingDesignChart}
                        series={{
                            argumentField: 'label',
                            valueField: 'value',
                        }}
                        showLegend
                        customLegendLabel={false}
                        // customizeLabelText={customizeLabelTextCharDesign}
                        height={300}
                        width={300}
                    />
                </Box>

                <Stack spacing={1} direction={'row'} justifyContent={'flex-end'}>
                    <Typography variant='h6'>Total Qty</Typography>
                    <Typography variant='h6'>{fNumber(dataDesign?.total)}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <TopBestEmployees
                        // loadingWeekly={loadingTop5DesignBestWeek}
                        loadingYearly={loadingTop5DesignBestYTD}
                        // dataWeekly={dataTop5DesignBestWeek}
                        dataYearly={dataTop5DesignBestYTD}
                        endDate={endDate}
                        title="Employee List"
                    />
                </Stack>

            </Stack>
        </Card>
    )
}
