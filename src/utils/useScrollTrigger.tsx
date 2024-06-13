import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ScrollTriggerProps {
    onEnter?: () => void; // Fonction à appeler lorsque l'élément entre dans la vue
    onExit?: () => void; // Fonction à appeler lorsque l'élément sort de la vue
    children: React.ReactNode;
    once?: boolean; // Si vrai, l'observer se déconnectera après le premier déclenchement
}

const ScrollTrigger: React.FC<ScrollTriggerProps> = ({ onEnter, onExit, children, once = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const domRef = useRef<HTMLDivElement>(null);

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                // Vérifier si l'élément est visible
                if (entry.isIntersecting) {
                    if (!isVisible) {
                        onEnter?.();
                        setIsVisible(true);
                    }
                    if (once) {
                        observer.disconnect();
                    }
                } else if (isVisible) {
                    onExit?.();
                    setIsVisible(false);
                }
            });
        },
        [onEnter, onExit, once, isVisible]
    );

    useEffect(() => {
        if (domRef.current) {
            observerRef.current = new IntersectionObserver(handleIntersect);
            observerRef.current.observe(domRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [handleIntersect]);

    return <div ref={domRef}>{children}</div>;
};

export default ScrollTrigger;