
import { useState } from 'react';
    
import { signIn} from './authService';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocation } from 'react-router-dom';

import * as CryptoJS from 'crypto-js';


/*eslint-disable*/
function parseJwt (token:any) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
/*eslint-enable*/

function getHandle(input: string): string {
  // Generate the MD5 hash of the input string
  const hash = CryptoJS.MD5(input).toString();
  // Extract the first 9 characters of the hash
  const handle = hash.substring(0, 9);
  return handle;
}


export default function AuthLogin() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const [email, setEmail] = useState(queryParams.get('email'));
    const [password, setPassword] = useState('');

    const handleSignIn = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          
          if (!email || !password) {
            console.error("Email and password must be provided");
            throw new Error("Email and password must be provided");
          }

          const session = await signIn(email, password);
          
          console.log('Sign in successful', session);
          if (session && typeof session.AccessToken !== 'undefined') {
            //The authService already stored the accessToken in the sessionStorage
            //This is a double check to avoid an undefined token.
            sessionStorage.setItem('accessToken', session.AccessToken);

            var accessToken = parseJwt(sessionStorage.accessToken.toString());
            var idToken = parseJwt(sessionStorage.idToken.toString());
            const handle = getHandle(accessToken.username);
            sessionStorage.setItem('token_exp', idToken.exp);

            //This data exists as a failsafe in case the GlobalContext is reset
            sessionStorage.setItem('cu_handle', handle);
            sessionStorage.setItem('cu_email', idToken.email);
            sessionStorage.setItem('cu_first', idToken.given_name);
            sessionStorage.setItem('cu_last', idToken.family_name);
         

            const data = {"last_login":true} 
            const put_response = await fetch(`${import.meta.env.VITE_API_URL}/_auth/user`, {
              method: 'PUT',
              headers: {
              'Authorization': `Bearer ${sessionStorage.idToken}`,
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            });
            console.log(put_response);


            if (sessionStorage.getItem('accessToken')) {
              //This is where user is redirected after successful login
              // We use window.location.href as it is more flexible."
              // Using windlow.location will cause that anything in the GlobalContext to reset. 
              console.log('redirecting to /home');
              
              window.location.href = `/home`;

            } else {
              console.error('Session token was not set properly.');
              alert('Session token was not set properly.');
            }
          } else {
            console.error('SignIn session or AccessToken is undefined.');
            alert('SignIn session or AccessToken is undefined. You need to reset your password first.');
          }
        } catch (error) {
          alert(`Sign in failed: ${error}`);
        }
      };


    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
              <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                  </p>
              </div>
              <div className="grid gap-4">
                  <form onSubmit={handleSignIn} >
                      <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                          id="email"
                          type="email"
                          value={email ?? ""}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="m@example.com"
                          required
                      />
                      </div>
                      <div className="grid gap-2">
                      <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <a
                          href="/forgot"
                          className="ml-auto inline-block text-sm underline"
                          >
                          Forgot your password?
                          </a>
                      </div>
                      <Input 
                          id="password" 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required 
                      />
                      </div>
                      <Button type="submit" className="w-full">
                      Login
                      </Button>
                  </form>
              </div>
              <div className="mt-4 text-center text-sm hidden">
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="underline">
                  Create one here
                  </a>
              </div>
              </div>
          </div>
          <div className="hidden bg-muted lg:block h-full w-full">
              <img
              src={`${import.meta.env.VITE_WL_LOGIN}`}
              alt="Img"
              
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />


          </div>
        </div>
    )
}
