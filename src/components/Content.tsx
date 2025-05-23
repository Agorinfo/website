import React from 'react';
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import Button, {ModalButton} from "@/components/Button";
import {ContentType} from "@/utils/types";
import ContactForm from "@/components/ContactForm";

const Content = ({teaser, content, label1, label2, url1, url2, headingClassName, headingStyle, btn1ClassName, btn1Style, onMouseEnter, onMouseLeave, teaserClassName}: ContentType) => {

    return (
        <div
            className="flex flex-col justify-center lg:py-12 lg:text-left xl:py-0">
            <p className={`mb-4 font-semibold md:mb-6 md:text-lg xl:text-xl ${teaserClassName ? teaserClassName : "text-accent"}`}>{teaser}</p>
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
                    paragraph: ({children}) =>
                        <p className="mb-8 text-gray-500 md:mb-12 lg:w-4/5 ">{children}</p>,
                    heading: ({children, level}) => {
                        const dynamicEmStyle = `
                             h${level} em {
                                color: ${headingStyle?.color};
                                font-style: normal;
                            }
                        `;
                        switch (level) {
                            case 1:
                                return <>
                                    {headingStyle && <style>{dynamicEmStyle}</style>}
                                    <h1
                                        className={"mb-8 font-bold text-h1 md:mb-12 " + headingClassName}>{children}
                                    </h1>
                                </>
                            case 2:
                                return <>
                                    <style>{dynamicEmStyle}</style>
                                    <h2
                                        style={headingStyle}
                                        className={"pb-8 text-h1 font-bold md:pb-12 " + headingClassName}>{children}
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

            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-start">
                {url1 && url1 === "#" && label1 &&
                    <>
                        <ModalButton
                            style={btn1Style}
                            label="Réserver une démo"
                            className={`btn ${btn1ClassName}`}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                        >
                            <ContactForm/>
                        </ModalButton>
                    </>

                }
                {url1 && url1 !== "#" && label1 &&
                    <Button url={url1} label={label1}
                            className={`btn ${btn1ClassName}`}
                    />
                }

                {url2 && label2 &&
                    <Button url={url2} label={label2}
                            className="btn btn-gray"
                    />
                }
            </div>
        </div>
    );
};

export default Content;