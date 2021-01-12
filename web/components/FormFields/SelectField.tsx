
import React from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import Select, { Option, ReactSelectProps } from "react-select";
import { FormFeedback } from 'reactstrap';


function SelectField(props) {
  const { label, data, ...rest } = props;

  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const { value: selectedValue } = field;

  const customStyles = {
    // control: (base, state) => ({
    //   ...base,
    //   borderColor: state.isSelected ? 'orange' : '',
    // }),
  }
  return (
    <React.Fragment>

      <Select
        {...field}
        value={selectedValue ? selectedValue : ''}
        options={data}
        getOptionLabel={(option) => option.title}
        getOptionValue={(option) => option.id}
        onChange={(option: Option) => setValue(option)}
        instanceId={props.iid}
        styles={customStyles}
      />
    </React.Fragment>


  );
}

export default SelectField;