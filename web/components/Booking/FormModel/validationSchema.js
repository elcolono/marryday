import * as Yup from 'yup';
import moment from 'moment';
import checkoutFormModel from './bookingFormModel';
const {
    formField: {
        objectType,
        rentObject,
        firstName,
        lastName,
        email,
        emptyCard,
        completeCard
    }
} = checkoutFormModel;

const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

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