import React, { useState } from "react";
import { buttonStyle } from "../constants/colors";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';

const JoinLiveSession = ({ onBack, session }) => {
    const [joined, setJoined] = useState(false);
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [stream, setStream] = useState(null);

    const handleJoin = async () => {
        if (!joined) {
            try {
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
                    setStream(mediaStream)
                    setJoined(true);

                } catch (err) {
                    alert("Failed to get camera permission: " + err.message);
                }
            } catch (err) {
                alert("Failed to get camera permission: " + err.message);
            }
        } else {
            handleEndCall();
        }
    };

    const handleToggleMic = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => track.enabled = !micOn);
        }
        setMicOn(!micOn);
    };

    const handleToggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => track.enabled = !videoOn);
        }
        setVideoOn(!videoOn);
    };
    const handleEndCall = () => {
        try{
            stream.getTracks().forEach(track => {
                track.stop();
            });
            setStream(null);
            setJoined(false);
            onBack();
        }catch (e){
            console.log(e);
            // Close the stream properly
            setStream(null);
            setJoined(false);
            onBack();
        }
    };

    return (
        <div className="p-4">
            <button
                style={buttonStyle}
                className="text-white text-sm flex-1 me-1 py-2 px-4 rounded"
                onClick={handleEndCall}
            >
                Back
            </button>

            <h2 className="text-white text-xl mt-4">{session.title}</h2>
            <div className="text-white">
                <p><strong>Description:</strong> {session.description}</p>
                <p><strong>Time:</strong> {session.time.toLocaleString()}</p>
                <p><strong>Day:</strong> {session.day}</p>
                <p><strong>Duration:</strong> {session.duration}</p>
            </div>

            {joined && (
                <div className="mt-4">

                    <div className="flex justify-center">
                        {stream && (
                            <video
                                autoPlay
                                playsInline
                                ref={video => {
                                    if (video) {
                                        video.srcObject = stream;
                                    }
                                }}
                                className="rounded-lg"
                                style={{width: "80%", height: "auto"}}
                            />
                        )}
                    </div>
                    <div className="flex justify-center mb-4 space-x-4">
                        <div
                            className="text-white text-center cursor-pointer"
                            onClick={handleToggleMic}
                        >
                            {micOn ? <FaMicrophone size={24}/> : <FaMicrophoneSlash size={24}/>}
                            <div>{micOn ? "Mic On" : "Mic Off"}</div>
                        </div>
                        <div
                            className="text-white text-center cursor-pointer"
                            onClick={handleToggleVideo}
                        >
                            {videoOn ? <FaVideo size={24}/> : <FaVideoSlash size={24}/>}
                            <div>{videoOn ? "Video On" : "Video Off"}</div>
                        </div>
                        <div
                            className="text-white text-center cursor-pointer"
                            onClick={handleEndCall}
                        >
                            <FaPhoneSlash size={24}/>
                            <div>End Call</div>
                        </div>
                    </div>


                </div>
            )}

            {!joined && (
                <button
                    style={buttonStyle}
                    className="text-white text-sm flex-1 me-1 py-2 px-4 rounded mt-4"
                    onClick={handleJoin}
                >
                    Join
                </button>
            )}

        </div>
    );
};

export default JoinLiveSession;
