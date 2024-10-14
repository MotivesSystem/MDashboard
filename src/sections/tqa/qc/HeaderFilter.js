import moment from 'moment';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
// dev-extreme
import { DateBox } from 'devextreme-react';
// @mui
import { Autocomplete, Box, Button, Grid, Stack, TextField, Checkbox, FormControlLabel, Paper, Divider } from "@mui/material";
// COMPONENTS
import Iconify from '../../../components/Iconify';
// utils
import { HOST_API_DASHBOARD } from '../../../config';
import axios from '../../../utils/axios';
import IconName from '../../../utils/iconsName';

const baseHosting = HOST_API_DASHBOARD;

const filters = [
    { label: "Month-to-date", type: "dateRange", value: "mtd" },
    { label: "Quarter-to-date", type: "dateRange", value: "qtd" },
    { label: "Year-to-date", type: "dateRange", value: "ytd" },
    { label: "Customer", type: "enum", fieldName: "customers", apiUrl: "/api/masterdata/get-customer-master-data" },
    { label: "Factory", type: "enum", fieldName: "factories", apiUrl: "/api/masterdata/get-factory-master-data" },
    { label: "Division", type: "enum", fieldName: "divisions", apiUrl: "/api/masterdata/get-division-master-data" },
]

export default function HeaderFilter({ handleChangeFilter = () => { }, handleApplyFilter = () => { }, handleClearFilter = () => { } }) {
    const [enumsData, setEnumsData] = useState([]);
    const [startDate, setStartDate] = useState(new Date(moment().quarter(moment().quarter()).startOf('quarter').toString()));
    const [endDate, setEndDate] = useState(new Date());
    const [selectAll, setSelectAll] = useState([
        { fieldName: "customers", value: false },
        { fieldName: "factories", value: false },
        { fieldName: "divisions", value: false }
    ]);
    const [fieldData, setFieldData] = useState([
        { fieldName: "customers", data: [] },
        { fieldName: "factories", data: [] },
        { fieldName: "divisions", data: [] }
    ]);

    const getEnumsData = useCallback(() => {
        const newData = [];
        filters.map(async (filter) => {
            if (filter?.type === "enum") {
                await axios.get(`${baseHosting}${filter?.apiUrl}`).then((response) => {
                    if (response?.data?.result === "success") {
                        newData.push({
                            enumName: filter?.label,
                            fieldName: filter.fieldName,
                            data: response?.data?.reply
                        });
                        setEnumsData(newData);
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
            return filter;
        })
    }, [])

    const handleChangeDateRangeFilter = (value = "") => {
        switch (value) {
            case "mtd":
                setStartDate(new Date(moment().startOf('month').toString()));
                setEndDate(new Date());
                break;
            case "qtd":
                setStartDate(new Date(moment().quarter(moment().quarter()).startOf('quarter').toString()));
                setEndDate(new Date());
                break;
            case "ytd":
                setStartDate(new Date(moment().startOf('year').toString()));
                setEndDate(new Date());
                break;
            default:
                setStartDate(new Date(moment().quarter(moment().quarter()).startOf('quarter').toString()));
                setEndDate(new Date());
                break;
        }
    }

    const handleToggleSelectAll = (fieldName) => {
        setSelectAll((prev) => {
            const valueObj = {};
            let textValue = '';
            if (!prev.find((i) => i.fieldName === fieldName).value) {
                enumsData?.find(e => e.fieldName === fieldName).data.map((v) => {
                    textValue = `${textValue},${v.Id}`
                    return v;
                })
                valueObj[fieldName] = textValue
                setFieldData(f => {
                    const newFieldValue = fieldData.find(f => f.fieldName === fieldName);
                    newFieldValue.data = enumsData?.find(e => e.fieldName === fieldName).data;
                    return [...f, newFieldValue];
                })
                handleChangeFilter(valueObj);
            }
            const newFieldValue = prev.find((i) => i.fieldName === fieldName)
            newFieldValue.value = !newFieldValue.value
            return [...prev, newFieldValue];
        });
    };


    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        setSelectAll([
            { fieldName: "customers", value: false },
            { fieldName: "factories", value: false },
            { fieldName: "divisions", value: false }
        ]);
        setFieldData([
            { fieldName: "customers", data: [] },
            { fieldName: "factories", data: [] },
            { fieldName: "divisions", data: [] }
        ]);
        handleClearFilter();
    }

    const disableDates = (args) => {
        return moment(args.date).diff(startDate, 'days') < 0;
    }

    useEffect(() => {
        getEnumsData();
        handleChangeFilter({
            "start_date": moment(startDate).format('yyyy/MM/DD').toString(),
            "end_date": moment(endDate).format('yyyy/MM/DD').toString()
        });
    }, [])

    return (
        <Grid container mt={1} spacing={2}>
            {filters.map((filter) => {
                if (filter.type === "dateRange")
                    return (
                        <Grid item sm={4} key={filter.label}>
                            <Box display={'flex'} justifyContent={"center"}>
                                <Button fullWidth variant="outlined" onClick={() => handleChangeDateRangeFilter(filter.value)}>{filter.label}</Button>
                            </Box>
                        </Grid>
                    )
                if (filter.type === "enum") {
                    return (
                        <Grid item sm={1.6} key={filter.label}>
                            <Autocomplete
                                id={filter.label}
                                multiple
                                autoComplete
                                disableCloseOnSelect
                                limitTags={1}
                                onChange={(e, newValue) => {
                                    const valueObj = {}
                                    let textValue = ''
                                    newValue.map((v) => {
                                        textValue = `${v.Id},${textValue}`
                                        return v;
                                    })
                                    valueObj[filter.fieldName] = `${textValue || ""}`
                                    setFieldData(field => {
                                        const newFieldValue = fieldData.find(f => f.fieldName === filter.fieldName)
                                        newFieldValue.data = newValue
                                        return [...field, newFieldValue]
                                    })
                                    handleChangeFilter(valueObj);
                                }}
                                value={fieldData.find(f => f.fieldName === filter.fieldName).data || []}
                                getOptionLabel={(option) => {
                                    return option?.Name === undefined ? '' : `${option?.Name}` || '';
                                }}
                                options={enumsData?.find((enumData) => enumData?.enumName === filter?.label)?.data || []}
                                size="small"
                                autoHighlight
                                // sx={{ width: '100%', minWidth: 150 }}
                                renderInput={(params) => (
                                    <RenderInput
                                        params={{ ...params }}
                                        label={filter.label}
                                    // required
                                    />
                                )}
                                // PopperComponent={PopperStyle}
                                // renderOption={(props, option) => {
                                //     return (
                                //         <Box component="li" {...props}>
                                //             {option?.Name}
                                //         </Box>
                                //     );
                                // }}
                                renderOption={(props, option, { selected }) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <li key={key} {...optionProps}>
                                            <Checkbox
                                                //   icon={icon}
                                                //   checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.Name}
                                        </li>
                                    );
                                }}
                                isOptionEqualToValue={(option, value) => {
                                    return `${option?.Id}` === `${value?.Id}`;
                                }}
                                PaperComponent={(paperProps) => {
                                    const { children, ...restPaperProps } = paperProps;
                                    return (
                                        <Paper {...restPaperProps}>
                                            <Box
                                                onMouseDown={(e) => e.preventDefault()} // prevent blur
                                                pl={1.5}
                                                py={0.5}
                                            >
                                                <FormControlLabel
                                                    onClick={(e) => {
                                                        e.preventDefault(); // prevent blur
                                                        handleToggleSelectAll(filter.fieldName);
                                                    }}
                                                    label="Select all"
                                                    control={
                                                        <Checkbox id="select-all-checkbox" checked={selectAll.find((field) => field.fieldName === filter.fieldName).value} />
                                                    }
                                                />
                                            </Box>
                                            <Divider />
                                            {children}
                                        </Paper>
                                    );
                                }}
                            />
                        </Grid>
                    )
                }
                return filter;

            })}
            <Grid item sm={2}>
                <DateBox
                    type="date"
                    displayFormat={"dd/MM/yyyy"}
                    label="From Date"
                    // labelMode="hidden"
                    style={{
                        // maxHeight: "60px",
                        marginTop: "0.5px",
                        overFlow: 'hidden',
                        "&.dxButtonContent": {
                            maxHeight: "40px !important",
                        },
                        border: 'none'
                    }}
                    value={startDate}
                    onValueChanged={(newValue) => {
                        const dateString = moment(newValue.value).format('yyyy/MM/DD').toString();
                        setStartDate(newValue.value)
                        handleChangeFilter({ "start_date": dateString })
                    }}
                    height={50}
                    // width={160}
                    showTodayButton
                    hoverStateEnabled={false}
                    activeStateEnabled={false}
                    openOnFieldClick
                    acceptCustomValue={false}
                    className='tqa-dropdown-date'
                />
            </Grid>
            <Grid item sm={2}>
                <DateBox
                    type="date"
                    displayFormat={"dd/MM/yyyy"}
                    label="To Date"
                    style={{
                        // maxHeight: "60px",
                        marginTop: "0.5px",
                        overFlow: 'hidden',
                        "&.dxButtonContent": {
                            maxHeight: "40px !important",
                        },
                        border: 'none'
                    }}
                    value={endDate}
                    onValueChanged={(newValue) => {
                        const dateString = moment(newValue.value).format('yyyy/MM/DD').toString();
                        setEndDate(newValue.value)
                        handleChangeFilter({ "end_date": dateString })
                    }}
                    height={50}
                    // width={160}
                    disabledDates={disableDates}
                    showTodayButton
                    hoverStateEnabled={false}
                    activeStateEnabled={false}
                    openOnFieldClick
                    acceptCustomValue={false}
                    className='tqa-dropdown-date'
                />
            </Grid>
            <Grid item sm={3.2} display={'flex'} alignItems={"center"} gap={1}>
                <Button fullWidth variant="contained" color='info' onClick={handleApplyFilter}>
                    Apply
                </Button>
                <Button fullWidth variant="contained" color='info' onClick={handleClear}>
                    Clear Filter
                </Button>
            </Grid>
        </Grid>
    )
}

const RenderInput = ({ params, label, ...other }) => {
    RenderInput.propTypes = {
        params: PropTypes.object,
        label: PropTypes.string,
    };

    return (
        <TextField
            {...params}
            fullWidth
            onFocus={(event) => {
                event.target.select();
            }}
            size="small"
            label={
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Iconify icon={IconName.search} />
                    <p className="ml-1 mr-1">{label}</p>
                    {other?.required && (
                        // <Iconify icon={'bi:asterisk'} sx={{ color: 'red', ml: 1, fontSize: 7 }} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 16 16">
                            <path
                                fill="red"
                                d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8L1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
                            />
                        </svg>
                    )}
                </Stack>
            }
            InputLabelProps={{
                style: { color: 'var(--label)' },
                shrink: true,
            }}
        />
    );
};