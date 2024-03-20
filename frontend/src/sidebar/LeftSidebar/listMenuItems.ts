import { IoMdSettings } from "react-icons/io";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdOutlineChat } from "react-icons/md";
import { MenuItemProps } from "./MenuItem";

export const listMenuItems: MenuItemProps[] = [
  { label: "Chat", icon: MdOutlineChat, color: "#FFF" },
  { label: "Friends", icon: LiaUserFriendsSolid, color: "#FFF" },
  { label: "Settings", icon: IoMdSettings, color: "#FFF" },
];
