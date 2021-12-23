import { useEffect, useState } from "react";

export const useDarkMode = (initial = false) => {
    const [isDark, setIsDark] = useState(initial);
    const [componentMounted, setComponentMounted] = useState(false);

    const setTheme = (mode) => {
        mode === "dark" ? setIsDark(true) : setIsDark(false);
    };

    const setMode = (mode) => {
        window.localStorage.setItem("theme", mode);
        setTheme(mode);
    };

    const toggle = () => {
        if (isDark) {
            setMode("light");
        } else {
            setMode("dark");
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme");
        localTheme && setTheme(localTheme);

        setComponentMounted(true);
    }, []);

    return { isDark, toggle, componentMounted };
};

export const useHover = (elementRef) => {
    const [value, setValue] = useState(false);

    const handleMouseEnter = () => setValue(true);
    const handleMouseLeave = () => setValue(false);

    useEffect(() => {
        const node = elementRef?.current;

        if (node) {
            node.addEventListener("mouseenter", handleMouseEnter);
            node.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                node.removeEventListener("mouseenter", handleMouseEnter);
                node.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [elementRef]);

    return value;
};

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            const el = ref?.current;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener(`mousedown`, listener);
        document.addEventListener(`touchstart`, listener);

        return () => {
            document.removeEventListener(`mousedown`, listener);
            document.removeEventListener(`touchstart`, listener);
        };

        // Reload only if ref or handler changes
    }, [ref, handler]);
};