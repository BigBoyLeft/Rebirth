import { MutableRefObject, useEffect, useRef } from "react";
import axios from "axios";

type NuiHandler<T> = (data: T) => void;

export const useApplication = <T = any>(
  app: string,
  handler: (data: T) => void
) => {
  const savedHandler: MutableRefObject<NuiHandler<T>> = useRef(() => {});

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (savedHandler.current) {
        if (data.type === "application" && app === data.app) {
          savedHandler.current(data.data);
        }
      }
    };

    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [app]);
};

export const useAction = <T = any>(
  app: string,
  action: string,
  handler: (data: T) => void
) => {
  const savedHandler: MutableRefObject<NuiHandler<T>> = useRef(() => {});

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (savedHandler.current) {
        if (
          data.type === "action" &&
          app === data.app &&
          data.action === action
        ) {
          savedHandler.current(data.data);
        }
      }
    };

    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [app]);
};

export const isBrowser = (): boolean => !(window as any).invokeNative;

export const debugEvent = <T = any>(
  time: number,
  type: string,
  app: string,
  data: any = {},
  action: string = "none"
) => {
  console.log(isBrowser());
  if (isBrowser()) {
    setTimeout(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: JSON.stringify({
            type: type,
            app: app,
            data: data || {},
            action: action,
          }),
        })
      );
    }, time);
  }
};

const debugRequests: any = new Map([]);
export const makeRequest = <T = any>(url, data): Promise<T> => {
  if (isBrowser()) {
    return new Promise(async (resolve: any, reject) => {
      if (debugRequests.has(url)) {
        try {
          const response = await debugRequests.get(url).cb(data);
          if (!response) resolve({error: "no response"});
          resolve(response)
        } catch (e) {
          reject(e)
        }
      }
    });
  }

  return axios.post(`${url}`, data);
};

export const debugRequest = <T = any>(url: string, cb: Function) => {
  if (isBrowser()) {
    debugRequests.set(url, {cb});
  }
};
