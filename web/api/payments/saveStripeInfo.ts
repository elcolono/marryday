import fetchAPI from '../../utils/fetchAPI';

function saveStripeInfo(data = {}) {
    return fetchAPI(`/payments/save-stripe-info/`, { method: 'POST', body: data, })
}

export default saveStripeInfo;