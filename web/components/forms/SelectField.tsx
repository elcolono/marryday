import
    React from 'react';
import {useField} from 'formik';
import Select, {Option} from "react-select";
import isEmpty from "lodash/isEmpty"

export default function SelectField(props) {
    const {label, options, isMulti, ...rest} = props;

    const [field, meta, helpers] = useField(props);
    const {setValue} = helpers;

    const {value: selectedValue} = field;
    console.log(selectedValue)

    const customStyles = {
        // control: (base, state) => ({
        //   ...base,
        //   borderColor: state.isSelected ? 'orange' : '',
        // }),
    }
    return (
        <>
            {!isMulti ?
                <Select
                    {...field}
                    {...rest}
                    value={options.filter((option) => (option.id ?? option.value) === selectedValue)}
                    options={options}
                    onChange={(option: Option) => setValue(option.id ?? option.value ?? null)}
                    instanceId={props.iid}
                    styles={customStyles}
                /> :
                <Select
                    {...field}
                    {...rest}
                    value={options.filter(option1 => !isEmpty(selectedValue) ? selectedValue?.some(value => value === option1.value) : false)}
                    options={options}
                    onChange={(option: Option) => setValue(option.map(({value}) => value) ?? null)}
                    instanceId={props.iid}
                    styles={customStyles}
                    isMulti
                />}

        </>
    );
}