import * as Yup from 'yup';
import checkoutFormModel from './bookingFormModel';
const {
    formField: {
        rentObject,
        email,
        emptyCard,
        completeCard
    }
} = checkoutFormModel;

export default [
    Yup.object().shape({

    }),
    Yup.object().shape({
        // [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
        // [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
        [email.name]: Yup.string().required(`${email.requiredErrorMsg}`).email("Must be a valid email"),
        [emptyCard.name]: Yup.boolean().isFalse(`${emptyCard.requiredErrorMsg}`),
        [completeCard.name]: Yup.boolean().isTrue(`${completeCard.requiredErrorMsg}`),
        [rentObject.name]: Yup.object().required(`${rentObject.requiredErrorMsg}`),
    })
];