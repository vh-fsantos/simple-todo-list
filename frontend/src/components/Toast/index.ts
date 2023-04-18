import { toast as reactToast, Slide } from "react-toastify";

const toast = {
  success(msg: string, options = {}) {
    return reactToast.success(msg, {
      ...options,
      autoClose: 3000,
    });
  },
  info(msg: string, options = {}) {
    return reactToast.info(msg, {
      ...options,
      autoClose: 3000,
      transition: Slide,
    });
  },
  warn(msg: string, options = {}) {
    return reactToast.warn(msg, {
      ...options,
      autoClose: 3000,
    });
  },
  error(msg: string, options = {}) {
    return reactToast.error(msg, {
      ...options,
    });
  },
};

export default toast;
