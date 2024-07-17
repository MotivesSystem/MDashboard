import { Skeleton, Stack } from "@mui/material"

export default function SkeletonPieChart({ height = 400, width = "100%" }) {
    return (
        <Stack justifyContent='center' alignItems='center' position={'relative'} width={'100%'}>
            <Skeleton variant='rectangular' height={height} width={width} sx={{ borderRadius: 1 }} />
        </Stack>
    )
}