"use client"
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {X} from "@phosphor-icons/react";
import {AnimatePresence, motion} from "framer-motion";
import useModalStore from "@/store/ModalStore";

type ModalType = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
}

const backdrop = {
    visible: {opacity: 1},
    hidden: {opacity: 0},
};

const modal = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    exit: {
        y: "-100%",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            stiffness: 100,
            damping: 15,
            mass: 1,
            delay: 0.5,
        },
    },
};


const Modal = () => {
    const {isOpen, content, closeModal} = useModalStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        const body = document.body;
        const noScroll = () => body.classList.add('overflow-hidden');
        const scroll = () => body.classList.remove('overflow-hidden');

        if (isOpen) {
            noScroll();
        }

        return () => scroll();
    }, [isOpen]);

    const modalContent = (
        <AnimatePresence mode="wait" onExitComplete={closeModal} initial={false}>
            {isOpen &&
                <>
                    <motion.div
                        key="overlay"
                        className={`fixed inset-0 w-full  bg-black/50 z-[9999] backdrop-blur-sm ${isOpen ? 'block' : "hidden"}`}
                        onClick={closeModal}
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />
                    <motion.div
                        className={`fixed w-[100vw] sm:auto h-screen flex justify-center items-end md:items-center z-[99999] pointer-events-none`}
                        layoutId="modal-ccontainer"
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div
                            className={`w-[100vw] sm:w-auto max-w-[80rem] max-h-[100svh] lg:max-h-[95vh] overflow-y-auto pointer-events-auto ${isOpen ? 'block' : "hidden"}`}

                        >
                            <div className="bg-brand-darkest md:border md:border-l-brand-medium md:border-y-brand-lighter md:border-r-white h-full w-full md:rounded-[8px] relative overflow-hidden">
                                <button className="absolute top-8 right-8 text-md font-semibold text-brand-lightest hover:text-featured-peps transition-all duration-300 ease-out"
                                        type="button"
                                        onClick={closeModal}>
                                    <X size={32}/>
                                </button>
                                <div>{content}</div>
                            </div>
                        </div>
                    </motion.div>
                </>
            }
        </AnimatePresence>
    );

    if(!hydrated) return <></>;

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")!
    );
};

export default Modal;