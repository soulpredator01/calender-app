// src/component/EventDetails.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetails = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const events1 = localStorage.getItem("events");
  console.log(events1);
  
  const event = events.filter((item)=> item.id === id);
  console.log(event);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
      <p><strong>Start Time:</strong> {new Date(event.start).toLocaleTimeString()}</p>
      <p><strong>End Time:</strong> {new Date(event.end).toLocaleTimeString()}</p>
      <p><strong>Type:</strong> {event.type}</p>
      <button onClick={() => navigate(-1)}>Back to Calendar</button>
    </div>
  );
};

export default EventDetails;
