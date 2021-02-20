
import React from 'react';
import { useField } from 'formik';
import Select, { Option } from "react-select";


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