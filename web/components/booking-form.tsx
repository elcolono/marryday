import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { eachDayOfInterval } from "date-fns/esm";

import { Location, RentObject } from '../lib/interfaces'

import dynamic from "next/dynamic";

import { Form, FormGroup, Label, Input, Spinner, Button } from "reactstrap";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import format from "date-fns/format";
import CustomDatepicker from './custom-datepicker';

export default function BookingForm() {

    const [locations, setLocations] = useState<Array<Location>>(undefined)
    const [location, setLocation] = useState<Location>(undefined)
    const [objectType, setObjectType] = useState('desktop')
    const [startTime, setStartTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
    const [date, setDate] = useState(new Date())
    const [duration, setDuration] = useState(60)
    const [rentObjects, setRentObjects] = useState<Array<RentObject>>(undefined)
    const [rentObject, setRentObject] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [week, setWeek] = useState([])

    useEffect(() => {
        selectedDate && setWeekDays(selectedDate);
    }, [selectedDate])

    useEffect(() => {
        if (!locations) {
            api.get('/cowork/locations/').then((response) => {
                if (response.status == 200) {
                    setLocations(response.data);
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
                    const response = await api.get(`/cowork/rentobjects?location=${location.id}&type=${objectType}&start=${date}T${startTime}Z&duration=${duration}`)
                    setRentObjects(response.data);
                } catch (error) {
                    console.log(error)
                }
            }
        }

        fetchRentObjects()

    }, [location, objectType, date, startTime, duration])

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            "rent_object": rentObject,
            "start": `${date}T${startTime}Z`,
            "duration": duration
        }
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
        name == 'startTime' && setStartTime(value)
        name == 'date' && setDate(value)
        name == 'duration' && setDuration(value)
    }

    const setWeekDays = selectedDate => {
        const weekStart = startOfWeek(selectedDate);
        const weekEnd = endOfWeek(selectedDate);
        var result = eachDayOfInterval({ start: weekStart, end: weekEnd });
        setWeek(result)
    }


    const handleWeekChange = selectedDate => {
        setSelectedDate(selectedDate);
        setWeekDays(selectedDate);
    };

    return (

        <section id="intro_section">
            <div className="row no-gutters coming-soon">
                <div className="col-lg-12 p-5">
                    <div className="row">
                        <div className="col-md-10">
                            <h1 className="intro-section-title">{location && location.title}</h1>
                            <Form onSubmit={handleSubmit} className="pt-3">
                                <FormGroup tag="fieldset">
                                    {/* <legend>Object Type</legend> */}
                                    <div className="row">
                                        <div className="col-md-4" onClick={() => handleValueChange('desktop', 'objectType')} >
                                            <div className="card overflow-hidden dashboard--card">
                                                <div className="dashboard--card__icon"><i className="ion-md-list"></i></div>
                                                <div className="card-body">
                                                    <h2 className="mb-0">Desktop</h2>
                                                    <p>Service</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4" onClick={() => handleValueChange('phone', 'objectType')}>
                                            <div className="card overflow-hidden dashboard--card">
                                                <div className="dashboard--card__icon"><i className="ion-md-star"></i></div>
                                                <div className="card-body">
                                                    <h2 className="mb-0">Phone</h2>
                                                    <p>Service</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4" onClick={() => handleValueChange('meeting', 'objectType')}>
                                            <div className="card overflow-hidden dashboard--card">
                                                <div className="dashboard--card__icon"><i className="ion-md-bookmark"></i></div>
                                                <div className="card-body">
                                                    <h2 className="mb-0">Meeting</h2>
                                                    <p>Service</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CustomDatepicker selectedDate={selectedDate} handleWeekChange={handleWeekChange} />
                                    {week.map((el, i) => (
                                        <div className="col card py-2 m-1" key={i} onClick={() => setSelectedDate(el)}>
                                            {/* {weekDay.toLocaleDateString()} */}
                                            <div>{format(el, 'd')}</div>
                                            <div>{format(el, 'iii')}</div>
                                        </div>
                                    ))}
                                </FormGroup>

                                {/* <FormGroup>
                                                <Label>Date</Label>
                                                <Input value={date} onChange={(e) => handleValueChange(e.target.value, 'date')} type="date" />
                                            </FormGroup> */}

                                <FormGroup>
                                    <Label>Time</Label>
                                    <Input value={startTime} onChange={(e) => handleValueChange(e.target.value, 'time')} type="time" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Dauer</Label>
                                    <Input value={duration} onChange={(e) => handleValueChange(e.target.value, 'duration')} min={15} max={300} step={15} type="range" />
                                </FormGroup>

                                {/* Rent Objects */}
                                <FormGroup tag="fieldset">
                                    <legend>Rent Objects</legend>
                                    {rentObjects && rentObjects.map((el, i) => (
                                        <FormGroup key={i} check>
                                            <Label check>
                                                <Input onChange={() => setRentObject(String(el.id))} checked={rentObject === `${el.id}`} type="radio" />{' '}
                                                {el.title} ({el.bookings.map(booking => (`${booking.start} - ${booking.end}`))})
                                        </Label>
                                        </FormGroup>
                                    ))}
                                </FormGroup>

                                {/* BOOKING BUTTON */}
                                <Button disabled={isLoading && true} type="submit" className="btn btn-danger btn-block">Buchen {isLoading && (<Spinner />)}</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

