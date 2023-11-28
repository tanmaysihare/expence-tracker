import classes from './StartingPageContent.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import {  useHistory } from 'react-router-dom';

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const completeProfile = authCtx.profileComplete;
   const history = useHistory();
  

  const buttonHandler = () => {
  
        history.push('/upProfile');
    }
  

  return (
    <>
      {isLoggedIn && !completeProfile && (
        <div>
          <form>
            <label>Complete your profile</label><br></br>
            {/* Use a button type instead of a submit button */}
            <button type="button" onClick={buttonHandler}>
              Click here
            </button>
          </form>
        </div>
      )}
      <section className={classes.starting}>
        <h1>Welcome to expense tracker</h1>
        <div>
          <form>
            <label>Account Holder Name</label>
            <input type="text" />
            <label>Photo url</label>
            <input type="text" />
          </form>
        </div>
      </section>

     
    </>
  );
};

export default StartingPageContent;
