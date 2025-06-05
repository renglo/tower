
export default function ChatWidgetText({ key,item }) {



  return (

        <span key={key} className="flex flex-col mb-4 w-full max-w-[75%] mx-auto">
             
            {item?._out?.content ? (
              typeof item._out.content === 'string' ? item._out.content :
              typeof item._out.content === 'number' ? item._out.content.toString() :
              JSON.stringify(item._out.content)
            ) : ''}
        </span>   
        
  )
}
