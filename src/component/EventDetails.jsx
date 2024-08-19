// src/component/EventDetails.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./EventDetails.css"

const EventDetails = ({ event }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(events);
  
  // const event = events.filter((item)=> Number(item.id) === Number(id));
  // console.log(event);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="event-details">
      <h2>Title: {event?.title}</h2>
      <p><strong>Date:</strong> {new Date(event?.start).toLocaleDateString()}</p>
      <p><strong>Start Time:</strong> {new Date(event?.start).toLocaleTimeString()}</p>
      <p><strong>End Time:</strong> {new Date(event?.end).toLocaleTimeString()}</p>
      <p><strong>Type:</strong> {event?.type}</p>
      <button onClick={() => navigate(-1)}>Back to Calendar</button>
    </div>
  );
};

export default EventDetails;
