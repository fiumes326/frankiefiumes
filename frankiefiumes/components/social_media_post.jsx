import React from "react";
import '../styles/social_media_post.css'
import { useState } from "react";


const SocialMediaPost = () => {
    const [currentPost, setCurrentPost] = useState(0);


    const NextPost = () => {
        if (currentPost < 4)
            setCurrentPost(prev => prev+1)
    }

    const PrevPost = () => {
        if (currentPost > 0)
            setCurrentPost(prev => prev-1)
    }

    return (
    <div id="MainContainer">
        <div id="SocialMediaPost">
            <div id="SocialMediaHeader">
                <div id="ProfilePicture"><img src="../public/headshot.png" id="HeadShot"/></div>
                <div id="UserName">frankie_fiumefreddo</div>
            </div>
            <div id="SocialMediaPostBody">
                <div id="RightArrow"><button onClick={NextPost}>&rarr;</button></div>
                <div id="LeftArrow"><button onClick={PrevPost}>&larr;</button></div>
            </div>
            <div id="SocialMediaPostFooter">
                <div id="Caption">
                    <span id="CaptionUsername">frankie_fiumefreddo</span>
                    <span id="CaptionText">About Me</span>
                </div>
            </div>
        </div>
        <div id="DownArrow">Continue Down</div>
    </div>
    );
}

export default SocialMediaPost;