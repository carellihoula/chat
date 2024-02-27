import { FC } from "react";
import IconStandard from "../../components/IconStandard";
import styles from "./LeftSideOfMain.module.css";
import { IconType } from "react-icons";
export interface MenuItemProps {
  label: string;
  icon: IconType;
  color: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MenuItem: FC<MenuItemProps> = ({ label, icon, color, handleClick }) => {
  return (
    <div className={styles.menu_item} onClick={handleClick}>
      <IconStandard size={20} Icon={icon} color={color} />
      <span>{label}</span>
    </div>
  );
};

export default MenuItem;