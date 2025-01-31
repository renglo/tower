import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { confirmSignUp } from "@/components/tank/authService";


export default function AuthConfirm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await confirmSignUp(email, code);
      alert("Account confirmed successfully!\nSign in on next page.");
      navigate('/login');
    } catch (error) {
      alert(`Failed to confirm account: ${error}`);
    }
  };



  return (
    <Card className="mx-auto max-w-sm mt-16">
      <CardHeader>
        <CardTitle className="text-xl">
            <div className="flex mb-6">
            Confirmation 
            <img src={`${import.meta.env.VITE_WL_LOGO}`} className="w-[80px] ml-auto" alt="Logo" />
            </div>    
        </CardTitle>
        <CardDescription>
          Enter the code we sent to your email 
          <div className="text-xs ">(The message has the subject: "Your verification code.")</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputOTP 
                        maxLength={6} 
                        onChange={(value) => setCode(value)}
                        data-1p-ignore
                    >
    
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        
                    </InputOTP>
                </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Your email</Label>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            
            <Button type="submit" className="w-full">
                Confirm
            </Button>
            
            </div>
        </form>
        
      </CardContent>
    </Card>

  )
}
