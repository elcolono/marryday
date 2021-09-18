import React from 'react';
import at from 'lodash/at';
import { useField } from 'formik';
import { Input, FormFeedback } from 'reactstrap';

export default function InputField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <React.Fragment>
      <Input
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