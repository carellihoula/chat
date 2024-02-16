import { FC } from "react";
import "../output.css";
type Props = {
  position: string;
};
export const ChatComponent: FC<Props> = ({ position }) => {
  return (
    <div className={`chat   chat-${position}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble">
        It was said that you would, destroy the Sith, not join them.
      </div>
    </div>
  );
};
