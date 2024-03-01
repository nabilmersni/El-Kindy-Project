import axios from "axios";

const url = "http://localhost:3000/api/v1/users";

export const signUp = async (user) => {
  return await axios.post(`${url}/signup`, user, {
    credentials: true,
  });
};
