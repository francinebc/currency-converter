import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import CurrencySelector from './CurrencySelector';
import {Paper, Typography, useTheme} from '@mui/material';

const ConverterFrame: React.FC = () => {
    const [fromAmount, setFromAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState<string | null | undefined>();
    const [toCurrency, setToCurrency] = useState<string | null | undefined>();

    const theme = useTheme();

    const handleCurrencyChange = () => {
        if (fromAmount && fromCurrency && toCurrency) {
            setConvertedAmount(fromAmount * 2)
        }
    }

    return (
        <Paper elevation={3} sx={{padding: `${theme.spacing(2)}`}}>
            <TextField label="Send" variant="standard"
                       onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                           handleCurrencyChange();
                           setFromAmount(Number(event.target.value));
                       }
                       }/>

            <CurrencySelector label="From" handleChange={currency => {
                setFromCurrency(currency);
                handleCurrencyChange();
            }}/>

            <CurrencySelector label="To" handleChange={currency => {
                setToCurrency(currency);
                handleCurrencyChange();
            }}/>

            {fromAmount && fromCurrency && toCurrency ?
            <Typography variant="body1" gutterBottom>
                ${convertedAmount} from {fromCurrency} to {toCurrency}
            </Typography>
                : <></>
            }
        </Paper>
    );
};

export default ConverterFrame;
