"use client";
import React, {createContext, useContext} from 'react';
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import Loader from "@/components/Loader";
import {ArrowLeft} from "@phosphor-icons/react";
import RelatedRessources from "@/components/RelatedRessources";
import ImageWithDecoration from "@/components/ImageWithDecoration";
import {CallToActionRessource} from "@/components/CallToAction";
import getGlobal from "@/actions/getGlobal";
import VideoWithDecoration from "@/components/VideoWithDecoration";
import {createColorPalette} from "@/lib/createColorPalette";

const ListFormatContext = createContext<"ordered" | "unordered" | null>(null);
const useListFormat = () => useContext(ListFormatContext);

type ListItemProps = {
    children?: React.ReactNode;
    format?: 'ordered' | 'unordered';
};

const RessourceContent = () => {
    const {slug} = useParams();
    const imageRenderCount = React.useRef(0);
    const {data, error, isLoading} = useQuery({
        queryKey: ["ressource", slug],
        queryFn: () => getRessource(slug as string),
    });
    const global = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    });
    const ressource = data[0]?.attributes;
    const colors = createColorPalette(ressource.category.data.attributes.color);
    function extractText(node: React.ReactNode): string {
        if (typeof node === 'string' || typeof node === 'number') {
            return node.toString();
        }

        if (Array.isArray(node)) {
            return node.map(extractText).join('');
        }

        if (React.isValidElement(node)) {
            if (typeof node.props?.text === 'string') {
                return node.props.text;
            }

            return extractText(node.props.children);
        }

        return '';
    }

    React.useEffect(() => {
        imageRenderCount.current = 0;
    }, [ressource?.content, slug]);

    const ListItem = ({ children }: { children?: React.ReactNode }) => {
        const format = useListFormat();

        return (
            <li
                className={`text-[1rem] ${
                    format === "unordered"
                        ? 'before:content-["-"]'
                        : ""
                }`}
            >
                <span>{children}</span>
            </li>
        );
    };
    if (isLoading || global.isLoading) return <Loader/>

    if (error || global.error) return <p>{error?.message}</p>
    return (
        <>
            <div className="py-16">
                <div>
                    <button
                        className="text-featured mb-16"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={24}/>
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="max-w-[45rem] w-full">
                        {ressource?.content &&
                            <BlocksRenderer
                                content={typeof ressource.content === "string" ? JSON.stringify(ressource.content) : ressource?.content}
                                blocks={{
                                    paragraph: ({children}) =>
                                        <p className="mb-8 text-gray-600 leading-[1.375rem] whitespace-pre-line">{children}</p>,
                                    list: ({ children, format }) => {
                                        const Tag = format === "ordered" ? "ol" : "ul";
                                        const className =
                                            format === "ordered"
                                                ? "list-decimal list-inside pb-4 text-gray-600 flex flex-col gap-2"
                                                : "flex flex-col gap-2 [&>li]:flex [&>li]:items-start [&>li]:gap-2 pb-4 text-gray-600";

                                        return (
                                            <ListFormatContext.Provider value={format}>
                                                <Tag className={className}>{children}</Tag>
                                            </ListFormatContext.Provider>
                                        );
                                    },
                                    "list-item": ListItem,
                                    heading: ({children, level}) => {
                                        switch (level) {
                                            case 1:
                                                return <h1
                                                    className={"mb-8 font-bold text-h1 md:mb-12 [&>em]:text-featured [&>em]:not-italic"}>{children}</h1>
                                            case 2:
                                                return <>
                                                    <h2
                                                        className={"pb-8 text-[1.5rem] font-bold md:pb-12 [&>em]:text-featured [&>em]:not-italic"}>{children}
                                                    </h2>
                                                </>
                                            case 3:
                                            case 4:
                                            case 5:
                                            case 6:
                                                return <h3 className="text-[1.25rem] pb-4">{children}</h3>
                                            default:
                                                return <h1 className="text-h1 pb-4">{children}</h1>
                                        }
                                    },
                                    image: ({image}) => {
                                        const index = imageRenderCount.current;
                                        imageRenderCount.current += 1;

                                        const isEven = index % 2 === 1;

                                        return (
                                            <ImageWithDecoration
                                                src={image.url}
                                                alt={image.alternativeText || ""}
                                                legend={image.caption}
                                                layout="landscape"
                                                decorationPosition={isEven ? "landscapeTwo" : "landscapeOne"}
                                                squareSize="large"
                                                rotation={isEven ? 2 : 1}
                                            />
                                        );
                                    },
                                    link: ({ children, url }) => {
                                        if (url.startsWith("https://www.youtube.com/embed/")) {
                                            const videoId = url.split("/embed/")[1].split("?")[0];
                                            const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                            const legend = extractText(children);

                                            return (
                                                <VideoWithDecoration
                                                    src={thumbnail}
                                                    alt=""
                                                    videoUrl={url}
                                                    legend={legend}
                                                />
                                            );
                                        }

                                        return (
                                            <a href={url} className="text-featured font-bold" target="_blank" rel="noopener noreferrer">
                                                {children}
                                            </a>
                                        );
                                    },
                                    quote: ({children}) =>
                                        <blockquote style={{backgroundColor: colors.muted}} className="p-6 mb-6">{children}</blockquote>,
                                }}
                            />
                        }
                    </div>
                    <div className="max-w-[22.5rem] w-full">
                        <RelatedRessources
                            ressourceId={data[0]?.id}
                        />
                    </div>
                </div>
            </div>
            {ressource?.ctaTitle && ressource?.ctaText && ressource?.ctaLabelButton && ressource?.ctaLink &&
                <CallToActionRessource
                    title={ressource?.ctaTitle}
                    text={ressource?.ctaText}
                    headingClassName="text-accent"
                    buttonClassName={"btn-accent"}
                    buttonLabel={ressource?.ctaLabelButton}
                    url={ressource?.ctaLink}
                    noBg
                />}
            <div>
                <button
                    className="text-featured pb-8"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft size={24}/>
                </button>
            </div>
        </>
    );
};

export default RessourceContent;