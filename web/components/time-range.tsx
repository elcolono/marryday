import React, { useEffect, useState } from 'react'

import addHours from 'date-fns/addHours'
import isWithinInterval from 'date-fns/isWithinInterval'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
import addMinutes from 'date-fns/addMinutes'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

import TimeRange from 'react-timeline-range-slider'


const now = new Date()
const getInitInterval = () => {
    // Get nearest minutes - nearest to 30 min
    // But if takes lower halfhour than add 60 minutes to be before now
    let selectedStart = roundToNearestMinutes(now, { nearestTo: 30 })
    if (isBefore(selectedStart, now)) { selectedStart = addMinutes(selectedStart, 60) }
    const selectedEnd = addMinutes(selectedStart, 120)
    return [selectedStart, selectedEnd]
}

const TimeRangeSlider = ({
    selectedDate,
    changeTimeInterval,
    disabledIntervals,
    selectedInterval = getInitInterval(),
    increaseSelectedDay,
    decreaseSelectedDay,
    errorHandler,
    error
}) => {

    enum Actions {
        InitChange,
        // DicreasedTimeRangeWithoutValueChange,
        // IncreasedTimeRangeWithoutValueChange,
        // DicreasedTimeRangeWithValueChange,
        // IncreasedTimeRangeWithValueChange,
        StartInSubTimeRange,
        EndInUpTimeRange,
        StartInTimeRange,
        EndInTimeRange
    }

    const [timeRangeIndex, setTimeRangeIndex] = useState(0)
    const [lastAction, setLastAction] = useState<Actions>(Actions.InitChange)
    // this is the actual timeRange interval BUT not the selected oone
    // const [timeInterval, setTimeInterval] = useState(undefined)

    useEffect(() => {
        // Check if current time is wihtin timerangeindex interval 
        // if wihtin interval(true) set Time range index to the value
        for (let i = 0; i <= 5; i++) {
            const timeRangeIndex = i
            const isWithin: boolean = isWithinInterval(now, {
                start: addHours(selectedDate, timeRangeIndex * 4),
                end: addHours(selectedDate, (timeRangeIndex * 4) + 8)
            })
            if (isWithin) {
                setTimeRangeIndex(timeRangeIndex)
            }
        }
    }, [])

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

    const updateLastAction = ({ timeRangeIndex, type }) => {
        // setLastAction(Actions.ChangedTimerange)
        const startWithin: boolean = isWithinInterval(selectedInterval[0], {
            start: addHours(selectedDate, timeRangeIndex * 4),
            end: addHours(selectedDate, (timeRangeIndex * 4) + 8)
        })
        const endWithin: boolean = isWithinInterval(selectedInterval[1], {
            start: addHours(selectedDate, timeRangeIndex * 4),
            end: addHours(selectedDate, (timeRangeIndex * 4) + 8)
        })
        // if (!startWithin || !endWithin) {
        //     if (type == 'increase') setLastAction(Actions.IncreasedTimeRangeWithValueChange)
        //     if (type == 'decrease') setLastAction(Actions.DicreasedTimeRangeWithValueChange)
        // } else {
        //     if (type == 'increase') setLastAction(Actions.IncreasedTimeRangeWithoutValueChange)
        //     if (type == 'decrease') setLastAction(Actions.DicreasedTimeRangeWithoutValueChange)
        // }
        if ('increase' && !startWithin) setLastAction(Actions.StartInSubTimeRange)
        if ('decrease' && !endWithin) setLastAction(Actions.EndInUpTimeRange)

        if ('increase' && startWithin) setLastAction(Actions.StartInTimeRange)
        if ('decrease' && endWithin) setLastAction(Actions.EndInTimeRange)
    }

    const increaseTimeRangeIndex = () => {
        let index = timeRangeIndex;
        if (timeRangeIndex < 5) {
            index++
            setTimeRangeIndex(index)
        } else if (index >= 5) {
            setTimeRangeIndex(0)
            increaseSelectedDay()
        }
        updateLastAction({ timeRangeIndex: index, type: 'increase' })
    }

    const decreaseTimeRangeIndex = () => {
        // First check if TimeRange is selectable
        // If NOT stop this function
        let index = timeRangeIndex;
        if (!checkTimeRangeSelectable(index - 1)) {
            return
        }
        if (timeRangeIndex > 0) {
            index--
            setTimeRangeIndex(index)
        } else if (timeRangeIndex <= 0) {
            setTimeRangeIndex(5)
            decreaseSelectedDay()
        }
        updateLastAction({ timeRangeIndex: index, type: 'decrease' })

    }

    const checkTimeRangeSelectable = (timeRangeIndex) => {
        // Check if now is wihtin timeRange Interval
        const isWithin: boolean = isWithinInterval(now, {
            start: addHours(selectedDate, timeRangeIndex * 4),
            end: addHours(selectedDate, (timeRangeIndex * 4) + 8)
        })
        // Return true if now is within interval
        if (isWithin) { return true }
        // Else check if timerange start is after now
        const after: boolean = isAfter(addHours(selectedDate, timeRangeIndex * 4), now);
        if (after) { return true }
        return false
    }

    const onChangeTimeInterval = (ti) => {
        if(lastAction == Actions.StartInSubTimeRange) console.log("StartInSubTimeRange")
        if(lastAction == Actions.EndInUpTimeRange) console.log("EndInUpTimeRange")
        if(lastAction == Actions.StartInTimeRange) console.log("StartInTimeRange")
        if(lastAction == Actions.EndInTimeRange) console.log("EndInTimeRange")
        // Check interval 
        // changeTimeInterval(ti)
        // setLastAction(undefined)
    }


    return (
        <>
            <span onClick={() => setTimeRangeIndex(0)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 0 && 'border-primary'} ${!checkTimeRangeSelectable(0) && 'disabled'}`}>00:00</span>
            <span onClick={() => setTimeRangeIndex(1)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 1 && 'border-primary'} ${!checkTimeRangeSelectable(1) && 'disabled'}`}>04:00</span>
            <span onClick={() => setTimeRangeIndex(2)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 2 && 'border-primary'} ${!checkTimeRangeSelectable(2) && 'disabled'}`}>08:00</span>
            <span onClick={() => setTimeRangeIndex(3)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 3 && 'border-primary'} ${!checkTimeRangeSelectable(3) && 'disabled'}`}>12:00</span>
            <span onClick={() => setTimeRangeIndex(4)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 4 && 'border-primary'} ${!checkTimeRangeSelectable(4) && 'disabled'}`}>16:00</span>
            <span onClick={() => setTimeRangeIndex(5)} className={`p-2 m-1 border rounded-circle ${timeRangeIndex === 5 && 'border-primary'} ${!checkTimeRangeSelectable(5) && 'disabled'}`}>20:00</span>
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