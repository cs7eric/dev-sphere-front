import {AuthUserDTO} from "@/apis/auth";
import UserAvatar from '@/assets/user/avatar.jpg'
interface Props {
  user: AuthUserDTO
}
const userAbbreviateInfo = {
  userName: 'sdsadasadasdsadsadsad',
  nickName: 'cccs7',
  id: 1,
  avatar: UserAvatar,
}
const UserAbbreviate: React.FC<Props> = ({user}) => {

  return (
    <></>
  )
}

export default UserAbbreviate