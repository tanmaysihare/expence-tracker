import React from "react";


const updatingProfile = () => {

    const submitHandler = (event) =>{
        event.preventdefault();
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs';
        fetch(url,
            {
              method:'POST',
              body: JSON.stringify({
                displayName:enteredEmail,
                photoUrl: enteredPassword,
                returnSecureToken:true
              }),
              headers:{
                'Content-Type': 'application/json'
              }
            }
            ).then(res => {
              setIsLoading(false);
              if(res.ok){
                return res.json();
              }else{
                return res.json().then(data => {
                  let errorMessage = 'Authentication failed!';
                  if(data && data.error && data.error.message){
                    errorMessage = data.error.message;
                  } 
                   
                  
                  throw new Error(errorMessage);
                });
              }
            })
    }

    return (
        <>
        <div>
            <h1>complete your profile</h1>
        </div>
        <form onSubmit={submitHandler}>
            <h2>Contact Details</h2>
            <label>Full Name: </label>
            <textarea/>
            <label> profile photo URL</label>
            <button>update</button>
        </form>
        
        
        </>
    )

}

export default updatingProfile;