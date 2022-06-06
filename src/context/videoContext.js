import { createContext, useContext, useReducer, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getVideos, removeWatchLaterVideos } from "../apis/videos";
import { postWatchLaterVideos } from "../apis/videos";

const VideoContext = createContext();

const initialState = {
    videos : [],
    categories : [],
    watchLater : [],
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
        catch(error){
            console.log(error)
        }
        
    }
    return (
        <VideoContext.Provider value={{videoState, videoDispatch, getWatchLater, removeWatchLater}}>{children}</VideoContext.Provider>
    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };