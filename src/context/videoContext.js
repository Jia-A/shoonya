import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getVideos, removeLikedVideos, removeWatchLaterVideos, postWatchLaterVideos, postLikedVideos, postHistoryVideos, removeHistoryVideos, clearHistoryVideos, makeNewPlaylist, deleteFromPlaylist, addToPlaylist } from "../apis/videos";



const VideoContext = createContext(null);

const initialState = {
    videos : [],
    categories : [],
    history : [],
    watchLater : [],
    liked : [],
    playlists : [],

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
            case "NEW_PLAYLIST" : 
            return {
                ...videoState,
                playlists : action.payload,
            }
            case "ADD_TO_PLAYLIST" : 
                const newPlaylist = videoState.playlists.reduce((previous, current)=>{
                    return action.payload._id === current._id ? [...previous, action.payload] : [...previous, current]
                },[])
    
            return {
                ...videoState,
                playlists: newPlaylist
            }
            
            case "DELETE_FROM_PLAYLIST" : 
            const remainPlaylist = videoState.playlists.reduce((previous, current)=>{
                return action.payload._id === current._id ? [...previous, action.payload] : [...previous, current]
            },[])

        return {
            ...videoState,
            playlists: remainPlaylist
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
    }
    }

    const getWatchLater = async ( token, video ) =>{
        if(token){
            try{
                const response = await postWatchLaterVideos( token, video )
                videoDispatch({ type : "ADD_WATCH_LATER", payload : response.watchlater})  

            }
            catch(error){
                console.log(error)
            }
        }
        else{
            navigate("/login")
        }
    }    

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

    const createPlaylist = async (playListName, token ) =>{
        if(token){
        try{
            const response = await makeNewPlaylist( playListName, token)
            videoDispatch({type : "NEW_PLAYLIST", payload : response.playlists})
            console.log(response.playlists)
        }
        catch(error){
            console.log(error)
        }
    }
    else {
        navigate("/login")
    }
    }

    const addVideoToPlaylist = async (video, playlistID, token) =>{
        if(token){
        try{
            const response = await addToPlaylist(video, playlistID, token)
            videoDispatch({type : "ADD_TO_PLAYLIST", payload : response.playlist})
            console.log(response.playlist)
        }
        catch(error){
            console.log(error)
        }
    }
    else{
        navigate("/login")
    }
    }
    
    const deleteVideoFromPlaylist = async (videoID, playlistID, token) =>{
        try{
            const response = await deleteFromPlaylist( videoID, playlistID, token )
            videoDispatch({type : "DELETE_FROM_PLAYLIST", payload : response.playlist})
        }
        catch(error){
            console.log(error)
        }
    }
    const removeHistory = async ( token, _id) =>{
        try{
            const response = await removeHistoryVideos(token, _id)
            videoDispatch({type : "REMOVE_HISTORY", payload : response.history})
        }
        catch(error){
            console.log(error)
        }

    }

    const removeWatchLater = async ( token, _id) =>{
        try{
            const response = await removeWatchLaterVideos(token, _id)
            videoDispatch({type : "REMOVE_WATCH_LATER", payload : response.watchlater})
        }
        catch(error){
            console.log(error)
        }
    }
    
    
    const clearHistory = async (token) =>{
        try{
            const response = await clearHistoryVideos(token)
            videoDispatch({type : "CLEAR_HISTORY", payload : response.history})
        }
        catch(error){
            console.log(error)
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
        <VideoContext.Provider value={{videoState, videoDispatch, getLikes, removeLikes, getWatchLater, removeWatchLater , getHistory, removeHistory, clearHistory, createPlaylist, addVideoToPlaylist, deleteVideoFromPlaylist}}>{children}</VideoContext.Provider>


    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo }