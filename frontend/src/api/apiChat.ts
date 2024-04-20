import axios from "axios";

export const HOST_URL: string =
  "https://c7gljno857ucsl.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com";

export const findChatMessages = async (endpoint: string, token: string) => {
  return await axios
    .get(`${HOST_URL}/api/messages/${endpoint}`, {
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
    .get(`${HOST_URL}/api/messages/${currentUserId}`, {
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

export const deleteConversation = async (chatId: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${HOST_URL}/api/messages/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Conversation deleted successfully:", response.data);
  } catch (error) {
    console.error("Error during conversation deletion:", error);
    // Gérer les erreurs ici, comme afficher un message d'erreur à l'utilisateur
  }
};
