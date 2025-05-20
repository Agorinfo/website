"use client"
import React from 'react';
import Button, {ModalButton} from "@/components/Button";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import getFooter from "@/actions/getFooter";
import emptyImg from "@/assets/empty-img.png"
import ContactForm from "@/components/ContactForm";

const Footer = ({}) => {
    const currenYear = new Date().getFullYear();
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["footer"],
        queryFn: () => getFooter(),
    });

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <footer className="content-grid">
            <div className="grid grid-cols-2 gap-8 md:gap-0 md:grid-cols-6 border-t pt-12">
                <div className="col-span-2">
                    <div className="pb-4 w-[180px]">
                        <img className="w-full" src={data.logo.data ? backUrl + data.logo.data.attributes.url : emptyImg.src}
                             alt={data.logo.data ? data.logo.data.attributes.alternativeText : ""}/>
                    </div>
                    <p className="pr-8 pb-8">{data.text}</p>
                    <div className="flex items-center gap-2">
                        {data.socials.map((item: any) => (
                            <Button
                                ariaLabel={"lien vers " + item.social}
                                key={item.id}
                                icon={item.social}
                                url={item.url}
                                className="text-2xl hover:text-featured-peps transition-all duration-300 ease-out"
                            />
                        ))}
                    </div>
                </div>
                {data.footerLinks.map((item: any) => (
                    <div key={item.id} className="flex flex-col gap-4">
                        <h4 className="uppercase paragraph text-featured font-bold">{item.title}</h4>
                        {item.listItem.map((item: any) => (
                            item.url === "#" ?
                                    <ModalButton
                                        key={item.id}
                                        label="Contact"
                                        className={`footer-link text-left`}
                                    >
                                        <ContactForm/>
                                    </ModalButton>
                                :

                                <Link key={item.id} className="footer-link" href={item.url}>{item.label}</Link>
                        ))}
                    </div>
                ))}
            </div>
            <div className="border-b pt-14 text-sm flex items-baseline gap-1">
                WeNégoce est un editeur de <a href="https://www.wesoft.fr/" target="_blank" rel="noreferrer"><img
                src="/logotype-wesoft.png" alt="Société We Soft"/></a>
            </div>
            <div className="text-center text-sm text-grayscale-darker py-8 ">
                © {currenYear === 2024 ? currenYear : "2024-" + new Date().getFullYear()} - WENEGOCE. Tous droits
                réservés.
            </div>
        </footer>
    );
};

export default Footer;