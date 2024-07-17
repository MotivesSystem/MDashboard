import React from 'react'
import { Stack, Skeleton, Box } from '@mui/material';

// ----------------------------------------------------------------
export default function SkeletonSampleStatistics({ listLength = 10, gridTemplateColumns = '1fr 1fr 1fr 1fr' }: { listLength: number, gridTemplateColumns: string }) {
    return (
        <Stack display={'grid'} gridTemplateColumns={gridTemplateColumns} columnGap={2} rowGap={2} justifyContent='center' alignItems='center'>
            {
                [...new Array(listLength)].map((_, index) => {
                    return (
                        <Stack key={index} display={'flex'} direction={'row'} justifyContent='center' alignContent='center' spacing={1}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
                                <Skeleton variant='rounded' width={50} height={50} />
                            </Box>

                            <Stack spacing={1} height={'100%'}>
                                <Skeleton variant='rectangular' height={10} width={60} sx={{ borderRadius: 1 }} />
                                <Skeleton variant='rectangular' height={10} width={60} sx={{ borderRadius: 1 }} />
                            </Stack>
                            <Box height={'100%'}>
                                <Skeleton variant='rectangular' height={50} width={50} />
                            </Box>
                        </Stack>
                    );
                }
                )
            }
        </Stack>
    )
}
