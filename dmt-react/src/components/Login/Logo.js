import React from 'react'

const Logo = () => {
    return (
        <>
            <div className="relative mt-10 ml-10">
                <img className="absolute ml-20 mt-20" src="/images/assets/png/navyDot.png" alt="" />
                <img className="scale-125 absolute ml-14 mt-28" src="/images/assets/png/purpleDot.png" alt="" />

                <img className="scale-150 absolute ml-[450px] mt-[64px]" src="/images/assets/png/purpleDot.png" alt="" />
                <img className="absolute ml-[440px] mt-[75px]" src="/images/assets/png/navyDot.png" alt="" />

                <img className="absolute ml-20 mt-20" src="/images/assets/png/train.png" alt="" />

                <img className="absolute ml-[410px] mt-[340px]" src="/images/assets/png/navyDot.png" alt="" />
            </div>
            <div className="h-full flex flex-col justify-end">
                <div className="h-1/2 flex font-semibold text-4xl ml-10 pt-20 tracking-wider">
                    <p>Try our app and save yourself some hassle!</p>
                </div>
            </div>
        </>
    )
}

export default Logo