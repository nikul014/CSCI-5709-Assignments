# Assignment 1

* *Date Created*: 03 June 2024
* *Last Modification Date*: 05 June 2024
* *Website URL*: <https://calmessence.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/nkukadiya/CSCI-5709-Assignments/-/tree/main/Assignment1?ref_type=heads>

## Authors

* Nikulkumar Kukadiya (nk865270@dal.ca)

## Deployment

The project code available in the Assignment1 directory was pushed to Github and then using the Netlify deployment deployed to the server.

Steps of Deployment:
1. Upload your code to the main branch of the GitHub repository.
2. Retrieve the Assignment1 project from GitHub and import it into Netlify.
3. Configure the build settings using npm run build and adjust the publish directory for deploying the application.
4. Access the live application at https://calmessence.netlify.app/.

## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used.
* [npm](https://docs.npmjs.com//) - Dependency Management
* [TailwindCSS](https://tailwindcss.com/) - Used for CSS and Responsiveness

## Sources Used


### App.js

```
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import LiveSession from "./live_session/LiveSession";
import {BACKGROUND_COLOR} from "./constants/colors";

const App = () => {
    const sections = [
        {name: 'Meditation', path: '/meditation'},
        {name: 'Breathing', path: '/breathing'},
        {name: 'Live Session', path: '/live-session'},
        {name: 'Chat', path: '/chat'},
        {name: 'Journal', path: '/journal'}
    ];

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <Router>
            <div className="flex flex-col h-screen" style={{backgroundColor: BACKGROUND_COLOR}}>
                <div className="block lg:hidden">
                <nav className="bg-white shadow-md">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center">
                            <img src="logo.png" alt="Logo" className="h-12 w-12 rounded-full mr-2"/>
                            <span className="text-xl font-bold">CalmEssence</span>
                        </div>
                        <div className="block lg:hidden">
                            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {showMenu ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    )}
                                </svg>
                            </button>
                        </div>
                        <div>
                            <img src="https://avatar.iran.liara.run/public/41"
                                 className="h-12 w-12 rounded-full mr-2" alt="profile"/>
                        </div>
                    </div>
                </nav>
                    {showMenu && (
                        <div className="absolute top-16 right-4 bg-white shadow-md rounded-md p-2">
                            <ul className="flex flex-col space-y-2">
                                {sections.map((section) => (
                                    <li key={section.name} className="cursor-pointer">
                                        <Link to={section.path} className="block">
                                            {section.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="flex-1 flex overflow-hidden">
                    <nav className="w-64 bg-white shadow-md lg:block hidden">
                        <div className="flex flex-col h-screen">
                            <div className="flex items-center p-4">
                                <img src="logo.png" alt="profile" className="h-12 w-12 rounded-full mr-2"/>
                                <span className="text-xl font-bold">CalmEssence</span>

                            </div>
                            <ul className="flex flex-col space-y-2 p-4 flex-1">
                                {sections.map((section) => (
                                    <li key={section.name} className="p-2 cursor-pointer">
                                        <Link to={section.path} className="block w-full h-full">
                                            {section.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-4">
                                <div className="flex items-center">
                                    <img src="https://avatar.iran.liara.run/public/41" alt="profile"
                                         className="h-12 w-12 rounded-full mr-2"/>
                                    <div>
                                        <p className="font-semibold">Nikul Kukadiya</p>
                                        <p className="text-gray-500">nikul@dal.ca</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="flex-1 p-6 overflow-y-auto" style={{
                        backgroundImage: "url('/background_livesession.webp')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        <Routes>
                            <Route path="/meditation" element={<Meditation/>}/>
                            <Route path="/breathing" element={<Breathing/>}/>
                            <Route path="/live-session" element={<LiveSession/>}/>
                            <Route path="/chat" element={<Chat/>}/>
                            <Route path="/journal" element={<Journal/>}/>
                            <Route path="/" element={<LiveSession/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

const Meditation = () => <div>Welcome to the Meditation!</div>;
const Breathing = () => <div>Learn more Breathing.</div>;
const Chat = () => <div>Contact for chats</div>;
const Journal = () => <div>Journal</div>;

export default App;

```
In my project, I relied a lot on [Tailwind CSS](https://tailwindcss.com/docs/installation) to create a UI that adapts well to different screen sizes and to manage routing in my React app. Using Tailwind's simple approach and checking out their helpful documentation, I tweaked the code to fit my style preferences, layout choices, and to seamlessly add components. This made the development process smoother. By using Tailwind's flexible features and sticking to their official guidelines for writing CSS directly in my code, I made sure everything looked consistent and worked well on all devices.


### LiveSession.js

```
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


    const handleEditSession = (sessio[A1_README_Kukadiya_Nikulkumar.md](..%2FA1_Kukadiya_Nikulkumar%2FA1%2FA1_README_Kukadiya_Nikulkumar.md)n) => {
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

    const [currentView, setCurrentView] = useSt[A1_README_Kukadiya_Nikulkumar.md](..%2FA1_Kukadiya_Nikulkumar%2FA1%2FA1_README_Kukadiya_Nikulkumar.md)ate('main');


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

```
In the LiveSession component, I manage session scheduling and creation. I import required components and define a list of predefined sessions. Using state variables and functions, I handle form submission, session editing, and view control. The UI dynamically renders session lists and creation forms based on user interactions.


### LiveSessionItemCard.js

```
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

```
The LiveSessionItemCard component in React displays individual live session details in a card layout. It formats the session time and date for clarity and includes buttons to start or edit the session. These buttons trigger functions passed as props, enabling interaction with the session items.


### JoinLiveSession.js

```
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

```
While I primarily built the page from scratch, I sought assistance from external sources to enable functionality such as closing the webcam stream. I referred to code snippets from Stack Overflow discussions such as [link](https://stackoverflow.com/questions/72062262/react-webcam-disable-buttons-until-stream-starts) and [link](https://stackoverflow.com/questions/74651316/how-to-turn-off-the-webcam-in-react) to implement the feature. These resources provided valuable insights into handling webcam streams within a React environment. Also, TailwindCSS helps with the inline css for the components.

```
    *Lines 11 - 29*

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
    
    *Lines 42 - 58*

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
```
To enable the webcam feature on a web application and control its functionality, the process involves creating and managing a stream. I referred to code on Stack Overflow for guidance on how to enable and disable the webcam stream. You can find the referenced code [here](https://stackoverflow.com/questions/74651316/how-to-turn-off-the-webcam-in-react).

### CSS files

```
export const BACKGROUND_COLOR = '#EDDDD6';
export const APP_THEME = '#9393E5';


export const buttonStyle = {
    backgroundColor: APP_THEME,
    // Add any other styles you need
};


export const secondButtonStyle = {
    backgroundColor: 'transparent',
    borderColor: APP_THEME,
    borderWidth: '1px',
    borderStyle: 'solid',
    color: APP_THEME,  };
    
/*** tailwind.config.js **/


const {APP_THEME, BACKGROUND_COLOR} = require("./src/constants/colors");
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'], 
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        app: {
          theme: APP_THEME,
        },
        backgroundColor : BACKGROUND_COLOR
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

```
The CSS provided above is utilized to define the theme and styling elements for the application, including buttons and color schemes.

### References

[1]	"React", React. [Online]. Available at: https://react.dev/  [Accessed: 05 June 2024]

[2]	"Tailwind CSS", Tailwind Labs Inc. [Online]. Available at: https://tailwindcss.com/  [Accessed: 05 June 2024]

[3]	"Netlify", Netlify. [Online]. Available at: https://www.netlify.com/ [Accessed: 05 June 2024]

[4]	V. Jakes, "Woman Meditating Early in the Morning Overlooking a Mountain Scenery," picjumbo. [Online]. Available: https://picjumbo.com/woman-meditating-early-in-the-morning-overlooking-a-mountain-scenery/  [Accessed: 05 June 2024].

[5] "How to turn off the webcam in React?," Stack Overflow. [Online]. Available: https://stackoverflow.com/questions/74651316/how-to-turn-off-the-webcam-in-react. [Accessed: 05 June 2024].

[6]  "React Webcam Disable Buttons Until Stream Starts", Stack Overflow. [Online]. Available at: https://stackoverflow.com/questions/72062262/react-webcam-disable-buttons-until-stream-starts [Accessed: 05 June 2024]

## Acknowledgments

* The code offered valuable insights, laying the groundwork for understanding the functionality and logic of several UI components. I am grateful for their work and dedication.
* It provided valuable insights and influenced my approach in understanding and learning the approaches and specific techniques. Their contribution is highly appreciated.