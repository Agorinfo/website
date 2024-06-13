import { useEffect, useState } from "react";

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

const useScreenSize = (): ScreenSize => {
    // Initialise size avec une valeur par défaut, ici 'desktop' par exemple.
    const [size, setSize] = useState<ScreenSize>('desktop');

    useEffect(() => {
        // Cette fonction détermine la taille de l'écran en utilisant l'objet window.
        const getScreenSize = (): ScreenSize => {
            const width = window.innerWidth;
            if (width < 640) return 'mobile';
            else if (width >= 640 && width <= 1080) return 'tablet';
            else return 'desktop';
        };

        // Appelle getScreenSize pour définir la taille initiale correcte.
        setSize(getScreenSize());

        // Définit une fonction pour gérer l'événement de redimensionnement.
        const checkSize = () => {
            setSize(getScreenSize());
        };

        // Ajoute l'écouteur d'événement de redimensionnement.
        window.addEventListener('resize', checkSize);

        // Supprime l'écouteur d'événement lors du nettoyage.
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return size;
};

export default useScreenSize;