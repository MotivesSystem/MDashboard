import { Box, Card, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
// components
import { setColorSeries } from './index.tsx';
import LinearProgressWithLabel from './ProgressBarWithLabel.tsx';
import TechPieChart from './TechPieChart.tsx';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utli
import { fNumber } from '../../../utils/formatNumber';
import TopBestEmployees from './TopBestEmployees.tsx';
// ----------------------------------------------------------------
const baseHosting = "https://test-dashboard-api.motivesfareast.com";


export default function SampleProductionDashBoard({ startDate = "", endDate = "", }: { startDate: string, endDate: string }) {

    // Loading
    const [loadingDesignChart, setLoadingDesignChart] = useState(false);
    const [loadingTop5DesignBestWeek, setLoadingTop5DesignBestWeek] = useState(false);
    const [loadingTop5DesignBestYTD, setLoadingTop5DesignBestYTD] = useState(false);
    const [loadingTop5DesignWorstWeek, setLoadingTop5DesignWorstWeek] = useState(false);
    const [loadingTop5DesignWorstYTD, setLoadingTop5DesignWorstYTD] = useState(false);
    const mdUp = useResponsive('up', 'md');
    const smUp = useResponsive('up', 'sm');
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
                "module": "SAMPLE_PRODUCT_PLANNING",
                "start_date": startDate,
                "end_date": endDate,
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-pie-chart-data`, postData)
            if (response && response.data.result === "success") {
                const newData = response.data.reply.items.map((val, i) => {
                    return { value: val.value, label: val.name, color: setColorSeries(val.name), percent: Math.round(val.value / response.data.reply.total_sum) * 100 }
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
                "is_show_year_value": 1,
                "page_number": 1
            }
            const response = await axios.post(`${baseHosting}/api/dashboard/get-top-best-worst-sample-production-performance-by-week`, postData);

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
        // console.log(arg);
        return `${arg.argumentText} (${arg.valueText}%)`
    }

    return (
        <Card
            sx={{ p: 1, pb: 3 }}
        >
            <Stack spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'} px={1}>
                    <Stack direction={'row'} justifyContent="center" spacing={3} alignContent={'center'}>
                        <Typography variant='h6'>Sample Production</Typography>
                    </Stack>

                    <Stack direction={'row'} justifyContent="flex-end" spacing={2} alignContent={'center'} width={"100%"}>
                        <LinearProgressWithLabel value={dataDesign?.percent} height={'100%'} width={"75%"} />
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
                        height={220}
                        width={mdUp ? 240 : 200}
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
