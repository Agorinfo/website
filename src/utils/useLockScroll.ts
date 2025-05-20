import { useEffect } from "react";

/**
 * Lock page scroll (both html and body) when `shouldLock` is true.
 *
 * @param shouldLock - Boolean that determines whether to lock or unlock scrolling.
 */
export default function useLockScroll(shouldLock: boolean) {
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (shouldLock) {
            html.classList.add("overflow-hidden");
            body.classList.add("overflow-hidden");
        } else {
            html.classList.remove("overflow-hidden");
            body.classList.remove("overflow-hidden");
        }

        // Optionally cleanup in case the component unmounts with scroll locked
        return () => {
            html.classList.remove("overflow-hidden");
            body.classList.remove("overflow-hidden");
        };
    }, [shouldLock]);
}
