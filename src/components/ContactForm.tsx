"use client"
import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import getGlobal from "@/actions/getGlobal";
import Loader, {LoaderButton} from "@/components/Loader";
import Button from "@/components/Button";
import emptyImg from "@/assets/empty-img.png"
import toast from "react-hot-toast";
import useModalStore from "@/store/ModalStore";
import getFooter from "@/actions/getFooter";

const ContactForm = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const [active, setActive] = useState("formulaire");
    const { closeModal } = useModalStore();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            setLoading(true);
            const response = await fetch('/api/send-contact', {
                method: 'post',
                body: formData,
            });

            if (!response.ok) {
                toast.error("Une erreur est survenue !");
                throw new Error(`response status: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData.status === 500) {
                toast.error(responseData.message);
            } else {
                toast.success("Message envoyé !");
                event.target.reset();
                closeModal();
            }
        } catch (err) {
            toast.error("Une erreur est survenue !");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const {data, isLoading, error} = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal()
    })

    const footerData = useQuery({
        queryKey: ["footer"],
        queryFn: () => getFooter(),
    });

    const {siteName, street, adressComp, zipCode, city, tel, email, addressComp, portalUrl, logo} = data;

    const telUrl= tel.replaceAll(" ", "").substring(1);
    const telCompUrl = addressComp?.tel.replaceAll(" ", "").substring(1);

    if(isLoading || footerData.isLoading) return <Loader />

    if(error || footerData.error) return <p>{error?.message || footerData.error?.message}</p>

    return (
        <div className="flex flex-col lg:flex-row bg-white">
            <h2 className="text-h3 font-bold capitalize pt-8 px-8 pb-6 lg:hidden">Contacter <span className="text-[#3965bd] font-bold">We</span><span className='font-light text-[#646464]'>Négoce</span></h2>
            <div className="lg:hidden px-8 flex">
                <div className="flex justify-start items-start gap-1 rounded-lg border overflow-hidden">
                    <button
                        onClick={() => setActive('formulaire')}
                        className={`px-4 py-3 w-[9.25rem] ${active === "formulaire" ? "text-accent bg-accent-shine" : "text-grayscale-darker"}`}
                    >
                        Formulaire
                    </button>
                    <button
                        onClick={() => setActive('coordonnees')}
                        className={`px-4 py-3 w-[9.25rem] ${active === "coordonnees" ? "text-accent bg-accent-shine" : "text-grayscale-darker"}`}
                    >
                        Coordonnées
                    </button>
                </div>
            </div>
            <div
                className={`p-8 flex flex-col justify-between items-start lg:border-r lg:border-grayscale-lighter lg:w-[33.333vw] max-w-[32rem] lg:block ${active === "coordonnees" ? "block" : "hidden lg:block"}`}>
                <div className="">
                    <div className="pb-6 hidden lg:block w-[17.5rem]">
                        <img className="w-full" src={logo.data ? backUrl + logo.data.attributes.url : emptyImg.src}
                             alt={logo.data.attributes.alternativeText}/>
                    </div>
                    <div className="divide-y">
                        <div className="flex flex-col gap-2 pb-6">
                            <h3 className="text-h6 font-bold">À Rouen</h3>
                            <div className="flex flex-col items-start">
                                <span>{street}</span>
                                <span>{adressComp}</span>
                                <span>{zipCode} {city}</span>
                            </div>
                            <a className="link-normal" href={"tel:+33" + telUrl}>{tel}</a>
                            <a className="link-normal" href={"mailto:" + email}>{email}</a>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                            <h3 className="text-h6 font-bold">{addressComp?.name}</h3>
                            <div className="flex flex-col items-start">
                                <span>{addressComp?.address}</span>
                                <span>{addressComp?.zipCode} {addressComp?.city}</span>
                            </div>
                            <a className="link-normal" href={"tel:+33" + telCompUrl}>{addressComp?.tel}</a>
                            <a className="link-normal" href={"mailto:" + addressComp?.email}>{addressComp?.email}</a>
                        </div>
                    </div>
                </div>
                <div className="pb-8">
                    <h4 className="text-h4 font-bold">Besoin d&apos;assistance ? </h4>
                    <p className="text-grayscale-darkest pb-6">Envoyez votre demande au support technique</p>
                    {portalUrl && <Button label="Créer un ticket" url={portalUrl} className="btn btn-gray"/>}
                </div>
                <div className="flex items-center gap-2">
                    {footerData.data.socials.map((item: any) => (
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
            <div className={`p-8 lg:w-[50vw] max-w-[48rem] ${active === "formulaire" ? "block" : "hidden lg:block"}`}>
                <h2 className="text-h3 font-bold capitalize pb-6 hidden lg:block">Contacter <span
                    className="text-[#3965bd] font-bold">We</span><span
                    className='font-light text-[#646464]'>Négoce</span></h2>
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                    <label className="label-style" htmlFor="firstname">
                        Prénom *
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            className="input-style"
                            required
                        />
                    </label>
                    <label className="label-style" htmlFor="name">
                        Nom *
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="input-style"
                            required
                        />
                    </label>
                    <label className="label-style sm:col-span-full" htmlFor="company">
                        Société
                        <input
                            type="text"
                            name="company"
                            id="company"
                            className="input-style"
                        />
                    </label>
                    <label className="label-style" htmlFor="email">
                        Email *
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input-style"
                            required
                        />
                    </label>
                    <label className="label-style" htmlFor="tel">
                        Téléphone *
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            className="input-style"
                            required
                        />
                    </label>
                    <div className="flex flex-col col-span-full">
                        <p className="pb-4 text-featured">Objet</p>
                        <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-12">
                            <label htmlFor="contact" className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="contact"
                                    name="object"
                                    value="Être recontacté"
                                    className="radio-style"
                                    defaultChecked
                                />
                                Être recontacté
                            </label>
                            <label htmlFor="demo" className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="demo"
                                    name="object"
                                    value="Réserver une démo"
                                    className="radio-style"
                                />
                                Réserver une démo
                            </label>
                            <label htmlFor="other" className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="other"
                                    name="object"
                                    value="Autre demande"
                                    className="radio-style"
                                />
                                Autre demande
                            </label>
                        </div>
                    </div>
                    <label className="label-style col-span-full" htmlFor="message">
                        Message *
                        <textarea
                            className="input-style resize-none h-32"
                            name="message"
                            id="message"
                            required
                        >
                            </textarea>
                    </label>
                    <div className="flex items-center justify-between col-span-full">
                        <button className="btn btn-accent mb-4" type={"submit"} >{loading ? <LoaderButton /> : "Envoyer"}</button>
                        <span className={"text-sm text-grayscale-darker"}>* Obligatoire</span>
                    </div>
                    <p className="text-sm text-grayscale-darker col-span-full">En envoyant ce message, vous acceptez
                        la <a href="/politique-de-confidentialité">Politique de confidentialité</a>.</p>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;