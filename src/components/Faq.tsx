"use client";
import React from 'react';
import Accordion from "@/components/Accordion";

const Faq = ({data, expanded, setExpanded}: {data: any, expanded: false | number, setExpanded: React.Dispatch<React.SetStateAction<false | number>>}) => {

    return (
        <div className="flex flex-col gap-9 pb-12">
            {data?.slice(0,4).map((item: any, index: number) => (
                <Accordion
                    key={index}
                    index={index}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    title={item.answer}
                    text={item.response}
                />
            ))}
        </div>
    );
};

export default Faq;