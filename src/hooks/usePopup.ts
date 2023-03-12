import { useState, useEffect, useRef } from "react";
import { PopupEvent } from "../features/filter/types";

export const usePopup = () => {
  const [opened, setOpened] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupEvent;
      if (
        popupRef.current &&
        !_event.composedPath().includes(popupRef.current)
      ) {
        setOpened(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return { opened, setOpened, popupRef };
};
