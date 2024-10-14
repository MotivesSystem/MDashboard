import { LoadPanel } from 'devextreme-react';
import DataGrid, { Column, HeaderFilter } from 'devextreme-react/data-grid';

const columns = ['AuditorName', 'SysNo', 'FactoryName', 'CustomerName', 'CustomerPO', 'StyleNo', 'MQCTypeName', 'AuditingResult', 'Remark'];

const InspectionGrid = ({ dataSource = [], gridLoading = false }) => {

  return (
    <div id="inspListMQC">
      <DataGrid
        dataSource={dataSource}
        keyExpr="SysNo"
        defaultColumns={columns}
        showBorders
        scrolling={{
          mode: "infinite"
        }}
        loadPanel={{ enabled: true }}
        height={"30vh"}
      >
        <HeaderFilter visible allowSearch />
        {columns.map((column, index) => <Column dataField={column} key={index} />)}
      </DataGrid>
      <LoadPanel visible={gridLoading} position={{ of: "#inspListMQC" }} showPane shading />
    </div>
  )
};

export default InspectionGrid;
