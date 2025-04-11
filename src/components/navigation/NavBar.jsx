import Button from "./Button";
import SearchInput from "./SearchInput";
import { useState } from "react";
import {auth, provider} from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const NavBar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  async function signInHandler() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      const userInfo = result.user;
      setUserInfo({
        image: userInfo.photoURL || null,
        userToken: token,
      });
      setSignedIn(true);
    } catch (error) {
      console.error(`Error while signing in the user: ${error.message}`);
      return null;
    }
  }

  async function signOutHandler(){
    try {
      await signOut(auth);
      setUserInfo(null);
      setSignedIn(false)
    } catch (error) {
      console.error(`Error while signing the user out: ${error}`);
    }
  }

  return (
    <div className="navigation">
      {signedIn && userInfo?.image && <img src={userInfo.image} alt="User Image" className="user-image"/>}
      <Button text={signedIn ? "Sign Out" : "Sign In"} clickingOperation={!signedIn ? signInHandler : signOutHandler}/>
      <SearchInput />
      <Button text="Favorites" />
    </div>
  )
}

export default NavBar