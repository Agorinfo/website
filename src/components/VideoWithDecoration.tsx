"use client";
import React from 'react';
import clsx from "clsx";

type VideoWithDecorationType = {
    src: string;
    alt: string;
    videoUrl: string;
    legend?: string | null | undefined;
}

const VideoWithDecoration = ({
                                 src,
                                 alt,
                                 videoUrl,
                                 legend
                             }: VideoWithDecorationType) => {
    const [miniature, setMiniature] = React.useState(true);
    const polygon =
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 229 190" fill="none">
            <path d="M170.508 1.9917L226.516 94.9956L170.508 188H58.3428L2.33398 94.9956L58.3428 1.9917H170.508Z"
                  stroke="#663B8E" stroke-width="4"/>
        </svg>;

    const triangle =
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 98 85" fill="none">
            <path d="M49.1492 84.3571L0.29834 0.788574L98.0001 0.788583L49.1492 84.3571Z" fill="#0057B4"/>
        </svg>;

    if (!src || !videoUrl || !legend) return null;
    return (
        <div className={clsx("mb-24")}
        >
            <div className="relative mx-auto max-w-[38.3rem] aspect-[1.64/1] md:aspect-[1.58/1]">
                <span
                    className={`absolute -bottom-[14%] -left-[7%] md:-left-[11%] w-1/3 md:w-[229px]`}>{polygon}</span>
                <div
                    className={clsx("relative w-full bg-white shadow-slide rounded-2xl p-3 z-10 aspect-[1.64/1] md:aspect-[1.58/1] max-w-[38.3rem]",)}
                >
                    <div className="relative w-full h-full flex items-center justify-center">

                        {miniature ?
                            <>
                                <img
                                    className="absolute inset-0 z-10 w-full h-full rounded-lg"
                                    src={src}
                                    alt={alt}
                                />
                                <button
                                    onClick={() => setMiniature(false)}
                                    aria-label="afficher la vidéo"
                                    className="absolute z-20 max-w-[16.5rem] w-[75%] md:w-[45%] max-h-full flex flex-col items-center justify-center rounded-[0.9375rem] gap-4 px-3 md:px-6 py-4 md:py-10 bg-white/80 cursor-pointer">
                                    <span
                                        className="flex items-center justify-center size-[2.8125rem] md:size-[5.125rem] bg-accent rounded-[0.625rem] md:rounded-[0.9375rem]">
                                        <span className="w-[20px] md:w-[41px]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 41 46"
                                                fill="none"
                                            >
                                              <path
                                                  d="M38.4898 18.8214C41.8099 20.7686 41.777 25.5797 38.4306 27.4814L8.313 44.5968C4.96659 46.4986 0.816462 44.0646 0.842762 40.2156L1.07946 5.57543C1.10576 1.72652 5.28876 -0.650622 8.60887 1.29658L38.4898 18.8214Z"
                                                  fill="white"/>
                                        </svg>
                                        </span>
                                    </span>
                                    <span
                                        className="inline-block p-2 w-full font-bold text-accent-shadow">
                                        {legend}
                                    </span>
                                </button>
                            </>
                            :
                            <iframe
                                className="relative max-w-[38.3rem] w-full aspect-[1.64/1] md:aspect-[1.58/1] object-cover object-center rounded-xl bg-white border border-grayscale-lighter"
                                width="100%"
                                height="100%"
                                src={videoUrl}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        }
                    </div>
                </div>
                <span className={`absolute top-[7%] -right-[6%] w-[49px] md:w-[98px] ${miniature ? "z-30" : "z-0"}`}>{triangle}</span>
            </div>
        </div>
    );
};

export default VideoWithDecoration;