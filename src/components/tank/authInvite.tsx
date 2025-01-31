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
import { toast } from "@/components/ui/use-toast"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom';

import { useState, FormEvent } from 'react';


interface TransactionType {
    success?: string;
    status?: string;
    [key: string]: any; // Additional properties
}

export default function AuthInvite() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [pass, setPass] = useState('');

  const [transaction, setTransaction] = useState<TransactionType>({});
  const [warning, setWarning] = useState('');




  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault(); // Prevent default form submission


    try {

        // Send data for verification
        const response = await fetch(`${import.meta.env.VITE_API_URL}/_auth/user/invite`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.accessToken}`,
            },
            body: JSON.stringify({
                email:email,
                code:code,
                first:first,
                last:last,
                pass:pass
            }),
        });

        const rs = await response.json();
        setTransaction(rs);

        /*ERRORS 
        This happens when 
        {
            "success": false,
            "message": "User already exists, sign in to access",
            "status": 404
            
        }

        {
            "success":False, 
            "message": "Invitation is expired", 
            "status" :410
        }  

        {
            "success":False, 
            "message": "Invitation is invalid", 
            "status" :400
        }

        */

        // Handle the response
        if (response.ok) {
            console.log('Validation sent ok');
            
            toast({
            title: "Validation ok",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Validation ok. Creating your account. </code>
                </pre>
            ),
            });

            alert("Account confirmed successfully!\nSign in on next page.");
            navigate(`/login?email=${email}`);
            

        } else {     
            setWarning(transaction.message);   
        }


      
    } catch (error) {
      
    }
  };





  return (
    <Card className="mx-auto max-w-sm mt-16">
      <CardHeader>
        <CardTitle className="text-xl">
            <div className="flex mb-6">
            Access your new team 
            <img src={`${import.meta.env.VITE_WL_LOGO}`} className="w-[40px] ml-auto" alt="Logo" />
            </div>    
        </CardTitle>
        <CardDescription>
          Enter the invitation code we sent to your email
          <div className="text-xs ">(The message has the subject: "You have been invited to a new team")</div>
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

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input 
                        id="givenName" 
                        placeholder="Max" 
                        onChange={(e) => setFirst(e.target.value)}
                        required 
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input 
                        id="familyName" 
                        placeholder="Robinson" 
                        onChange={(e) => setLast(e.target.value)}
                        required 
                    />
                    </div>
                </div>



                <div className="grid gap-2">
                    <Label htmlFor="email">Your email <div className="text-xs ">(where the invitation was sent to)</div></Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">You new password</Label>
                    <Input 
                    id="password" 
                    type="password" 
                    onChange={(e) => setPass(e.target.value)}
                    required
                    />
                </div>
                <div className="text-xs text-red-500">{warning}</div>
                <Button type="submit" className="w-full">
                    Confirm
                </Button>
            
            </div>
        </form>
        
      </CardContent>
    </Card>

  )
}
