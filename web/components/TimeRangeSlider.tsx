import React, { useEffect, useState } from 'react'

import addHours from 'date-fns/addHours'
import isWithinInterval from 'date-fns/isWithinInterval'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
import addMinutes from 'date-fns/addMinutes'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

import TimeRange from 'react-timeline-range-slider'
import Draggable from 'react-draggable';
import { endOfDay, startOfDay } from 'date-fns'
import { Button } from 'reactstrap'


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

    const [timeRangeIndex, setTimeRangeIndex] = useState(0)
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0, y: 0
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        if (deltaPosition.x > (timeRangeIndex * 250) * -1) {
            var position = deltaPosition.x;
            var id = setInterval(frame, 0.1);
        } else {
            var position = deltaPosition.x;
            var id = setInterval(framemin, 0.1);
        }

        function frame() {
            if (position == (timeRangeIndex * 250) * -1) {
                setIsLoading(false)
                clearInterval(id);

            } else {
                position = position - 5;
                setDeltaPosition({
                    x: position,
                    y: 0,
                });
            }
        }
        function framemin() {
            if (position == (timeRangeIndex * 250) * -1) {
                setIsLoading(false)
                clearInterval(id);

            } else {
                position = position + 5;
                setDeltaPosition({
                    x: position,
                    y: 0,
                });
            }
        }

    }, [timeRangeIndex])

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

    const increaseTimeRangeIndex = () => {
        let index = timeRangeIndex;
        if (timeRangeIndex < 5) {
            index++
            setTimeRangeIndex(index)
        } else if (index >= 5) {
            setTimeRangeIndex(0)
            increaseSelectedDay()
        }
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
        // Check interval 
        changeTimeInterval(ti)
        // setLastAction(undefined)
    }

    const handleDrag = (e, ui) => {
        const { x, y } = deltaPosition;
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        });
    };

    return (
        <React.Fragment>
            <Button
                disabled={isLoading}
                color="items"
                className="btn-items-increase m-1"
                onClick={decreaseTimeRangeIndex}
            ><i className="fa fa-chevron-left"></i></Button>
            <Button
                disabled={isLoading}
                color="items"
                className="btn-items-increase m-1"
                onClick={increaseTimeRangeIndex}
            ><i className="fa fa-chevron-right"></i></Button>

            <div className="d-flex align-items-center">
                <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{ x: 0, y: 0 }}
                    // bounds={{ top: -100, left: -1000, right: 0, bottom: 100 }}
                    position={deltaPosition}
                    grid={[25, 25]}
                    scale={1}
                    // onStart={this.handleStart}
                    onDrag={handleDrag}
                // onStop={this.handleStop}
                >
                    <div>
                        {/* <div className="handle">Drag from here</div> */}
                        <TimeRange
                            error={error}
                            ticksNumber={36}
                            selectedInterval={selectedInterval}
                            // timelineInterval={[addHours(selectedDate, timeRangeIndex * 4), addHours(selectedDate, (timeRangeIndex * 4) + 8)]}
                            timelineInterval={[startOfDay(selectedDate), endOfDay(selectedDate)]}
                            onUpdateCallback={errorHandler}
                            onChangeCallback={onChangeTimeInterval}
                            disabledIntervals={getDisabledIntervals()}
                        />
                    </div>
                </Draggable>


            </div>
            {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
        </React.Fragment>
    )
}

export default TimeRangeSlider