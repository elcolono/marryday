import fetchAPI from '../utils/fetchAPI';

function addSubscriber(data = {}) {
    return fetchAPI(`/cowork/mailchimp-audience`, { method: 'POST', body: data, })
}

export default addSubscriber;