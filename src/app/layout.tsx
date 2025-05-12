import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import UseReactQuery from "@/utils/useReactQuery";
import getMenu from "@/actions/getMenu";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import getFooter from "@/actions/getFooter";
import {Toaster} from "react-hot-toast";
import Modal from "@/components/Modal";

const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })
    await queryClient.prefetchQuery({
        queryKey: ["menu"],
        queryFn: () => getMenu(),
    })
    await queryClient.prefetchQuery({
        queryKey: ["footer"],
        queryFn: () => getFooter(),
    })
    return (
        <html lang="fr" className="scroll-smooth">
        <body className={`${inter.className} overflow-x-hidden`}>
        <UseReactQuery>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div id="modal-root"></div>
                <Modal />
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Header/>
                <div className="content-grid">
                    {children}
                </div>
                <Footer/>
            </HydrationBoundary>
        </UseReactQuery>
        </body>
        </html>
    );
}
