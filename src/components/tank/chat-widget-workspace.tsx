import {
    ToyBrick,
} from "lucide-react"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';



export default function ChatWidgetWorkspace({ key, item }: { key: string; item: { _out: { content: string | number | any; state: any } } }) {



  return (

        <span key={key} className="flex flex-col mb-4 w-full max-w-[75%] mx-auto">
            <div className="text-xs text-gray-400 bg-neutral-800/70 font-mono px-2 py-2 rounded-t flex flex-row items-center gap-1">WORKSPACE <ToyBrick className="h-4 w-4" /></div>
            <div className="text-sm bg-neutral-700 text-white p-4 rounded-b font-mono">
                <SyntaxHighlighter 
                language="json" 
                style={{
                    ...oneDark,
                    'pre[class*="language-"]': {
                    ...oneDark['pre[class*="language-"]'],
                    background: 'transparent',
                    margin: 0,
                    padding: '1rem',
                    },
                    'code[class*="language-"]': {
                    ...oneDark['code[class*="language-"]'],
                    background: 'transparent',
                    },
                    'pre[class*="language-"] > code[class*="language-"]': {
                    ...oneDark['pre[class*="language-"] > code[class*="language-"]'],
                    background: 'transparent',
                    },
                    'pre[class*="language-"] > code[class*="language-"]::before': {
                    display: 'none'
                    },
                    'pre[class*="language-"] > code[class*="language-"]::after': {
                    display: 'none'
                    }
                }}
                >
                {item?._out?.state ? JSON.stringify(item._out.state, null, 2) : '{}'}
                </SyntaxHighlighter>
            </div>
        </span>   
        
  )
}
