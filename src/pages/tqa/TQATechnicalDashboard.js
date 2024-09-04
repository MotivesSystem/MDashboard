import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { DateBox } from 'devextreme-react';
import _ from 'lodash';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ChartsText } from '@mui/x-charts/ChartsText';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import axios from '../../utils/axios';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import IconName from '../../utils/iconsName';
import { DASHBOARD_COLORS } from '../../sections/tqa/technical-dashboard/index.tsx';
import TechPack from '../../sections/tqa/technical-dashboard/@TechPack.tsx';
import Pattern from '../../sections/tqa/technical-dashboard/@Pattern.tsx';
import Consumption from '../../sections/tqa/technical-dashboard/@Consumption.tsx';
import ThreeDDashBoard from '../../sections/tqa/technical-dashboard/@ThreeDDashBoard.tsx';
import SampleProductionDashBoard from '../../sections/tqa/technical-dashboard/@SampleProduction.tsx';

// ----------------------------------------------------------------
const baseHosting = "https://test-dashboard-api.motivesfareast.com/";

type dateType = Date;
interface IQueryDate {
  startDate: dateType;
  endDate: dateType;
}
const firstDayOfWeek = moment().startOf('month').format('MMMM DD, YYYY');

// ----------------------------------------------------------------
const TQATechnicalDashboard = () => {

  // components states;

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
    <Page title="TQA - Technical Dashboard">

      <Stack direction="row" justifyContent={'flex-start'} alignItems={'center'} p={1}>
        <Box width={'33%'}>
          <Typography variant='h3' fontWeight='bold' color={DASHBOARD_COLORS.text.title}>SAMPLE STATISTICS</Typography>
        </Box>
        <Stack direction="row" justifyContent={'flex-start'} alignItems={'center'} width={'60%'}>
          <Typography>
            Report Date
          </Typography>

          <Iconify icon={"ic:baseline-info"} sx={{ fontSize: 20, color: DASHBOARD_COLORS.text.title, ml: 1 }} />:

          {/* <DateBox
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
            // showDropDownButton={false}
            showClearButton={false}
            acceptCustomValue={false}
            className='tqa-dropdown-date'
          />

          <Typography className='tqa-dropdown-datebox'>~</Typography> */}

          <DateBox
            type="date"
            displayFormat={"monthAndYear"}
            calendarOptions={{
              maxZoomLevel: 'year',
              minZoomLevel: 'century',
          }}
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
              const firstDateOfMonth = new Date(newValue.getFullYear(), newValue.getMonth(), 1)
              const lastDateOfMonth = new Date(newValue.getFullYear(), newValue.getMonth() + 1, 0)
              handleChangeDate(firstDateOfMonth, 'startDate');
              handleChangeDate(lastDateOfMonth, 'endDate');
              // handleChangeDate(newValue, 'endDate');
            }}
            height={40}
            width={160}
            showTodayButton
            hoverStateEnabled={false}
            activeStateEnabled={false}
            openOnFieldClick
            // disabledDates={(data) => disableDates(data)}
            acceptCustomValue={false}
            className='tqa-dropdown-date'
          />

        </Stack>
      </Stack>

      <Box>

        <Grid container p={1} spacing={2}>
          <Grid item xs={12} md={2.4}>
            {/* <TQADasboardDesign startDate={stringStartDate} endDate={stringEndDate} /> */}
            <TechPack startDate={stringStartDate} endDate={stringEndDate} />
          </Grid>
          <Grid item xs={12} md={2.4}>
            {/* <TQADasboardDesign startDate={stringStartDate} endDate={stringEndDate} /> */}
            <Pattern startDate={stringStartDate} endDate={stringEndDate} />
          </Grid>
          <Grid item xs={12} md={2.4}>
            {/* <TQADasboardDesign startDate={stringStartDate} endDate={stringEndDate} /> */}
            <Consumption startDate={stringStartDate} endDate={stringEndDate} />
          </Grid>
          <Grid item xs={12} md={2.4}>
            {/* <TQADasboard3D startDate={stringStartDate} endDate={stringEndDate} /> */}
            <ThreeDDashBoard startDate={stringStartDate} endDate={stringEndDate} />
          </Grid>
          <Grid item xs={12} md={2.4}>
            {/* <TQADasboardSampleProduction startDate={stringStartDate} endDate={stringEndDate} /> */}
            <SampleProductionDashBoard
              startDate={stringStartDate} endDate={stringEndDate}
            />
          </Grid>
        </Grid>
      </Box>

    </Page>
  );
};


export default TQATechnicalDashboard;
