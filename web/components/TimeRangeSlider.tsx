import React, { useEffect, useRef, useState } from 'react'

import addHours from 'date-fns/addHours'
import subHours from 'date-fns/subHours'
import isWithinInterval from 'date-fns/isWithinInterval'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
import addMinutes from 'date-fns/addMinutes'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import format from "date-fns/format";

import TimeRange from 'react-timeline-range-slider'
import Draggable from 'react-draggable';
import { endOfDay, startOfDay } from 'date-fns'
import { Button } from 'reactstrap'

import { useFormikContext } from 'formik';

const now = new Date()
const nearestHour = roundToNearestMinutes(now, { nearestTo: 30 })
const startTimeLinePosition = -750
const stepInterval = 250;


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

    const { setFieldValue, values } = useFormikContext()

    const [firstRender, setFirestRender] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [timelineInterval, setTimelineInterval] = useState([subHours(nearestHour, 12), addHours(nearestHour, 12)])
    const [timelinePosition, setTimelinePosition] = useState(startTimeLinePosition)

    useEffect(() => {
        if (firstRender) {
            setFieldValue('timeInterval', getInitInterval())
        }
        if (!firstRender) {
            setTimelineInterval([startOfDay(selectedDate), endOfDay(selectedDate)])
        }
        setFirestRender(false)
    }, [selectedDate])


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
        setIsLoading(true)

        // Set new time Interval
        setTimelineInterval([addHours(timelineInterval[0], 5), addHours(timelineInterval[1], 5)])
        // Get back to position
        setTimelinePosition(timelinePosition + stepInterval)

        var position = startTimeLinePosition + stepInterval;
        var id = setInterval(frame, 0.1);

        function frame() {
            if (position == startTimeLinePosition) {
                setIsLoading(false)
                clearInterval(id);
            } else {
                position = position - 5;
                setTimelinePosition(position);
            }
        }
    }

    const decreaseTimeRangeIndex = () => {
        setIsLoading(true)
        // Set new time Interval
        setTimelineInterval([subHours(timelineInterval[0], 5), subHours(timelineInterval[1], 5)])
        // Get back to position
        setTimelinePosition(timelinePosition - stepInterval)

        var position = startTimeLinePosition - stepInterval;
        var id = setInterval(frame, 0.1);

        function frame() {
            if (position == startTimeLinePosition) {
                setIsLoading(false)
                clearInterval(id);
            } else {
                position = position + 5;
                setTimelinePosition(position);
            }
        }
    }

    const clearSelectedTimeInterval = () => {
        const ti = [addHours(timelineInterval[0], 13), addHours(timelineInterval[0], 15)]
        // Set formik values
        setFieldValue("timeInterval", ti);
    }

    const onChangeTimeInterval = (ti) => {
        const isStartVisible = isWithinInterval(ti[0], { start: addHours(timelineInterval[0], 12), end: addHours(timelineInterval[0], 17.5) })
        const isEndVisible = isWithinInterval(ti[0], { start: addHours(timelineInterval[0], 12), end: addHours(timelineInterval[0], 17.5) })
        if (!isStartVisible && !isEndVisible) {
            return clearSelectedTimeInterval()
        }
        // Set formik values
        setFieldValue("timeInterval", ti);
    }

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Button
                        disabled={isLoading}
                        color="items"
                        className="btn-items-increase m-1"
                        onClick={() => decreaseTimeRangeIndex()}
                    ><i className="fa fa-chevron-left"></i></Button>
                    <Button
                        disabled={isLoading}
                        color="items"
                        className="btn-items-increase m-1"
                        onClick={() => increaseTimeRangeIndex()}
                    ><i className="fa fa-chevron-right"></i></Button>
                </div>

                <span className="text-muted">
                    29.12.2020{'\n'}
                    16:00 - 18:00
                </span>

                <Button
                    disabled={isLoading}
                    color="items"
                    className="btn-items-increase m-1"
                    onClick={() => clearSelectedTimeInterval()}
                ><i className="fa fa-times"></i></Button>
            </div>

            <Draggable
                axis="x"
                position={{ x: timelinePosition, y: 0 }}
                grid={[25, 25]}
                scale={1}
            >
                <div>
                    {/* <div className="handle">Drag from here</div> */}
                    <TimeRange
                        error={error}
                        ticksNumber={36}
                        selectedInterval={values['timeInterval']}
                        timelineInterval={timelineInterval}
                        onUpdateCallback={errorHandler}
                        onChangeCallback={onChangeTimeInterval}
                        disabledIntervals={getDisabledIntervals()}
                    />
                </div>
            </Draggable>

            {/* 
            <div>x: {timelinePosition}</div>
            <div>start: {format(selectedInterval[0], "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}</div>
            <div>end: {format(selectedInterval[1], "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}</div> */}

        </React.Fragment>
    )
}

export default TimeRangeSlider