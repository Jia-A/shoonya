import { createContext, useContext, useReducer, useState } from "react";
import { useEffect } from "react";
import { getCategories, getVideos } from "../apis/videos";

const VideoContext = createContext();

const initialState = {
    videos : [],
    categories : [],
    watchLater : [],
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

            case "ADD_WATCH_LATER" :
            return {
                ...videoState,
                watchLater : action.payload,
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
    return (
        <VideoContext.Provider value={{videoState, videoDispatch}}>{children}</VideoContext.Provider>
    );
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };