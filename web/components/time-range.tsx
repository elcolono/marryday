import React, { useEffect, useState } from 'react'
import { endOfToday, set } from 'date-fns'
import TimeRange from 'react-timeline-range-slider'
import startOfDay from "date-fns/startOfDay";


const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const TimeRangeSlider = ({ onChangeTimeInterval, timelineInterval, disabledIntervals, selectedInterval = [selectedStart, selectedEnd] }) => {

    const [error, setError] = useState(true);

    const errorHandler = ({ error }) => {
        setError(error)
    };

    const getDisabledIntervals = () => {
        const intervals: Array<any> = disabledIntervals.map(iv => {
            return {
                start: new Date(iv.start),
                end: new Date(iv.end)
            }
        })
        intervals.unshift({
            start: startOfDay(now),
            end: now
        })
        return intervals;
    }
    return (
        <TimeRange
            error={error}
            ticksNumber={36}
            selectedInterval={selectedInterval}
            timelineInterval={timelineInterval}
            onUpdateCallback={errorHandler}
            onChangeCallback={onChangeTimeInterval}
            disabledIntervals={getDisabledIntervals()}
        />
    )
}

export default TimeRangeSlider