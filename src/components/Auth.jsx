import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function Auth(props) {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-[25px] card glass py-6 px-4 sm:w-fit w-[300px]">
      <p className="text-2xl sm:text-3xl font-semibold text-center">
        Sign In With Google to Continue
      </p>
      <div>
        <div className="bg-accent bg-gradient-to-r from-error via-success to-info p-1 rounded-[20px]">
          <button onClick={signInWithGoogle} className="btn btn-accent">
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
