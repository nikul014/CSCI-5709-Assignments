import React from 'react';
import {buttonStyle, secondButtonStyle} from "../constants/colors";

const LiveSessionItemCard = ({ session,onEdit, onStart }) => {


    const formattedDate = session.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = session.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 flex flex-col h-full">
                <div className="font-bold text-xl mb-2 truncate">{session.title}</div>
                <p className="text-gray-700 text-base line-clamp-2">{session.description}</p>
                <div className="flex-grow"></div>
                <div className="flex items-center mt-2">
                    <div className="text-sm">
                        <p className="mt-1 text-sm text-gray-500">Time: <span className="time">{formattedTime}</span></p>
                        <p className="mt-1 text-sm text-gray-500">Day: <span className="time">{formattedDate}</span></p>
                    <p className="mt-1 text-sm text-gray-500">Duration: <span
                            className="duration">{session.duration}</span></p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button style={buttonStyle} className="text-white text-sm flex-1 me-1 py-2 px-4 rounded"
                    onClick={() => onStart(session)}
                    >
                        Start
                    </button>
                    <button style={secondButtonStyle} className="text-black text-sm flex-1 py-2 px-4 rounded"
                            onClick={() => onEdit(session)} >
                        Edit
                    </button>
                </div>
            </div>
        </div>

    );
};

export default LiveSessionItemCard;
