import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import CurrencySelector from './CurrencySelector';
import {CircularProgress, Paper, Typography, useTheme} from '@mui/material';
import {fetchAndProcessRate, Rate} from '../util/rateHandler';

const ConverterFrame: React.FC = () => {
    // todo: abstract state into parent component for easier testing
    const [fromAmount, setFromAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState<string | null | undefined>('');
    const [toCurrency, setToCurrency] = useState<string | null | undefined>('');

    /*
        We wait for the user to blur the amount input, otherwise we could be doing an api fetch every keystroke.
        This could be handled better by rate limiting the api e.g.
     */
    const [blurredFromAmount, setBlurredFromAmount] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [rateResponse, setRateResponse] = useState<Rate | null>(null);
    const [error, setError] = useState<string | null>('');

    const rateRefreshInterval = 30000; // 30 seconds
    let refetchIntervalId = useRef<number | null>(null);

    /**
     * When blurredFromAmount, fromCurrency, or toCurrency changes we re-fetch the rate information
     */
    useEffect(() => {
        if (refetchIntervalId && refetchIntervalId.current) {
            window.clearInterval(refetchIntervalId.current);
        }

        if (blurredFromAmount && fromCurrency && toCurrency) {
            setIsLoading(true);

            const refetchRate = () => {
                if (blurredFromAmount && fromCurrency && toCurrency) {
                    console.info('Refetching rate')
                    fetchAndProcessRate({Sell: fromCurrency, Buy: toCurrency, Amount: blurredFromAmount, Fixed: 'sell'})
                        .then(response => {
                            setError(null);
                            setRateResponse(response);
                        })
                        .catch(error => {
                            // this is for an update so we can log errors quietly rather than displaying to customer
                            console.log(error)
                        });
                }
            }

            fetchAndProcessRate({Sell: fromCurrency, Buy: toCurrency, Amount: blurredFromAmount, Fixed: 'sell'})
                .then(response => {
                    setError(null);
                    setRateResponse(response);
                    setIsLoading(false);
                    refetchIntervalId.current = window.setInterval(refetchRate, rateRefreshInterval);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError('Oops! Something went wrong')
                    console.log(error)
                });
        }
    }, [blurredFromAmount, fromCurrency, toCurrency]);

    const theme = useTheme();

    // todo: refactor into own component
    const getResult = () => {
        if (isLoading) {
            return <CircularProgress/>;
        }

        if (error) {
            return <Typography variant="body1">{error}</Typography>
        }

        if (rateResponse) {
            return (<>
                <Typography variant="h6">
                    {Number(rateResponse.adjustedBuyAmount).toFixed(2)} {toCurrency}
                </Typography>
                <Typography sx={subtitleStyles}>
                    mid market rate of {Number(rateResponse.baseRate).toFixed(2)}
                </Typography>
                <Typography sx={subtitleStyles}>
                    adjusted rate of {Number(rateResponse.adjustedRate).toFixed(2)}
                </Typography>
                <Typography sx={subtitleStyles}>
                    our
                    cut: {Number(rateResponse.originalBuyAmount - rateResponse.adjustedBuyAmount).toFixed(2)} {toCurrency}
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

const subtitleStyles = {
    color: 'gray',
    fontStyle: 'italic'
}

export default ConverterFrame;
