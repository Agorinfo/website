"use client"
import React from 'react';
import CardList from "@/components/CardList";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";

type ListCardType = {
    id: number,
    tag:string,
    color: "bleu" | "bleu foncé" | "vert",
    item: {
        id: number,
        label:string
    }[]
}
const SolutionsUsers = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });

    const {Text, listCard} = data.solutionUsers;

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <section className="py-12">
            <BlocksRenderer
                content={Text}
                blocks={{
                    paragraph: ({children}) => <p
                        className="paragraph text-center pb-12">{children}</p>,
                    heading: ({children, level}) => {
                        switch (level) {
                            case 1:
                                return <h1
                                    className="text-h1 font-bold pb-6 text-center">{children}</h1>
                            case 2:
                                return <h2 className="text-h3 font-bold pb-6 text-center">{children}</h2>
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                return <h3 className="text-h3">{children}</h3>
                            default:
                                return <h1 className="text-h1">{children}</h1>
                        }
                    }
                }}
            />
            <div className="grid lg:grid-cols-3 gap-6">

                {listCard.map((card:ListCardType) => {

                    let tagBgColor
                    let tagTextColor

                    switch (card.color) {
                        case "bleu foncé":
                            tagBgColor = "bg-featured-shine";
                            tagTextColor = "text-featured-shadow";
                            break
                        case "vert":
                            tagBgColor = "bg-accent-muted";
                            tagTextColor = "text-accent";
                            break
                        case "bleu":
                            tagBgColor = "bg-featured-shine";
                            tagTextColor = "text-featured-shadow";
                            break
                        default:
                            break
                    }
                    return (
                        <div key={card.id} className="relative">
                            {card.tag &&
                                <span
                                    className={`absolute left-1/2 top-[-0.8125rem] -translate-x-1/2 uppercase rounded-full text-sm font-bold py-1.5 px-3 whitespace-nowrap ${tagBgColor} ${tagTextColor}`}
                                >
                                    {card.tag}
                                </span>}
                            <div className="flex flex-col gap-6">
                                {card.item.map(item => (
                                    <CardList key={item.id} label={item.label} color={card.color}/>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default SolutionsUsers;