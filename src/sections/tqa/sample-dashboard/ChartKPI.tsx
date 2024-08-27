import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, IconButton, Menu, styled as MuiStyled, Stack, Typography, useTheme, Divider, Card } from '@mui/material';
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
// devextreme-chart
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    ICommonSeriesSettingsProps,
    CommonAxisSettings,
    Export,
    Legend,
    Margin,
    Tooltip,
    Label,
    Format,
    Grid,
    Size
} from 'devextreme-react/chart';
// utils
import axios from '../../../utils/axios';
import IconName from '../../../utils/iconsName';
import uuidv4 from '../../../utils/uuidv4';
import { HOST_API_DASHBOARD } from '../../../config'
import SkeletonPieChart from '../technical-dashboard/SkeletonPieChart.tsx';

const architectureSources = [
    { value: 'total_work_time', name: 'Số giờ làm trên tổng số người' },
    { value: 'total_actual_work_time', name: 'Số giờ làm thực tế bao gồm OT' },
    { value: 'total_work_time_planning', name: 'Số giờ làm theo plan' },
    { value: 'total_product_planning', name: 'Số lượng sản phẩm theo plan' },
    { value: 'total_product_finish', name: 'Số lượng sản phẩm thực tế' },
];

export default function ChartKPI({ startDate = "", endDate = "", isRefresh = false }) {
    const [dataChartKPI, setDataChartKPI] = useState()
    const [loadingChartKPIData, setLoadingChartKPIData] = useState(false)

    const getDataChartKPI = useCallback(async () => {
        try {
            setLoadingChartKPIData(true)
            const postData = {
                "now_date": endDate
            }

            const result = await axios.post(`${HOST_API_DASHBOARD}/api/dashboard/get-data-for-line-chart`, postData);
            if (result.data.reply.length > 0) {
                const dataKPI = result.data.reply.map((data) => {
                    return {
                        ...data,
                        "date_value": moment(data.date_value).format('yyyy/MM/DD')
                    }
                })
                setDataChartKPI(dataKPI)
            }
            setLoadingChartKPIData(false)
        } catch (error) {
            console.error(error);
            setLoadingChartKPIData(false)
        }


    }, [startDate, endDate])

    useEffect(() => {
        getDataChartKPI();
    }, [startDate, endDate,isRefresh])


    return (
        // <Card sx={{
        //     p: 1,
        //     pb: 3,
        // }}>
        <Box width={'100%'} position={'relative'}
            sx={{
                // border: `1px solid ${theme.palette.divider}`,
                // justifyContent: "center",
                // display: "flex"
            }}
        >
            {!loadingChartKPIData ? (<Chart
                palette="Violet"
                dataSource={dataChartKPI}
            // title="Architecture Share Over Time (Count)"
            >
                <CommonSeriesSettings
                    argumentField="date_value"
                    type={"spline"}
                />
                <CommonAxisSettings>
                    <Grid visible />
                </CommonAxisSettings>
                {
                    architectureSources.map((item) => <Series
                        key={item.value}
                        valueField={item.value}
                        name={item.name} />)
                }
                <Margin bottom={20} />
                <ArgumentAxis
                    allowDecimals={false}
                    axisDivisionFactor={60}
                >
                    <Label>
                        <Format type="decimal" />
                    </Label>
                </ArgumentAxis>
                <Legend
                    verticalAlignment="top"
                    horizontalAlignment="right"
                />
                <Size height={350} width={'100%'} />
                <Export enabled={false} />
                <Tooltip enabled />
            </Chart>) : <SkeletonPieChart />}

        </Box>
        //  </Card> 
    );
}