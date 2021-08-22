import React from 'react';

import { useEffect, useState } from 'react';
import { api } from '../../../../lib/api';
import { RentObject } from '../../../../lib/interfaces';

import isEmpty from 'lodash/isEmpty'
import { useFormikContext } from 'formik';
import { FormGroup, Nav, NavItem, NavLink } from "reactstrap";

import TimeRangeSlider from '../../../../components/TimeRangeSlider';
import SelectField from '../../../../components/FormFields/SelectField';
import CustomDatepicker from '../../../../components/CustomDatepicker';

import { eachDayOfInterval } from "date-fns/esm";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfDay from "date-fns/startOfDay";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore"
import Swiper from 'react-id-swiper';


export default function BookingForm(props) {

    const {
        prices,
        locationSlug,
        formField: {
            rentObjects,
            rentObject
        }
    } = props;
    const { setFieldValue, values } = useFormikContext()

    const [week, setWeek] = useState<Array<Date>>(undefined)
    const [timeRangeError, setTimeRangeError] = useState(false)

    useEffect(() => {
        values && values['selectedDate'] && setWeekDays(values['selectedDate']);
    }, [values['selectedDate']])


    useEffect(() => {
        const fetchRentObjects = async () => {
            if (locationSlug) {
                try {
                    const response = await api.get(`/cowork/rentobjects?location=${locationSlug}&type=${values['objectType']}&date=${values['selectedDate'].toISOString()}`)
                    const rentObjects = response.data as Array<RentObject>;
                    setFieldValue('rentObjects', rentObjects)
                    setFieldValue('rentObject', rentObjects[0])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchRentObjects()
    }, [values['objectType'], values['selectedDate']])


    const handleValueChange = async (value, name) => {
        // Check target value wheter to conditionally make new request
        name == 'selectedDate' && setFieldValue('selectedDate', value);
        name == 'objectType' && setFieldValue('objectType', value);
    }

    const setWeekDays = date => {
        const weekStart = startOfWeek(date);
        const weekEnd = endOfWeek(date);
        var result = eachDayOfInterval({ start: weekStart, end: weekEnd });
        setWeek(result)
    }

    const timeRangeErrorHandler = ({ error }) => {
        setTimeRangeError(error)
    }

    const objectTypes = [
        {
            label: "Arbeiten",
            value: "desktop"
        },
        {
            label: "Telefonie",
            value: "phone"
        },
        {
            label: "Meeting",
            value: "meeting"
        }
    ]

    const params = {
        slidesPerView: 5,
    }

    return (

        <section id="intro_section">

            <p className="text-muted">
                <span className="text-primary h2">
                    € {' '}
                    {values && values['objectType'] == "desktop" && prices.desktop_hour && prices.desktop_hour.toFixed(2)}
                    {values && values['objectType'] == "phone" && prices.phone_hour && prices.phone_hour.toFixed(2)}
                    {values && values['objectType'] == "meeting" && prices.meeting_hour && prices.meeting_hour.toFixed(2)}
                </span>{" "}
                    / Stunde
                </p>

            <hr className="my-4" />

            {/* Rent Objects */}
            <Nav className="nav-pills-custom-2">
                {objectTypes && objectTypes.map((ot) => (
                    <NavItem className="flex-fill text-center" key={ot.value} >
                        <NavLink
                            href="#"
                            onClick={() => handleValueChange(ot.value, 'objectType')}
                            className={ot.value === values['objectType'] ? "active" : ""}
                        >
                            {ot.label}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>

            {/* Date Picker */}
            <div className="p-2 d-flex justify-content-between">
                <span>{values && startOfWeek(values['selectedDate']).toLocaleDateString}</span>
                <CustomDatepicker
                    selectedDate={values['selectedDate']}
                    handleWeekChange={(date) => handleValueChange(startOfDay(date), 'selectedDate')}
                />
            </div>
            <Nav className="nav-pills-custom-2">
                <Swiper {...params}>
                    {week && week.map((date, index) => (
                        <NavItem className="text-center" key={index} >
                            <NavLink
                                href="#"
                                key={index}
                                onClick={() => handleValueChange(startOfDay(date), 'selectedDate')}
                                className={values && values['selectedDate'].toDateString() === date.toDateString() ? "active" : ""}
                                disabled={isBefore(date, startOfDay(new Date()))}
                            >
                                <div><b>{format(date, 'd')}</b></div>
                                <div><small>{format(date, 'iii')}</small></div>
                            </NavLink>
                        </NavItem>

                    ))}
                </Swiper>
            </Nav>

            {/* Rent Objects */}
            {!isEmpty(values['rentObjects']) ? (
                <React.Fragment>
                    <FormGroup className="mt-5" tag="fieldset">
                        <SelectField
                            name={rentObject.name}
                            label={rentObject.label}
                            data={values['rentObjects']}
                            fullWidth
                        />
                    </FormGroup>
                    <div className="overflow-hidden">
                        {values['rentObject'] && <TimeRangeSlider
                            selectedDate={values['selectedDate']}
                            disabledIntervals={values['rentObject'].rent_object_bookings}
                            errorHandler={timeRangeErrorHandler}
                            error={timeRangeError}
                        />}
                    </div>


                </React.Fragment>
            ) : <div className="text-block">
                    <p className="text-muted text-center">Sorry, leider noch keine Objekte vorhanden.</p>
                    <p className="mb-5 text-center">
                        <img
                            src="/assets/img/illustration/undraw_through_the_desert_fcin.svg"
                            width={200}
                            height={279}
                            // layout="intrinsic"
                            alt=""
                            className="img-fluid"
                            sizes="(max-width: 576px) 100vw, 530px"
                        />
                    </p>
                </div>}
        </section >
    )
}