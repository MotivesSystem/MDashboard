import { Box, LinearProgress, Typography } from "@mui/material";

// ----------------------------------------------------------------
export default function LinearProgressWithLabel(props: LinearProgressProps & { value: number, name: string }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Box sx={{ minWidth: 35, }}>
                <Typography variant="body2" color="black" sx={{ fontSize: 12 }}>{props?.name}</Typography>
            </Box>

            <Box sx={{ width: '90%', }}>
                <LinearProgress variant="determinate"  {...props} sx={{
                    width: '100%',
                    // "& .MuiLinearProgress-bar": {
                    //     backgroundColor: "#6ce5e8 !important",
                    // },
                    "& .MuiLinearProgress-barColorPrimary": {
                        backgroundColor: "#0080b5 !important",
                    },
                    height: 10,
                }}
                    value={generateProgressValue(props.value)}
                />
            </Box>

            <Box sx={{ minWidth: 35, ml: 1 }}>
                <Typography variant="body2" color="black" sx={{ fontSize: 12 }}>{`${Math.round(
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