import { createContext, useContext, useReducer, useState } from "react";
import { useEffect } from "react";
import { getCategories, getVideos } from "../apis/videos";
import { postHistoryVideos, removeHistoryVideos, clearHistoryVideos } from "../apis/videos"

const VideoContext = createContext();

const initialState = {
    videos : [],
    categories : [],
    history : []
}


const VideoProvider = ({children}) => {

    const videoFunction = ( videoState, action ) =>{
        console.log("video Function called")
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

    const removeHistory = async ( token, _id) =>{
        try{
            const response = await removeHistoryVideos(token, _id)
            videoDispatch({type : "REMOVE_HISTORY", payload : response.history})
        }
        catch(error){
            console.log(error)
        }

    }
    
    const clearHistory = async ( token) =>{
        try{
            const response = await clearHistoryVideos(token)
            videoDispatch({type : "CLEAR_HISTORY", payload : response.history})
        }
        catch(error){
            console.log(error)
        }

    }
    return (
        <VideoContext.Provider value={{videoState, videoDispatch, getHistory, removeHistory, clearHistory}}>{children}</VideoContext.Provider>
    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };