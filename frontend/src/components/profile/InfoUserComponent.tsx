import { FC } from "react";
import styles from "./profile.module.css";
import DividerComponent from "../../components/DividerComponent";
import IconStandard from "../../components/IconStandard";
import { FaUser } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

interface PropsUserInfo {
  username?: string;
  about?: string;
}

export const InfoUserComponent: FC<PropsUserInfo> = ({ username, about }) => {
  return (
    <div className={styles.container__user__info}>
      <div className={styles.div__icon__userInfo}>
        <div className={styles.sub_div__icon__userInfo}>
          <IconStandard Icon={FaUser} color="#FFF" />
          <div>{username}</div>
        </div>
        <IconStandard Icon={MdEdit} size={18} color="#FFF" />
      </div>
      <DividerComponent justifyBorder="center" />
      <div className={styles.div__icon__userInfo}>
        <div className={styles.sub_div__icon__userInfo}>
          <IconStandard Icon={BsEmojiSmile} color="#FFF" />
          <div>{about}</div>
        </div>
        <IconStandard Icon={MdEdit} size={18} color="#FFF" />
      </div>
    </div>
  );
};
