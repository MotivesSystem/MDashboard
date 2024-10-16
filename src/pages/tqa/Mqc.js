import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useCallback, useState } from 'react';
import Page from '../../components/Page';
import axios from '../../utils/axios';
// sections
import AuditorInspBarChart from '../../sections/tqa/mqc/AuditorInspBarChart';
import ChargebackBarChart from '../../sections/tqa/mqc/ChargebackBarChart';
import ChargebackPieChart from '../../sections/tqa/mqc/ChargebackPieChart';
import DefectRatePieChart from '../../sections/tqa/mqc/DefectRatePieChart';
import HeaderFilter from '../../sections/tqa/mqc/HeaderFilter';
import InspectionGrid from '../../sections/tqa/mqc/InspectionGrid';
import OverviewPieChart from '../../sections/tqa/mqc/OverviewPieChart';
import SuppliersChart from '../../sections/tqa/mqc/SuppliersChart';
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
const Mqc = () => {

    // components states;
    const [filterValue, setFilterValue] = useState({
        "start_date": "",
        "end_date": "",
        "suppliers": "",
        "customers": "",
        "factories": ""
    })

    const [dataSources, setDataSources] = useState({
        overView: [],
        defectRatePieChart: [],
        chargeBackPieChart: [],
        supplierChart: [],
        chargeBackBarChart: [],
        inspAuditor: [],
        inspList: []
    })

    const [pageLoading, setPageLoading] = useState(false);
    const [gridLoading, setGridLoading] = useState(false);


    const handleChangeFilter = (fields = {}) => {
        setFilterValue(filterValue => ({ ...filterValue, ...fields }));
    }

    const getInspList = useCallback(async () => {
        setGridLoading(true)
        await axios.post(`${baseHosting}/api/mqcdashboard/get-inspection-list-data`, { ...filterValue, page: 1, "per_page": 100000 })
            .then((response) => {
                setDataSources(data => ({ ...data, inspList: response?.data?.reply }));
                setGridLoading(false)
            }).catch(e => {
                console.log(e);
                setGridLoading(false);
            });
    }, [filterValue])

    const handleApplyFilter = useCallback(async () => {
        setPageLoading(true);
        const getOverviewPieChart = axios.post(`${baseHosting}/api/mqcdashboard/get-overview-pie-chart`, filterValue);
        const getInspectedDefectRate = axios.post(`${baseHosting}/api/mqcdashboard/get-inspected-defect-rate-pie-chart`, filterValue);
        const getChargeBackPieChart = axios.post(`${baseHosting}/api/mqcdashboard/get-chargeback-defect-rate-pie-chart`, filterValue);
        const getSupplierChart = axios.post(`${baseHosting}/api/mqcdashboard/get-supplier-quality-column-chart`, filterValue);
        const getChargeBackBarChart = axios.post(`${baseHosting}/api/mqcdashboard/get-chargeback-column-chart`, filterValue);
        const getInspAuditor = axios.post(`${baseHosting}/api/mqcdashboard/get-inspection-auditor-column-chart`, filterValue);
        const newData = {};
        await Promise.all([getOverviewPieChart, getInspectedDefectRate, getChargeBackPieChart, getSupplierChart, getChargeBackBarChart, getInspAuditor])
            .then((response) => {
                newData.overView = response[0]?.data?.reply;
                newData.defectRatePieChart = response[1]?.data?.reply;
                newData.chargeBackPieChart = response[2]?.data?.reply;
                newData.supplierChart = response[3]?.data?.reply;
                newData.chargeBackBarChart = response[4]?.data?.reply;
                newData.inspAuditor = response[5]?.data?.reply;
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
            "suppliers": "",
            "customers": "",
            "factories": ""
        });
    }

    return (
        <Page title="TQA - MQC Dashboard">

            <HeaderFilter
                filterValue={filterValue}
                handleChangeFilter={handleChangeFilter}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter}
            />
            <Grid container spacing={1} mt={1}>
                <Grid item sm={12}>
                    <Card>
                        <OverviewPieChart dataSource={dataSources.overView} />
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card>
                        <DefectRatePieChart dataSource={dataSources.defectRatePieChart} />
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card>
                        <ChargebackPieChart dataSource={dataSources.chargeBackPieChart} />
                    </Card>
                </Grid>
                <Grid item sm={12}>
                    <Card>
                        <SuppliersChart dataSource={dataSources.supplierChart} />
                    </Card>
                </Grid>
                <Grid item sm={12}>
                    <Card>
                        <ChargebackBarChart dataSource={dataSources.chargeBackBarChart} />
                    </Card>
                </Grid>
                <Grid item sm={12}>
                    <Card>
                        <AuditorInspBarChart dataSource={dataSources.inspAuditor} />
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


export default Mqc;
