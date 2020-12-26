import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { eachDayOfInterval } from "date-fns/esm";

import { Location, RentObject, Interval } from '../lib/interfaces'

import { Form, FormGroup, Label, Input, Spinner, Button } from "reactstrap";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfDay from "date-fns/startOfDay";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import subDays from 'date-fns/subDays'
import isBefore from "date-fns/isBefore"
import CustomDatepicker from './custom-datepicker';

import TimeRangeSlider from './time-range';

export default function BookingForm() {

    const [locations, setLocations] = useState<Array<Location>>(undefined)
    const [location, setLocation] = useState<Location>(undefined)

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
        if (!locations) {
            api.get('/cowork/locations/').then((response) => {
                if (response.status == 200) {
                    setLocations(response.data);
                    setLocation(response.data[0])
                } else {
                    console.log(response)
                }
            })
        }
    }, [])

    useEffect(() => {
        const fetchRentObjects = async () => {
            if (location) {
                try {
                    // const response = await api.get(`/cowork/rentobjects?location=${location.id}&type=${objectType}&start=${date}T${startTime}Z&duration=${duration}`)
                    const response = await api.get(`/cowork/rentobjects?location=${location.id}&type=${objectType}&date=${selectedDate.toISOString()}`)
                    const rentObjects = response.data as Array<RentObject>;
                    setRentObjects(rentObjects);
                    setRentObject(rentObjects[0])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchRentObjects()
    }, [location, objectType, selectedDate])

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
            <div className="container mt-5 pt-5">
                <div className="col overflow-hidden">
                    <h1 className="intro-section-title">{location && location.title}</h1>
                    <Form onSubmit={handleSubmit} className="pt-3">

                        {/* Rent Objects */}
                        <FormGroup tag="fieldset">
                            <legend>Locations</legend>
                            {locations && locations.map((el, i) => (
                                <FormGroup key={i} check>
                                    <Label check>
                                        <Input onChange={() => setLocation(el)} checked={location && location.id === el.id} type="radio" />{el.title}
                                    </Label>
                                </FormGroup>
                            ))}
                        </FormGroup>

                        {/* Rent Objects */}
                        <FormGroup tag="fieldset">
                            {/* <legend>Object Type</legend> */}
                            <div className="row">
                                <div className="col-4" onClick={() => handleValueChange('desktop', 'objectType')} >
                                    <div className={`card overflow-hidden dashboard--card ${objectType && objectType == 'desktop' && 'border-primary'}`}>
                                        <div className="dashboard--card__icon"><i className="ion-md-list"></i></div>
                                        <div className="card-body">
                                            <h2 className="mb-0">Desktop</h2>
                                            <p>Service</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4" onClick={() => handleValueChange('phone', 'objectType')}>
                                    <div className={`card overflow-hidden dashboard--card ${objectType && objectType == 'phone' && 'border-primary'}`}>
                                        <div className="dashboard--card__icon"><i className="ion-md-star"></i></div>
                                        <div className="card-body">
                                            <h2 className="mb-0">Phone</h2>
                                            <p>Service</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4" onClick={() => handleValueChange('meeting', 'objectType')}>
                                    <div className={`card overflow-hidden dashboard--card ${objectType && objectType == 'meeting' && 'border-primary'}`}>
                                        <div className="dashboard--card__icon"><i className="ion-md-bookmark"></i></div>
                                        <div className="card-body">
                                            <h2 className="mb-0">Meeting</h2>
                                            <p>Service</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CustomDatepicker selectedDate={selectedDate} handleWeekChange={(selectedDate) => setSelectedDate(startOfDay(selectedDate))} />

                            <div className="row">
                                {week && week.map((el, i) => {
                                    return (
                                        <div
                                            className={`col card py-2 m-1 ${isBefore(el, startOfDay(new Date())) && 'disabled'} ${selectedDate.toDateString() === el.toDateString() && 'border-primary'}`}
                                            key={i}
                                            onClick={() => setSelectedDate(el)}>
                                            {/* {weekDay.toLocaleDateString()} */}
                                            <div>{format(el, 'd')}</div>
                                            <div>{format(el, 'iii')}</div>
                                        </div>
                                    )
                                })}
                            </div>

                        </FormGroup>

                        {/* Rent Objects */}
                        <FormGroup className="mt-5" tag="fieldset">
                            <legend>Rent Objects</legend>
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