function Profile() {
    return (
        <div>
            <div className="text-white flex flex-col gap-5 md:gap-10 px-5 sm:px-15 md:px-15 lg:px-30 pt-10">
                <div className="flex gap-5 md:gap-15 w-full items-center">
                    <img src="b746825c62fd607b823b9875dc5e1fbf.jpg" alt="" className="bg-white w-30 h-30 md:w-40 md:h-40 rounded-full border-none"/>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col w-full gap-5">
                            <div className="flex flex-col">
                                <p className="font-light tracking-wide">mischikomoe</p>
                                <p className="font-bold text-2xl">Mischiko Moe</p>
                            </div>
                            <div className="hidden sm:flex flex-row gap-7">
                                <p className="font-light"><span className="font-medium">53 </span>Following</p>
                                <p className="font-light"><span className="font-medium">72 </span>Followers</p>
                                <p className="font-light"><span className="font-medium">1 </span>Posts</p>
                            </div>
                            <div className="hidden md:block">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie libero vel tempor bibendum. Maecenas interdum, lectus ac auctor fringilla. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex sm:hidden flex-row gap-7">
                    <p className="font-light"><span className="font-medium">53 </span>Following</p>
                    <p className="font-light"><span className="font-medium">72 </span>Followers</p>
                    <p className="font-light"><span className="font-medium">1 </span>Posts</p>
                </div>
                <div className="md:hidden">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie libero vel tempor bibendum. Maecenas interdum, lectus ac auctor fringilla. </p>
                </div>
                <div className="border-t-1 h-100 bg-[#191d23]"></div>
            </div>
        </div>
    )
}

export default Profile