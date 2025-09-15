import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function Sidebar() {
    const [activeButton, setActiveButton] = useState<'home'|'search'|'profile'|'post'>('home')
    return (
        <div className="fixed w-fit sm:w-45 md:w-50 lg:w-60 p-3 sm:p-10 h-screen border-r-1 border-[#fff4] bg-[#393E46] flex flex-col gap-12 font-[Inter] text-white items-center">
            <p className='hidden sm:block font-black tracking-widest text-3xl'>Sosmed</p>
            <p className='sm:hidden font-black tracking-widest text-3xl'>S</p>
            <div className="flex flex-col justify-between h-full">
                <div className='flex flex-col gap-10'>
                    <div onClick={() => setActiveButton('home')} className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faHouse} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'home' ? "font-semibold" : "font-light"}`}>Home</p>
                    </div>
                    <div onClick={() => setActiveButton('search')} className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'search' ? "font-semibold" : "font-light"}`}>Search</p>
                    </div>
                    <div onClick={() => setActiveButton('profile')} className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faUser} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'profile' ? "font-semibold" : "font-light"}`}>Profile</p>
                    </div>
                    <div onClick={() => setActiveButton('post')} className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faPlus} className='text-[25px]'/>
                        <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer ${activeButton === 'post' ? "font-semibold" : "font-light"}`}>Post</p>
                    </div>
                </div>
                <div onClick={() => window.location.href = "/settings"} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faGear} className='text-[25px]'/>
                    <p className={`hidden sm:block tracking-wide lg:text-xl cursor-pointer font-light`}>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar