import React from 'react';
import {BlocksRenderer} from "@strapi/blocks-react-renderer";

const ContentCard = ({title, text}) => {
    return (
        <div className="py-8 px-10 rounded-2xl">
            <h3 className={"text-h5 font-bold pb-4 text-center"}>{title}</h3>
            <div>
                <BlocksRenderer
                    content={typeof text === "string" ? JSON.parse(text) : text}
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
                            <p className="mb-1">{children}</p>,
                        heading: ({children, level}) => {
                            switch (level) {
                                case 1:
                                    return <>
                                        <h1
                                            className={"mb-8 font-bold text-h1 md:mb-12 " + headingClassName}>{children}
                                        </h1>
                                    </>
                                case 2:
                                    return <>
                                        <h2
                                            className={"pb-8 text-h4 font-bold md:pb-4 "}>{children}
                                        </h2>
                                    </>
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                    return <h3 className="text-h5">{children}</h3>
                                default:
                                    return <h1 className="text-h1">{children}</h1>
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ContentCard;