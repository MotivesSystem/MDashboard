import { Avatar, Box, Card, Stack, Typography, useTheme, Button, Pagination, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ceil } from 'lodash';
// components
import Iconify from "../../../components/Iconify";
import LinearProgressWithLabel from "./LinearProgressWithLabel.tsx";
import SkeletonSampleStatistics from './SkeletonSampleStatistics.tsx';
import { HOST_API_DASHBOARD } from '../../../config'

const topNumber = 12
// ----------------------------------------------------------------
export default function BestEmployees({ startDate = "", endDate = "", setIsRefresh = () => { } }) {
    // hooks
    const theme = useTheme();

    // component states
    const [loadingBestEmployeeData, setLoadingBestEmployeeData] = useState(false);
    const [loadingWorstData, setLoadingWorstData] = useState(false);
    const [firstHalfBestEmployeeWeekly, setFirstHalfBestEmployeeWeekly] = useState<any>([]);
    const [sencondHalfBestEmployeeWeekly, setSencondHalfBestEmployeeWeekly] = useState<any>([]);
    const [curPageNumber, setCurPageNumber] = useState(1);
    const [totalItem, setTotalItem] = useState(0);

    const getbestEmployeeWeekly = async () => {
        try {
            setLoadingBestEmployeeData(true)
            const postData = {
                "start_date": startDate,
                "end_date": endDate,
                "top_number": topNumber,
                "employee_list_type": "BEST",
                "is_show_year_value": 1,
                "page_number": curPageNumber
            }

            const result = await axios.post(`${HOST_API_DASHBOARD}/api/dashboard/get-top-best-worst-sample-production-performance-by-week`, postData);

            if (result.data.reply.length > 0) {
                // const firstHalf = result.data.reply.slice(0, topNumber / 2);
                // const secondHalf = result.data.reply.slice(topNumber / 2);
                setTotalItem(result.data.reply[0]?.table_rows)
                setFirstHalfBestEmployeeWeekly(result.data.reply);
                // setSencondHalfBestEmployeeWeekly(secondHalf);
            }
            else {
                setTotalItem(0)
                setFirstHalfBestEmployeeWeekly([]);
            }
            setLoadingBestEmployeeData(false)
        } catch (error) {
            console.error(error);
            setLoadingBestEmployeeData(false)
        }
    };

    const handleChangePage = (e, value) => {
        setCurPageNumber(value)
    }

    useEffect(() => {
        getbestEmployeeWeekly();
        // getWorstEmployeeWeekly();
    }, [startDate, endDate, curPageNumber])


    return (
        <Card
            sx={{
                p: 1,
                pb: 1,
            }}
        >
            <Stack spacing={1}>
                <Stack direction='row'>
                    <Stack justifyContent="flex-start" p={1} direction='row' spacing={1} width={'100%'}>
                        <Iconify icon="solar:medal-ribbons-star-linear" sx={{ fontSize: 25, color: theme.palette.warning.main }} />
                        <Typography variant='h5' fontWeight={'bold'}>{`Năng Suất Nhân Viên`}</Typography>
                    </Stack>
                    <Stack justifyContent="flex-end" alignItems={"center"} p={1} direction='row' spacing={1}>
                        <TimerButton changePageNumber={() => {
                            if (curPageNumber >= ceil(totalItem / topNumber)) {
                                setCurPageNumber(1)
                                setIsRefresh(true);
                            }
                            else {
                                setCurPageNumber(curPageNumber + 1)
                                setIsRefresh(true);
                            }
                        }} />
                    </Stack>
                </Stack>

                {
                    !loadingBestEmployeeData ?
                        <Stack columnGap={2} rowGap={3} justifyContent='center' alignItems='center' py={1} bgcolor="#E6F3FE" borderRadius={1} minHeight={"33vh"}>
                            <Grid container spacing={2}>
                                {firstHalfBestEmployeeWeekly.length > 0 &&
                                    firstHalfBestEmployeeWeekly.map((item, index) => (
                                        <Grid item md={3} sm={6} key={index}>
                                            <Stack display={'flex'} direction={'row'} justifyContent='center' alignContent='center' spacing={1} key={item?.employee_id} height={'100%'} position={'relative'}>
                                                <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'30%'} spacing={1} >
                                                    <Avatar src={item?.avatar_url} sizes='lg' sx={{ width: 50, height: 50 }} />
                                                    <Typography variant='body2' textAlign='center' fontWeight='bold' maxWidth={75} sx={{ fontSize: 12, color: theme => theme.palette.success.dark }}>{item?.nick_name}</Typography>
                                                </Stack>

                                                <Stack spacing={1} height={'100%'} width={'45%'} justifyContent='center'>
                                                    <Iconify icon={Number(item?.performance_avg) >= Number(item?.year_performance_avg) ? "fluent:arrow-trending-lines-20-filled" : "flowbite:chart-line-down-outline"} sx={{ fontSize: 35, color: theme => theme.palette[Number(item?.performance_avg) >= Number(item?.year_performance_avg) ? 'success' : 'error'].main }} />
                                                    <LinearProgressWithLabel value={item?.year_performance_avg} name="Năm" />
                                                    <LinearProgressWithLabel value={item?.performance_avg} name="Tuần" />
                                                </Stack>

                                            </Stack>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Stack>
                        :
                        <SkeletonSampleStatistics />
                }

                <Stack direction='row'>
                    {/* <Stack justifyContent={'flex-start'} direction='row' alignItems={"center"} width={'100%'}>
                        <Button variant={"contained"}>All</Button>
                        <Button>Sewing</Button>
                        <Button>Cutting</Button>
                        <Button>Ironing</Button>
                    </Stack> */}
                    <Stack justifyContent={'flex-end'} direction='row' alignItems={"center"} width={'100%'}>
                        <Pagination
                            count={ceil(totalItem / topNumber) || 0}
                            shape="rounded"
                            onChange={handleChangePage}
                            page={curPageNumber}
                        />
                    </Stack>
                </Stack>

            </Stack>
        </Card>
    )
}

// ----------------------------------------------------------------



// // ----------------------------------------------------------------
const TimerButton = ({ changePageNumber = () => { } }) => {
    const [seconds, setSeconds] = useState(180); // Start with 180 seconds (3 minutes)
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (seconds === 0) {
            setSeconds(180);
            changePageNumber();
        }
        if (seconds > 0 && !paused) {
            const interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
    }, [seconds, paused]);

    const handlePauseTimer = () => {
        setPaused(prevPaused => !prevPaused)
    }

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    return (
        <Button
            variant={paused ? "contained" : "outlined"}
            color={'success'}
            onClick={handlePauseTimer}>
            {`${formatTime(seconds)}`}
        </Button>
    )
}

