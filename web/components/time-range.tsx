import React, { useEffect, useState } from 'react'
import set from 'date-fns/set'
import addHours from 'date-fns/addHours'
import isWithinInterval from 'date-fns/isWithinInterval'
import TimeRange from 'react-timeline-range-slider'


const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)


const TimeRangeSlider = ({ selectedDate, onChangeTimeInterval, timelineInterval, disabledIntervals, selectedInterval = [selectedStart, selectedEnd] }) => {

    const [error, setError] = useState(true);
    const [timeRangeIndex, setTimeRangeIndex] = useState(0)

    useEffect(() => {
        selectedDate
    }, [timeRangeIndex])

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
            start: new Date(1700, 1, 1),
            end: now
        })
        return intervals;
    }

    const increaseTimeRangeIndex = () => {
        if (timeRangeIndex < 5) {
            setTimeRangeIndex(timeRangeIndex + 1)
        }
    }


    const decreaseTimeRangeIndex = () => {
        if (timeRangeIndex > 0) {
            setTimeRangeIndex(timeRangeIndex - 1)
        }
    }

    const checkWithinInterval = (timeRangeIndex) => {
        return isWithinInterval(now, {
            start: addHours(selectedDate, timeRangeIndex * 4),
            end: addHours(selectedDate, (timeRangeIndex * 4) + 8)
        })
    }

    return (
        <>
            <span onClick={() => setTimeRangeIndex(0)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 0 && 'border-primary'} ${!checkWithinInterval(0) && 'disabled'}`}>04:00</span>
            <span onClick={() => setTimeRangeIndex(1)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 1 && 'border-primary'} ${!checkWithinInterval(1) && 'disabled'}`}>08:00</span>
            <span onClick={() => setTimeRangeIndex(2)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 2 && 'border-primary'} ${!checkWithinInterval(2) && 'disabled'}`}>12:00</span>
            <span onClick={() => setTimeRangeIndex(3)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 3 && 'border-primary'} ${!checkWithinInterval(3) && 'disabled'}`}>16:00</span>
            <span onClick={() => setTimeRangeIndex(4)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 4 && 'border-primary'} ${!checkWithinInterval(4) && 'disabled'}`}>20:00</span>
            <span onClick={() => setTimeRangeIndex(5)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 5 && 'border-primary'} ${!checkWithinInterval(5) && 'disabled'}`}>24:00</span>
            <div className="d-flex align-items-center">
                <span onClick={decreaseTimeRangeIndex}>{"<"}</span>
                <TimeRange
                    error={error}
                    ticksNumber={36}
                    selectedInterval={selectedInterval}
                    timelineInterval={[addHours(selectedDate, timeRangeIndex * 4), addHours(selectedDate, (timeRangeIndex * 4) + 8)]}
                    onUpdateCallback={errorHandler}
                    onChangeCallback={onChangeTimeInterval}
                    disabledIntervals={getDisabledIntervals()}
                />
                <span onClick={increaseTimeRangeIndex}>{">"}</span>
            </div>
            <style jsx>{`
                .disabled {
                    pointer-events:none;
                    opacity: 0.5;
                };
            `}</style>
        </>
    )
}

export default TimeRangeSlider