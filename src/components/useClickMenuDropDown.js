import { useEffect , useRef } from "react";

export default function useClickMenuDropDown ( callBackFn ) {
    let domNodeRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if(!domNodeRef.current?.contains(event.target)){
                callBackFn();
            }
        }
        document.addEventListener("mousedown" , handler)
        return () => {
            document.removeEventListener("mousedown" , handler);
        }
    }, []); 

    return domNodeRef;
}