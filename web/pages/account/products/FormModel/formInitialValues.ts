import checkoutFormModel from './productFormModel';

const {
    formField: {
        title,
        description,
        files,
    }
} = checkoutFormModel;

export default {
    [title.name]: '',
    [description.name]: '',
    [files.name]: [],
};