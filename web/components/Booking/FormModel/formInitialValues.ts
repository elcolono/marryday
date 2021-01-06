import checkoutFormModel from './bookingFormModel';
const {
  formField: {
    objectType,
    selectedDate,
    rentObjects,
    timeInterval,
    rentObject,
    // firstName,
    // lastName,
    email,
    completeCard,
    emptyCard
  }
} = checkoutFormModel;

export default {
  [objectType.name]: 'desktop',
  [selectedDate.name]: new Date(),
  
  [rentObjects.name]: [],
  [rentObject.name]: '',

  [timeInterval.name]: [],
  // [firstName.name]: '',
  // [lastName.name]: '',
  [email.name]: '',
  [completeCard.name]: false,
  [emptyCard.name]: true,
};