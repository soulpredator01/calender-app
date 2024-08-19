// src/App.jsx

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import EventDetails from './component/EventDetails';
import Sidebar from './component/Sidebar';

const localizer = momentLocalizer(moment);

const App = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowOffcanvas(false);
  };
  
  useEffect(()=> {
    localStorage.setItem("events", JSON.stringify(events));
  }, [setEvents, events]);

 

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    setShowOffcanvas(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setShowOffcanvas(false);
  };

  // const handleSelectEvent = (event) => {
  //   setSelectedEvent(event);
  //   setShowOffcanvas(true);
  // };

  const eventDetailsPage = (id) => {
    navigate(`/event/${id}`);
    // console.log(id);
  }

  return (
      <div className="calendar-container">
        <div className="btn-container">
          <button
            className="btn-event"
            onClick={() => {
              setSelectedEvent(null);
              toggleOffcanvas();
            }}>
            Add Event
          </button>
          <input type="text" placeholder="Search..." />
        </div>

        <Sidebar
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          selectedEvent={selectedEvent}
        />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "85vh" }}
                onSelectEvent={(event) => {
                  eventDetailsPage(event.id)
                  console.log(event)
                  setEvent(event);
                }}
              />
            }
          />
          <Route path="/event/:id" element={<EventDetails event={event} />} />
        </Routes>
      </div>
  );
};

export default App;
