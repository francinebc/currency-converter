import React from 'react';
import './App.css';
import {Box, useMediaQuery, useTheme} from '@mui/material';
import ConverterFrame from './components/ConverterFrame';

const App: React.FC = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundImage: 'url("https://paytron.com.au/static/media/Background.7482072b.png")',
            backgroundSize: 'cover',
            resize: 'both',
            height: '100vh'
        }}>
            <Box sx={{
                padding: `${isSmall ? theme.spacing(2) : theme.spacing(6)}`,
                width: 'min(450px, 100%)'
            }}>
                <ConverterFrame/>
            </Box>
        </Box>
    );
}

export default App;
