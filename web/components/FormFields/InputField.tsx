import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { Input, Label, FormFeedback } from 'reactstrap';

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
        helperText={_renderHelperText()}
        {...field}
        {...rest}
      />
      <FormFeedback>{_renderHelperText()}</FormFeedback>
    </React.Fragment>

    // <TextField
    //   type="text"
    //   error={meta.touched && meta.error && true}
    //   helperText={_renderHelperText()}
    //   {...field}
    //   {...rest}
    // />
  );
}