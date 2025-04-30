import WebSocketButton from "@/components/tank/websocket-button"
import ChatButton from "@/components/tank/chat-button"
import { TextareaBadges } from "@/components/ui/textareabadges"
import { useState} from 'react';


interface InputProps {
    messageUp: (message: string, payload?: any) => void;
    payload?: any;
    captions?: Record<string, string>;
}

export default function ChatInput({messageUp,payload = {},captions = {}}: InputProps) {


    const [unsentMessage, setUnsentMessage] = useState('');
    const [shouldSend, setShouldSend] = useState(false);


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
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setShouldSend(prev => !prev);
                    }
                  }}
            /> 
         
            <WebSocketButton
                messageUp={messageUp}
                messageReset={messageReset}
                message={unsentMessage}
                payload={payload}
                trigger={shouldSend}
            />
            <span className="">
                <ChatButton
                    path={`${import.meta.env.VITE_API_URL}/_chat/tb`}
                    method='POST'
                    messageUp={messageUp}
                    messageReset={messageReset}
                    message={unsentMessage}
                    payload={payload}
                />
            </span>
            
            
        </div>
        
    )
}







            