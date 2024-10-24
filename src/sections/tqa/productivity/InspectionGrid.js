import { LoadPanel } from 'devextreme-react';
import DataGrid, { Column, HeaderFilter } from 'devextreme-react/data-grid';

const columns = ['PO', 'Supplier', 'FactoryName', 'Zroh', 'Quantity', 'Customer', 'InspectionNo', '10%Inspection'];

const mockData = [
  {
    PO: "",
    Supplier: "YOUNGBO TEX",
    FactoryName: "HUONG TRA",
    Zroh: "WT00972",
    Quantity: 2843,
    Customer: "EXPRESS",
    InspectionNo: "IMF.1024.0002",
    "10%Inspection": ""
  },
  {
    PO: "",
    Supplier: "YOUNGBO TEX",
    FactoryName: "HUONG TRA",
    Zroh: "WT00972",
    Quantity: 1536.3,
    Customer: "EXPRESS",
    InspectionNo: "IMF.1024.0003",
    "10%Inspection": ""
  }, {
    PO: "",
    Supplier: "YOUNGBO TEX",
    FactoryName: "HUONG TRA",
    Zroh: "WT00972",
    Quantity: 1563.6,
    Customer: "EXPRESS",
    InspectionNo: "IMF.1024.0005",
    "10%Inspection": ""
  }
  , {
    PO: "",
    Supplier: "YOUNGBO TEX",
    FactoryName: "X28-QN",
    Zroh: "WT00972",
    Quantity: 6339,
    Customer: "EXPRESS",
    InspectionNo: "IMF.1024.0014",
    "10%Inspection": ""
  }
  , {
    PO: "",
    Supplier: "HOTAI",
    FactoryName: "VINATEX TU NGHIA",
    Zroh: "B0101-2HR",
    Quantity: 2690,
    Customer: "NEXT",
    InspectionNo: "IMF.1024.0031",
    "10%Inspection": ""
  }
]

const InspectionGrid = ({ dataSource = [], gridLoading = false }) => {

  return (
    <div id="inspListProd">
      <DataGrid
        dataSource={mockData}
        keyExpr="PO"
        defaultColumns={columns}
        showBorders
        scrolling={{
          mode: "infinite"
        }}
        loadPanel={{ enabled: true }}
        height={"40vh"}
      >
        <HeaderFilter visible allowSearch />
        {columns.map((column, index) => <Column dataField={column} key={index} />)}
      </DataGrid>
      <LoadPanel visible={gridLoading} position={{ of: "#inspListProd" }} showPane shading />
    </div>
  )
};

export default InspectionGrid;
