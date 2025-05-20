"use client";
import React, {useState} from 'react';
import Slider from "@/components/Slider";
import CallToAction from "@/components/CallToAction";
import {SectionFaqType} from "@/utils/types";
import emptyImg from "@/assets/empty-img.png"
import Faq from "@/components/Faq";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import getGlobal from "@/actions/getGlobal";
import getFaq from "@/actions/getFaq";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";

const SectionFaq = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const [expanded, setExpanded] = useState<false | number>(false);
    const { data: faq, error, isLoading } = useQuery({
        queryKey: ["faq"],
        queryFn: () => getFaq(),
    });

    const global = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    });


    if (isLoading || global.isLoading) return <Loader/> ;

    if (error || global.error) return <p>{error?.message || global.error?.message}</p>;

    return (
        <>
            <section className="relative pt-28 mt-24 bg-accent-shadow full-width text-white">
                <span className="absolute left-0 -top-10 md:-top-20 size-20 md:size-40 rounded-full inline-flex items-center justify-center bg-featured-shine shadow-thumb">
                    <img
                        src={global.data.favicon.data.attributes.url ? backUrl + global.data.favicon.data.attributes.url : emptyImg.src}
                        alt={global.data.favicon.data.attributes.alternativeText}
                    />
                </span>
                <div className="">
                    <div className="grid lg:grid-cols-8 items-center gap-[3.283vw] xl:gap-[2.2vw]">
                        <div className="lg:col-span-3">
                            <BlocksRenderer
                                content={faq.content}
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
                                        <p className="mb-8 text-gray-500 md:mb-12 lg:w-4/5 ">{children}</p>,
                                    heading: ({children, level}) => {
                                        switch (level) {
                                            case 1:
                                                return <>
                                                    <h1
                                                        className={"mb-8 font-bold text-h1 md:mb-12 [&>em]:text-featured-muted [&>em]:not-italic"}
                                                    >
                                                        {children}
                                                    </h1>
                                                </>
                                            case 2:
                                                return <>
                                                    <h2
                                                        className={"pb-8 text-h1 font-bold md:pb-12 [&>em]:text-featured-muted [&>em]:not-italic"}>{children}
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
                            />
                            <Faq
                                data={faq?.faqItems}
                                expanded={expanded}
                                setExpanded={setExpanded}
                            />
                            <button className="btn btn-accent">Voir plus</button>
                        </div>
                        <div className="lg:col-span-5">
                            <Slider images={faq.images?.data} layout="landscape" />
                        </div>
                    </div>
                </div>
            </section>
            <CallToAction
                title={faq.cta?.title}
                text={faq.cta?.text}
                headingClassName="text-accent"
                buttonClassName="btn-accent"
                buttonLabel="Être recontacté par un conseiller"
            />
        </>
    );
};

export default SectionFaq;