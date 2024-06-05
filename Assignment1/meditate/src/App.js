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
                            <img src="https://avatar.iran.liara.run/public/41" alt="Profile Image"
                                 className="h-12 w-12 rounded-full mr-2"/>
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
                                <img src="logo.png" alt="Logo" className="h-12 w-12 rounded-full mr-2"/>
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
                                    <img src="https://avatar.iran.liara.run/public/41" alt="Profile Image"
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
