import { useNavigate } from 'react-router-dom';

/*eslint-disable*/
function parseJwt (token:any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

const AuthHome = () => {
  
  const navigate = useNavigate();
  var idToken = parseJwt(sessionStorage.idToken.toString());
  var accessToken = parseJwt(sessionStorage.accessToken.toString());
  console.log ("Amazon Cognito ID token encoded: " + sessionStorage.idToken.toString());
  console.log ("Amazon Cognito ID token decoded: ");
  console.log ( idToken );
  console.log ("Amazon Cognito access token encoded: " + sessionStorage.accessToken.toString());
  console.log ("Amazon Cognito access token decoded: ");
  console.log ( accessToken );
  console.log ("Amazon Cognito refresh token: ");
  console.log ( sessionStorage.refreshToken );
  
  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };
/*eslint-enable*/

  return (
    <div>
      <h1>Hello World</h1>
      <p></p>
      <button onClick={handleLogout}>Logout</button>

      <div>ID TOKEN: {sessionStorage.idToken.toString()}</div>
      <div>{JSON.stringify(idToken, null, 2)}</div>
      
      <div>ACCESS TOKEN: {sessionStorage.accessToken.toString()}</div>
      <div>{JSON.stringify(accessToken, null, 2)}</div>

      
      
    </div>
  );
};

// idToken >> sub, email_verified, iss, cognito:username, given_name, origin_jti, aud, event_id, token_use, auth_time, exp, iat, family_name, jti, email
// accessToken >>sub, iss, client_id, origin_jti, event_id, token_use, scope, auth_time, exp, iat, jti, username

export default AuthHome;