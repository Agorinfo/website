import React from 'react';
import {motion, AnimatePresence} from "framer-motion";
import clsx from "clsx";

type AccordionType = {
    index: number;
    expanded: false | number;
    setExpanded: React.Dispatch<React.SetStateAction<false | number>>;
    title: string;
    text: string;
};

const Accordion = ({index, expanded, setExpanded, title, text}: AccordionType) => {
    const isOpen = expanded === index;
    const buttonId = `accordion-button-${index}`;
    const panelId = `accordion-panel-${index}`;

    return (
        <div
            className="flex items-start justify-between gap-2 w-full border-b border-grayscale-lighter pb-1 last:pb-0 overflow-hidden">
            <div className="flex-1">
                <motion.button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? false : index)}
                    className={clsx(
                        "text-left w-full font-medium focus:outline-none focus-visible:ring-2 ring-accent rounded flex justify-between",
                        isOpen && "text-accent-muted"
                    )}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                >
                    {title}
                    <span
                        aria-hidden="true"
                        className={clsx(
                            "transition-transform duration-300 ease-linear self-start mt-2",
                            isOpen && "rotate-180",
                            isOpen ? "#EBF7DE" : "#B2DFFF"
                        )}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                          <path
                              d="M1 1.5L5 5.5L9 1.5"
                              stroke="currentColor"
                              strokeWidth=""
                              strokeLinecap="round"
                              strokeLinejoin="round"
                          />
                        </svg>
                    </span>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.section
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {opacity: 1, height: "auto", y: 0},
                                closed: {opacity: 0, height: 0, y: -20},
                            }}
                            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
                            className="overflow-hidden"
                        >
                            <p className="mt-2">{text}</p>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Accordion;