import Button from "./Button";
import SearchInput from "./SearchInput";
import { useState, useEffect } from "react";
import {auth, provider} from "../../firebase";
import {
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const NavBar = () => {
  const [userImage, setUserImage] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  // catching any side-effect that happens whenever the component is re-rendered
  useEffect(() => {
    // calling the auth-state-changing listener, to check if there is an active session
    const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        setSignedIn(true);
        setUserImage(userInfo.photoURL || null);
      } else {
        setSignedIn(false);
        setUserImage(null);
      }
    })

    return () => unsubscribe();
  }, [])

  async function signInHandler() {
    try {
      /* like saying to firebase auth service "Please make the browser remember me, by giving it me information that comes from google, cuz i might be closing the browser or refreshing the page, so it will let the browser store ur info into its local storage */
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const userInfo = result.user;
      setUserImage(userInfo.photoURL || null);
      setSignedIn(true);
    } catch (error) {
      console.error(`Error while signing in the user: ${error.message}`);
      return null;
    }
  }

  async function signOutHandler(){
    try {
      await signOut(auth);
      setUserImage(null);
      setSignedIn(false)
    } catch (error) {
      console.error(`Error while signing the user out: ${error}`);
    }
  }

  return (
    <div className="navigation">
      <h1 className="logo">TakeAL<span className="eye">o</span><span className="eye">o</span>k</h1>
      <SearchInput />
      <div className="user-logging">
        <Button text={signedIn ? "Sign Out" : "Sign In"} type="signing-btn" clickingOperation={!signedIn ? signInHandler : signOutHandler}/>
        {signedIn && userImage && <img src={userImage} alt="User Image" className="user-image"/>}
      </div>
    </div>
  )
}

export default NavBar