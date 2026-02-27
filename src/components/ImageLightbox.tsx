"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface LightboxImage {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

// Hook réutilisable
export function useLightbox() {
    const [image, setImage] = useState<LightboxImage | null>(null);

    const open = useCallback((img: LightboxImage) => setImage(img), []);
    const close = useCallback(() => setImage(null), []);

    // Fermer avec Escape
    useEffect(() => {
        if (!image) return;
        const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [image, close]);

    // Bloquer le scroll
    useEffect(() => {
        document.body.style.overflow = image ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [image]);

    return { image, open, close };
}

// Overlay Lightbox
export function Lightbox({
                             image,
                             onClose,
                         }: {
    image: LightboxImage | null;
    onClose: () => void;
}) {
    if (!image) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "zoom-out",
                backdropFilter: "blur(4px)",
                animation: "lb-in 0.2s ease",
            }}
        >
            <button
                onClick={onClose}
                aria-label="Fermer"
                style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "rgba(255,255,255,0.15)",
                    border: "none",
                    color: "#fff",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    fontSize: 20,
                    cursor: "pointer",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                ×
            </button>

            {image.width && image.height ? (
                <img
                    src={image.src}
                    alt={image.alt}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        objectFit: "contain",
                        borderRadius: 4,
                        animation: "lb-scale 0.2s ease",
                        cursor: "default",
                    }}
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={image.src}
                    alt={image.alt}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        objectFit: "contain",
                        borderRadius: 4,
                        animation: "lb-scale 0.2s ease",
                        cursor: "default",
                    }}
                />
            )}

            <style>{`
        @keyframes lb-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lb-scale { from { transform: scale(0.95) } to { transform: scale(1) } }
      `}</style>
        </div>
    );
}

// Wrapper cliquable autour d'une image
export function ClickableImage({
                                   src,
                                   alt,
                                   width,
                                   height,
                                   className,
                                   style,
                               }: LightboxImage & { className?: string; style?: React.CSSProperties }) {
    const { image, open, close } = useLightbox();

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={className}
                style={{ cursor: "zoom-in", ...style }}
                onClick={() => open({ src, alt, width, height })}
            />
            <Lightbox image={image} onClose={close} />
        </>
    );
}