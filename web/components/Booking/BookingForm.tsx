import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { eachDayOfInterval } from "date-fns/esm";

import { Location, RentObject, Interval } from '../../lib/interfaces'

import { Form, FormGroup, Label, Input, Spinner, Button, Row, Col } from "reactstrap";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfDay from "date-fns/startOfDay";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import subDays from 'date-fns/subDays'
import isBefore from "date-fns/isBefore"
import CustomDatepicker from '../CustomDatepicker';

import TimeRangeSlider from '../TimeRangeSlider';
import Draggable from 'react-draggable';

import { useFormikContext } from 'formik';


export default function BookingForm(props) {

    const {
        locationSlug,
        formField: {
            start,
            end
        }
    } = props;
    const { setFieldValue, values } = useFormikContext()

    const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()))
    const [week, setWeek] = useState<Array<Date>>(undefined)

    const [rentObjects, setRentObjects] = useState<Array<RentObject>>(undefined)
    const [rentObject, setRentObject] = useState<RentObject>(undefined)

    const [selectedInterval, setSelectedInterval] = useState(undefined)

    const [timeRangeError, setTimeRangeError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        values && values['selectedDate'] && setWeekDays(values['selectedDate']);
    }, [values['selectedDate']])


    useEffect(() => {
        const fetchRentObjects = async () => {
            if (locationSlug) {
                try {
                    const response = await api.get(`/cowork/rentobjects?location=${locationSlug}&type=${values['objectType']}&date=${values['selectedDate'].toISOString()}`)
                    const rentObjects = response.data as Array<RentObject>;
                    setRentObjects(rentObjects);
                    setRentObject(rentObjects[0])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchRentObjects()
    }, [locationSlug, values['objectType'], values['selectedDate']])

    async function handleSubmit(e) {
        // e.preventDefault();
        // setIsLoading(true)
        // const data = {
        //     "rent_object": rentObject['id'],
        //     "start": selectedInterval[0],
        //     "end": selectedInterval[1],
        // }
        // console.log(data);
        // try {
        //     await api.post('/cowork/bookings/', data)
        //     setIsLoading(false)
        // } catch (error) {
        //     console.log(error)
        //     setIsLoading(false)
        // }
    }

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

    const onChangeTimeInterval = ti => {
        setFieldValue(start.name, ti[0]);
        setFieldValue(end.name, ti[1]);
    }

    const timeRangeErrorHandler = ({ error }) => {
        setTimeRangeError(error)
    }

    return (

        <section id="intro_section">
            <p className="text-muted">
                <span className="text-primary h2">
                    € {' '}
                    {values && values['objectType'] == "desktop" && 8.99}
                    {values && values['objectType'] == "phone" && 6.99}
                    {values && values['objectType'] == "meeting" && 7.99}
                </span>{" "}
                    / Stunde
                </p>

            <hr className="my-4" />
            <div className="overflow-hidden">
                <Form onSubmit={handleSubmit} className="pt-3">
                    {/* Rent Objects */}
                    <FormGroup tag="fieldset">
                        <div className="pb-2 d-flex">
                            <div className={`flex-fill py-3 text-center card ${values && values['objectType'] == 'desktop' && 'border-primary'}`} onClick={() => handleValueChange('desktop', 'objectType')} >
                                <span>Desktop</span>
                            </div>
                            <div className={`flex-fill py-3 text-center card ${values && values['objectType'] == 'phone' && 'border-primary'}`} onClick={() => handleValueChange('phone', 'objectType')}>
                                <span>Phone</span>
                            </div>
                            <div className={`flex-fill py-3 text-center card ${values && values['objectType'] == 'meeting' && 'border-primary'}`} onClick={() => handleValueChange('meeting', 'objectType')}>
                                <span>Meeting</span>
                            </div>
                        </div>

                        <div className="p-2 d-flex justify-content-between">
                            <span>{values && startOfWeek(values['selectedDate']).toLocaleDateString}</span>
                            <CustomDatepicker
                                selectedDate={values['selectedDate']}
                                handleWeekChange={(date) => handleValueChange(startOfDay(date), 'selectedDate')}
                            />
                        </div>

                        <Draggable
                            axis="x"
                            defaultPosition={{ x: 0, y: 0 }}
                            bounds={{ left: -200, right: 0 }}
                        >
                            <div className="week-slider row">
                                {week && week.map((el, i) => {
                                    return (
                                        <div
                                            className={`text-center col card py-2 m-1 ${isBefore(el, startOfDay(new Date())) && 'disabled'} ${values && values['selectedDate'].toDateString() === el.toDateString() && 'border-primary'}`}
                                            key={i}
                                            onClick={() => handleValueChange(startOfDay(el), 'selectedDate')}>
                                            {/* {weekDay.toLocaleDateString()} */}
                                            <div>{format(el, 'd')}</div>
                                            <div>{format(el, 'iii')}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Draggable>
                    </FormGroup>

                    {/* Rent Objects */}
                    <FormGroup className="mt-5" tag="fieldset">
                        {rentObjects && rentObjects.map((el, i) => (
                            <FormGroup key={i} check>
                                <Label check>
                                    <Input
                                        onChange={() => setRentObject(el)}
                                        checked={rentObject && rentObject.id === el.id}
                                        type="radio"
                                    />
                                    {' '}
                                    {el.title}
                                    {/* ({el.bookings.map(booking => (`${booking.start} - ${booking.end}`))}) */}
                                </Label>
                            </FormGroup>
                        ))}
                    </FormGroup>

                    {rentObject && (
                        <TimeRangeSlider
                            selectedDate={values['selectedDate']}
                            selectedInterval={selectedInterval}
                            disabledIntervals={rentObject.bookings}
                            changeTimeInterval={onChangeTimeInterval}
                            increaseSelectedDay={() => handleValueChange(addDays(selectedDate, 1), 'selectedDate')}
                            decreaseSelectedDay={() => handleValueChange(subDays(selectedDate, 1), 'selectedDate')}
                            errorHandler={timeRangeErrorHandler}
                            error={timeRangeError}
                        />
                    )}

                    {/* BOOKING BUTTON */}
                    {/* <FormGroup className="mt-5">
                        <Button disabled={(isLoading || timeRangeError) && true} type="submit" color="primary" block>
                            Reservieren {isLoading && (<Spinner />)}
                        </Button>
                    </FormGroup> */}
                    {/* <Button disabled={(isLoading || timeRangeError) && true} type="submit" className="btn btn-danger btn-block">Buchen {isLoading && (<Spinner />)}</Button> */}
                </Form>
            </div>
            <style jsx>{`
                .disabled {
                    pointer-events:none;
                    opacity: 0.5;
                };
            `}</style>
        </section >
    )
}