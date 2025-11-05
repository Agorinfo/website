"use client";
import React from 'react';
import Loader from "@/components/Loader";
import getExpertise from "@/actions/getExpertise";
import {useQuery} from "@tanstack/react-query";
import Expertise from "@/components/Expertise";
import ContentCard from "@/components/ContentCard";
import {CallToActionRessource} from "@/components/CallToAction";
import {ArrowLeft} from "@phosphor-icons/react";
import {BlocksContent} from "@strapi/blocks-react-renderer";

type ExpertiseType = {
    id: number;
    title: string;
    text: string;
    icon: {
        data: {
            attributes: {
                url: string;
            }
        }
    };
};

type CardType = {
    id: number;
    title: string;
    text: BlocksContent;
};

const SectionExpertises = () => {
    const {data: expertises, error, isLoading} = useQuery({
        queryKey: ["expertise"],
        queryFn: () => getExpertise(),
    })

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>

    return (
        <>
            <button className='text-featured my-12' onClick={() => window.history.back()}><ArrowLeft size={24}/>
            </button>
            <div className="flex flex-col gap-20">
                {expertises.expertises.map((expertise: ExpertiseType, index: number) => (
                    <div key={expertise.id}>
                        <Expertise
                            index={index}
                            icon={expertise.icon.data?.attributes.url}
                            title={expertise.title}
                            text={typeof expertise.text === "string"
                                ? JSON.parse(expertise.text)
                                : expertise.text}
                        />
                    </div>
                ))}
            </div>
            <div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 [&>*:nth-child(1)]:bg-accent-shine [&>*:nth-child(2)]:bg-accent-muted [&>*:nth-child(3)]:bg-accent [&>*:nth-child(3n)]:text-white">
                {expertises.card.map((card: CardType) => (
                    <ContentCard
                        key={card.id}
                        title={card.title}
                        text={card.text}
                    />
                ))}
            </div>
            <CallToActionRessource
                title={expertises.cta?.title}
                text={expertises.cta?.text}
                headingClassName='text-accent'
                buttonClassName='btn-accent'
                buttonLabel="Télécharger le catalogue"
                url={"https://api.agorinfo.fr/uploads/Catalogue_offres_techniques_b51409a7b5.pdf"}
                noBg
            />
            <button className='text-featured my-12' onClick={() => window.history.back()}><ArrowLeft size={24}/>
            </button>
        </>
    );
};

export default SectionExpertises;