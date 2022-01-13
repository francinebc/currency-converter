// todo: add more tests
import {fetchAndProcessRate} from '../../util/rateHandler';
import * as rateApi from '../../api/rate';

test('rate handler correctly mutates api data', () => {
    // given
    const rateRequest: rateApi.RateRequest = {
        Sell: 'test',
        Buy: 'test',
        Amount: 1000,
        Fixed: 'sell'
    }

    const apiSpy = jest.spyOn(rateApi, 'fetchRate');
    apiSpy.mockResolvedValue({
        midMarketRate: 1.5,
        clientBuyAmount: 1500
    });

    // when
    const fetchPromise = fetchAndProcessRate(rateRequest);

    // then
    fetchPromise.then(res => {
        expect(res.originalBuyAmount).toBe(1500);
        expect(res.adjustedBuyAmount).toBe(1492.5);
        expect(res.baseRate).toBe(1.5);
        expect(res.adjustedRate).toBe(1.4925);
    })
});

test('rate handler resolves error when no data', () => {
    // given
    const rateRequest: rateApi.RateRequest = {
        Sell: 'test',
        Buy: 'test',
        Amount: 1000,
        Fixed: 'sell'
    }

    const apiSpy = jest.spyOn(rateApi, 'fetchRate');
    apiSpy.mockResolvedValue({
        midMarketRate: undefined,
        clientBuyAmount: 1500
    });

    // then
    return fetchAndProcessRate(rateRequest).catch(e => expect(e.message).toMatch('Oops! Something went wrong'));

});
