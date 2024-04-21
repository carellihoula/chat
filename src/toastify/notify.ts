import { Bounce, toast } from "react-toastify";

export interface Inotify {
  response: string;
  status: boolean;
}

const toastOptions = {
  position: "top-right" as const,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light" as const,
  transition: Bounce,
};

export const notify = ({ response, status }: Inotify) => {
  const toastFunction = status ? toast.error : toast.error;
  toastFunction(response, toastOptions);
};
