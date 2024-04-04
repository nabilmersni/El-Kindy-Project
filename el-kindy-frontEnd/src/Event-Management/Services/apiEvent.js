import axios from "axios";

const baseURL = "http://localhost:3000/events";
const eventURL = "http://localhost:3000/";
const apiEvent = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${baseURL}/${endpoint}`,
      data: data ? data : null,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

export const getallEvents = async () => {
  return await apiEvent("get", "getall");
};

export const addEvent = async (event) => {
  return await apiEvent("post", "add", event);
};

// const getEventById = async (data) => {
//   try {
//     const response = await fetch(`http://localhost:3000/events/${data}`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch event data. Status: ${response.status}`);
//     }

//     const contentType = response.headers.get("content-type");

//     if (!contentType) {
//       console.error("Response does not include a Content-Type header.");
//     } else if (contentType.includes("application/json")) {
//       const data = await response.json();
//       // console.log(data);
//       return data;

//     } else {
//       console.error(`Invalid content type. Expected JSON, but received: ${contentType}`);
//       const text = await response.text();
//       console.error("Response body:", text);
//       throw new Error("Invalid content type. Expected JSON.");
//     }
//   } catch (error) {
//     console.error("Error fetching event data:", error);
//     throw error;
//   }
// };

const updateEvent = async (id, event) => {
  let imageUpdateResponse;

  try {
    if (event.EventImage instanceof File) {
      const formData = new FormData();
      formData.append("EventImage", event.EventImage);

      imageUpdateResponse = await axios.patch(`${baseURL}/${id}`, formData);

      console.log("Image update response:", imageUpdateResponse.data);
    }

    const { EventImage, ...dataWithoutImage } = event;

    const dataUpdateResponse = await axios.put(`${baseURL}/${id}`, {
      ...dataWithoutImage,
    });

    console.log("Data update response:", dataUpdateResponse.data);

    return { data: dataUpdateResponse.data, image: imageUpdateResponse?.data };
  } catch (error) {
    console.error(
      "Error in update request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { updateEvent };

export const deleteEvent = async (id) => {
  return await apiEvent("delete", id);
};

export const addImageToEvent = async (eventId, image) => {
  return axios.post(`${baseURL}/${eventId}/image`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
//-----------------------EventParticipant --------------------

export const getEventById = async (eventId) => {
  const response = await fetch(`${baseURL}/${eventId}`);
  return response.json();
};
export const getEventByUserId = async (eventId) => {
  const response = await fetch(`${baseURL}/${eventId}/users`);
  return response.json();
};

export const assignUserToEvent = async (eventId, email) => {
  try {
    const response = await apiEvent("post", `${eventId}/assign`, { email });
    return response;
  } catch (error) {
    console.error(`Error assigning user to event:`, error);
    throw error;
  }
};

//sarraaa//////

export const removeUserFromEvent = async (userId, eventId) => {
  try {
    const response = await axios.delete(
      `${baseURL}/${eventId}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error removing user from quiz: " + error.message);
  }
};

//-----EMAIL---------------
export const sendNotification = async (email) => {
  try {
    const response = await axios.get(`${eventURL}send-email?email=${email}`);
    return response;
  } catch (error) {
    console.error(`Error sending notification:`, error);
    throw error;
  }
};
//-----Ticket-----
export const createTicketAndAssociateWithEvent = async (eventId, userId) => {
  try {
    const existingTicket = await getTicketsByEventId(eventId);
    if (existingTicket.some(ticket => ticket.user === userId)) {
      throw new Error('User already has a ticket for this event');
    }

    const response = await axios.post(`${baseURL}/${eventId}/tickets`, { userId });
    return response.data;
  } catch (error) {
    console.error(`Error creating ticket and associating with event:`, error);
    throw error;
  }
};
export const getTicketsByEventId = async (eventId) => {
  try {
    const response = await axios.get(`${baseURL}/tickets/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tickets by event ID:`, error);
    throw error;
  }
};

export const getJoinedEvents = async () => {
  try {
    const response = await apiEvent("get", "eventsjoined"); // Assuming "eventsjoined" is the correct endpoint
    return response;
  } catch (error) {
    console.error('Error fetching joined events:', error);
    throw error;
  }
};

export default apiEvent;
