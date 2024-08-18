'use client';

import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dynamic from 'next/dynamic';
import { Flex, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, format, newDate, startOfMonth } from 'date-fns-jalali';
import BigCalendar from 'jalali-react-big-calendar';
import styled from 'styled-components';
import { getAllEvents } from '@/apis/event';
import { formatDateWithJalaliLocale } from '@/libs/methods';
import { typoVariant } from '@/theme/typo-variants';
import CustomToolbar from './CustomToolbar';

const Message = dynamic(() => import('./Message'), {
  ssr: false,
});

interface EventData {
  title: string;
  start: Date;
  end: Date;
  description: string; // Add description field
}

const CalendarComponent = () => {
  const [currentView, setCurrentView] = useState('month');
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [events, setEvents] = useState<any>([]);

  //   custom-toolbar
  const Toolbar = (toolbar: any) => {
    const goToDayView = () => {
      toolbar?.onViewChange('day');
    };

    const goToMonthView = () => {
      toolbar?.onViewChange('month');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToPrevious = () => {
      toolbar.onNavigate('PREV');
    };

    const currentDate = formatDateWithJalaliLocale(toolbar.date);

    return (
      <CustomToolbar
        currentDate={currentDate}
        onGoToDayView={goToDayView}
        onGoToMonthView={goToMonthView}
        onGoToNext={goToNext}
        onGoToPrevious={goToPrevious}
        currentView={currentView}
      />
    );
  };

  //   handle-view-change
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  //   handle-modal-state
  const handleModalState = (value: boolean) => {
    setIsShowMessage(value);
  };

  //   custom-eventComponent
  const EventComponent: React.FC<{ event: EventData }> = ({ event }) => {
    if (currentView === 'day') {
      return (
        <DayViewCustomEventComponent gap={'1'} direction={'column'}>
          <Text {...typoVariant.body1} style={{ color: '#646464' }}>
            {event.title}
          </Text>
          <Text {...typoVariant.paragraph2} style={{ color: '#646464' }}>
            {event.description.length > 180 ? `${event.description.slice(0, 180)}...` : event.description}
          </Text>
        </DayViewCustomEventComponent>
      );
    } else {
      return (
        <MonthViewCustomEventComponent>
          <Text {...typoVariant.description2} style={{ color: '#646464' }}>
            {event.title}
          </Text>
        </MonthViewCustomEventComponent>
      );
    }
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['events', activeMonth],
    placeholderData: [],
    queryFn: async () => {
      const jalaliDate = format(activeMonth, 'yyyy-MM-dd').split('-');
      const firstDateOfMonth = startOfMonth(newDate(+jalaliDate[0], +jalaliDate[1] - 1, +jalaliDate[2]));
      const lastDateOfMonth = endOfMonth(newDate(+jalaliDate[0], +jalaliDate[1] - 1, +jalaliDate[2]));

      const events = await getAllEvents({
        startDate: firstDateOfMonth.toISOString(),
        endDate: lastDateOfMonth.toISOString(),
      });

      const formattedEvents = events.map(event => {
        return {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          allDay: false,
        };
      });
      setEvents(formattedEvents);
      return formattedEvents;
    },
  });

  return (
    <Root justify={'center'} p={'4'}>
      {isShowMessage && <Message open={isShowMessage} onCloseModal={handleModalState} data={selectedEvent} />}
      {/* TODO: remove ts ignore */}
      <BigCalendar
        //@ts-ignore
        onView={handleViewChange}
        onNavigate={(date: Date) => setActiveMonth(date)}
        views={['month', 'day']}
        events={events}
        tooltipAccessor={(event: any) => (
          <div>
            <strong>{event.end}</strong>
            <p>{event.desc}</p>
          </div>
        )}
        onSelectEvent={(event: any) => {
          setIsShowMessage(true);
          setSelectedEvent(event);
        }}
        components={{
          toolbar: Toolbar,
          event: EventComponent,
        }}
      />
    </Root>
  );
};

export default CalendarComponent;

const Root = styled(Flex)`
  height: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  overflow-x: scroll;

  .rbc-calendar {
    width: 100%;
    /* min-height: 600px; */
  }

  .rbc-day-bg {
    background-color: #f9f9f9;
  }

  .rbc-off-range-bg {
    background-color: #e8e8e8;
  }

  .rbc-month-view {
    border-radius: 8px !important;
  }

  .rbc-time-view {
    border-radius: 8px !important;
    background-color: #fff !important;
  }

  .rbc-row-bg {
    background-color: #fff !important;
  }

  .rbc-day-slot {
    background-color: #fff !important;
  }

  .rbc-time-header {
    /* display: none !important; */
  }

  .rbc-button-link {
    font-family: '__dana_5212c8' !important;
  }

  .rbc-event {
    background-color: #f8faff;
    color: #000 !important;
    padding: 20px 10px;
    overflow: scroll !important;
    background-color: inherit !important;
    height: 100px !important;
    border: none !important;
  }

  .rbc-current-time-indicator {
    /* display: none !important; */
  }

  /* .rbc-timeslot-group {
    flex-flow: initial !important;
    align-items: center !important;
    border: none !important;
  } */

  .rbc-header {
    color: #646464 !important;
    font-size: 10px !important;
    padding-block: 5px !important;
  }

  .rbc-event.rbc-selected {
    background-color: #fff9ed;
    border: none;
    outline: none;
  }
`;

const DayViewCustomEventComponent = styled(Flex)`
  text-align: right;
  height: fit-content;
  width: fit-content;
  padding: 8px 16px;
  border-radius: 6px;
  /* background-color: #fff; */
`;

const MonthViewCustomEventComponent = styled(Flex)`
  background-color: #fff9ed;
  border: 1px solid #e0e0e0;
  font-size: 12px;
  padding: 3px;
  border-radius: 4px;
`;
