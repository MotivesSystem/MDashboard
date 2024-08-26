import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, IconButton, Menu, styled as MuiStyled, Stack, Tooltip, Typography, useTheme, Grid, Divider, } from '@mui/material';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { DateBox } from 'devextreme-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import useResponsive from '../../hooks/useResponsive';
// custom components;
import Iconify from '../../components/Iconify';
import { FormProvider } from '../../components/hook-form';
import LoadingBackDrop from '../../components/BackDrop';
import Image from "../../components/Image";
import Page from '../../components/Page';
import BestEmployees from '../../sections/tqa/sample-dashboard/BestEmployees.tsx';
import ChartKPI from '../../sections/tqa/sample-dashboard/ChartKPI.tsx';
import MonthlyDefect from '../../sections/tqa/sample-dashboard/MonthlyDefect.tsx';
// utils
import axios from '../../utils/axios';
import IconName from '../../utils/iconsName';
import uuidv4 from '../../utils/uuidv4';
// config
import { NOTCH_HEIGHT } from '../../config';
import "./index.css"
import { DASHBOARD_COLORS } from '../../sections/tqa/technical-dashboard/index.tsx';



// 'isoWeek'
const firstDayOfWeek = moment().startOf('isoWeek').format('MMMM DD, YYYY');



// ----------------------------------------------------------------
function SampleStatistics() {

    // hooks


    // components states;
    const [startDate, setStartDate] = useState(firstDayOfWeek);
    const [endDate, setEndDate] = useState(new Date());
    const [submitedDate, setSubmitedDate] = useState({
        startDate: firstDayOfWeek,
        endDate: new Date(),
    });

    // Custom functions;
    const handleChangeDate = (e, type) => {
        try {
            if (type === 'startDate') {
                setStartDate(e);
                if (moment(endDate).diff(e, 'days') < 0) {
                    setEndDate(e);
                }
            } else {
                setEndDate(e)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const disableDates = (args) => {
        return moment(args.date).diff(startDate, 'days') < 0;
    }

    const stringStartDate = moment(startDate).format('yyyy/MM/DD');
    const stringEndDate = moment(endDate).format('yyyy/MM/DD');


    return (
        <Page title="TQA - Sample Room">

            <Stack direction="row" justifyContent={'flex-start'} alignItems={'center'} p={1}>

                <Box width={'33%'}>
                    <Typography variant='h3' fontWeight='bold' color={DASHBOARD_COLORS.text.title}>SAMPLE STATISTICS</Typography>
                </Box>

                <Stack direction="row" justifyContent={'center'} alignItems={'center'} width={'33%'}>

                    <Typography>
                        Report Date
                    </Typography>

                    <Iconify icon={"ic:baseline-info"} sx={{ fontSize: 20, color: DASHBOARD_COLORS.text.title, ml: 1 }} />:

                    <DateBox
                        type="date"
                        displayFormat={"dd/MM/yyyy"}
                        label="Month"
                        labelMode="hidden"
                        style={{
                            maxHeight: "40px",
                            overFlow: 'hidden',
                            "&.dxButtonContent": {
                                maxHeight: "40px !important",
                            },
                            border: 'none',
                        }}

                        value={startDate}
                        onValueChange={(newValue) => {
                            handleChangeDate(newValue, 'startDate');
                        }}
                        height={40}
                        width={140}
                        showTodayButton
                        hoverStateEnabled={false}
                        activeStateEnabled={false}
                        openOnFieldClick
                        showDropDownButton
                        showClearButton={false}
                        acceptCustomValue={false}
                        className='tqa-dropdown-date'
                    />

                    <Typography className='tqa-dropdown-datebox'>~</Typography>

                    <DateBox
                        type="date"
                        displayFormat={"dd/MM/yyyy"}
                        label="Month"
                        labelMode="hidden"
                        style={{
                            maxHeight: "40px",
                            overFlow: 'hidden',
                            "&.dxButtonContent": {
                                maxHeight: "40px !important",
                            },
                            border: 'none'
                        }}
                        value={endDate}
                        onValueChange={(newValue) => {
                            handleChangeDate(newValue, 'endDate');
                        }}
                        height={40}
                        width={140}
                        showTodayButton
                        hoverStateEnabled={false}
                        activeStateEnabled={false}
                        openOnFieldClick
                        disabledDates={(data) => disableDates(data)}
                        acceptCustomValue={false}
                        className='tqa-dropdown-date'
                    />

                </Stack>

                <Stack direction={'row'} width={'33%'} spacing={2} justifyContent={'space-evenly'} alignItems={'center'}>
                    <Stack justifyContent={'center'} alignItems={'center'} display={'flex'} >
                        <IconButton>
                            <Iconify icon="carbon:video" />
                        </IconButton>
                        <Typography variant='body2'>Video</Typography>
                    </Stack>
                    <Stack justifyContent={'center'} alignItems={'center'} display={'flex'}>
                        <IconButton>
                            <Iconify icon="iconoir:privacy-policy" />
                        </IconButton>
                        <Typography variant='body2'>Policy</Typography>
                    </Stack>

                    <Stack justifyContent={'center'} alignItems={'center'} display={'flex'}>
                        <IconButton>
                            <Iconify icon="material-symbols:fact-check-outline" />
                        </IconButton>
                        <Typography variant='body2'>Standard</Typography>
                    </Stack>
                    <Stack justifyContent={'center'} alignItems={'center'} display={'flex'}>
                        <IconButton>
                            <Iconify icon="fluent:document-one-page-sparkle-20-regular" />
                        </IconButton>
                        <Typography variant='body2'>Guidline</Typography>
                    </Stack>
                </Stack>

            </Stack>

            <Box>

                <Grid container p={1} spacing={2}>
                    <Grid item xs={12} md={8}>
                        <ChartKPI
                            startDate={stringStartDate}
                            endDate={stringEndDate}
                        />
                        <BestEmployees
                            startDate={stringStartDate}
                            endDate={stringEndDate}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <MonthlyDefect
                            startDate={stringStartDate}
                            endDate={stringEndDate}
                        />
                    </Grid>
                </Grid>
            </Box>

        </Page>
    )
}

export default SampleStatistics;