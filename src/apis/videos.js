import axios from "axios";

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

const getHistoryVideos = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method : "get",
            url : "/api/user/history",
            headers : { authorization : token }
        });
        if(response.status === 200)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

const postHistoryVideos = async ( token, video ) =>{
    try{
        const response = await axios({
            method : "post",
            url  : "/api/user/history",
            data : { video } ,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }

    }
    catch(error){
        console.log(error)
    }
}

const removeHistoryVideos = async ( token, _id) =>{
    try {
        const response = await axios({
            method : "delete",
            url : `/api/user/history/${_id}`,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }
    }
    catch(error){
        console.log(error)
    }
}
const clearHistoryVideos = async ( token) =>{
    try {
        const response = await axios({
            method : "delete",
            url : "/api/user/history/all",
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }
    }
    catch(error){
        console.log(error)
    }
}

export { getVideos, getCategories, getHistoryVideos, postHistoryVideos, removeHistoryVideos, clearHistoryVideos }