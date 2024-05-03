import React, { useState, useEffect } from "react";
import axios from "axios";

const ZoomMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Function to fetch upcoming Zoom meetings
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          "https://api.zoom.us/v2/users/me/meetings",
          {
            headers: {
              Authorization: `Bearer sDoSBlpkTkeuLB9xCtLQWQ`,
            },
          }
        );
        setMeetings(response.data.meetings);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Upcoming Zoom Meetings</h2>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <strong>{meeting.topic}</strong> -{" "}
            {new Date(meeting.start_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZoomMeetings;
