"use client"
import Link from "next/link";
import React from 'react';
import Icon from "@/components/icons/Icon";
import useModalStore from "@/store/ModalStore";

type ButtonType = {
    url?: string,
    label?: string,
    className?: string,
    labelClassName?: string,
    iconName?: string,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    burger?: boolean,
    icon?:string
    ariaLabel?:string
}

const Button = ({url, label, onClick, className, type, burger, icon, ariaLabel}: ButtonType) => {
    return (
        <>
            {url && url?.startsWith('https') ?
                <a
                    className={className}
                    href={url}
                    target="_blank"
                    rel="no-referrer"
                    aria-label={ariaLabel}
                >
                    {icon && <Icon name={icon} />}
                    {label && label}
                </a>
                :
                url &&
                <Link className={className} href={url} aria-label={ariaLabel}>
                    {label && label}
                    {icon && <Icon name={icon} />}
                </Link>
            }
            {onClick &&
                <button
                    type={type ? type : "button"}
                    className={className}
                    onClick={onClick}
                >
                    {burger && <Icon name="burger" />}
                    {icon && <Icon name={icon} />}
                    {label && label}
                </button>
            }
        </>
    );
}

export default Button;

type OverlayType = {
    children: React.ReactNode,
    className?: string,
    label?: string
    labelClassName?: string;
    iconName?: string;
    style?: React.CSSProperties
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalButton = ({children, className, label, iconName, labelClassName, style, onMouseEnter, onMouseLeave, setIsOpen}: OverlayType) => {
    const {openModal} = useModalStore();

    return (
        <>
            <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} type="button" className={className} onClick={() => {
                openModal(children);
                {setIsOpen &&
                    setIsOpen(false)
                }
            }}>
                {iconName && <Icon name={iconName}/>}
                {label && <span className={labelClassName}>{label}</span>}
            </button>
        </>
    )
}