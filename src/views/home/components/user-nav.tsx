import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getUserInfoUsingPost} from "@/apis/auth";
import {removeUserInfo} from "@/store/features/user/userInfoSlice.ts";

interface UserInfo {
  nickName?: string
  phone?: string
  email?: string
  sex?: string | number
  introduce?: string
  avatar?: string
}

export function UserNav() {
  const userInfoStorageString = localStorage.getItem('userInfo')
  const userInfoStorage = userInfoStorageString ? JSON.parse(userInfoStorageString) : {}
  const {loginId, tokenValue} = userInfoStorage || {}
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUserInfo = async () => {
    if (!loginId) return;

    const body = {
      userName: loginId
    }
    await getUserInfoUsingPost({body})
      .then((res) => {
        if (res.success) {
          setUserInfo(res.data)
        }
      })
    console.log(loginId, tokenValue)
  }

  useEffect(() => {
    getUserInfo()
  }, [loginId]);

  const logout = () => {
    localStorage.removeItem('userInfo')
    dispatch(removeUserInfo)
    navigate('/authentication')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userInfo ? userInfo.avatar : '@/assets/user/avatar.jpg'} alt="@shadcn"/>
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">cccs7</p>
              <p className="text-xs leading-none text-muted-foreground">
                csq020611@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to={"/settings/profile"}>
                Profile
              </Link>

              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/settings/profile"}>
                Billing
              </Link>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/settings"}>
                Settings
              </Link>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>

          <AlertDialog>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <AlertDialogTrigger className="w-full text-left">
                Log out
              </AlertDialogTrigger>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>

            </DropdownMenuItem>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Link to="/authentication"
                        onClick={() => logout()}
                  >Continue</Link>

                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>

          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>


    </>
  )
}
