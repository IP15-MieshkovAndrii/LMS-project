import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { activateUser } from '../../../services/api';

function useQuery() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('token'); 
    
    return value
}

const ActivateAccount = () => {;
  const token = useQuery();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Activating your account...');
  const flag = useRef(0);


  useEffect(() => {
    const activateAccount = async () => {

      if (token) {
        flag.current = flag.current + 1;

        try {
          let result = {success: false}
          if(flag.current > 1) {
            const response = await activateUser(token)
            result = await response.json();
          }
          if (result.success) {
              setMessage('Account activated successfully!');
              // const response = await login();
              navigate('/')

          } else {
            setMessage('Failed to activate account. Please try again.');
          }
        } catch (error) {
          setMessage('An error occurred. Please try again.');
        }
      } else {
        setMessage('Invalid activation link.');
      }

    };

    setTimeout(activateAccount, 2000);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Activate Your Account</h1>
      <p>{message}</p>
    </div>
  );
};

export default ActivateAccount;
