import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import dynamic from "next/dynamic";
import { Form, FormGroup, Label, Input, Spinner, Button } from "reactstrap";


export default function BookingSection({ data }) {

    const [locations, setLocations] = useState(false)
    const [location, setLocation] = useState(false)
    const [objectType, setObjectType] = useState('desktop')
    const [startTime, setStartTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
    const [date, setDate] = useState('2020-12-09')
    const [duration, setDuration] = useState(60)
    const [rentObjects, setRentObjects] = useState(false)
    const [rentObject, setRentObject] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

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

    useEffect(async () => {
        if (location) {
            try {
                const response = await api.get(`/cowork/rentobjects?location=${location.id}&type=${objectType}&start=${date}T${startTime}Z&duration=${duration}`)
                setRentObjects(response.data);
            } catch (error) {
                console.log(error)
            }
        }
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

    const MapWithNoSSR = dynamic(() => import("./map"), {
        ssr: false
    });

    return (
        <section id="intro_section">
            <div className="row no-gutters coming-soon">
                <div className="col-lg-6 p-5">
                    <div className="row">
                        <div className="col-md-10">
                            <h1 className="intro-section-title">{location && location.title}</h1>
                            <Form onSubmit={handleSubmit} className="pt-3">

                                <FormGroup tag="fieldset">
                                    <legend>Object Type</legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={() => handleValueChange('desktop', 'objectType')} checked={objectType === 'desktop'} type="radio" />{' '}
                                            Desktop
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={() => handleValueChange('phone', 'objectType')} checked={objectType === 'phone'} type="radio" />{' '}
                                            Phone
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check disabled>
                                        <Label check>
                                            <Input onChange={() => handleValueChange('meeting', 'objectType')} checked={objectType === 'meeting'} type="radio" />{' '}
                                            Meeting
                                        </Label>
                                    </FormGroup>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Date</Label>
                                    <Input value={date} onChange={(e) => handleValueChange(e.target.value, 'date')} type="date" />
                                </FormGroup>

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
                <div className="col-lg-6 mt-5">
                    <div id="map">
                        <MapWithNoSSR locations={locations} />
                    </div>
                    <ul className="mt-5">
                        {locations && locations.map((location, i) =>
                            <li key={i} onClick={() => setLocation(location)}>
                                {location.title} ({location.address}, {location.postcode}, {location.city})
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </section >
    )
}