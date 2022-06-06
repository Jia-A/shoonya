import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getVideos, removeLikedVideos, removeWatchLaterVideos, postWatchLaterVideos, postLikedVideos } from "../apis/videos";


const VideoContext = createContext(null);

const initialState = {
    videos : [],
    categories : [],
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


            case "ADD_WATCH_LATER" :
            return {
                ...videoState,
                watchLater : action.payload,
            }

            case "REMOVE_WATCH_LATER" :
            return {
                ...videoState,
                watchLater : action.payload

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


    const getWatchLater = async ( token, video ) =>{
        if(token){
        try{
            const response = await postWatchLaterVideos( token, video )
            videoDispatch({ type : "ADD_WATCH_LATER", payload : response.watchlater})  

    const getLikes = async (token, video) =>{
        if(token){
        try {
            const response = await postLikedVideos( token ,video)
            videoDispatch({type : "ADD_LIKED", payload : response.likes})

        }
        catch(error){
            console.log(error)
        }

    }
    else {
        navigate("/login")
    }
    }

    const removeWatchLater = async ( token, _id) =>{
        try{
            const response = await removeWatchLaterVideos(token, _id)
            videoDispatch({type : "REMOVE_WATCH_LATER", payload : response.watchlater})

        }
        else{
            navigate("/login")
        }
    }

    const removeLikes = async ( token, _id) =>{
        try{
            const response = await removeLikedVideos(token, _id)
            videoDispatch({type : "REMOVE_LIKED_VIDEOS", payload : response.likes})
        }
        catch(error){
            console.log(error)
        }
        
    }


    return (
        <VideoContext.Provider value={{videoState, videoDispatch, getLikes, removeLikes, getWatchLater, removeWatchLater}}>{children}</VideoContext.Provider>

    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };