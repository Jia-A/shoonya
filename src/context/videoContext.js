import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { getCategories, getVideos, removeLikedVideos, removeWatchLaterVideos, postWatchLaterVideos, postLikedVideos, postHistoryVideos, removeHistoryVideos, clearHistoryVideos } from "../apis/videos";



const VideoContext = createContext(null);

const initialState = {
    videos : [],
    categories : [],
    history : [],
    watchLater : [],
    liked : []
}

const VideoProvider = ({children}) => {
    const navigate = useNavigate();

    const videoFunction = ( videoState, action ) =>{
        switch(action.type){
            case "SET_VIDEOS" : 
            return {
                ...videoState, 
                videos : action.payload,
            }
    
            case "SET_CATEGORIES" : 
            return { 
                ...videoState, 
                categories : action.payload,
            }

            case "ADD_HISTORY" :
            return {
                ...videoState,
                history : action.payload,
            }

            case "REMOVE_HISTORY" :
            return {
                ...videoState,
                history : action.payload
            }
            case "CLEAR_HISTORY" :
            return {
                ...videoState,
                history : action.payload
            
            }
            case "ADD_WATCH_LATER" :
            return {
                ...videoState,
                watchLater : action.payload,
            }

            case "REMOVE_WATCH_LATER" :
            return {
                ...videoState,
                watchLater : action.payload
            }

            case "ADD_LIKED" :
            return { 
                ...videoState, 
                liked : action.payload,
            }

            case "REMOVE_LIKED_VIDEOS" : 
            return { 
                ...videoState,
                liked : action.payload,


            }
        }
    }
    const [ videoState, videoDispatch ] = useReducer( videoFunction, initialState);

    useEffect(()=>{
        const allVideos = async () =>{
            try {
                const response  = await getVideos();
                videoDispatch({type : "SET_VIDEOS", payload : response.videos});
            }
            catch(error){
                console.log(error)
            }
        }
        allVideos();
    }, []);

    useEffect(()=>{
        const allCategories = async () =>{
            try {
                const response  = await getCategories();
                videoDispatch({type : "SET_CATEGORIES", payload : response.categories});
            }
            catch(error){
                console.log(error)
            }
        }
        allCategories();
    }, []);


    const getHistory = async ( token, video ) =>{
        if(token){
        try{
            const response = await postHistoryVideos( token, video )
            videoDispatch({ type : "ADD_HISTORY", payload : response.history})  
        }
        catch(error){
            console.log(error)
        }
    }
    else {
        navigate("/login")
        toast.error("You're not logged in")
    }
    }

    const getWatchLater = async ( token, video ) =>{
        if(token){
            try{
                const response = await postWatchLaterVideos( token, video )
                videoDispatch({ type : "ADD_WATCH_LATER", payload : response.watchlater})  
                toast.success("Video added to Watch Later")
            }
            catch(error){
                console.log(error)
                toast.error("Cannot add video to Watch Later")
            }
        }
        else{
            navigate("/login")
            toast.error("You're not logged in")
        }
    }    

    const getLikes = async (token, video) =>{
        if(token){
        try {
            const response = await postLikedVideos( token ,video)
            videoDispatch({type : "ADD_LIKED", payload : response.likes})
            toast.success("Video added to Likes")
        }
        catch(error){
            console.log(error)
            toast.error("Cannot add video to Likes")
        }
    }
    else {
        navigate("/login")
        toast.error("You're not logged in")
    }
    }


    const removeHistory = async ( token, _id) =>{
        try{
            const response = await removeHistoryVideos(token, _id)
            videoDispatch({type : "REMOVE_HISTORY", payload : response.history})
            toast.success("Video removed from History")
        }
        catch(error){
            console.log(error)
            toast.error("Cannot remove video from History")
        }

    }

    const removeWatchLater = async ( token, _id) =>{
        try{
            const response = await removeWatchLaterVideos(token, _id)
            videoDispatch({type : "REMOVE_WATCH_LATER", payload : response.watchlater})
            toast.success("Video removed from Watch Later")
        }
        catch(error){
            console.log(error)
            toast.error("Cannot remove from Watch Later")
        }
    }
    
    
    const clearHistory = async (token) =>{
        try{
            const response = await clearHistoryVideos(token)
            videoDispatch({type : "CLEAR_HISTORY", payload : response.history})
            toast.success("History clear")
        }
        catch(error){
            console.log(error)
            toast.error("Cannot clear History")
        }

    }

    const removeLikes = async ( token, _id) =>{
        try{
            const response = await removeLikedVideos(token, _id)
            videoDispatch({type : "REMOVE_LIKED_VIDEOS", payload : response.likes})
            toast.success("Video removed from Likes")
        }
        catch(error){
            console.log(error)
            toast.error("Cannot remove from Likes")
        }


    }
    
    return (
        <VideoContext.Provider value={{videoState, videoDispatch, getLikes, removeLikes, getWatchLater, removeWatchLater , getHistory, removeHistory, clearHistory}}>{children}</VideoContext.Provider>


    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo }