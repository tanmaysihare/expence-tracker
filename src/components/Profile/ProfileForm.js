import { useRef } from 'react';
import {useHistory} from 'react-router-dom';
import classes from './ProfileForm.module.css';


const ProfileForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  

  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs', {
      method: 'POST',
      body: JSON.stringify({
        requestType : 'PASSWORD_RESET', 
        email : enteredEmail,
         }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      alert('Password reset email sent. Check your email to reset your password.');
      history.push('/auth');
    })
    .catch((error) => {

      alert(error.message);
    });
};
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>Enter your email</label>
        <input type='email' id='new-password' ref={emailInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Get your password</button>
      </div>
    </form>
  );
}

export default ProfileForm;