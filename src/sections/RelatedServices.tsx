import React from 'react';
import RelatedCard from "@/components/RelatedCard";
import {ModalButton} from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import {RelatedServicesType} from "@/utils/types";
import getSolutions from "@/actions/getSolutions";

const RelatedServices = async ({title, solutions}: RelatedServicesType) => {
    const data = await getSolutions();
    const filteredSolutions = data.filter((solution: any) => solutions.includes(solution.attributes.slug))

    return (
        <div className='py-12'>
            <h2 className="text-center text-h3 pb-12">{title}</h2>
            <div className="pb-8 flex justify-center flex-wrap gap-8">
                {filteredSolutions.map((item:any) => (
                    <RelatedCard
                        key={item.id}
                        icon={item.attributes.icon}
                        title={item.attributes.name}
                        text={item.attributes.shortDescription}
                        listItems={item.attributes.heroArchive.moduleList}
                        label={"Voir les fonctionnalités"}
                        url={`/solutions/${item.attributes.slug}/#features`}
                    />
                ))}
            </div>
            <p className="flex items-center justify-center gap-1">
                Envie d’en discuter pour comprendre notre démarche ?
                <ModalButton
                    label="Contactez-nous"
                    className="text-grayscale-darker hover:text-accent transition-colors duration-300"
                >
                    <ContactForm />
                </ModalButton>
            </p>
        </div>
    );
};

export default RelatedServices;