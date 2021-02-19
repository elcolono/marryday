import clsx from "clsx";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import endOfWeek from "date-fns/endOfWeek";
import React, { useState } from "react";
import startOfWeek from "date-fns/startOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createStyles } from "@material-ui/styles";
// this guy required only on the docs site to work with dynamic date library
import { makeJSDateObject } from '../helpers/utils';
import { IconButton, withStyles } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { Button } from "reactstrap";


// TODO: Datepicker gehört und Weekday GRId gehören getrennt

const CustomElements = ({ classes, selectedDate, handleWeekChange }) => {

  const [open, setOpen] = useState(false);

  const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    let dateClone = makeJSDateObject(date);
    let selectedDateClone = makeJSDateObject(selectedDate);


    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
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
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, "d")} </span>
        </IconButton>
      </div>
    );
  };


  return (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Button
        color="items"
        className="btn-items-increase"
        onClick={() => setOpen(isOpen => !isOpen)}
      ><i className="fa fa-calendar"></i></Button>

      <DatePicker
        open={open}
        hidden={true}
        disablePast
        // label="Week picker"
        value={selectedDate}
        onChange={handleWeekChange}
        renderDay={renderWrappedWeekDay}
        onClose={() => setOpen(isOpen => !isOpen)}
      // variant="inline"
      // labelFunc={formatWeekSelectLabel}
      />
    </MuiPickersUtilsProvider>
  );

}

const styles = createStyles(theme => ({
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: "#676767",
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

export default withStyles(styles)(CustomElements);