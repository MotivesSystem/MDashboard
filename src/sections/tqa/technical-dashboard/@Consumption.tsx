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


export default function Consumption({ startDate = "", endDate = "", }: { startDate: string, endDate: string }) {

    // Loading
    const [loadingDesignChart, setLoadingDesignChart] = useState(false);
    const [loadingTechPackChart, setLoadingTechPackChart] = useState(false);
    const [loadingParternChart, setLoadingParternChart] = useState(false);
    const [loadingConsumtionChart, setLoadingConsumtionChart] = useState(false);
    const [loadingTop5DesignBestWeek, setLoadingTop5DesignBestWeek] = useState(false);
    const [loadingTop5DesignBestYTD, setLoadingTop5DesignBestYTD] = useState(false);
    const [loadingTop5DesignWorstWeek, setLoadingTop5DesignWorstWeek] = useState(false);
    const [loadingTop5DesignWorstYTD, setLoadingTop5DesignWorstYTD] = useState(false);

    // data source
    const [dataDesign, setDataDesign] = useState([]);

    const [dataChartTechPack, setDataChartTechPack] = useState([]);

    const [dataChartPattern, setDataChartPattern] = useState([]);

    const [dataChartConsumtion, setDataChartConsumtion] = useState([]);

    const [dataTop5DesignBestWeek, setDataTop5DesignBestWeek] = useState([]);

    const [dataTop5DesignBestYTD, setDataTop5DesignBestYTD] = useState([]);

    const [dataTop5DesignWorstWeek, setDataTop5DesignWorstWeek] = useState([]);

    const [dataTop5DesignWorstYTD, setDataTop5DesignWorstYTD] = useState([]);



    const getDataChart = useCallback(async () => {
        try {
            setLoadingDesignChart(true);
            const postData = {
                "module": "DESIGN_PLANNING",
                // "start_date": startDate,
                "start_date": "2020/01/01",
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


    const getDataChartTechPack = useCallback(async () => {
        try {
            setLoadingTechPackChart(true)
            const postData = {
                "design_document": "TECH_PACK",
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-design-planning-chart-info`, postData)
            if (response && response.data.result === "success") {
                const items = response.data.reply.map((val, i) => {
                    return { value: val.value, label: val.name, color: setColorSeries(val.name) }
                });

                setDataChartTechPack(items);
            }
            setLoadingTechPackChart(false);
        }
        catch (error) {
            console.error(error);
            setLoadingTechPackChart(false);
        }
    }, [startDate, endDate,]);


    const getDataChartPattern = useCallback(async () => {
        try {
            setLoadingParternChart(true);
            const postData = {
                "design_document": "PATTERN",
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-design-planning-chart-info`, postData)
            if (response && response.data.result === "success") {
                const items = response.data.reply.map((val, i) => {
                    return { value: val.value, label: val.name, color: setColorSeries(val.name) }
                });
                setDataChartPattern(items);
            }
            setLoadingParternChart(false);
        }
        catch (error) {
            console.error(error);
            setLoadingParternChart(false);
        }
    }, [startDate, endDate,]);


    const getDataChartConsumtion = useCallback(async () => {
        try {
            setLoadingConsumtionChart(true);
            const postData = {
                "design_document": "CONSUMPTION",
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-design-planning-chart-info`, postData)
            if (response && response.data.result === "success") {
                const items = response.data.reply.map((val, i) => {
                    return { value: val.value, label: val.name, color: setColorSeries(val.name) }
                });
                setDataChartConsumtion(items);
            }
            setLoadingConsumtionChart(false);
        }
        catch (error) {
            console.error(error);
            setLoadingConsumtionChart(false);
        }
    }, []);

    const getDataTop5DesignBestWeek = useCallback(async () => {
        try {
            setLoadingTop5DesignBestWeek(true);
            const postData = {
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
                "top_number": 5,
                "employee_list_type": "BEST",
                "module": "DESIGN_PLANNING"
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
                "start_date": "2020/01/01",
                "end_date": endDate,
                "top_number": 5,
                "employee_list_type": "BEST",
                "module": "DESIGN_PLANNING"
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

    const getDataTop5DesignWorstWeek = useCallback(async () => {
        try {
            setLoadingTop5DesignWorstWeek(true);
            const postData = {
                // "start_date": startDate,
                "start_date": "2020/01/01",
                "end_date": endDate,
                "top_number": 5,
                "employee_list_type": "WORST",
                "module": "DESIGN_PLANNING"
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
                "module": "DESIGN_PLANNING"
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
        getDataChartTechPack();
        getDataChartPattern();
        getDataChartConsumtion();
        getDataTop5DesignBestWeek();
        getDataTop5DesignBestYTD();
        getDataTop5DesignWorstWeek();
        getDataTop5DesignWorstYTD();
    }, [startDate, endDate,]);


    // custom fuctions
    const customizeLabelTextCharDesign = (arg) => {
        // console.log(arg);
        return `${arg.argumentText} (${arg.valueText})`
    }

    console.log(dataChartTechPack);

    return (
        <Card
            sx={{ p: 1, pb: 3 }}
        >
            <Stack spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'} px={1}>
                    <Stack direction={'row'} justifyContent="center" spacing={2} alignContent={'center'}>
                        <Typography variant='h6'>Consumption</Typography>
                        {/* <LinearProgressWithLabel value={dataDesign?.percent} width={150}/> */}
                    </Stack>
                    <Stack direction={'row'} justifyContent="center" spacing={2} alignContent={'center'}>
                        {/* <Typography variant='h6'>Consumption</Typography> */}
                        <LinearProgressWithLabel value={dataDesign?.percent} width={150}/>
                    </Stack>
                </Stack>

                <Box width={'100%'} justifyContent="center">
                    <TechPieChart
                        dataSource={dataChartConsumtion}
                        loading={loadingConsumtionChart}
                        series={{
                            argumentField: 'label',
                            valueField: 'value',
                        }}
                        showLegend
                        // customizeLabelText={customizeLabelTextCharDesign}
                        height={300}
                        width={300}
                    />
                </Box>

                <Stack spacing={1} direction={'row'} justifyContent={"flex-end"}>
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
