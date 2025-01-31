import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { signUp } from './authService';



export default function AuthRegister() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');



  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      await signUp(email, password, givenName, familyName);
      alert("The verification code has been sent to your email");
      navigate('/confirm', { state: { email } });
    } catch (error) {
      alert(`Sign up failed: ${error}`);
    }
  };



  return (
    <Card className="mx-auto max-w-sm mt-16">
      <CardHeader>
        <CardTitle className="text-xl">
        <div className="flex mb-6">
          Sign Up 
          <img src={`${import.meta.env.VITE_WL_LOGO}`}  className="w-[80px] ml-auto" alt="Logo" />
        </div>  
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input 
                id="givenName" 
                placeholder="Max" 
                onChange={(e) => setGivenName(e.target.value)}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input 
                id="familyName" 
                placeholder="Robinson" 
                onChange={(e) => setFamilyName(e.target.value)}
                required 
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
               id="password" 
               type="password" 
               onChange={(e) => setPassword(e.target.value)}
               required
            />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          
        </div>
        </form>
        <div className="mt-4 text-center text-sm">
            <a href="/login" className="underline">
              Go back to log in
            </a>
        </div>
        <div className="mt-4 text-center text-sm">
          Got the confirmation code? 
          <a href="/confirm" className="underline">
            Click here
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
