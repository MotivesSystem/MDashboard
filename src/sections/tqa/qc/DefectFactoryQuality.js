import Chart, {
    ArgumentAxis,
    Export,
    Label,
    Legend,
    Margin,
    Series,
    Size,
    Tick,
    Title,
    Tooltip,
    ValueAxis
} from 'devextreme-react/chart';

const customizeText = (e) => `${e.value}`;


function DefectFactoryQuality({ dataSource = [] }) {
    return (
        <Chart
            dataSource={dataSource}
            // rotated
            id="chart"
        >

            <ArgumentAxis>
                <Label customizeText={customizeText} />
            </ArgumentAxis>

            <ValueAxis>
                <Tick visible />
                <Label visible />
            </ValueAxis>

            <Series
                valueField="major_qty"
                name="Major Qty"
                argumentField="factory_name"
                type="bar"
            // color="#79cac4"
            >
                <Label visible={false} backgroundColor="#c18e92" />
            </Series>

            <Series
                valueField="minor_qty"
                name="Minor Qty"
                argumentField="factory_name"
                type="bar"
            // color="#79cac4"
            >
                <Label visible={false} backgroundColor="#c18e92" />
            </Series>

            <Series
                valueField="critical_qty"
                name="Critical Qty"
                argumentField="factory_name"
                type="bar"
            // color="#79cac4"
            >
                <Label visible={false} backgroundColor="#c18e92" />
            </Series>

            <Tooltip enabled />

            <Legend
                visible
                verticalAlignment="bottom"
                horizontalAlignment="center"
            />

            <Export enabled={false} />

            <Title text="Qty QC Defects by Factory" font={{ size: 20 }} />

            <Size height={350} />

            <Margin
                top={2}
                bottom={2}
                left={10}
                right={10}
            />

        </Chart>
    );
}

export default DefectFactoryQuality;
