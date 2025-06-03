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
            width="100%"
            height="100%"
            viewBox="0 0 245 214"
            fill="none"
        >
            <path
                d="M183.018 1.38818L243.444 106.888L183.018 212.388H62.1777L1.75 106.888L62.1777 1.38818H183.018Z"
                stroke="#3A581C"
                strokeWidth="2"
            />
        </svg>;

    const landscapePolygon =
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 339 297" fill="none">
            <path
                d="M253.55 296.13H84.5475L0.0463867 148.315L84.5475 0.499039L253.55 0.499023L338.051 148.315L253.55 296.13Z"
                fill="#3A581C"/>
        </svg>;

    const triangle =
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
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
            polygonPosition = "-top-12 -left-4 md:-left-10";
            trianglePosition = "bottom-[15%] -right-[5%]";
            break;
        case "squareTwo":
            polygonPosition = "-top-5 md:-top-8 left-24 md:left-[24%]";
            trianglePosition = "bottom-[20%] -right-[5%]";
            break;
        case "landscapeOne":
            polygonPosition = "-top-[12%] -left-2";
            trianglePosition = "bottom-[20%] -right-[10%]";
            break;
        case "landscapeTwo":
            polygonPosition = "-bottom-[12%] -left-[20%]";
            trianglePosition = "top-[15%] -right-[8%]";
            break;
        default:
            polygonPosition = "-top-12 -left-10";
            trianglePosition = "-top-[85%] -right-[75%]";
            break;
    }

    return (
        <div className={clsx("flex items-center justify-center p-10",
            isLandscape && "py-12"
        )}
        >
            <div className="relative">
                <span
                    className={`absolute ${polygonPosition} w-[10rem] lg:w-[21rem]`}>{isLandscape ? landscapePolygon : polygon}</span>
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
                <span className={`absolute ${trianglePosition} w-[55px] md:w-[110px] z-20`}>{triangle}</span>
            </div>
        </div>
    );
};

export default ImageWithDecoration;