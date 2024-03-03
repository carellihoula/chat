import axios from "axios";

export const findChatMessages = async (endpoint: string, token: string) => {
  return await axios
    .get(`http://localhost:8080/api/messages/${endpoint}`, {
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

export const findChatsByCurrentUser = async (
  currentUserId: string,
  token: string
) => {
  return await axios
    .get(`http://localhost:8080/api/messages/${currentUserId}`, {
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
