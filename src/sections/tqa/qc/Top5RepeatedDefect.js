import _, { forEach } from "lodash";
import { generateColors } from "devextreme/viz/palette";
import { useEffect, useState } from "react";
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
    ValueAxis,
    CommonSeriesSettings
} from 'devextreme-react/chart';

import moment from "moment";

const customizeText = (e) => `${e.value}`;

const customizeTooltip = (pointInfo) => {
    const items = pointInfo.valueText.split('\n');
    const color = pointInfo.point.getColor();
    const defectList = pointInfo?.point?.data?.defectName;

    items.forEach((item, index) => {
        const element = document.createElement('span');
        element.textContent = item?.replace(`Top ${index + 1}`, `Top ${index + 1}: ${defectList[index]}`);
        if (item.indexOf(pointInfo.seriesName) === 0) {
            element.style.color = color;
            element.className = 'active';
        }
        items[index] = element.outerHTML;
    });

    const element = document.createElement('span');
    element.textContent = pointInfo.argumentText;
    element.style.fontWeight = 600;
    items.unshift(element.outerHTML);

    return { text: items.join('\n') };
}

function Top5RepeatedDefect({ dataSource = [] }) {
    const [data, setData] = useState([]);
    const [uniqueDefects, setUniqueDefects] = useState([])

    const rebuildData = () => {
        const rebuildDate = dataSource.map((item) => {
            item.date = moment(item.date).format("MMMM YYYY");
            return item;
        })
        const groupedData = _.groupBy(dataSource, 'date');
        const dataRebuilt = [];
        const uniqueDefectsList = []
        Object.keys(groupedData).map((key) => {
            const newObj = {
                date: key,
                top1: 0,
                top2: 0,
                top3: 0,
                top4: 0,
                top5: 0,
                defectName: []
            };
            groupedData[key]?.map((item, key) => {
                newObj[`top${key + 1}`] = item?.total_qty;
                newObj.defectName.push(item?.defect_name);
                if (!uniqueDefectsList.includes(item?.defect_name)) {
                    uniqueDefectsList.push(item?.defect_name);
                }
                return item;
            })
            dataRebuilt.push(newObj);
            return key
        })
        setUniqueDefects(uniqueDefectsList);
        setData(dataRebuilt);
    }

    useEffect(() => {
        rebuildData();
    }, [dataSource])


    const customizeItems = (items) => {
        if (items.length > 0) {
            const subCodesWithColor = uniqueDefects;
            const returnItems = []
            const colors = generateColors("Bright", uniqueDefects.length, { baseColorSet: 'simpleSet', paletteExtensionMode: 'blend' });
            forEach(subCodesWithColor, (sub, index) => {
                returnItems.push({
                    id: 1,
                    marker: {
                        fill: colors[index],
                        size: 10,
                    },

                    states: {
                        hover: { fill: colors[index], hatching: { direction: "right", width: 2, step: 6, opacity: 0.75 } },
                        normal: {
                            fill: colors[index]
                        },
                        selection: { fill: "#a5d7d0", hatching: { direction: "right", width: 2, step: 6, opacity: 0.5 } }
                    },
                    text: sub,
                    visible: true
                });
            });
            return returnItems;
        }
        return items;
    }

    return (
        <Chart
            dataSource={data}
            // rotated
            id="chart"
        // customizePoint={customizePoint}
        >

            <ArgumentAxis>
                <Label customizeText={customizeText} />
            </ArgumentAxis>

            <ValueAxis>
                <Tick visible />
                <Label visible />
            </ValueAxis>

            <CommonSeriesSettings
                argumentField="date"
                // tagField="defect_name"
                type="bar"
            />
            <Series
                argumentField="date"
                name="Top 1"
                valueField="top1"
                showInLegend={false}
            />
            <Series
                argumentField="date"
                name="Top 2"
                valueField="top2"
                showInLegend={false}
            />
            <Series
                argumentField="date"
                name="Top 3"
                valueField="top3"
                showInLegend={false}
            />
            <Series
                argumentField="date"
                name="Top 4"
                valueField="top4"
                showInLegend={false}
            />
            <Series
                argumentField="date"
                name="Top 5"
                valueField="top5"
                showInLegend={false}
            />
            <Tooltip enabled shared customizeTooltip={customizeTooltip} />

            <Legend
                visible
                verticalAlignment="bottom"
                horizontalAlignment="center"
                customizeItems={customizeItems}
                hoverMode={'none'}
            />

            <Export enabled={false} />

            <Title text="Top 5 Repeated Defects" font={{ size: 20 }} />

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

export default Top5RepeatedDefect;
