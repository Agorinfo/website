"use client";
import React from 'react';
import clsx from "clsx";
import emptyImg from "@/assets/empty-img.png"

type ImageWithDecorationType = {
    src: string;
    alt: string;
    decorationPosition?: "squareOne" | "squareTwo" | "landscapeOne" | "landscapeTwo";
    layout?: "square" | "landscape";
    squareSize?: "small" | "large";
    rotation?: 1 | 2;
    legend?: string | null | undefined;
}

const ImageWithDecoration = ({
                                 src,
                                 alt,
                                 layout = "landscape",
                                 decorationPosition = "squareOne",
                                 squareSize = "small",
                                 rotation = 1,
                                 legend
                             }: ImageWithDecorationType) => {
    const isLandscape = layout === "landscape";
    const polygon =
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="245"
            height="214"
            viewBox="0 0 245 214"
            fill="none"
        >
            <path
                d="M183.018 1.38818L243.444 106.888L183.018 212.388H62.1777L1.75 106.888L62.1777 1.38818H183.018Z"
                stroke="#3A581C"
                strokeWidth="2"
            />
        </svg>;

    const landscapePlygon =
        <svg xmlns="http://www.w3.org/2000/svg" width="339" height="297" viewBox="0 0 339 297" fill="none">
            <path
                d="M253.55 296.13H84.5475L0.0463867 148.315L84.5475 0.499039L253.55 0.499023L338.051 148.315L253.55 296.13Z"
                fill="#3A581C"/>
        </svg>;

    const triangle =
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="110"
            height="96"
            viewBox="0 0 110 96"
            fill="none"
        >
            <path
                d="M54.9028 95.6123L0.402832 0.612305L109.403 0.612314L54.9028 95.6123Z"
                fill="#0057B4"
            />
        </svg>;

    let polygonPosition;
    let trianglePosition;

    switch (decorationPosition) {
        case "squareOne":
            polygonPosition = "-top-12 -left-10";
            trianglePosition = "-bottom-[85%] -right-[75%]";
            break;
        case "squareTwo":
            polygonPosition = "-top-8 left-[35%]";
            trianglePosition = "-bottom-[60%] -right-[80%]";
            break;
        case "landscapeOne":
            polygonPosition = "-top-14 -left-6";
            trianglePosition = "-bottom-[55%] -right-[92%]";
            break;
        case "landscapeTwo":
            polygonPosition = "-bottom-[40%] -left-[20%]";
            trianglePosition = "top-[15%] -right-[84%]";
            break;
        default:
            polygonPosition = "-top-12 -left-10";
            trianglePosition = "-top-[85%] -right-[75%]";
            break;
    }

    return (
        <div className={clsx("flex items-center justify-center",
            isLandscape && "py-12"
        )}
        >
            <div className="relative">
                <span
                    className={`absolute ${polygonPosition} w-full h-full`}>{isLandscape ? landscapePlygon : polygon}</span>
                <div className={clsx("relative w-full bg-white shadow-slide rounded-2xl p-3 z-10",
                    rotation === 1 && "rotate-[4deg]",
                    rotation === 2 && "rotate-[-2deg]",
                    isLandscape
                        ? "max-w-[36rem] aspect-[1.3/1]"
                        : squareSize === "small"
                            ? "max-w-[18rem] aspect-square"
                            : "max-w-[27rem] aspect-square"
                )}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            className={`relative max-w-[34rem] w-full ${layout === "landscape" ? "aspect-[1.3/1]" : "aspect-square"} object-cover object-center rounded-xl bg-white border border-grayscale-lighter`}
                            src={src ? src : emptyImg.src} alt={alt ? alt : ""}/>
                        {legend &&
                            <>
                                <span className="absolute inset-0 bg-legend" />
                                <span className="inline-block p-2 w-full absolute bottom-0 right-0 text-white font-bold">{legend}</span>
                            </>
                        }
                    </div>
                </div>
                <span className={`absolute ${trianglePosition} w-full h-full z-20`}>{triangle}</span>
            </div>
        </div>
    );
};

export default ImageWithDecoration;