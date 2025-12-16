import React from "react";
import '../styles/social_media_post.css'
import { useState } from "react";
import DotGrid from '../utils/DotGrid';

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
    <div style={{backgroundColor: '#0e1111'}}>
    <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#1e1b4b"
            activeColor="#4338ca"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}>
    <div id="MainContainer">
        <div id="SocialMediaPost">
            <div id="SocialMediaHeader">
                <div id="ProfilePicture"><img src="../src/assets/headshot.png" id="HeadShot"/></div>
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
    </DotGrid>
    </div>
    );
}

export default SocialMediaPost;