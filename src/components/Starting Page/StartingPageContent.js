import classes from './StartingPageContent.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const StartingPageContent = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn ;

    const submitHandler = (event) => {
        event.preventDefault();
        
    }

  return (
<>
    <section className={classes.starting}>
      <h1>Welcome to expanse tracker</h1>
    </section>

    {isLoggedIn && (<div>
        <form onSubmit={submitHandler}>
            <label>complete your profile</label>
            <button>click hare</button>
        </form>
    </div>)}

</>
  );
};

export default StartingPageContent;