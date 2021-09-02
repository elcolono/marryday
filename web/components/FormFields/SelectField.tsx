import
    React from 'react';
import {useField} from 'formik';
import Select, {Option} from "react-select";


function SelectField(props) {
    const {label, options, ...rest} = props;

    const [field, meta, helpers] = useField(props);
    const {setValue} = helpers;

    const {value: selectedValue} = field;

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
                {...rest}
                value={options.filter((option) => option.id === selectedValue)}
                options={options}
                onChange={(option: Option) => setValue(option.id)}
                instanceId={props.iid}
                styles={customStyles}
            />
        </React.Fragment>
    );
}

export default SelectField;