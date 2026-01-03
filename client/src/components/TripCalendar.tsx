import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface TripCalendarProps {
    stops: any[];
}

const TripCalendar: React.FC<TripCalendarProps> = ({ stops }) => {
    const events = stops.map(stop => ({
        title: stop.cityId?.name || 'Stop',
        start: new Date(stop.startDate),
        end: new Date(stop.endDate),
        allDay: true,
        resource: stop
    }));

    return (
        <div style={{ height: '500px', background: 'var(--glass)', borderRadius: '16px', padding: '20px', border: '1px solid var(--border)' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', color: 'white' }}
                views={['month', 'week', 'agenda']}
            />
        </div>
    );
};

export default TripCalendar;
