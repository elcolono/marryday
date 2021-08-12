import fetchAPI from '../utils/fetchAPI';

export default function addSubscriber(data = {}) {
    return fetchAPI(`/cowork/mailchimp-audience`, { method: 'POST', body: data, })
}
