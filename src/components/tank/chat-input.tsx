import WebSocketButton from "@/components/tank/websocket-button"
import { TextareaBadges } from "@/components/ui/textareabadges"
import { useState} from 'react';


interface InputProps {
    messageUp: (message: string, payload?: any) => void;
    payload?: any;
    captions?: Record<string, string>;
}

export default function ChatInput({messageUp,payload = {},captions = {}}: InputProps) {


    const [unsentMessage, setUnsentMessage] = useState('');

    const messageReset = (m: boolean) => {
        if(m){
            setUnsentMessage('');
        }     
    };

    return (

        <div className="mt-auto bg-background pt-2 flex flex-row gap-1 relative z-30">
            
            <TextareaBadges 
                placeholder= {captions['hint']} 
                value={unsentMessage}
                onChange={(e) => setUnsentMessage(e.target.value)}
                context={{
                    portfolio: captions['portfolio_name'],
                    org: captions['org_name'],
                    thread: captions['activeThread']
            }}
            /> 
         
            <WebSocketButton
                messageUp={messageUp}
                messageReset={messageReset}
                message={unsentMessage}
                payload={payload}
            />
            
        </div>
        
    )
}







            