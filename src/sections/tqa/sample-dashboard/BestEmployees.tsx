import { Avatar, Box, Card, Stack, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
// components
import Iconify from "../../../components/Iconify";
import LinearProgressWithLabel from "./LinearProgressWithLabel.tsx";
import SkeletonSampleStatistics from './SkeletonSampleStatistics.tsx';


// ----------------------------------------------------------------
export default function BestEmployees({ startDate = "", endDate = "" }) {
    // hooks
    const theme = useTheme();

    // component states
    const [loadingBestEmployeeData, setLoadingBestEmployeeData] = useState(false);
    const [loadingWorstData, setLoadingWorstData] = useState(false);
    const [bestEmployeeWeekly, setBestEmployeeWeekly] = useState<any>([]);
    const [worstEmployeeWeekly, setWorstEmployeeWeekly] = useState<any>([]);


    const getbestEmployeeWeekly = async () => {
        try {
            const topNumber = 24
            setLoadingBestEmployeeData(true)
            const postData = {
                // "start_date": startDate,
                "start_date": '2024/01/01',
                "end_date": endDate,
                "top_number": topNumber,
                "employee_list_type": "BEST",
                "is_show_year_value": 1,
            }

            const result = await axios.post(`https://test-dashboard-api.motivesfareast.com/api/dashboard/get-top-best-worst-sample-production-performance-by-week`, postData);

            console.log(result.data);

            if (result.data.reply.length > 0) {
                const firstHalf = result.data.reply.slice(0, topNumber / 2);
                const secondHalf = result.data.reply.slice(topNumber / 2);
                setBestEmployeeWeekly(firstHalf);
                setWorstEmployeeWeekly(secondHalf);
            }
            setLoadingBestEmployeeData(false)
        } catch (error) {
            console.error(error);
            setLoadingBestEmployeeData(false)
        }
    };

    const getWorstEmployeeWeekly = async () => {
        try {
            setLoadingWorstData(true);
            const postData = {
                // "start_date": startDate,
                "start_date": '2024/01/01',
                "end_date": endDate,
                "top_number": 12,
                "employee_list_type": "WORST",
                "is_show_year_value": 1,
            }

            const result = await axios.post(`https://test-dashboard-api.motivesfareast.com/api/dashboard/get-top-best-worst-sample-production-performance-by-week`, postData);

            console.log(result.data);

            if (result.data.reply.length > 0) {
                setWorstEmployeeWeekly(result.data.reply);
            }
            setLoadingWorstData(false);
        } catch (error) {
            console.error(error);
            setLoadingWorstData(false);
        }
    };


    useEffect(() => {
        getbestEmployeeWeekly();
        // getWorstEmployeeWeekly();
    }, [startDate, endDate])


    return (
        <Card
            sx={{
                p: 1,
                pb: 3
            }}
        >
            <Stack spacing={2}>

                <Stack justifyContent="flex-start" alignItems={"center"} p={1} direction='row' spacing={1}>
                    <Iconify icon="solar:medal-ribbons-star-linear" sx={{ fontSize: 25, color: theme.palette.warning.main }} />
                    <Typography variant='h5' fontWeight={'bold'}>{`Năng Suất Nhân Viên`}</Typography>
                </Stack>

                {
                    !loadingBestEmployeeData ?
                        <Stack display={'grid'} gridTemplateColumns={'1fr 1fr 1fr 1fr'} columnGap={2} rowGap={3} justifyContent='center' alignItems='center' py={1} bgcolor="#E6F3FE" borderRadius={1}>
                            {bestEmployeeWeekly.length > 0 &&
                                bestEmployeeWeekly.map((item, index) => (
                                    <Stack display={'flex'} direction={'row'} justifyContent='center' alignContent='center' spacing={1} key={item?.employee_id} height={'100%'} position={'relative'}>
                                        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'30%'} spacing={1} >
                                            <Avatar src={item?.avatar_url} sizes='lg' sx={{ width: 50, height: 50 }} />
                                            <Typography variant='body2' textAlign='center' fontWeight='bold' maxWidth={75} sx={{ fontSize: 12, color: theme => theme.palette.success.dark }}>{item?.nick_name}</Typography>
                                        </Stack>

                                        <Stack spacing={1} height={'100%'} width={'45%'} justifyContent='center'>
                                            <LinearProgressWithLabel value={item?.year_performance_avg} name="Năm" />
                                            <LinearProgressWithLabel value={item?.performance_avg} name="Tuần" />
                                        </Stack>

                                        <Box height={'100%'} width={'25%'} display={'flex'} justifyContent='center' alignItems={'center'}>
                                            <Iconify icon={Number(item?.performance_avg) >= Number(item?.year_performance_avg) ? "fluent:arrow-trending-lines-20-filled" : "flowbite:chart-line-down-outline"} sx={{ fontSize: 40, color: theme => theme.palette[Number(item?.performance_avg) >= Number(item?.year_performance_avg) ? 'success' : 'error'].main }} />
                                        </Box>
                                    </Stack>
                                ))
                            }
                        </Stack>
                        :
                        <SkeletonSampleStatistics />
                }

                {
                    !loadingWorstData ?
                        <Stack display={'grid'} gridTemplateColumns={'1fr 1fr 1fr 1fr'} columnGap={2} rowGap={3} justifyContent='center' alignItems='center' py={1} bgcolor="#fbf2f6" borderRadius={1}>
                            {worstEmployeeWeekly.length > 0 &&
                                worstEmployeeWeekly.map((item, index) => (
                                    <Stack display={'flex'} direction={'row'} justifyContent='center' alignContent='center' spacing={1} key={item?.employee_id} height={'100%'} position={'relative'}>
                                        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'30%'} spacing={1} >
                                            <Avatar src={item?.avatar_url} sizes='lg' sx={{ width: 50, height: 50 }} />
                                            <Typography variant='body2' textAlign='center' fontWeight='bold' maxWidth={80} sx={{ fontSize: 12, color: theme => theme.palette.success.dark }}>{item?.nick_name}</Typography>
                                        </Stack>

                                        <Stack spacing={1} height={'100%'} width={'45%'} justifyContent='center'>
                                            <LinearProgressWithLabel value={item?.year_performance_avg} name="Năm" />
                                            <LinearProgressWithLabel value={item?.performance_avg} name="Tuần" />
                                        </Stack>

                                        <Box height={'100%'} width={'25%'} display={'flex'} justifyContent='center' alignItems={'center'}>
                                            <Iconify icon={Number(item?.performance_avg) >= Number(item?.year_performance_avg) ? "fluent:arrow-trending-lines-20-filled" : "flowbite:chart-line-down-outline"} sx={{ fontSize: 40, color: theme => theme.palette[Number(item?.performance_avg) >= Number(item?.year_performance_avg) ? 'success' : 'error'].main }} />
                                        </Box>
                                    </Stack>
                                ))
                            }
                        </Stack>
                        :
                        <SkeletonSampleStatistics />
                }
            </Stack>
        </Card>
    )
}

// ----------------------------------------------------------------



// // ----------------------------------------------------------------
// const SkeletonSampleStatistics = () => {
//     return (
//         <Stack display={'grid'} gridTemplateColumns={'1fr 1fr 1fr 1fr'} columnGap={2} rowGap={2} justifyContent='center' alignItems='center'>
//             {
//                 [...new Array(10)].map((_, index) => {
//                     return (
//                         <Stack key={index} display={'flex'} direction={'row'} justifyContent='center' alignContent='center' spacing={1}>
//                             <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
//                                 <Skeleton variant='rounded' width={50} height={50} />
//                             </Box>

//                             <Stack spacing={1} height={'100%'}>
//                                 <Skeleton variant='rectangular' height={10} width={60} sx={{ borderRadius: 1 }} />
//                                 <Skeleton variant='rectangular' height={10} width={60} sx={{ borderRadius: 1 }} />
//                             </Stack>
//                             <Box height={'100%'}>
//                                 <Skeleton variant='rectangular' height={50} width={50} />
//                             </Box>
//                         </Stack>
//                     );
//                 }
//                 )
//             }
//         </Stack>
//     )
// }


