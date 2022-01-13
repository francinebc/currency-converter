import React from 'react';
import {Autocomplete, Box, TextField} from '@mui/material';
import {AutocompleteChangeReason, AutocompleteValue} from '@mui/base/AutocompleteUnstyled/useAutocomplete';

const CurrencySelector: React.FC<Props> = (props) => {
    return (
        <div>
            <Autocomplete
                sx={{width: 400}}
                options={countries}
                autoHighlight
                getOptionLabel={(option: CountryCurrency) => `${option.name} (${option.currencyCode})`}
                renderOption={(props: any, option: CountryCurrency) => (
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
                renderInput={(params: any) => (
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
                    }
                }
                }
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
        countryCode: 'BG',
        currencyCode: 'BGN',
        name: 'Bulgarian Lev'
    },
    {
        countryCode: 'BH',
        currencyCode: 'BHD',
        name: 'Bahraini Dinar'
    },
    {
        countryCode: 'CA',
        currencyCode: 'CAD',
        name: 'Canadian Dollar'
    },
    {
        countryCode: 'CH',
        currencyCode: 'CHF',
        name: 'Swiss Franc'
    },
    {
        countryCode: 'CN',
        currencyCode: 'CNY',
        name: 'Chinese Yuan'
    },
    {
        countryCode: 'CZ',
        currencyCode: 'CZK',
        name: 'Czech Koruna'
    },
    {
        countryCode: 'DK',
        currencyCode: 'DKK',
        name: 'Danish Krone'
    },
    {
        countryCode: 'EUR',
        currencyCode: 'pan',
        name: 'Euro'
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
        countryCode: 'HU',
        currencyCode: 'HUF',
        name: 'Hungarian Forint'
    },
    {
        countryCode: 'ID',
        currencyCode: 'IDR',
        name: 'Indonesian Rupiah'
    },
    {
        countryCode: 'IL',
        currencyCode: 'ILS',
        name: 'Israeli New Sheqel'
    },
    {
        countryCode: 'IN',
        currencyCode: 'INR',
        name: 'Indian Rupee'
    },
    {
        countryCode: 'JP',
        currencyCode: 'JPY',
        name: 'Japanese Yen'
    },
    {
        countryCode: 'KE',
        currencyCode: 'KES',
        name: 'Kenyan Shilling'
    },
    {
        countryCode: 'KW',
        currencyCode: 'KWD',
        name: 'Kuwaiti Dinar'
    },
    {
        countryCode: 'MX',
        currencyCode: 'MXN',
        name: 'Mexican Peso'
    },
    {
        countryCode: 'MY',
        currencyCode: 'MYR',
        name: 'Malaysian Ringgit'
    },
    {
        countryCode: 'NO',
        currencyCode: 'NOK',
        name: 'Norwegian Krone'
    },
    {
        countryCode: 'NZ',
        currencyCode: 'NZD',
        name: 'New Zealand Dollar'
    },
    {
        countryCode: 'JP',
        currencyCode: 'OMR',
        name: 'Omani Rial'
    },
    {
        countryCode: 'PH',
        currencyCode: 'PHP',
        name: 'Philippine Peso'
    },
    {
        countryCode: 'PL',
        currencyCode: 'PLN',
        name: 'Polish Zloty'
    },
    {
        countryCode: 'QA',
        currencyCode: 'QAR',
        name: 'Qatari Rial'
    },
    {
        countryCode: 'RO',
        currencyCode: 'RON',
        name: 'Romanian New Leu'
    },
    {
        countryCode: 'SA',
        currencyCode: 'SAR',
        name: 'Saudi Riyal'
    },
    {
        countryCode: 'SE',
        currencyCode: 'SEK',
        name: 'Swedish Krona'
    },
    {
        countryCode: 'SG',
        currencyCode: 'SGD',
        name: 'Singapore Dollar'
    },
    {
        countryCode: 'TH',
        currencyCode: 'THB',
        name: 'Thai Baht'
    },
    {
        countryCode: 'TR',
        currencyCode: 'TRY',
        name: 'Turkish Lira'
    },
    {
        countryCode: 'UG',
        currencyCode: 'UGX',
        name: 'Ugandan Shilling'
    },
    {
        countryCode: 'US',
        currencyCode: 'USD',
        name: 'United States Dollar'
    },
    {
        countryCode: 'ZA',
        currencyCode: 'ZAR',
        name: 'South African Rand'
    }
];

export default CurrencySelector;
