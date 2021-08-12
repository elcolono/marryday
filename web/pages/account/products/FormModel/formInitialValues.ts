import checkoutFormModel from './productFormModel';

const {
    formField: {
        title,
        description
    }
} = checkoutFormModel;

export default {
    [title.name]: '',
    [description.name]: '',
};