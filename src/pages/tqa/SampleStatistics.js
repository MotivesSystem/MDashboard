import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, IconButton, Menu, styled as MuiStyled, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import useResponsive from '../../hooks/useResponsive';
// custom components;
import Iconify from '../../components/Iconify';
import { FormProvider } from '../../components/hook-form';
import LoadingBackDrop from '../../components/BackDrop';
import Image from "../../components/Image";
import Page from '../../components/Page';
// utils
import axios from '../../utils/axios';
import IconName from '../../utils/iconsName';
import uuidv4 from '../../utils/uuidv4';
// config
import { NOTCH_HEIGHT } from '../../config';




// ----------------------------------------------------------------
function SampleStatistics() {
    return (
        <Page title="TQA - Sample Statistics">
            s
        </Page>
    )
}

export default SampleStatistics