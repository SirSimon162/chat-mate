import { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null)
  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false);
    setRoom(null);
  }
  if (!isAuth) {
    return (
      <div className="App bg-[url('https://res.cloudinary.com/dmofs5r4h/image/upload/v1679554338/mesh-833_apxamn.png')] bg-no-repeat bg-cover">
        <h2 className="text-3xl font-bold text-center">Discover the Joy of Chatting: Chat Mate has Arrived!</h2>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <div className="App bg-[url('https://res.cloudinary.com/dmofs5r4h/image/upload/v1679554338/mesh-833_apxamn.png')] bg-no-repeat bg-cover">
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className="flex flex-col card glass p-10 gap-4">
          <label className="text-center text-lg font-medium">Enter Room Name</label>
          <input ref={roomInputRef} className="w-[200px] h-[30px] border-b-[2px] border-b-accent bg-transparent focus:outline-none text-center placeholder:neutral" placeholder="Enter room name"/>
          <button onClick={()=> setRoom(roomInputRef.current.value)} className="btn btn-accent">Enter Chat</button>
        </div>
      )}
      <div>
        <button onClick={signUserOut} className="btn btn-outline btn-error my-[20px]">Sign Out</button>
      </div>
    </div>
  );
}

export default App;
