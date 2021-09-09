
function makeJSDateObject(date: Date) {

    if (date instanceof Date) {
        return new Date(date.getTime());
    }

    return date as any; // handle case with invalid input
}

export default makeJSDateObject;