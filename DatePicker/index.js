


// Date picker React component

import React from 'react';
import './style.css';

export default function DatePicker(props) {
    const dateRef = React.useRef(null);
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [calendarDays, setCalendarDays] = React.useState([]);
    const [year, setYear] = React.useState(2020);
    const [month, setMonth] = React.useState(1);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    React.useEffect(() => {
        if (props.date) {
            dateRef.current.value = props.date || new Date().toISOString().slice(0, 10);
            setMonth(new Date(props.date).getMonth() + 1);
            setYear(new Date(props.date).getFullYear());
        }
        if (!props.date) {
            setMonth(new Date().getMonth() + 1);
            setYear(new Date().getFullYear());
            dateRef.current.value = new Date().toISOString().slice(0, 10);
        }
    }, [props.date]);

    React.useEffect(() => {
        setDays();
    }, [year, month]);

    function lastMonth(event) {
        event.preventDefault();
        if (month - 1 === 0) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }
    function nextMonth(event) {
        event.preventDefault();
        if (month + 1 === 13) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    function openCalendar(event) {
        event.preventDefault();
        setDays();
        setCalendarOpen(!calendarOpen);
    }

/*     function renderCalendar() {
        const days = Array(31).fill(0).map((item, index) => index + 1);
        setCalendarDays(days);
    } */

    function setDays() {
        const date = new Date(year, month - 1, 0);
        const days = date.getDate();
        const offset = new Date(year, month - 1, 1).getDay();
        const xDays = Array(offset).fill('');
        setCalendarDays([
            ...xDays,
            ...Array(days).fill(0).map((item, index) => index + 1)
        ]);
    }

    function checkDate(event) {
        let color = '#333';
            const date = new Date(event.target.value).toString();
            if (date === 'Invalid Date') {
                color = '#CC3300';
                console.log(date);
            }
            event.target.style.color = color;
    }
    
    function selectDate(day) {
        const selectedDate = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day}`;
        dateRef.current.value = selectedDate;
        setCalendarOpen(false);
    }

    return (
        <>
            <button
                className="calendar-btn"
                onClick={openCalendar}
            >
                <span role="img" aria-label="calendar">&#128198;</span>
            </button>
            <input className="calendar-input"
                ref={dateRef}
                placeholder={props.placeholder || ''}
                name={props.name || ''}
                onChange={checkDate}
            />
            {calendarOpen &&
                <div className="calendar-container">
                    <div className="calendar-header">
                        <button onClick={lastMonth}>{"<"}</button>
                        <span>{year +', '+ months[month - 1]}</span>
                        <button onClick={nextMonth}>{">"}</button>
                    </div>
                    <div className="calendar-days">
                        {['S','M','T','W','T','F','S'].map((day, index) => {
                            return (
                                <div key={index} className="calendar-day-header">
                                    {day}
                                </div>
                            );
                        })}
                        {calendarDays.map((day, index) => {
                            return (
                                <div key={index} className="calendar-day" onClick={day !== '' ? () => selectDate(day) : null}>
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
        </>
    );
}
