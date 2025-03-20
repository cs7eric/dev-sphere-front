import {AuthUserDTO} from "@/apis/auth";
import UserAvatar from '@/assets/user/avatar.jpg'
import {Image} from "@unpic/react";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {RiUserFollowLine, RiUserUnfollowLine} from "react-icons/ri";

interface Props {
  user: AuthUserDTO,
  requiredFollow: boolean,
  isFollowed: boolean
}

const UserAbbreviate: React.FC<Props> = ({user, requiredFollow, isFollowed}) => {


  const [isFollowing, setIsFollowing] = React.useState(isFollowed)

  const follow = (id, event) => {
    console.log(id)
    setIsFollowing(!isFollowing)
    event.stopPropagation()
  }


  return (
    <>
      <div className='flex justify-between'>
        <div className='user-info flex space-x-1.5'>
          <div>
            <Image
              src={user.avatar}
              width='36px'
              height='36px'
              className={'rounded-md bg-neutral-700 p-0.5'}
            ></Image>
          </div>
          <div className='flex flex-col items-start'>
            <h3 className="author-nickname ml-1.5 text-sm font-semibold">{user.nickName}</h3>
            <h3 className="author-username ml-1.5 text-xs text-neutral-400">{user.email}</h3>
          </div>
        </div>
        <div className='user-action'>
          {requiredFollow ?
            <Button
              className={isFollowing
                ? "bg-transparent mr-4 cursor-pointer hover:transform transition-transform duration-250 hover:scale-120  text-foreground border-default-200"
                : "hover:transform transition-transform duration-250 hover:scale-120 mr-4 cursor-pointer"}
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowing ? "outline" : "default"}
              onClick={(event) => follow(user.id, event)}
            >
              {isFollowing ? <RiUserUnfollowLine/> : <RiUserFollowLine/>}
            </Button>
            : ''

          }
        </div>
      </div>


    </>
  )
}

export default UserAbbreviate