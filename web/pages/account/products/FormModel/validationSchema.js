import * as Yup from 'yup';
import checkoutFormModel from './productFormModel';

const {
    formField: {
        title,
        description
    }
} = checkoutFormModel;

export default [
    Yup.object().shape({
        [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
        [description.name]: Yup.string().required(`${description.requiredErrorMsg}`),
    }),
    Yup.object().shape({}),
    Yup.object().shape({
        // [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
        // [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
        // [email.name]: Yup.string().required(`${email.requiredErrorMsg}`).email("Must be a valid email"),
        // [emptyCard.name]: Yup.boolean().isFalse(`${emptyCard.requiredErrorMsg}`),
    })
];