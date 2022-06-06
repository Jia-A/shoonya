import axios from "axios";
// import { useAuth } from "../context/authContext";



const getVideos = async () =>{
    try {
        const response = await axios({
            method : "get",
            url: "/api/videos",
        });
    
        if (response.status === 200) return response.data
      } catch (error) {
        console.error(error.response);
      }
}
const getCategories = async () =>{
    try {
        const response = await axios({
            method : "get",
            url: "/api/categories",
        });
    
        if (response.status === 200) return response.data
      } catch (error) {
        console.error(error.response);
      }
}

const getWatchLaterVideos = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method : "get",
            url : "/api/user/watchlater",
            headers : { authorization : token }
        });
        if(response.status === 200)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

const postWatchLaterVideos = async ( token, video ) =>{
    console.log(token)
    console.log(video)
    try{
        const response = await axios({
            method : "post",
            url  : "/api/user/watchlater",
            data : { video } ,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            console.log(response.data)
            return response.data
        }
        
    }
    catch(error){
        console.log(error)
    }
}

export { getVideos, getCategories, getWatchLaterVideos, postWatchLaterVideos }