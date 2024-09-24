import { yupResolver } from '@hookform/resolvers/yup';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// devextreme
import { Popup } from 'devextreme-react';
// @mui
import { Box, Card, Grid, Stack, Tab, Tabs, Typography, useTheme, Link } from '@mui/material';
// Redux
import { LoadingButton } from '@mui/lab';
// routes
// hooks
import { FormProvider } from '../../../components/hook-form/index';
import useResponsive from '../../../hooks/useResponsive';
import useSettings from '../../../hooks/useSettings';
// components
import FloatButton from '../../../components/button/FloatButton';
import PopupConfirm from '../../../components/PopupConfirm';
import Scrollbar from '../../../components/Scrollbar';
// CONFIG
import { HEADER } from '../../../config';
import IconName from '../../../utils/iconsName';

function MLearningPopup({ modalContent = {}, onClose = () => { } }) {
    // theme
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const mdUp = useResponsive('up', 'md');
    const smUp = useResponsive('up', 'sm');
    // Variable for responsive
    const BREAKCRUM_HEIGHT = 41;
    const SPACING = 24;
    const ANDROID_KEYBOARD = 0;
    const TAB_HEIGHT = 48;
    const BACK_BUTTON_HEIGHT = 42;
    const SUBMIT_BUTTON = 52;

    return (
        <Popup
            visible={modalContent.visible}
            onHiding={onClose}
            dragEnabled={false}
            closeOnOutsideClick
            showCloseButton
            showTitle
            title={'M-Learning'}
            style={{ top: "60px !important" }}
            // container=".dx-viewport"
            width={mdUp ? "90%" : '100%'}
            height={mdUp ? '90%' : '100%'}
            animation={{
                show: {
                    type: 'fade',
                    duration: 400,
                    from: 0,
                    to: 1,
                },
                hide: {
                    type: 'fade',
                    duration: 400,
                    from: 1,
                    to: 0,
                },
            }}
        >
            <Stack spacing={3} sx={{ paddingBottom: 20 }}>
                <Card
                    id="compliance-card-detail"
                    sx={{
                        minHeight: '50vh',
                        height: {
                            xs: `calc(100vh - ${HEADER.MOBILE_HEIGHT + SPACING + ANDROID_KEYBOARD + TAB_HEIGHT}px)`,
                            sm: `calc(100vh - ${HEADER.MOBILE_HEIGHT + SPACING + ANDROID_KEYBOARD + TAB_HEIGHT}px)`,
                            lg: `calc(100vh - ${HEADER.DASHBOARD_DESKTOP_HEIGHT + SPACING + ANDROID_KEYBOARD + TAB_HEIGHT}px)`,
                        },
                    }}
                >
                    <Box textAlign={'center'} mt={2} height={'100%'}>
                        {/* <Link href="https://lms.motivesfareast.com/slides" target={"_blank"}>{`https://lms.motivesfareast.com/slides`}</Link> */}
                        <iframe title='lms.motivesfareast.com' allowFullScreen allow="http://localhost:5053" height={"95%"} width={"100%"} src="https://lms.motivesfareast.com/slides" />
                    </Box>
                </Card>
            </Stack>
        </Popup>
    );
}

export default MLearningPopup