import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFormikContext} from "formik";
import debounce from 'lodash/debounce';

export default function AutoSave({debounceMs = 1000}) {
    const formik = useFormikContext()
    const didMountRef = useRef(false)
    const [isSaved, setIsSaved] = useState(null)
    const debouncedSubmit = useCallback(
        debounce(() => {
            return formik.submitForm().then(() => setIsSaved(true))
        }, debounceMs),
        [formik.submitForm, debounceMs],
    );

    useEffect(() => {
        if (didMountRef.current) {
            debouncedSubmit();
        } else {
            didMountRef.current = true
        }
    }, [debouncedSubmit, formik.values]);

    return (
        <p className="text-center text-success">
            {!!formik.isSubmitting
                ? 'Saving...'
                : isSaved
                    ? 'Your changes saved.'
                    : null}
        </p>
    );
}