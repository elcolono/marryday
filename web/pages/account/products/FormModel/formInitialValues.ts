import checkoutFormModel from './productFormModel';

const {
    formField: {
        title,
        description,
        images,
    }
} = checkoutFormModel;

export default {
    [title.name]: '',
    [description.name]: '',
    [images.name]: [],
};