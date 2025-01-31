import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom';

import { useState,FormEvent } from 'react';
import { CognitoIdentityProviderClient, ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');


const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const navigate = useNavigate();



    const client = new CognitoIdentityProviderClient({
      region: import.meta.env.VITE_COGNITO_REGION,
    });

    const command = new ForgotPasswordCommand({
      ClientId: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
      Username: email,
    });

    try {
      await client.send(command);
      setStatus('Enter code in next page');
      alert("Code sent to your email");
      navigate('/confirm');
      
    } catch (error) {
      console.error('Error sending password reset code:', error);
      setStatus('Failed to send code.');
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-16">
      <CardHeader>
        <CardTitle className="text-xl">
        <div className="flex mb-6">
          Password recovery
          <img src={`${import.meta.env.VITE_WL_LOGO}`} className="w-[80px] ml-auto" alt="Logo" />
        </div>  
        </CardTitle>
        <CardDescription>
          Enter your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleForgotPassword}>
          <div className="grid gap-4">
              <div className="grid gap-2">
                
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    />
                  
              </div>
              <Button type="submit" className="w-full">
                Send Code
              </Button>     
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-blue-500">
            {status}       
        </div> 
        <div className="mt-4 text-center text-sm">
            <a href="/login" className="underline">
              Go back to log in
            </a>
        </div>
        <div className="mt-4 text-center text-sm">
          Got the reset code?
          <a href="/reset" className="underline">
            Click here
          </a>
        </div>
      </CardContent>
    </Card> 
  );
};

export default ForgotPassword;