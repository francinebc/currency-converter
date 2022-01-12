import React from 'react';
import './App.css';
import {Box} from '@mui/material';
import ConverterFrame from './components/ConverterFrame';

const App: React.FC = () => {
    return (
        <Box sx={{
            backgroundImage: 'url("https://paytron.com.au/static/media/Background.7482072b.png")',
            backgroundSize: 'cover',
            resize: 'both',
            height: '100vh'
        }}>
            <Box sx={{
                margin: 'theme.spacing(8)'
            }}>
                <ConverterFrame/>
            </Box>
        </Box>
    );
}

export default App;
