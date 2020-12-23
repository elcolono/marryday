import React, { useEffect, useState } from 'react'
import { endOfToday, set } from 'date-fns'
import TimeRange from 'react-timeline-range-slider'


const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const TimeRangeSlider = ({ onChangeTimeInterval, timelineInterval, disabledIntervals }) => {

    const selectedStart = getTodayAtSpecificHour()
    const selectedEnd = getTodayAtSpecificHour(14)

    const [error, setError] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState([selectedStart, selectedEnd]);

    useEffect(() => {
        console.log(timelineInterval);
    })

    const errorHandler = ({ error }) => {
        setError(error)
    };

    return (
        <TimeRange
            error={error}
            ticksNumber={36}
            selectedInterval={selectedInterval}
            timelineInterval={timelineInterval}
            onUpdateCallback={errorHandler}
            onChangeCallback={onChangeTimeInterval}
            disabledIntervals={disabledIntervals.map(iv => {
                return {
                    start: new Date(iv.start),
                    end: new Date(iv.end)
                }
            })}
        />
    )
}

export default TimeRangeSlider