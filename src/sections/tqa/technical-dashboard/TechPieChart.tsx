import { Stack } from "@mui/material";
import PieChart, { Connector, Export, Font, IPieChartOptions, Label, Legend, Margin, Series, Size, Tooltip } from 'devextreme-react/pie-chart';
// components
import SkeletonPieChart from "./SkeletonPieChart.tsx";
import { DASHBOARD_COLORS } from './index.tsx';

// ----------------------------------------------------------------

function TechPieChart({ connectorVisible = true, radialOffset = 0, title = "", ...props }: IPieChartOptions & { dataSource: any, series: object, showLegend: boolean }) {

    const customizeTooltip = (arg) => {
        return `${arg.argumentText} (${arg.value})`
    }

    return (
        <Stack spacing={2} justifyContent="center" alignItems="center">
            {!props?.loading ?

                <PieChart
                    dataSource={props?.dataSource || []}
                    palette={DASHBOARD_COLORS.charts}
                    title={title}
                    showZeroes
                    resolveLabelOverlapping="shift"
                >
                    <Series
                        {...props?.series && props?.series}
                    >
                        <Label
                            visible
                            position=""
                            customizeText={props?.customizeLabelText}
                            radialOffset={radialOffset}
                            backgroundColor={'transparent'}
                            textOverflow={'visible'}
                        >
                            <Font weight={'bold'} color={'black'} {...(props?.size && {
                                size: props?.size
                            })} />
                            <Connector visible={connectorVisible} width={2} />
                        </Label>
                    </Series>

                    <Legend
                        visible={props?.showLegend}
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

                    <Size height={props?.height} width={props?.width} />
                    <Export enabled={false} />
                    <Margin
                        top={2}
                        bottom={2}
                        left={2}
                        right={2}
                    />
                    <Tooltip enabled
                        customizeTooltip={customizeTooltip}
                    />
                </PieChart>
                :
                <SkeletonPieChart />
            }
        </Stack >
    )
}

export default TechPieChart