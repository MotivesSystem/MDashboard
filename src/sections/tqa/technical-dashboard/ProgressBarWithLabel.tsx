import { LinearProgress, Box, Typography, } from "@mui/material";

// ----------------------------------------------------------------
export default function LinearProgressWithLabel(props: LinearProgressProps & { value: number, width: number, height: number }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: props?.width || 100, }}>
            <Box sx={{ width: '100%', }}>
                <LinearProgress variant="determinate" {...props} sx={{
                    height: 10,
                    "& .MuiLinearProgress-barColorPrimary": {
                        backgroundColor: "#0080b5 !important",
                    },
                }}
                    value={generateProgressValue(props?.value)}
                />
            </Box>
            <Box sx={{ minWidth: 35, ml: 1 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const generateProgressValue = (value) => {
    const valueNumber = Number(value);
    if (valueNumber < 100) {
        return valueNumber
    }
    return 100
}