export interface Location {
    // 'title', 'address', 'postcode', 'city', 'lat', 'lng',
    id: number,
    title: string,
    address: string,
    postcode: string,
    city: string,
    lat: number,
    lng: number,
    booking_type: string,
}

export interface Booking {
    // { user: 2, rent_object: 1, start: "2020-12-09T11:04:00Z", end: "2020-12-09T12:04:00Z" }
    user: number,
    rent_object: number,
    start: string,
    end: string,
}

export interface Interval {
    start: Date,
    end: Date,
}

export interface RentObject {
    bookings: Array<Booking>
    id: number,
    location: number,
    title: string,
    type: string,
}