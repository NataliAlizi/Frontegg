import './App.css';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuth, useLoginWithRedirect,AdminPortal } from "@frontegg/react";
import React from 'react';
function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const handleClick = () => {
    AdminPortal.show();
  };
  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const options = {
  method: 'PUT',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  body: JSON.stringify({superUser: true})
  };

  fetch('https://api.frontegg.com/identity/resources/users/v1/bcd6dc75-3da1-4d2b-a707-41a03d8bd32c/superuser', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  return (
    <div>
    <div className="App">
      { isAuthenticated ?(
        
        <div>
          <div >
          
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button onClick={handleClick}>Settings</button>
          </div>
          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;