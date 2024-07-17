import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Box, Stack, Typography, useTheme, Avatar, LinearProgress, Skeleton, LinearProgressProps, Divider, Card } from '@mui/material';
import PieChart, { Series, Label, Legend, LegendTitle, Font, Size, Export, Margin, Connector } from 'devextreme-react/pie-chart';
import { Chart, Series as BarChartSeries, Legend as BarCharLegend, Label as BarchartLabel, CommonSeriesSettings, Format, Size as BCSize, Title as BCTitile, Font as BCFont, ValueAxis } from 'devextreme-react/chart';
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------
export default function MonthlyDefect({ startDate = "", endDate = "" }) {

  // hooks
  const theme = useTheme();

  // component states
  const [loadingInspection, setLoadingInspection] = useState(false);
  const [loadingCommonDefect, setLoadingCommonDefect] = useState(false);
  const [monthlyCommonDefect, setMonthlyCommonDefect] = useState<any>([]);
  const [inspectionDefect, setInspectionDefect] = useState<any>([]);


  const getInspectionDefects = async () => {
    try {
      setLoadingInspection(true);
      const postData = {
        "now_date": '2019/10/01',
        "top_number": 10,
      }

      const result = await axios.post(`https://test-dashboard-api.motivesfareast.com/api/dashboard/get-top-quanlity-inspection-defect-pie-chart`, postData);

      // console.log(result.data);

      if (result.data.reply.length > 0) {
        setInspectionDefect(result.data.reply.map(d => ({ ...d, label: d.name })));
      };

      setLoadingInspection(false);

    } catch (error) {
      console.error(error);
      setLoadingInspection(false)
    }
  };


  const getMonthCommonDefects = async () => {
    try {
      setLoadingCommonDefect(true);
      const postData = {
        "now_date": '2024/07/16',
        "top_number": 10,
      }

      const result = await axios.post(`https://test-dashboard-api.motivesfareast.com/api/dashboard/get-list-sample-production-defect-chart`, postData);

      // console.log(result.data);

      if (result.data.reply.length > 0) {
        setMonthlyCommonDefect(result.data.reply.map(d => ({ ...d, label: d.name })));
      };

      setLoadingCommonDefect(false);

    } catch (error) {
      console.error(error);
      setLoadingCommonDefect(false)
    }
  };

  useEffect(() => {
    getInspectionDefects();
    getMonthCommonDefects();
  }, [startDate, endDate])

  const customizeText = (arg) => {
    return `${arg?.argumentText} (${arg?.percentText})`
  }

  // console.log(inspectionDefect, monthlyCommonDefect,);

  return (
    <Card
      sx={{ p: 1, pb: 3 }}
    >
      <Stack justifyContent="flex-start" alignItems={"center"} p={1} direction='row' spacing={1}>
        <Iconify icon="fluent-emoji-flat:warning" sx={{ fontSize: 25 }} />
        <Typography variant='h5' fontWeight={'bold'}>{`Lỗi thường gặp tháng ${moment(endDate).month() + 1}`}</Typography>
      </Stack>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        {!loadingCommonDefect ?
          <Box width={'100%'} position={'relative'} sx={{
            border: `1px solid ${theme.palette.divider}`

          }} borderRadius={1}>
            {inspectionDefect.length > 0 &&
              <PieChart
                dataSource={inspectionDefect}
                palette="Vintage"
                // title={`Lỗi thường gặp tháng ${moment(endDate).month() + 1}`}
                showZeroes
                resolveLabelOverlapping="shift"
              >
                <Series
                  argumentField="label"
                  valueField="value">
                  <Label
                    visible
                    position="column"
                    overlappingBehavior={"none"}
                    customizeText={customizeText}
                    radialOffset={0}
                  >
                    <Connector visible width={2} />
                  </Label>
                </Series>
                <Legend
                  visible
                  orientation="horizontal"
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                  itemTextPosition="right"
                  rowCount={2}
                  paddingLeftRight={0} paddingTopBottom={0}
                  margin={{ top: 5, left: 0, right: 0, bottom: 5 }}
                // markerSize={10}
                >
                  <Font size={12} />
                </Legend>
                <Size height={400} width={'100%'} />
                <Export enabled={false} />
                <Margin
                  top={2}
                  bottom={2}
                  left={2}
                  right={2}
                />
              </PieChart>
            }
          </Box>
          :
          <SkeletonPieChart />
        }

        {
          !loadingCommonDefect ?
            <Box width={'100%'} position={'relative'} sx={{
              border: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
            }} borderRadius={1}>
              <Chart id="chart" dataSource={monthlyCommonDefect}>
                <CommonSeriesSettings
                  argumentField="label"
                  valueField="value"
                  type="bar"
                  hoverMode="allArgumentPoints"
                  selectionMode="allArgumentPoints"
                  color="#ff5757"
                >
                  <BarchartLabel visible>
                    <Format type="fixedPoint" precision={0} />
                  </BarchartLabel>
                </CommonSeriesSettings>
                <BarChartSeries
                  argumentField="label"
                  valueField="value"
                  name="2018"
                  color="#ff5757"
                />
                <BCTitile
                  text={`% LỖI THÁNG ${moment(endDate).month() + 1}`}
                  verticalAlignment='center'
                >
                  <BCFont color={'#ff5757'} weight={'bold'} size={18} />
                </BCTitile>
                <ValueAxis name="value" position="left" valueMarginsEnabled maxValueMargin={0.1} />
                <BarCharLegend verticalAlignment="bottom" horizontalAlignment="center" visible={false} />
                <BCSize width={'100%'} height={400} />
              </Chart>
            </Box>
            :
            <SkeletonPieChart />
        }
      </Stack>
    </Card>
  )
};



const SkeletonPieChart = () => {
  return (
    <Stack justifyContent='center' alignItems='center' position={'relative'} width={'100%'}>
      <Skeleton variant='rectangular' height={400} width={'100%'} sx={{ borderRadius: 1 }} />
    </Stack>
  )
}