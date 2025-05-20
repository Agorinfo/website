import React from "react";
import {type BlocksContent} from "@strapi/blocks-react-renderer";


export type NavItemsType = {
    navItems: {
        id: number;
        label: string;
        url: string;
        labelButton: string;
        subNavItems: {
            id: number;
            icon: string;
            title: string;
            description: string;
            url: string;
        }[];
        image: {
            data: {
                attributes: {
                    url: string;
                    name: string;
                    alternativeText: string;
                }
            }
        }
    }[]
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type NavCardType = {
    icon: string;
    title: string;
    description: string;
    url: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setOpenSubNav: React.Dispatch<React.SetStateAction<number | undefined>>
}

export type IconCardType = {
    icon: string;
    className?: string;
    size: "small" | "medium"
    colors?: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

export type CardListType = {
    tag?: string;
    label: string;
    color: "bleu" | "bleu foncé" | "vert"
}

export type TestimonialType = {
    logo: string;
    alt: string;
    testimonial: BlocksContent;
    firstname: string;
    name: string;
    company: string;
    job: string;
    avatar: string;
    avatarAlt: string
}

export type TestimonialFetchType = {
    testimonials: {
        id: number;
        logo: {
            data: {
                attributes: {
                    url: string;
                    name: string;
                    alternativeText: string;
                }
            }
        }
        testimonial: BlocksContent;
        firstname: string;
        name: string;
        company: string;
        job: string;
        avatar: {
            data: {
                attributes: {
                    url: string;
                    name: string;
                    alternativeText: string;
                }
            }
        }
    }[]
}

export type SolutionCardType = {
    url: string;
    image: string;
    alt: string;
    category: string;
    solution: string
}

export type ContentType = {
    teaser?: string;
    content: BlocksContent;
    label1?: string;
    label2?: string;
    url1?: string;
    url2?: string;
    headingClassName?: string;
    headingStyle?: {
        color: string;
    }
    btn1ClassName?: string;
    btn1Style?: React.CSSProperties;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
}

export type CallToActionType = {
    title: string;
    text: string;
    buttonLabel: string;
    headingClassName: string;
    buttonClassName: string;
    noBg?: boolean;
}
export type CallToActionPageType = {
    title: string;
    text: string;
    headingClassName?: string;
    buttonClassName?: string;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    colors?: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

export type CallToActionImageType = {
    title: string;
    text: string;
    label: string;
    url: string;
    image: string;
    alt: string;
}

export type FeaturedCardType = {
    icon: string;
    title: string;
    text: string;
    className?: string;
    link?: string;
    iconClassName?: string;
    colors?: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

export type SupportType = {
    image: string;
    alt: string;
    teaser?: string;
    content?: BlocksContent;
    label1?: string;
    url1?: string;
    label2?: string;
    url2?: string;
}

export type ReassuranceType = {
    icon: string;
    alt: string;
    text: BlocksContent;
    label: string;
    url: string;
    images: {
        data:
            {
                attributes:
                    {
                        url: string;
                        alternativeText: string;
                        formats: {
                            small: {
                                url: string;
                            }
                        }
                    };
            }[];
    };
    ctaTitle: string;
    ctaText: string;
    ctaButtonLabel: string;
    ctaHeadingClassName: string;
    ctaButtonClassName: string;
}

export type SectionFaqType = {
    icon: string;
    alt: string;
    text: string;
    label: string;
    url: string;
    images: {
        data:
            {
                attributes:
                    {
                        url: string;
                        alternativeText: string;
                        formats: {
                            small: {
                                url: string;
                            }
                        }
                    };
            }[];
    };
    ctaTitle: string;
    ctaText: string;
    ctaButtonLabel: string;
    ctaHeadingClassName: string;
    ctaButtonClassName: string;
}

export type HeroHomeType = {
    images: {
        data:
            {
                attributes:
                    {
                        url: string;
                        alternativeText: string;
                        formats: { small: { url: string; }; };
                    };
            }[];
    };
    teaser: string;
    content: BlocksContent;
    label1: string;
    url1: string;
    label2: string;
    url2: string;
}

export type HeroPageType = {
    images: {
        data:
            {
                attributes:
                    {
                        url: string;
                        alternativeText: string;
                        formats: {
                            small: {
                                url: string;
                            }
                        }
                    };
            }[];
    };
    background: {
        url: string;
        alternativeText: string;
    };
    teaser: string;
    content: BlocksContent;
    label1: string;
    url1: string;
    label2: string;
    url2: string;
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

export type HeroArchiveType = {
    teaser: string;
    text: BlocksContent;
    label: string;
    url: string;
    modules: {
        id: number;
        attributes: {
            slug: string;
            brandColor: string;
            heroArchive: {
                id: number;
                teaser: string;
                title: string;
                label: string;
                url: string;
                badge?: string;
                icon?: string;
                moduleList: {
                    id: number;
                    listItem: string;
                }[];
                background: {
                    data: {
                        attributes: {
                            url: string;
                            alternativeText: string;
                        }
                    }
                }
                informationCard: {
                    id: number;
                    title: string;
                    text: string;
                    image?: {
                        data: {
                            attributes: {
                                url: string;
                                alternativeText: string;
                            }
                        }
                    }
                }
                logo?: {
                    data: {
                        attributes: {
                            url: string;
                            alternativeText: string;
                        }
                    }
                }
            }
        }
    }[]
}

export type HeroArchiveServiceType = {
    teaser: string;
    text: BlocksContent;
    label: string;
    url: string;
    modules: {
        id: number;
        attributes: {
            slug: string;
            brandColor: string;
            badgeColor: string
            heroArchive: {
                id: number;
                teaser: string;
                title: string;
                label: string;
                url: string;
                badge?: string;
                icon?: string;
                moduleList: {
                    id: number;
                    listItem: string;
                }[];
                background: {
                    data: {
                        attributes: {
                            url: string;
                            alternativeText: string;
                        }
                    }
                }
                informationCard: {
                    id: number;
                    title: string;
                    text: string;
                    image?: {
                        data: {
                            attributes: {
                                url: string;
                                alternativeText: string;
                            }
                        }
                    }
                }
                logo?: {
                    data: {
                        attributes: {
                            url: string;
                            alternativeText: string;
                        }
                    }
                }
            }
        }
    }[]
}

export type RelatedCardType = {
    icon: string;
    title: string;
    text: string;
    className?: string;
    listItems: {
        id: number;
        listItem: string
    }[];
    label: string;
    url: string;
}

export type RelatedServicesType = {
    title: string;
    solutions: {
        id: number;
        solution: string;
    }[]
}