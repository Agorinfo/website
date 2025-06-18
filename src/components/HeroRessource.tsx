"use client";
import React from 'react';
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {useQuery} from "@tanstack/react-query";
import getGlobal from "@/actions/getGlobal";
import Loader from "@/components/Loader";
import ImageWithDecoration from "@/components/ImageWithDecoration";

const HeroRessources = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })

    if(isLoading) return  <Loader />

    if(error) return <p>{ error?.message }</p>

    return (
        <section className="bg-accent-shine full-width">
            <div className="grid md:grid-cols-2 gap-[5.729vw] xl:gap-[3.5vw] pt-16 pb-15">
                <div className="py-12">

                    {data.archiveRessources?.text && <BlocksRenderer
                        content={typeof data.archiveRessources.text === "string" ? JSON.parse(data.archiveRessources.text) : data.archiveRessources.text}
                        blocks={{
                            list: ({children}) =>
                                <ul className="list-check list-inside pb-12">{children}</ul>,
                            "list-item": ({children}) => (
                                <li
                                    className={`flex items-center gap-2 pb-4 text-[1rem] check before:w-6 before:h-6 before:block before:text-red`}
                                >
                                    {children}
                                </li>
                            ),
                            paragraph: ({children}) =>
                                <p className="pb-2 text-gray-500 lg:w-4/5 [&>strong]:text-accent">{children}</p>,
                            heading: ({children, level}) => {
                                switch (level) {
                                    case 1:
                                        return <h1
                                            className={"mb-8 font-bold text-h1 md:mb-12 [&>em]:text-featured [&>em]:not-italic"}>{children}</h1>
                                    case 2:
                                        return <>
                                            <h2
                                                className={"pb-8 text-h1 font-bold md:pb-12 [&>em]:text-featured [&>em]:not-italic"}>{children}
                                            </h2>
                                        </>
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                        return <h3 className="text-h3">{children}</h3>
                                    default:
                                        return <h1 className="text-h1">{children}</h1>
                                }
                            }
                        }}
                    />}
                </div>
                <ImageWithDecoration
                    src={ data?.archiveRessources?.image.data ? backUrl + data?.archiveRessources?.image.data?.attributes.url : ""}
                    alt={data?.archiveRessources?.image.data?.attributes.alternativeText}
                    layout="square"
                />
            </div>
        </section>
    );
};

export default HeroRessources;