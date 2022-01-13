import React, {HTMLAttributes} from 'react';
import {Autocomplete, AutocompleteRenderInputParams, Box, TextField} from '@mui/material';
import {AutocompleteChangeReason, AutocompleteValue} from '@mui/base/AutocompleteUnstyled/useAutocomplete';

const CurrencySelector: React.FC<Props> = (props) => {
    return (
        <div>
            <Autocomplete
                options={countries}
                autoHighlight
                getOptionLabel={(option: CountryCurrency) => `${option.name} (${option.currencyCode})`}
                renderOption={(props: HTMLAttributes<HTMLLIElement>, option: CountryCurrency) => (
                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        {option.name} ({option.currencyCode})
                    </Box>
                )}
                renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                        {...params}
                        label={props.label}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
                onChange={(event: React.SyntheticEvent, value: AutocompleteValue<CountryCurrency, false, false, false>, reason: AutocompleteChangeReason) => {
                    if (reason === 'selectOption') {
                        props.handleChange(value?.currencyCode);
                    } else if (reason === 'removeOption' || reason === 'clear') {
                        props.handleChange(null);
                    }
                }}
            />
        </div>
    );
};

type Props = {
    label: string
    handleChange: (currencyCode: string | null | undefined) => void
}

type CountryCurrency = {
    countryCode: string,
    currencyCode: string,
    name: string
}

const countries: CountryCurrency[] = [
    {
        countryCode: 'AE',
        currencyCode: 'AED',
        name: 'United Arab Emirates Dirham'
    },
    {
        countryCode: 'AU',
        currencyCode: 'AUD',
        name: 'Australian Dollar'
    },
    {
        countryCode: 'CA',
        currencyCode: 'CAD',
        name: 'Canadian Dollar'
    },
    {
        countryCode: 'CN',
        currencyCode: 'CNY',
        name: 'Chinese Yuan'
    },
    {
        countryCode: 'GB',
        currencyCode: 'GBP',
        name: 'British Pound'
    },
    {
        countryCode: 'HK',
        currencyCode: 'HKD',
        name: 'Hong Kong Dollar'
    },
    {
        countryCode: 'HR',
        currencyCode: 'HRK',
        name: 'Croatian Kuna'
    },
    {
        countryCode: 'BORKED',
        currencyCode: 'NOT APPLICABLE WILL BREAK',
        name: 'Broken Currency'
    },
    {
        countryCode: 'JP',
        currencyCode: 'JPY',
        name: 'Japanese Yen'
    },
    {
        countryCode: 'MX',
        currencyCode: 'MXN',
        name: 'Mexican Peso'
    },
    {
        countryCode: 'NZ',
        currencyCode: 'NZD',
        name: 'New Zealand Dollar'
    },
    {
        countryCode: 'PL',
        currencyCode: 'PLN',
        name: 'Polish Zloty'
    },
    {
        countryCode: 'SA',
        currencyCode: 'SAR',
        name: 'Saudi Riyal'
    },

    {
        countryCode: 'TH',
        currencyCode: 'THB',
        name: 'Thai Baht'
    },
    {
        countryCode: 'US',
        currencyCode: 'USD',
        name: 'United States Dollar'
    },
];

export default CurrencySelector;
