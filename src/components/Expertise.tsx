import React from 'react';
import {BlocksContent, BlocksRenderer} from "@strapi/blocks-react-renderer";

type ExpertiseType = {
    index: number;
    icon: string;
    title: string;
    text: BlocksContent;
}

const Expertise = ({index, icon, title, text}: ExpertiseType) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const even = index % 2 === 0;
    return (
        <div className="flex items-center justify-between">
            <div>
                <div>
                    <div className="flex items-end justify-between">
                        <span className="text-h2 font-bold">{index + 1}.</span>
                        {icon &&
                            <img
                                src={backUrl + icon}
                                alt=""
                                className="lg:hidden max-w-[14rem] w-full h-full object-cover"
                            />}
                    </div>
                    <div className="max-w-[35.6rem] w-full">
                        <div
                            className="flex flex-col justify-center lg:py-12 lg:text-left xl:py-0">
                            <BlocksRenderer
                                content={text}
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
                                        <p className="mb-1 text-gray-500">{children}</p>,
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
                                                return <h3 className="text-h3">{children}</h3>
                                            default:
                                                return <h1 className="text-h1">{children}</h1>
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {icon &&
                <img
                src={backUrl + icon}
                alt={title}
                className={`hidden lg:block w-full max-w-[30rem] h-full object-cover ${even ? "" : "order-first"}`}
            />}
        </div>
    );
};

export default Expertise;