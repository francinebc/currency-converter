import React from 'react';
import './App.css';
import {Box, useMediaQuery, useTheme} from '@mui/material';
import ConverterFrame from './components/ConverterFrame';

const App: React.FC = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const internalBoxPadding = isSmall ? theme.spacing(2) : theme.spacing(6);

    return (
        <Box sx={{
            backgroundImage: 'url("https://paytron.com.au/static/media/Background.7482072b.png")',
            backgroundSize: 'cover',
            resize: 'both',
            height: '100vh'
        }}>
            <Box sx={{
                padding: `${internalBoxPadding}`,
                width: `min(450px, calc(100% - calc(${internalBoxPadding} * 2)))`
            }}>
                <ConverterFrame/>
            </Box>
        </Box>
    );
}

export default App;
