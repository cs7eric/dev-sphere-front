"use client"

import React from 'react'
import UserCard from "@/components/user/UserCard.tsx";
import RotatingText from "@/components/text/RotatingText.tsx";

const HomeView: React.FC = () => {
  return (
    <>

      <div className="home-container w-full flex flex-row">
        <div className="main-container border-r  basis-2/3">

          <div className="px-10  flex items-center">
            <p className="text-2xl font-bold mr-6">DEV SPHERE</p>
            <RotatingText
              texts={['Java', 'Python', 'React', 'C++', 'All in this for your Job']}
              mainClassName=" bg-white  min-w-[4vw] font-bold text-xl px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName=" overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>

        </div>
        <div className="function-container  basis-1/3 justify-center">

          <div className="user-card p-5 ">
            <UserCard className="bg-[#18181b]"></UserCard>

          </div>

        </div>
      </div>
    </>

  )
}

export default HomeView