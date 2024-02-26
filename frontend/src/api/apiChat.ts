import axios from "axios";

export const findChatMessages = async (endpoint: string, token: string) => {
  return await axios
    .get(`http://localhost:8080/messages/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("error: " + error);
      throw error;
    });
};
