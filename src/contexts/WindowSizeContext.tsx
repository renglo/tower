import React, { createContext, useContext, useEffect, useState } from 'react';

interface WindowSizeContextType {
    width: number;
    height: number;
}

const WindowSizeContext = createContext<WindowSizeContextType>({ width: 0, height: 0 });

export function WindowSizeProvider({ children }: { children: React.ReactNode }) {
    const [windowSize, setWindowSize] = useState<WindowSizeContextType>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {children}
        </WindowSizeContext.Provider>
    );
}

export const useWindowSize = () => useContext(WindowSizeContext); 