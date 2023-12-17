import classes from './StartingPageContent.module.css';
import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import ExpenseTracker from '../Expances/ExpenseTracker';
import { ExpenseProvider } from '../../store/ExpenseContext';

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const completeProfile = authCtx.profileComplete;
  const history = useHistory();
  const [verifyEmail, setVerifyEmail] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const buttonHandler = () => {
    if(!setVerifyEmail){
      history.push('/upProfile');
    }
    
  };

  const verifyButtonHandler = async () => {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs';

    try {
      setIsVerifying(true);

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: authCtx.token,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = 'Sending verification mail failed';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem('setVerifyEmail',true);
      setVerifyEmail(true);
      console.log('Verification complete',data);
    } catch (error) {
      // Display the error message on the page or redirect to an error page
      console.error('Email verification error', error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      {isLoggedIn && !verifyEmail && !completeProfile && (
        <div>
          <form>
            <label>Please verify your account</label>
            <button type="button" onClick={verifyButtonHandler} disabled={isVerifying}>
              {isVerifying ? 'Please Wait Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      )}
      {isLoggedIn && verifyEmail && completeProfile && (
        <div>
          <div>
            <form>
              <label>Complete your profile</label>
              <br></br>
              {/* Use a button type instead of a submit button */}
              <button type="button" onClick={buttonHandler}>
                Click here
              </button>
            </form>
          </div>
        </div>
      )}
      {isLoggedIn && !completeProfile && (
        <section className={classes.starting}>
          <h1>Welcome to expense tracker</h1>
          <div>
           <ExpenseProvider><ExpenseTracker /></ExpenseProvider>
          </div>
        </section>
      )}
    </>
  );
};

export default StartingPageContent;
