export const registerUser = async (data) => {
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            mode: "cors",
            credentials: 'include',
            body: JSON.stringify({
                "name": data.name,
                "email": data.email,
                "password": data.password,
                "role": data.role
              
            }),
            referrerPolicy: "no-referrer"
          });

        return response;
    } catch (error) {
        console.error('Error', error);
    }
};

export const activateUser = async (token) => {
    try {
        const response = await fetch('http://localhost:5000/api/activate', {
            method: 'POST',
            mode: "cors",
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ activationToken: token }),
            referrerPolicy: "no-referrer"
          });

        return response;
    } catch (error) {
        console.error('Error', error);
    }
};

export const loginUser = async (data) => {
  try {
      const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: "cors",
          credentials: 'include',
          body: JSON.stringify({
              "email": data.email,
              "password": data.password,            
          }),
          referrerPolicy: "no-referrer"
        });

      return response;
  } catch (error) {
      console.error('Error', error);
  }
};


export const logoutUser = async () => {
  try {
      const response = await fetch('http://localhost:5000/api/logout');

      return response;
  } catch (error) {
      console.error('Error', error);
  }
};

export const getUser = async (token) => {
  try {
      const response = await fetch(`http://localhost:5000/api/getuser?activationToken=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json' 
          },
          mode: 'cors',
          credentials: 'include',
          referrerPolicy: 'no-referrer'
  });

      return response;
  } catch (error) {
      console.error('Error', error);
  }
};