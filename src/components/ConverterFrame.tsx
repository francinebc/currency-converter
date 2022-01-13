import React, {ChangeEvent, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import CurrencySelector from './CurrencySelector';
import {Paper, Typography, useTheme} from '@mui/material';
import {fetchRate, RateResponse} from '../api/rate';

const ConverterFrame: React.FC = () => {
    const [fromAmount, setFromAmount] = useState(0);
    const [rateResponse, setRateResponse] = useState<RateResponse | null>(null);
    const [fromCurrency, setFromCurrency] = useState<string | null | undefined>('');
    const [toCurrency, setToCurrency] = useState<string | null | undefined>('');

    useEffect(() => {
        if (fromAmount && fromCurrency && toCurrency) {
            fetchRate({Sell: fromCurrency, Buy: toCurrency, Amount: fromAmount, Fixed: 'sell'})
                .then(response => {
                    setRateResponse(response);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [fromAmount, fromCurrency, toCurrency]);

    const theme = useTheme();

    return (
        <Paper elevation={3} sx={{
            padding: `${theme.spacing(2)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(2)}`,
        }}>
            <TextField label="Send" variant="standard"
                       onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                           // todo: handle errors
                           setFromAmount(Number(event.target.value));
                       }
                       }/>
            <CurrencySelector label="From" handleChange={setFromCurrency}/>
            <CurrencySelector label="To" handleChange={setToCurrency}/>

            {rateResponse ?
                <Typography variant="body1" gutterBottom>
                    ${rateResponse.amount} at {rateResponse.rate}
                </Typography>
                : <></>
            }
        </Paper>
    );
};

export default ConverterFrame;
