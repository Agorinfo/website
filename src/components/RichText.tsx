"use client"
import React from 'react';
import {BlocksRenderer,type BlocksContent} from "@strapi/blocks-react-renderer";
import Link from "next/link";

const RichText = ({content}: {content: BlocksContent}) => {
    return (
        <BlocksRenderer
            content={content}
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
                link: ({children, url}) => (
                    <Link href={url} className="text-featured-peps font-semibold hover:text-gray-500 transition-colors duration-300 ease-linear">{children}</Link>
                ),
                paragraph: ({children}) =>
                    <p className="mb-4 text-gray-500 lg:w-4/5 ">{children}</p>,
                heading: ({children, level}) => {
                    switch (level) {
                        case 1:
                            return(
                                <h1
                                    className={"mb-8 font-bold text-h1 leading-normal"}>{children}
                                </h1>
                            )
                        case 2:
                            return (
                                <h2
                                    className={"pb-8 text-h2 font-bold leading-normal"}>{children}
                                </h2>
                            )
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            return <h3 className="text-h3 leading-normal">{children}</h3>
                        default:
                            return <h1 className="text-h1 leading-normal">{children}</h1>
                    }
                }
            }}
        />
    );
};

export default RichText;