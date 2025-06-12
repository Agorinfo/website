import React, {useEffect, useRef, useState} from 'react';
import {NavItemsType} from "@/utils/types";
import {ModalButton} from "@/components/Button";
import Icon from "@/components/icons/Icon";
import NavCard from "@/components/NavCard";
import Link from "next/link";
import emptyImg from "@/assets/empty-img.png";
import clsx from "clsx";
import ContactForm from "@/components/ContactForm";
import useLockScroll from "@/utils/useLockScroll";

const Nav = ({navItems, isOpen, setIsOpen}: NavItemsType) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const [openSubNav, setOpenSubNav] = useState<number | undefined>();
    const navRef = useRef<HTMLDivElement>(null);

    useLockScroll(isOpen);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenSubNav(undefined);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 ease-linear z-[99] ${isOpen ? "visible" : "invisible"}`}></div>
            <nav
                ref={navRef}
                className={`fixed z-[999] lg:z-20 top-0 w-full h-screen bg-white md:w-1/2 lg:w-auto lg:h-auto pt-16 px-4 pb-4 overflow-scroll lg:overflow-visible lg:static lg:p-0 ${isOpen ? "right-0" : "-right-full"} transition-all duration-300 ease-linear`}>
                <button
                    type="button"
                    aria-label="close"
                    className="absolute top-4 right-4 lg:hidden"
                    onClick={() => setIsOpen(false)}>
                    <Icon
                        name={"x"}
                        size={32}
                    />
                </button>
                <ul className="relative flex flex-col lg:flex-row lg:items-center lg:static gap-[3.125vw]">
                    {navItems.map((item, index) => (
                        <li key={item.id}
                            className="hover:cursor-default border-b lg:border-none last:border-none">
                            {item.subNavItems.length > 0 ?
                                <>
                                    <button
                                        onClick={() => setOpenSubNav(openSubNav === index ? undefined : index)}
                                        className=" inline-flex w-full items-center gap-1 pb-6 lg:pb-0 font-bold hover:text-accent transition-color duration-300 ease-linear">{item.label}
                                        <Icon className="lg:flex-auto justify-self-start" name={"down"}/>
                                    </button>
                                </>
                                :
                                item.url && item.label &&
                                <Link onClick={() => {
                                    setIsOpen(false);
                                    setOpenSubNav(undefined);
                                }}
                                      className="font-bold hover:text-accent transition-color duration-300 ease-linear pb-6 lg:pb-0 inline-block w-full"
                                      href={item.url}>{item.label}
                                </Link>
                            }
                            {item.subNavItems.length > 0 &&
                                <div
                                    className={clsx("w-full max-w-screen-xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0,2.61)] lg:absolute lg:z-50 lg:left-0 lg:bg-featured-shine lg:border lg:border-greyscale-lighter lg:shadow-subNav lg:rounded-lg lg:px-[7.333vw]",
                                        openSubNav === index ? "max-h-[2000px] lg:visible opacity-100 lg:top-[110%]" : "lg:invisible opacity-0 max-h-0 lg:top-[90%]"
                                    )}>
                                    <div
                                        className="grid lg:grid-cols-3 lg:p-8 gap-[2.083vw]">
                                        <div className="grid lg:grid-cols-2 lg:col-span-2 gap-8 pb-6 lg:pb-0">
                                            {item.subNavItems.map(item => (
                                                <NavCard
                                                    setOpenSubNav={setOpenSubNav}
                                                    setIsOpen={setIsOpen}
                                                    key={item.id}
                                                    icon={item.icon}
                                                    url={item.url}
                                                    title={item.title}
                                                    description={item.description}
                                                />
                                            ))}
                                        </div>
                                        <div className="bg-white rounded-lg overflow-hidden flex flex-col">
                                            <img className="hidden flex-auto object-cover lg:block"
                                                 src={item.image.data ? backUrl + item.image.data.attributes.url : emptyImg.src}
                                                 alt={item.image.data ? item.image.data.attributes.alternativeText : ""}/>
                                            {item.url && item.labelButton &&
                                                <div className="pb-6 lg:p-3 text-center">
                                                    <Link
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            setOpenSubNav(undefined);
                                                        }}
                                                        className="btn btn-gray w-full lg:w-auto lg:btn-small lg:btn-small-minor"
                                                        href={item?.url}>
                                                        {item?.labelButton}
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </li>
                    ))}
                </ul>
                <ModalButton
                    setIsOpen={setIsOpen}
                    label="Nous contacter"
                    className={`btn btn-accent w-full mt-8 lg:hidden`}
                >
                    <ContactForm/>
                </ModalButton>
            </nav>
        </>
    );
};

export default Nav;