"use client"
import React from 'react';
import Slider from "@/components/Slider";
import Content from "@/components/Content";
import {HeroPageType} from "@/utils/types";

const HeroPage = ({images, teaser, content, label1, url1, label2, url2, background, colors}: HeroPageType) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const [hover, setHover] = React.useState(false);
    const btn1Style = {
        backgroundColor: hover ? colors.hover : colors.base,
    };
    const bgHeroStyle = {
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), linear-gradient(257deg, ${colors.base} 0%, rgba(146, 86, 32, 0.00) 25.01%, ${colors.base} 100%), linear-gradient(0deg, ${colors.base} 0%, ${colors.base} 100%), url(${backUrl + background.url}), #FFF`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "normal, normal, multiply, luminosity, normal",
    }
    return (
        <section
            style={background && bgHeroStyle}
            className="full-width relative text-white">

            <div
                className="pb-6 h-[110svh] se:h-[140svh] tabletH:h-[130svh] sm:pb-20 lg:pb-12 lg:h-heroPage grid lg:grid-cols-2 md:gap-[1.729vw] lg:flex-row relative z-10">
                <Content
                    teaser={teaser}
                    content={content}
                    label1={label1}
                    label2={label2}
                    url1={url1}
                    url2={url2}
                    headingStyle={{color: colors.accent}}
                    btn1ClassName={`text-white outline-none ring-accent-muted focus-visible:ring`}
                    btn1Style={btn1Style}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
                <Slider images={images.data}/>
            </div>
        </section>
    );
};

export default HeroPage;