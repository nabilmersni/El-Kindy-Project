import axios from "axios";

const baseURL = "http://localhost:3000/events";

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

const getEventById = async (data) => {
  try {
    // Your implementation to make a request to the server to fetch event data by ID
    const response = await fetch(`http://localhost:3000/events/${data}`);
   
    if (!response.ok) {
      // Check if the response is not successful (status code other than 2xx)
      throw new Error(`Failed to fetch event data. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (!contentType) {
      console.error("Response does not include a Content-Type header.");
    } else if (contentType.includes("application/json")) {
      const data = await response.json();
       console.log(data);
      return data;
      
    } else {
      console.error(`Invalid content type. Expected JSON, but received: ${contentType}`);
      const text = await response.text();
      console.error("Response body:", text);
      throw new Error("Invalid content type. Expected JSON.");
    }
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error; 
};




const updateEvent = async (id, event) => {
  let imageUpdateResponse;

  try {
    if (event.EventImage instanceof File) {
      const formData = new FormData();
      formData.append('EventImage', event.EventImage);

      imageUpdateResponse = await axios.patch(`${baseURL}/${id}`, formData);

      console.log('Image update response:', imageUpdateResponse.data);
    }

    const { EventImage, ...dataWithoutImage } = event;

    const dataUpdateResponse = await axios.put(`${baseURL}/${id}`, {
      ...dataWithoutImage,
   
    });

    console.log('Data update response:', dataUpdateResponse.data);

    return { data: dataUpdateResponse.data, image: imageUpdateResponse?.data };
  } catch (error) {
    console.error('Error in update request:', error.response?.data || error.message);
    throw error;
  }
};

export { getEventById, updateEvent };

export const deleteEvent = async (id) => {
  return await apiEvent("delete", id);
};

export default apiEvent;
