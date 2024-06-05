import LiveSessionItemCard from "./LiveSessionItemCard";
import React, {useState} from "react";
import {buttonStyle} from "../constants/colors";
import JoinLiveSession from "./JoinLiveSession";

const sessions = [
    {
        "id": 2,
        "title": "Morning Meditation",
        "description": "A calming session to start your day with positivity.",
        "time": new Date("2024-06-24T09:00:00"),
        "day": "Monday",
        "duration": "45 minutes"
    },
    {
        "id": 3,
        "title": "Midday Relaxation",
        "description": "A session to refresh your mind and body during the day.",
        "time": new Date("2024-06-23T09:00:00"),
        "day": "Tuesday",
        "duration": "30 minutes"
    },
    {
        "id": 4,
        "title": "Evening Serenity",
        "description": "Wind down with this peaceful meditation session.",
        "time": new Date("2024-06-21T09:00:00"),
        "day": "Wednesday",
        "duration": "45 minutes"
    },
    {
        "id": 5,
        "title": "Thursday Tranquility",
        "description": "Find inner peace with this guided meditation.",
        "time": new Date("2024-06-22T09:00:00"),
        "day": "Thursday",
        "duration": "45 minutes"
    }
];

function LiveSession() {
    const [sessionsList, setSessionsList] = useState(sessions);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [sessionLength, setSessionLength] = useState('30');
    const [sessionDate, setSessionDate] = useState('');

    const [selectedSessionId, setSelectedSessionId] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const selectedDateTime = new Date(sessionDate);
        selectedDateTime.setHours(Number(sessionTime.split(':')[0]));
        selectedDateTime.setMinutes(Number(sessionTime.split(':')[1]));

        if (selectedDateTime < currentDate) {
            alert('Selected date and time cannot be in the past.');
            return;
        }

        const newSession = {
            id: sessionsList.length + 1,
            title,
            description,
            time: selectedDateTime,
            duration: `${sessionLength} minutes`
        };
        if (selectedSessionId !== null) {
            updateSession(selectedSessionId, newSession);
            setSelectedSessionId(null);
        } else {
            setSessionsList([...sessionsList, newSession]);
        }

        // Reset form fields after submission
        setTitle('');
        setDescription('');
        setSessionDate(new Date());
        setSessionTime('');
        setSessionLength('30');

        alert('Form submitted successfully!');

    };


    const handleEditSession = (session) => {
        setTitle(session.title);
        setDescription(session.description);
        // Convert the date to ISO string format
        setSessionDate(session.time.toISOString().split('T')[0]);
        setSessionTime(
            session.time.getHours().toString().padStart(2, '0') + ':' +
            session.time.getMinutes().toString().padStart(2, '0')
        );
        setSessionLength(session.duration.split(' ')[0]);
        setSelectedSessionId(session.id);
    };

    // Update existing session with new data
    const updateSession = (id, newData) => {
        const updatedSessionsList = sessionsList.map(session =>
            session.id === id ? {...session, ...newData} : session
        );
        setSessionsList(updatedSessionsList);
    };

    const [currentView, setCurrentView] = useState('main');


    const [startSession, setStartSession] = useState({});

    const handleStartButtonClick = (session) => {
        setCurrentView('new');
        setStartSession(session);
    };

    const handleBackButtonClick = () => {
        setCurrentView('main');
    };

    return (

        <div>
            {currentView === 'main' ? (

                <>

                    <div>
                        <div className="font-bold text-white text-xl mb-6 truncate">Scheduled Session</div>

                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {sessionsList.map((session, index) => (
                                <LiveSessionItemCard key={index} session={session} onEdit={handleEditSession}  onStart={handleStartButtonClick}/>
                            ))}
                        </div>

                        <div className="font-bold text-white text-xl mt-8 truncate">Create Session</div>

                        <div
                            className="flex flex-col md:flex-row justify-center mt-8 space-y-8 md:space-y-0 md:space-x-8">
                            <div
                                className="w-full md:w-1/2 p-8 bg-white rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                                <form className="space-y-4" onSubmit={handleFormSubmit}>
                                    <div>
                                        <label htmlFor="title" className="block mb-1">Title:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="w-full border rounded px-3 py-2"
                                            maxLength="30"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-1">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="4"
                                            className="w-full border rounded px-3 py-2"
                                            maxLength="150"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1 me-2">
                                            <label htmlFor="sessionDate" className="block mb-1">Session Date:</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    id="sessionDate"
                                                    name="sessionDate"
                                                    className="w-full border rounded px-3 py-2"
                                                    value={sessionDate}
                                                    onChange={(e) => setSessionDate(e.target.value)}
                                                    required
                                                />
                                                <div
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                         aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path fillRule="evenodd"
                                                              d="M9 7a1 1 0 0 1 1.707-.707L12 7.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2A1 1 0 0 1 9 7Z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <label htmlFor="sessionTime" className="block mb-1">Session Time:</label>
                                            <input
                                                type="time"
                                                id="sessionTime"
                                                name="sessionTime"
                                                className="w-full border rounded px-3 py-2"
                                                value={sessionTime}
                                                onChange={(e) => setSessionTime(e.target.value)}
                                                required
                                            />
                                        </div>

                                    </div>
                                    <div>
                                        <label htmlFor="sessionLength" className="block mb-1">Session Length:</label>
                                        <select
                                            id="sessionLength"
                                            name="sessionLength"
                                            className="w-full border rounded px-3 py-2"
                                            value={sessionLength}
                                            onChange={(e) => setSessionLength(e.target.value)}
                                            required
                                        >
                                            <option value="">Select length</option>
                                            <option value="30">30 minutes</option>
                                            <option value="45">45 minutes</option>
                                            <option value="60">60 minutes</option>
                                        </select>
                                    </div>
                                    <button type="submit" style={buttonStyle}
                                            className="w-full text-white text-sm flex-1 me-1 py-2 px-4 rounded">
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <div
                                className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center order-1 md:order-2 ">
                                <div className=" p-10 bg-opacity-70 bg-backgroundColor rounded-xl">
                                    <h2 className="text-s font-extrabold  mb-6">Follow These Simple Steps</h2>
                                    <ol className="list-decimal pl-4">
                                        <li className="mb-2">Step 1: Fill in the title field (max 30 characters).</li>
                                        <li className="mb-2 ">Step 2: Fill in the description (max 150 characters).</li>
                                        <li className="mb-2 ">Step 3: Pick a session date.</li>
                                        <li className="mb-2 ">Step 4: Select a session time.</li>
                                        <li className="mb-2 ">Step 5: Choose the session length.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            ) : (
                <JoinLiveSession onBack={handleBackButtonClick} session={startSession}/>
            )}
        < /div>

    );
}

export default LiveSession;
