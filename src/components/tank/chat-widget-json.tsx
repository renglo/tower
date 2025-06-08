import {
    Braces,
} from "lucide-react"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';



export default function ChatWidgetJson({ key, item, active = false }: { key: string; item: { _out: string }; active?: boolean }) {



  return (

        <span key={key} className={`flex flex-col mb-4 w-full max-w-[75%] mx-auto ${!active ? 'opacity-50' : ''}`}>
            <div className="text-xs text-gray-400 bg-neutral-800/70 font-mono px-2 py-2 rounded-t flex flex-row items-center gap-1">JSON <Braces className="h-4 w-4" /></div>
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
                {JSON.stringify(item['_out'], null, 2)}
                </SyntaxHighlighter>
            </div>
        </span>   
        
  )
}
