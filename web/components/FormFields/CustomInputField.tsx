import React from 'react';
import at from 'lodash/at';
import {useField} from 'formik';
import {FormFeedback, CustomInput} from 'reactstrap';

export default function CustomInputField(props) {
    const {errorText, ...rest} = props;
    const [field, meta] = useField(props);

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }

    return (
        <React.Fragment>
            <CustomInput
                invalid={meta.touched && meta.error && true}
                type="text"
                helpertext={_renderHelperText()}
                {...field}
                {...rest}
            />
            <FormFeedback>{_renderHelperText()}</FormFeedback>
        </React.Fragment>
    );
}