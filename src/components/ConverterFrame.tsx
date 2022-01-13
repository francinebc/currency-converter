import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import CurrencySelector from './CurrencySelector';
import {Paper, Typography, useTheme} from '@mui/material';

const ConverterFrame: React.FC = () => {
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState<string|null|undefined>();
    const [toCurrency, setToCurrency] = useState<string|null|undefined>();

    const theme = useTheme();

    return (
        <Paper elevation={3} sx={{padding: `${theme.spacing(2)}`}}>
            <TextField label="Send" variant="standard"/>
            <CurrencySelector label="From" handleChange={setFromCurrency}/>
            <CurrencySelector label="To" handleChange={setToCurrency}/>
            <Typography variant="body1" gutterBottom>
                ${convertedAmount} from {fromCurrency} to {toCurrency}
            </Typography>
        </Paper>
    );
};

export default ConverterFrame;
