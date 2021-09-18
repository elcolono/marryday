import clsx from "clsx";
import isSameDay from "date-fns/isSameDay";
import endOfWeek from "date-fns/endOfWeek";
import React, {useState} from "react";
import startOfWeek from "date-fns/startOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";
import makeJSDateObject from '../utils/makeDateObject';

// TODO: Datepicker gehört und Weekday GRId gehören getrennt

const CustomDatepicker = ({classes, selectedDate, handleWeekChange}) => {

    const [open, setOpen] = useState(false);

    const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
        let dateClone = makeJSDateObject(date);
        let selectedDateClone = makeJSDateObject(selectedDate);


        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);

        const dayIsBetween = isWithinInterval(dateClone, {start, end});
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div>Find old code in mowo repo</div>
        );
    };


    return (
        <div>Find old code in mowo repo</div>
    );

}

export default CustomDatepicker;