import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

function Search() {
    return (
        <div className="px-5 grow sm:px-10 md:px-15 lg:px-20 pt-5 md:pt-10 overflow-hidden flex flex-col gap-5">
            <div className="w-full h-11 sm:h-14 border-b-2 border-[#8d8d8d] flex flex-row items-center justify-between px-3 gap-2">
                <input type="text" placeholder="Search..." className="h-full flex-1 text-white font-semibold text-md sm:text-lg lg:text-xl focus:outline-0"/>
                <FontAwesomeIcon icon={faSearch} color="white" className="text-xl sm:text-2xl w-full h-full" />
            </div>
            <div className="bg-[#393E46] w-full h-screen"></div>
        </div>
    )
}

export default Search