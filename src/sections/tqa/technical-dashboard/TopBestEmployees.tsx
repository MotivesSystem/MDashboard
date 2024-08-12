import { Avatar, Stack, Typography, useTheme, Box } from '@mui/material';
import moment from 'moment';
// components
import SkeletonSampleStatistics from "../sample-dashboard/SkeletonSampleStatistics.tsx";
import LinearProgressWithLabel from './ProgressBarWithLabel.tsx';
import { DASHBOARD_COLORS } from './index.tsx';

// ----------------------------------------------------------------
export default function TopBestEmployees({
    loadingWeekly = false,
    loadingYearly = false,
    dataWeekly = [],
    dataYearly = [],
    endDate = "",
    title = "",
}: {
    loadingWeekly: boolean,
    loadingYearly: boolean,
    dataWeekly: any,
    dataYearly: any,
    endDate: string,
    title: string,
}) {

    // hooks
    const theme = useTheme();

    return (
        <Stack spacing={2} minHeight={370}>

            <Stack justifyContent="flex-start" alignItems={"center"} p={.5} direction='row' bgcolor={'#E6F3FE'} borderRadius={1}>
                <Typography variant='h5' color={DASHBOARD_COLORS.text.title} fontWeight={'bold'}>{title}</Typography>
            </Stack>

            {/* <Stack>
                <Typography pl={1} color={DASHBOARD_COLORS.text.title} fontWeight={'bold'}>{`By Year - ${moment(endDate).year()}`}</Typography>
                {
                    !loadingWeekly ?
                        <Stack display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} columnGap={1} rowGap={1} justifyContent='center' alignItems='center' py={1} minHeight={100} >
                            {dataWeekly.length > 0 ?
                                dataWeekly.map((item, index) => (
                                    <Stack display={'flex'} direction={'row'} justifyContent='center' alignContent='center' spacing={1} key={`${item?.employee_id}-${index}`} height={'100%'} position={'relative'}>
                                        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'30%'} spacing={1} >
                                            <Avatar src='https://mui.com/static/images/avatar/1.jpg' sizes='lg' sx={{ width: 50, height: 50 }} />
                                            <Typography noWrap variant='body2' textAlign='center' fontWeight='bold' maxWidth={100} sx={{ fontSize: 12, color: theme => theme.palette.success.dark }}>{item?.nick_name}</Typography>
                                            <LinearProgressWithLabel value={item?.performance_avg} width={70} />
                                        </Stack>

                                    </Stack>
                                ))
                                : <NodataComponent />
                            }
                        </Stack>
                        :
                        <SkeletonSampleStatistics listLength={3} gridTemplateColumns='1fr 1fr 1fr' />
                }
            </Stack> */}

            <Stack>
                {/* <Typography pl={1} color={DASHBOARD_COLORS.text.title} fontWeight={'bold'}>{`By Week - ${moment(endDate).week()}`}</Typography> */}
                {
                    !loadingYearly ?
                        <Stack display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} columnGap={1} rowGap={1} justifyContent='center' alignItems='center' py={1} minHeight={100}>
                            {dataYearly.length > 0 ?
                                dataYearly.map((item, index) => (
                                    <Stack display={'flex'} direction={'row'} justifyContent='center' alignContent='center' spacing={1} key={`${item?.employee_id}-${index}`} height={'100%'} position={'relative'}>
                                        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'30%'} spacing={1} >
                                            <Avatar src='https://mui.com/static/images/avatar/1.jpg' sizes='lg' sx={{ width: 50, height: 50 }} />
                                            <Typography noWrap variant='body2' textAlign='center' fontWeight='bold' maxWidth={100} sx={{ fontSize: 12, color: theme => theme.palette.success.dark }}>{item?.nick_name}</Typography>
                                            <LinearProgressWithLabel value={item?.performance_avg} width={70} />
                                        </Stack>

                                    </Stack>
                                ))
                                : <NodataComponent />
                            }
                        </Stack>
                        :
                        <SkeletonSampleStatistics listLength={3} gridTemplateColumns='1fr 1fr 1fr 1fr 1fr' />
                }
            </Stack>

        </Stack>)
}


const NodataComponent = () => {
    return (
        <Stack width="100%" display={'flex'} minHeight={100} >
            <Typography ml={2} fontSize={12}>No data</Typography>
        </Stack >
    )
}