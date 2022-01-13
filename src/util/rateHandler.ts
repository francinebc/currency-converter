import {fetchRate, RateRequest} from '../api/rate';

const markup = 0.005; // markup as decimal

export function fetchAndProcessRate(rateRequest: RateRequest): Promise<Rate> {
    return fetchRate(rateRequest)
        .then(response => {
            if (response && response.midMarketRate) {
                return {
                    baseRate: response.midMarketRate,
                    adjustedRate: response.midMarketRate * (1 - markup),
                    originalBuyAmount: response.clientBuyAmount,
                    adjustedBuyAmount: response.clientBuyAmount * (1 - markup)
                };
            } else {
                throw new Error('Oops! Something went wrong');
            }
        });
}

export type Rate = {
    baseRate: number,
    adjustedRate: number,
    originalBuyAmount: number,
    adjustedBuyAmount: number
}