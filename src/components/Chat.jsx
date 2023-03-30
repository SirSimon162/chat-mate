import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };
  return (
    <div className="flex flex-col items-center font-serif w-[90%] card glass overflow-hidden rounded-t-none h-[75%] my-auto">
      <div className="bg-accent card glass w-full text-center rounded-none">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="flex flex-col items-start w-full h-[80%] overflow-y-auto p-[10px] mb-[10px]">
        {messages.map((message) => (
          <div className="flex items-start mb-[10px]" key={message.id}>
            <span className="font-bold mr-[10px] text-[#333]">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full p-[10px]">
        <input
          className="w-full bg-transparent outline-none focus:outline-none px-3 border-b-[2px] border-b-accent mr-[15px]"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button className="btn btn-accent" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
