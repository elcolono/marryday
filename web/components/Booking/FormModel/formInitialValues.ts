import checkoutFormModel from './bookingFormModel';
const {
  formField: {
    objectType,
    selectedDate,
    rentObjects,
    timeInterval,
    rentObject,
    firstName,
    lastName,
    email,
    validCard
  }
} = checkoutFormModel;

export default {
  [objectType.name]: 'phone',
  [selectedDate.name]: new Date(),
  
  [rentObjects.name]: [],
  [rentObject.name]: '',

  [timeInterval.name]: [],
  [firstName.name]: '',
  [lastName.name]: '',
  [email.name]: '',
  [validCard.name]: false,
};