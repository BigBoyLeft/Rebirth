import {useEffect, useRef} from "react";
import axios from "axios";

type FrameVisibleSetter = (bool: boolean) => void

const LISTENED_KEYS = ["Escape"]

// Basic hook to listen for key presses in NUI in order to exit
export const useExitListener = (visibleSetter: FrameVisibleSetter) => {
  const setterRef = useRef<FrameVisibleSetter>(() => {})

  useEffect(() => {
    setterRef.current = visibleSetter
  }, [visibleSetter])

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (LISTENED_KEYS.includes(e.code)) {
        setterRef.current(false)
        axios.post('hideFrame')
      }
    }

    window.addEventListener("keydown", keyHandler)

    return () => window.removeEventListener("keydown", keyHandler)
  }, []);
}