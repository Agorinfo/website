"use client"
import React from 'react';
import RichText from "@/components/RichText";
import {useQuery} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import Loader from "@/components/Loader";

const TeamsDescription = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: getAbout
    })

    if (isLoading) return <Loader/>;

    if (error) return <p>{error.message}</p>;
    return (
        <div className="pb-6 md:pb-8 lg:pb-12">
        {
            data.teamDescription ?
                <RichText content={data.teamDescription} center/>
                : null
        }
        </div>
    );
};

export default TeamsDescription;