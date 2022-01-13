import React, {ChangeEvent, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import CurrencySelector from './CurrencySelector';
import {CircularProgress, Paper, Typography, useTheme} from '@mui/material';
import {fetchRate, RateResponse} from '../api/rate';

const ConverterFrame: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fromAmount, setFromAmount] = useState(0);
    const [blurredFromAmount, setBlurredFromAmount] = useState(0);
    const [rateResponse, setRateResponse] = useState<RateResponse | null>(null);
    const [fromCurrency, setFromCurrency] = useState<string | null | undefined>('');
    const [toCurrency, setToCurrency] = useState<string | null | undefined>('');
    const [error, setError] = useState<string | null>('');

    useEffect(() => {
        if (blurredFromAmount && fromCurrency && toCurrency) {
            setIsLoading(true);
            fetchRate({Sell: fromCurrency, Buy: toCurrency, Amount: blurredFromAmount, Fixed: 'sell'})
                .then(response => {
                    if (response && response.midMarketRate) {
                        setError(null);
                        setRateResponse(response);
                    } else {
                        setError('Oops! Something went wrong');
                        setRateResponse(null);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError('Oops! Something went wrong')
                    console.log(error)
                });
        }
    }, [blurredFromAmount, fromCurrency, toCurrency]);

    const theme = useTheme();

    const getResult = () => {
        if (isLoading) {
            return <CircularProgress/>;
        }

        if (error) {
            return <Typography variant="body1">{error}</Typography>
        }

        if (rateResponse && rateResponse.midMarketRate) {
            return (<>
                <Typography variant="h6">
                    {rateResponse.clientBuyAmount} {toCurrency}
                </Typography>
                <Typography sx={{
                    color: 'gray',
                    fontStyle: 'italic'
                }}>
                    mid market rate of {rateResponse.midMarketRate}
                </Typography>
            </>);
        }

        return <Typography variant="body1">Enter an amount to see how much you can sell!</Typography>
    }

    return (
        <Paper elevation={3} sx={{
            padding: `${theme.spacing(2)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(2)}`,
        }}>
            <Typography variant="h4">Currency Converter</Typography>
            <TextField label="Send" variant="standard"
                       onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                           // todo: handle errors
                           setFromAmount(Number(event.target.value));
                       }}
                       onBlur={() => {
                           setBlurredFromAmount(fromAmount);
                       }}/>
            <CurrencySelector label="From" handleChange={setFromCurrency}/>
            <CurrencySelector label="To" handleChange={setToCurrency}/>

            {getResult()}
        </Paper>
    );
};

export default ConverterFrame;
