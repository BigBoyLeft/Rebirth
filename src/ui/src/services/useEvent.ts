import { MutableRefObject, useEffect, useRef } from "react";

type NuiHandler<T> = (data: T) => void;

export const useApplication = <T = any>(app: string, handler: (status: boolean, data: T) => void) => {
    const savedHandler: any = useRef(() => {});
    
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler])

    useEffect(() => {
        const eventListener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (savedHandler.current) {
                if (data.type === "application" && app === data.app) {
                    savedHandler.current(data.visible, data.data);
                }
            }
        }

        window.addEventListener("message", eventListener);
        return () => window.removeEventListener("message", eventListener);
    }, [app]);
};

export const useAppEvent = <T = any>(app: string, appEvent: string, handler: (data: T) => void) => {
    const savedHandler: MutableRefObject<NuiHandler<T>> = useRef(() => {});

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (savedHandler.current) {
                if (data.type === "appEvent" && app === data.app && data.event === appEvent) {
                    savedHandler.current(data.data);
                }
            }
        }

        window.addEventListener("message", eventListener);
        return () => window.removeEventListener("message", eventListener);
    }, [app])
}