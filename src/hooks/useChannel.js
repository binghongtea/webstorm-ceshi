import {useEffect, useState} from "react";
import {getChannelAPI} from "@/apis/article";


const useChannel = () => {
    const [channels, setChannels] = useState([])
    useEffect(()=>{
    async function fetchChannels (){
        const res = await getChannelAPI()
        setChannels(res.data.channels)
    }
    fetchChannels()
}, [])
}


export default useChannel