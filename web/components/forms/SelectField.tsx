import
    React, {useState} from 'react';
import {useField} from 'formik';
import Select, {Option} from "react-select";
import AsyncSelect from 'react-select/async';
import isEmpty from "lodash/isEmpty"
import getToken from "../../utils/getToken";
import fetchAPI from "../../utils/fetchAPI";
import {toast} from "react-toastify";

export default function SelectField(props) {
    const {label, options, isMulti = false, asyncUrl, ...rest} = props;
    const [field, meta, helpers] = useField(props);
    const {setValue} = helpers;
    const {value: selectedValue} = field;

    const [values, setValues] = useState([])


    const fetchOptions = async () => {
        try {
            const token = getToken()
            const response = await fetchAPI(
                asyncUrl,
                {
                    token: token
                }
            )
            setValues(response)
            return response
        } catch (error) {
            toast.error(error.detail ?? "Something went wrong.")
        }
    }

    return (
        <>
            {!asyncUrl ?
                <Select
                    {...field}
                    {...rest}
                    value={options.filter((option) => (option.id ?? option.value) === selectedValue)}
                    options={options}
                    onChange={(option: Option) => setValue(option.id ?? option.value ?? null)}
                    instanceId={props.iid}
                /> :
                <AsyncSelect
                    value={values.filter(option1 => !isEmpty(selectedValue) ? selectedValue?.some(value => value === option1.id) : false)}
                    instanceId={props.iid}
                    defaultOptions
                    cacheOptions
                    loadOptions={fetchOptions}
                    getOptionLabel={option => option.title}
                    getOptionValue={option => option.id}
                    onChange={(option: Option) => setValue(option.map(({id}) => id) ?? null)}
                    isMulti={isMulti}
                />}

        </>
    );
}