import React from 'react';
import Slider from "@/components/Slider";
import CallToAction from "@/components/CallToAction";
import Content from "@/components/Content";
import {ReassuranceType} from "@/utils/types";
import emptyImg from "@/assets/empty-img.png"

const Reassurance = ({icon, alt, text, label, url, images, ctaTitle, ctaText, ctaHeadingClassName, ctaButtonClassName, ctaButtonLabel}: ReassuranceType) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    return (
        <>
            <section className="relative pt-28 mt-24 bg-accent-shadow full-width text-white">
                <span className="absolute left-0 -top-10 md:-top-20 size-20 md:size-40 rounded-full inline-flex items-center justify-center bg-featured-shine shadow-thumb">
                    <img src={icon ? backUrl + icon : emptyImg.src} alt={alt}/>
                </span>
                <div className="">
                    <div className="grid lg:grid-cols-8 items-center gap-[3.283vw] xl:gap-[2.2vw]">
                        <div className="lg:col-span-3">
                            <Content
                                content={text}
                                label1={label}
                                url1={url}
                                headingClassName="[&>em]:text-featured-muted [&>em]:not-italic"
                                btn1ClassName='btn-accent'
                            />
                        </div>
                        <div className="lg:col-span-5">
                            <Slider images={images.data} layout="landscape" />
                        </div>
                    </div>
                </div>
            </section>
            <CallToAction
                title={ctaTitle}
                text={ctaText}
                headingClassName={ctaHeadingClassName}
                buttonClassName={ctaButtonClassName}
                buttonLabel={ctaButtonLabel}
            />
        </>
    );
};

export default Reassurance;