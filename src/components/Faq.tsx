"use client";
import React, {useState} from 'react';
import Accordion from "@/components/Accordion";

const Faq = ({data, expanded, setExpanded}: {data: any, expanded: false | number, setExpanded: React.Dispatch<React.SetStateAction<false | number>>}) => {
    const [more, setMore] = useState(false);
    const [questionsNumber, setQuestionsNumber] = useState(4);

    const handleMore = () => {
        if (more) {
            setQuestionsNumber(4);
        } else {
            setQuestionsNumber(data?.length);
        }
        setMore(!more);
    }
    return (
        <>
            <div className="flex flex-col gap-9 pb-12">
                {data?.slice(0, questionsNumber).map((item: any, index: number) => (
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
            <button onClick={handleMore} className="btn btn-accent">{more ? "Voir moins" : "Voir plus"}</button>
        </>
    );
};

export default Faq;