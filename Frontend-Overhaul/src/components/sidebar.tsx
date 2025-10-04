import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { motion } from 'motion/react'

function Sidebar() {
    const [activeButton, setActiveButton] = useState<'home'|'search'|'profile'|'post'>('home')
    return (
        <div className="fixed w-14 sm:w-45 md:w-50 lg:w-60 p-3 sm:p-10 h-svh border-r-1 border-[#fff4] bg-neutral-900 flex flex-col gap-12 font-[Inter] text-white items-center">
            <motion.div
                initial = {{
                    opacity: 0,
                    y: 20,
                    filter: "blur(5px)"
                }}
                animate = {{
                    opacity: 100,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                        duration: 0.4
                    }
                }}
            >
                <p className='hidden sm:block font-black tracking-widest text-3xl'>Sosmed</p>
            </motion.div>
            <motion.div
                initial = {{
                    opacity: 0,
                    y: 20,
                    filter: "blur(5px)"
                }}
                animate = {{
                    opacity: 100,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                        duration: 0.4
                    }
                }}
            >
                <p className='sm:hidden font-black tracking-widest text-3xl'>S</p>
            </motion.div>
            <div className="flex flex-col justify-between h-full">
                <div className='flex flex-col gap-10'>
                    <motion.div 
                        onClick={() => {setActiveButton('home'); 
                        window.location.href = "/"}} 
                        className="flex items-center gap-3"
                        initial = {{
                            opacity: 0,
                            y: 20,
                            filter: "blur(5px)"
                        }}
                        animate = {{
                            opacity: 100,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                                duration: 0.4,
                                delay: 0.1
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faHouse} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'home' ? "font-semibold" : "font-light"}`}>Home</p>
                    </motion.div>
                    <motion.div 
                        onClick={() => {setActiveButton('search'); 
                        window.location.href = "/search"}} 
                        className="flex items-center gap-3"
                        initial = {{
                            opacity: 0,
                            y: 20,
                            filter: "blur(5px)"
                        }}
                        animate = {{
                            opacity: 100,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                                duration: 0.4,
                                delay: 0.2
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'search' ? "font-semibold" : "font-light"}`}>Search</p>
                    </motion.div>
                    <motion.div 
                        onClick={() => {setActiveButton('profile'); 
                        window.location.href = "/profile"}} 
                        className="flex items-center gap-3"
                        initial = {{
                            opacity: 0,
                            y: 20,
                            filter: "blur(5px)"
                        }}
                        animate = {{
                            opacity: 100,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                                duration: 0.4,
                                delay: 0.3
                            }
                        }}                    
                    >
                        <FontAwesomeIcon icon={faUser} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'profile' ? "font-semibold" : "font-light"}`}>Profile</p>
                    </motion.div>
                    <motion.div 
                        onClick={() => {setActiveButton('post'); 
                        window.location.href = "/post"}} 
                        className="flex items-center gap-3"
                        initial = {{
                            opacity: 0,
                            y: 20,
                            filter: "blur(5px)"
                        }}
                        animate = {{
                            opacity: 100,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                                duration: 0.4,
                                delay: 0.4
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'post' ? "font-semibold" : "font-light"}`}>Post</p>
                    </motion.div>
                </div>
                <motion.div 
                onClick={() => window.location.href = "/settings"} className="flex items-center gap-3"
                initial = {{
                    opacity: 0,
                    y: 20,
                    filter: "blur(5px)"
                }}
                animate = {{
                    opacity: 100,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                        duration: 0.4,
                        delay: 0.5
                    }
                }}
                >
                    <FontAwesomeIcon icon={faGear} className='text-[25px]'/>
                    <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer font-light`}>Settings</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Sidebar