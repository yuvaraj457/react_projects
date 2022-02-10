import  { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

export const UseCopy = (interval = null) => {
    const [isCopied, setCopied] = useState(false)

    useEffect(() => {
        if(isCopied && interval){
           setTimeout(()=>setCopied(false), interval) 
        }
    },[isCopied, interval])

    const handleCopy = text => {
        copy(text.toString())
        setCopied(true)
    }

  return [isCopied, handleCopy]
}
