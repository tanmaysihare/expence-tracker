import { useRef , useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
//import { useHistory } from "react-router-dom";

const UpdatingProfile = () => {
    const authCtx = useContext(AuthContext);
  //  const history = useHistory();
  const displayNameRef = useRef();
  const photoUrlRef = useRef();
  const [userData, setUserData] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
  
    const enteredName = displayNameRef.current.value;
    const enteredUrl = photoUrlRef.current.value;
  
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Profile update failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      // Handle successful update, if needed
      authCtx.setProfileCompleteState(true);
      console.log("Profile updated successfully:", data);
    //  history.push('/home');
    } catch (error) {
      // Handle error, display a message, or redirect the user
      console.error("Profile update error:", error.message);
    }
  };
  useEffect(() => {
    if(authCtx.profileComplete){
      fetchData();
    }
  },[authCtx.profileComplete]);

  const fetchData = async () => {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs/${authCtx.token}`;
      const response = await fetch(url,{
       
        headers: {
          "Content-Type":"application/json", 
        },
      });
      if (!response.ok){
        throw new Error("failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    }catch(error){
      console.error('error fetching user data', error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Complete Your Profile</h1>
      </div>
      <form onSubmit={submitHandler}>
        <h2>Contact Details</h2>
        <label>Full Name: </label>
        <input type="text" required ref={displayNameRef} />
        <label>Profile Photo URL</label>
        <input type="url" required ref={photoUrlRef} />
        <button type="submit">Update</button>
      </form>
      {userData && (
        <div>
          <h2>User Data</h2>
          <p>Display Name: {userData.displayName}</p>
          <p>Photo URL: {userData.photoUrl}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </>
  );
};

export default UpdatingProfile;
