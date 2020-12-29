import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { eachDayOfInterval } from "date-fns/esm";

import { Location, RentObject, Interval } from '../lib/interfaces'

import { Form, FormGroup, Label, Input, Spinner, Button, Row, Col } from "reactstrap";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfDay from "date-fns/startOfDay";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import subDays from 'date-fns/subDays'
import isBefore from "date-fns/isBefore"
import CustomDatepicker from './CustomDatepicker';

import TimeRangeSlider from './TimeRangeSlider';
import Draggable from 'react-draggable';

export default function BookingForm({ locationSlug }) {

    const [objectType, setObjectType] = useState('phone')

    const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()))
    const [week, setWeek] = useState<Array<Date>>(undefined)

    const [rentObjects, setRentObjects] = useState<Array<RentObject>>(undefined)
    const [rentObject, setRentObject] = useState<RentObject>(undefined)

    const [selectedInterval, setSelectedInterval] = useState(undefined)

    const [timeRangeError, setTimeRangeError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        selectedDate && setWeekDays(selectedDate);
    }, [selectedDate])


    useEffect(() => {
        const fetchRentObjects = async () => {
            if (locationSlug) {
                try {
                    const response = await api.get(`/cowork/rentobjects?location=${locationSlug}&type=${objectType}&date=${selectedDate.toISOString()}`)
                    const rentObjects = response.data as Array<RentObject>;
                    setRentObjects(rentObjects);
                    setRentObject(rentObjects[0])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchRentObjects()
    }, [locationSlug, objectType, selectedDate])

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            "rent_object": rentObject['id'],
            "start": selectedInterval[0],
            "end": selectedInterval[1],
        }
        console.log(data);
        try {
            await api.post('/cowork/bookings/', data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleValueChange = async (value, name) => {
        // Check target value wheter to conditionally make new request
        name == 'objectType' && setObjectType(value)
        name == 'selectedDate' && setSelectedDate(value)
    }

    const setWeekDays = selectedDate => {
        const weekStart = startOfWeek(selectedDate);
        const weekEnd = endOfWeek(selectedDate);
        var result = eachDayOfInterval({ start: weekStart, end: weekEnd });
        setWeek(result)
    }

    const onChangeTimeInterval = ti => {
        console.log("TimeInterval changed", ti)
        setSelectedInterval(ti)
    }

    const timeRangeErrorHandler = ({ error }) => {
        setTimeRangeError(error)
    }

    return (

        <section id="intro_section">
            <div className="overflow-hidden">
                <Form onSubmit={handleSubmit} className="pt-3">
                    {/* Rent Objects */}
                    <FormGroup tag="fieldset">
                        <div className="pb-2 d-flex">
                            <div className={`flex-fill py-3 text-center card ${objectType && objectType == 'desktop' && 'border-primary'}`} onClick={() => handleValueChange('desktop', 'objectType')} >
                                <span>Desktop</span>
                            </div>
                            <div className={`flex-fill py-3 text-center card ${objectType && objectType == 'phone' && 'border-primary'}`} onClick={() => handleValueChange('phone', 'objectType')}>
                                <span>Phone</span>
                            </div>
                            <div className={`flex-fill py-3 text-center card ${objectType && objectType == 'meeting' && 'border-primary'}`} onClick={() => handleValueChange('meeting', 'objectType')}>
                                <span>Meeting</span>
                            </div>
                        </div>

                        <div className="p-2 d-flex justify-content-between">
                            <span>{selectedDate && startOfWeek(selectedDate).toLocaleDateString}</span>
                            <CustomDatepicker selectedDate={selectedDate} handleWeekChange={(selectedDate) => setSelectedDate(startOfDay(selectedDate))} />
                        </div>

                        <Draggable
                            axis="x"
                            // handle=".handle"
                            defaultPosition={{ x: 0, y: 0 }}
                            bounds={{ left: -200, right: 0 }}
                        // grid={[25, 25]}
                        // scale={1}
                        // onStart={this.handleStart}
                        // onStop={this.handleStop}
                        >
                            <div className="week-slider row">
                                {week && week.map((el, i) => {
                                    return (
                                        <div
                                            className={`text-center col card py-2 m-1 ${isBefore(el, startOfDay(new Date())) && 'disabled'} ${selectedDate.toDateString() === el.toDateString() && 'border-primary'}`}
                                            key={i}
                                            onClick={() => setSelectedDate(el)}>
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
                            selectedDate={selectedDate}
                            selectedInterval={selectedInterval}
                            disabledIntervals={rentObject.bookings}
                            changeTimeInterval={onChangeTimeInterval}
                            increaseSelectedDay={() => setSelectedDate(addDays(selectedDate, 1))}
                            decreaseSelectedDay={() => setSelectedDate(subDays(selectedDate, 1))}
                            errorHandler={timeRangeErrorHandler}
                            error={timeRangeError}
                        />
                    )}


                    {/* BOOKING BUTTON */}
                    <Button disabled={(isLoading || timeRangeError) && true} type="submit" className="btn btn-danger btn-block">Buchen {isLoading && (<Spinner />)}</Button>
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