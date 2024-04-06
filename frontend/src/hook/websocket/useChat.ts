import { useEffect, useState } from "react";
import Stomp, { Client } from "stompjs";
import SockJS from "sockjs-client";
import { useMessages } from "../../contextAPI/MessagesContext.tsx";
import { ChatMessage } from "../../types_interfaces";
//import { getIdCurrentUser } from "../../utils/getIdCurrentUser";

export const useChat = (userId: number | null) => {
  //const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { setMessages, setMsgByCurrentUser } = useMessages();
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("user not logged in");
      return;
    }
    const sockjs = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sockjs);

    const connect = () => {
      setStompClient(stomp);
      stomp?.connect(
        {},
        () => {
          console.log("you're connected ");
          setStompClient(stomp);

          //souscrire
          stomp.subscribe(`/user/${userId}/queue/messages`, (message) => {
            console.log("msg from server : " + message);
            const newMessage: ChatMessage = JSON.parse(message.body);
            setMessages((prev) => {
              const msgExists = prev.find((msg) => msg.id === newMessage.id);
              //eviter les doublants
              if (!msgExists) {
                return [...prev, newMessage];
              } else {
                return prev;
              }
            });
            setMsgByCurrentUser((prev) => {
              const msgExists = prev.find((msg) => msg.id === newMessage.id);
              //eviter les doublants
              if (!msgExists) {
                return [...prev, newMessage];
              } else {
                return prev;
              }
            });
          });
        },
        (onError) => {
          console.log("il y a une erreur + " + onError);
          setTimeout(connect, 200); // Reconnexion après 1 secondes
        }
      );
    };

    connect();

    return () => {
      if (stomp.connected) {
        stomp.disconnect(() => {
          console.log("stomp client disconnected");
        });
      }
    };
  }, []);

  const sendMessage = (message: ChatMessage) => {
    if (stompClient && stompClient.connected) {
      stompClient.send("/app/chat", {}, JSON.stringify(message));
    } else {
      console.error("connection not established");
    }
  };

  return {
    sendMessage,
  };
};
