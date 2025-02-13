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
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';

const ResetPassword = () => {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const client = new CognitoIdentityProviderClient({
      region: import.meta.env.VITE_COGNITO_REGION,
    });

    const command = new ConfirmForgotPasswordCommand({
      ClientId: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
    });

    try {
      await client.send(command);
      setStatus('Success');
      alert("Password reset successful. You can now log in with your new password.");
      navigate('/login');
    } catch (error: unknown) {
      console.error('Error resetting password:', error);
      setStatus(`Invalid password: ${(error as Error).name}`);
    }
  };

  
  return (
    <Card className="mx-auto max-w-sm mt-16">
      <CardHeader>
        <CardTitle className="text-xl">
        <div className="flex mb-6">
          Reset Password
          <img src={`${import.meta.env.VITE_WL_LOGO}`} className="w-[80px] ml-auto" alt="Logo" />
        </div>  
        </CardTitle>
        <CardDescription>
          Enter the rest code you received in your email. 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResetPassword}>
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
              <div className="grid gap-2">           
                  <Input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter the reset code"
                    required
                  />          
              </div>
              <div className="grid gap-2">            
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                  />            
              </div>
              <Button type="submit" className="w-full">
                Reset Password
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
      </CardContent>
    </Card> 
  );


};

export default ResetPassword;