import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useCallback, useState } from 'react';
import Page from '../../components/Page';
import axios from '../../utils/axios';
// sections
import OverView from '../../sections/tqa/qc/OverView';
import DefectiveRate from '../../sections/tqa/qc/DefectiveRate';
import DefectEachDept from '../../sections/tqa/qc/DefectEachDept';
import DefectFactoryQuality from '../../sections/tqa/qc/DefectFactoryQuality';
import HeaderFilter from '../../sections/tqa/qc/HeaderFilter';
import InspectionGrid from '../../sections/tqa/qc/InspectionGrid';
import StatisticBarChart from '../../sections/tqa/qc/StatisticBarChart';
import Top5DefectPieChart from '../../sections/tqa/qc/Top5DefectPieChart';
import Top5RepeatedDefect from '../../sections/tqa/qc/Top5RepeatedDefect';
// config
import { HOST_API_DASHBOARD } from '../../config';

// ----------------------------------------------------------------
const baseHosting = HOST_API_DASHBOARD;

type dateType = Date;
interface IQueryDate {
    startDate: dateType;
    endDate: dateType;
}
const firstDayOfWeek = moment().startOf('month').format('MMMM DD, YYYY');
const endOfMonth = moment().endOf('month').format('MMMM DD, YYYY');

// ----------------------------------------------------------------
const Qc = () => {

    // components states;
    const [filterValue, setFilterValue] = useState({
        "start_date": "",
        "end_date": "",
        "division": "",
        "customers": "",
        "factories": "",
        "qc_type": "FINAL"
    })

    const [dataSources, setDataSources] = useState({
        overView: {
            "total_insp": 0,
            "insp_new": 0,
            "insp_complete": 0,
            "insp_new_growth_percent": 0,
            "insp_complete_growth_percent": 0,
            "inspected_qty": 0,
            "current_defect_qty": 0,
            "previous_defect_qty": 0,
            "defect_growth_percent": 0,
            "pick_sample_qty": 0,
            "pick_sample_percent": 0,
            "defect_rate": 0
        },
        defectFactoryQuality: [],
        defectEachDept: [],
        top5DefectPieChart: [],
        top5RepeatedDefect: [],
        statisticBarChart: [],
        inspList: []
    })

    const [pageLoading, setPageLoading] = useState(false);
    const [gridLoading, setGridLoading] = useState(false);


    const handleChangeFilter = (fields = {}) => {
        setFilterValue(filterValue => ({ ...filterValue, ...fields }));
    }

    const getInspList = useCallback(async () => {
        setGridLoading(true)
        await axios.post(`${baseHosting}/api/qcdashboard/get-inspection-list-data`, { ...filterValue, page: 1, "per_page": 100000 })
            .then((response) => {
                setDataSources(data => ({ ...data, inspList: response?.data?.reply || [] }));
                setGridLoading(false)
            }).catch(e => {
                console.log(e);
                setGridLoading(false);
            });
    }, [filterValue])

    const handleApplyFilter = useCallback(async () => {
        setPageLoading(true);
        const getOverviewPieChart = axios.post(`${baseHosting}/api/qcdashboard/get-overview-data`, filterValue);
        const getDefectFactoryChart = axios.post(`${baseHosting}/api/qcdashboard/get-defect-factory-quality-column-chart`, filterValue);
        const getDefectDepChart = axios.post(`${baseHosting}/api/qcdashboard/get-defect-of-each-department-pie-chart`, filterValue);
        const getTop5Decfect = axios.post(`${baseHosting}/api/qcdashboard/get-top5-defect-pie-chart`, filterValue);
        const getTop5RepeatDefect = axios.post(`${baseHosting}/api/qcdashboard/get-top5-repeated-defect-column-chart`, filterValue);
        const getStatisticColumn = axios.post(`${baseHosting}/api/qcdashboard/get-qc-statistic-column-chart`, filterValue);
        // const getInspList = axios.post(`${baseHosting}/api/mqcdashboard/get-inspection-list-data`, { ...filterValue, page: 1, "per_page": 50 });
        const newData = {};
        await Promise.all([getOverviewPieChart, getDefectFactoryChart, getDefectDepChart, getTop5Decfect, getTop5RepeatDefect, getStatisticColumn])
            .then((response) => {
                newData.overView = response[0]?.data?.reply;
                newData.defectFactoryQuality = response[1]?.data?.reply || [];
                newData.defectEachDept = response[2]?.data?.reply || [];
                newData.top5DefectPieChart = response[3]?.data?.reply || [];
                newData.top5RepeatedDefect = response[4]?.data?.reply || [];
                newData.statisticBarChart = response[5]?.data?.reply || [];
                // newData.inspList = response[6]?.data?.reply;
                setPageLoading(false);
                setDataSources(newData);
            }).catch(e => {
                console.log(e)
                setPageLoading(false);
            })
        getInspList();
    }, [filterValue]);

    const handleClearFilter = () => {
        setFilterValue({
            "start_date": "",
            "end_date": "",
            "division": "",
            "customers": "",
            "factories": "",
            "qc_type": "FINAL"
        });
    }

    return (
        <Page title="TQA - QC Dashboard">

            <HeaderFilter
                handleChangeFilter={handleChangeFilter}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter}
            />
            <Grid container spacing={1} mt={1}>
                <Grid item sm={12}>
                    <Card>
                        <OverView dataSource={dataSources.overView} />
                    </Card>
                </Grid>
                <Grid item sm={12}>
                    <Typography color={'gray'}>DEFECTS STATISTIC</Typography>
                </Grid>
                <Grid item sm={1.5}>
                    <Card>
                        <DefectiveRate dataSource={dataSources.overView} />
                    </Card>
                </Grid>
                <Grid item sm={10.5}>

                    <Card>
                        <DefectFactoryQuality dataSource={dataSources.defectFactoryQuality} />
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card>
                        <DefectEachDept dataSource={dataSources.defectEachDept} />
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card>
                        <Top5DefectPieChart dataSource={dataSources.top5DefectPieChart} />
                    </Card>
                </Grid>
                <Grid item sm={12}>
                    <Card>
                        <Top5RepeatedDefect dataSource={dataSources.top5RepeatedDefect} />
                    </Card>
                </Grid>
                <Grid item sm={12}>
                    <Card>
                        <StatisticBarChart dataSource={dataSources.statisticBarChart} />
                    </Card>
                </Grid>
                <Grid item sm={12}>
                    <Card>
                        <InspectionGrid dataSource={dataSources.inspList} filterValue={filterValue} gridLoading={gridLoading} />
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
};


export default Qc;
