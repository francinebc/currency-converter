import request from 'superagent'

const url = 'https://wnvgqqihv6.execute-api.ap-southeast-2.amazonaws.com/Public/public/rates';

export function fetchRate(rateRequest: RateRequest):Promise<RateResponse> {
    return request
        .get(url)
        .query(rateRequest)
        .then(res => res.body);
}

export type RateRequest = {
    Sell: string,
    Buy: string,
    Amount: number,
    Fixed: 'buy' | 'sell'
}

export type RateResponse = {
    midMarketRate: number,
}