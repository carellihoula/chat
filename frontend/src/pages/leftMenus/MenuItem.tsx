import { FC } from "react";
import IconStandard from "../../components/IconStandard";
import styles from "./LeftSideOfMain.module.css";
import { IconType } from "react-icons";
export interface MenuItemProps {
  label: string;
  icon: IconType;
  color: string;
  bg?: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MenuItem: FC<MenuItemProps> = ({
  label,
  icon,
  color,
  handleClick,
  bg,
}) => {
  return (
    <div
      className={styles.menu_item}
      onClick={handleClick}
      style={{ backgroundColor: bg ? "#1e1e1e" : "#2f3136" }}
    >
      <IconStandard size={20} Icon={icon} color={color} />
      <span>{label}</span>
    </div>
  );
};

export default MenuItem;
