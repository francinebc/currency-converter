import React from 'react';
import TextField from '@mui/material/TextField';
import CurrencySelector from './CurrencySelector';

const ConverterFrame: React.FC = () => {
    return (
        <div>
            <TextField label="Send" variant="standard"/>
            <CurrencySelector/>
        </div>
    );
};

export default ConverterFrame;
