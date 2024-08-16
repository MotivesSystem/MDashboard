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


export default function TechPack({ startDate = "", endDate = "", }: { startDate: string, endDate: string }) {

    // Loading
    const [loadingTechPackChart, setLoadingTechPackChart] = useState(false);
    const [loadingTop5DesignBestWeek, setLoadingTop5DesignBestWeek] = useState(false);
    const [loadingTop5DesignBestYTD, setLoadingTop5DesignBestYTD] = useState(false);
    const [loadingTop5DesignWorstWeek, setLoadingTop5DesignWorstWeek] = useState(false);
    const [loadingTop5DesignWorstYTD, setLoadingTop5DesignWorstYTD] = useState(false);

    // data source
    const [dataChartTechPack, setDataChartTechPack] = useState([]);

    const [dataTop5DesignBestWeek, setDataTop5DesignBestWeek] = useState([]);

    const [dataTop5DesignBestYTD, setDataTop5DesignBestYTD] = useState([]);

    const [dataTop5DesignWorstWeek, setDataTop5DesignWorstWeek] = useState([]);

    const [dataTop5DesignWorstYTD, setDataTop5DesignWorstYTD] = useState([]);

    const getDataChartTechPack = useCallback(async () => {
        try {
            setLoadingTechPackChart(true)
            const postData = {
                "design_document": "TECH_PACK",
                "start_date": startDate,
                // "start_date": "2020/01/01",
                "end_date": endDate,
            };

            const response = await axios.post(`${baseHosting}/api/dashboard/get-design-planning-chart-info`, postData)

            if (response && response.data.result === "success") {
                const items = response.data.reply.map((val, i) => {
                    return { value: val.value, label: val.name, color: setColorSeries(val.name) }
                });

                const values = items.map(i => i.value);
                const totalValue = values.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                }, 0);
                const assignedValue = items.find(i => i.label.toLowerCase() === "assigned")?.value
                const percentValue = totalValue !== 0 ? (assignedValue / totalValue) * 100 : 0

                const newTechPack = {
                    total: totalValue,
                    percent: percentValue,
                    data: items
                }

                setDataChartTechPack(newTechPack);
            }
            setLoadingTechPackChart(false);
        }
        catch (error) {
            console.error(error);
            setLoadingTechPackChart(false);
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
                "module": "DESIGN_PLANNING",
                "design_document": "TECH_PACK"
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
        getDataChartTechPack();
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
                    <Stack direction={'row'} justifyContent="center" spacing={2} alignContent={'center'} >
                        <Typography variant='h6'>Techpack</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="flex-end" spacing={2} alignContent={'center'} width={"100%"}>
                        <LinearProgressWithLabel value={dataChartTechPack?.percent} height={'100%'} width={"75%"} />
                    </Stack>

                </Stack>

                <Box width={'100%'} justifyContent="center" sx={{ marginTop: "45px !important" }}>
                    <TechPieChart
                        dataSource={dataChartTechPack?.data}
                        loading={loadingTechPackChart}
                        series={{
                            argumentField: 'label',
                            valueField: 'value',
                        }}
                        showLegend
                        height={220}
                        width={220}
                    />
                </Box>

                <Stack spacing={1} direction={'row'} justifyContent={'flex-end'}>
                    <Typography variant='h6'>Total Qty</Typography>
                    <Typography variant='h6'>{fNumber(dataChartTechPack?.total)}</Typography>
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
