import React from 'react';
import {
    ArrowLeft,
    ArrowRight,
    BookmarkSimple,
    Browsers,
    Buildings,
    Calculator,
    CaretDown,
    CaretUp,
    Certificate,
    ChalkboardTeacher,
    ChatsTeardrop,
    ChatTeardrop,
    Check,
    CheckCircle,
    ComputerTower,
    Database,
    DesktopTower, Devices,
    Factory,
    Gear,
    Grains,
    Handshake,
    HardDrives,
    Headset,
    InstagramLogo,
    Knife,
    Leaf,
    Lifebuoy,
    LinkedinLogo,
    ListChecks,
    MapPinLine,
    Medal,
    NumberOne,
    NumberThree,
    NumberTwo,
    Planet,
    Signpost,
    Storefront,
    TwitterLogo,
    User,
    Wrench,
    X,
    YoutubeLogo
} from "@phosphor-icons/react";
import {
    Birthday, Burger,
    Business, Checklist,
    CloudData, Club,
    Comptinnov, Down,
    Group,
    Listing,
    Logiviande, Lsa,
    Merge, Poligon, PoligonTransparent, Silos, Software, StepFour, StepOne, StepThree,
    StepTwo, Support, Team, Triangle, Versioning
} from "@/components/icons/index";

const Icon = ({name, size, className}:{name: string, size?: number, className?: string}) => {
    let icon;

    switch (name) {
        case "medal":
            icon = <Medal className={className} size={size} />
            break
        case "user":
            icon = <User className={className} size={size} />
            break
        case "factory":
            icon = <Factory className={className} size={size} />
            break
        case "buildings":
            icon = <Buildings className={className} size={size} />
            break
        case "mapPin":
            icon = <MapPinLine className={className} size={size} />
            break
        case "signpost":
            icon = <Signpost className={className} size={size} />
            break
        case "handshake":
            icon = <Handshake className={className} size={size} />
            break
        case "listChecks":
            icon = <ListChecks className={className} size={size} />
            break
        case "certificate":
            icon = <Certificate className={className} size={size} />
            break
        case "knife":
            icon = <Knife className={className} size={size} />
            break
        case "grains":
            icon = <Grains className={className} size={size} />
            break
        case "calculator":
            icon = <Calculator className={className} size={size} />
            break
        case "storefront":
            icon = <Storefront className={className} size={size} />
            break
        case "headset":
            icon = <Headset className={className} size={size} />
            break
        case "chatsTeardrop":
            icon = <ChatsTeardrop className={className} size={size} />
            break
        case "boardTeacher":
            icon = <ChalkboardTeacher className={className} size={size} />
            break
        case "planet":
            icon = <Planet className={className} size={size} />
            break
        case "arrowLeft":
            icon = <ArrowLeft className={className} size={size} />
            break
        case "arrowRight":
            icon = <ArrowRight className={className} size={size} />
            break
        case "instagram":
            icon = <InstagramLogo className={className} size={size} />
            break
        case "check":
            icon = <Check className={className} size={size} />
            break
        case "bookmark":
            icon = <BookmarkSimple className={className} size={size} />
            break
        case "hardDrives":
            icon = <HardDrives className={className} size={size} />
            break
        case "browsers":
            icon = <Browsers className={className} size={size} />
            break
        case "lifebuoy":
            icon = <Lifebuoy className={className} size={size} />
            break
        case "numberOne":
            icon = <NumberOne className={className} size={size} />
            break
        case "numberTwo":
            icon = <NumberTwo className={className} size={size} />
            break
        case "numberThree":
            icon = <NumberThree className={className} size={size} />
            break
        case "x":
            icon = <X className={className} size={size} />
            break
        case "caretDown":
            icon = <CaretDown className={className} size={size} />
            break
        case "caretUp":
            icon = <CaretUp className={className} size={size} />
            break
        case "desktopTower":
            icon = <DesktopTower className={className} size={size} />
            break
        case "devices":
            icon = <Devices className={className} size={size} />
            break
        case "gear":
            icon = <Gear className={className} size={size} />
            break
        case "wrench":
            icon = <Wrench className={className} size={size} />
            break
        case "leaf":
            icon = <Leaf className={className} size={size} />
            break
        case "computerTower":
            icon = <ComputerTower className={className} size={size} />
            break
        case "database":
            icon = <Database className={className} size={size} />
            break
        case "checkCircle":
            icon = <CheckCircle className={className} weight="fill" size={size} />
            break
        case "twitter":
            icon = <TwitterLogo className={className} weight="fill" size={size} />
            break
        case "linkedin":
            icon = <LinkedinLogo className={className} weight="fill" size={size} />
            break
        case "youtube":
            icon = <YoutubeLogo className={className} weight="fill" size={size} />
            break
        case "birthday":
            icon = <Birthday />
            break
        case "burger":
            icon = <Burger />
            break
        case "business":
            icon = <Business />
            break
        case "cloudData":
            icon = <CloudData />
            break
        case "club":
            icon = <Club />
            break
        case "comptinnov":
            icon = <Comptinnov />
            break
        case "down":
            icon = <Down className={className} />
            break
        case "group":
            icon = <Group />
            break
        case "lsa":
            icon = <Lsa />
            break
        case "logiviande":
            icon = <Logiviande />
            break
        case "merge":
            icon = <Merge />
            break
        case "silos":
            icon = <Silos />
            break
        case "stepOne":
            icon = <StepOne />
            break
        case "stepTwo":
            icon = <StepTwo />
            break
        case "stepThree":
            icon = <StepThree />
            break
        case "stepFour":
            icon = <StepFour  />
            break
        case "team":
            icon = <Team  />
            break
        case "checklist":
            icon = <Checklist  />
            break
        case "listing":
            icon = <Listing  />
            break
        case "poligon":
            icon = <Poligon  className={className} />
            break
        case "poligonTransparent":
            icon = <PoligonTransparent className={className} />
            break
        case "triangle":
            icon = <Triangle  className={className} />
            break
        case "software":
            icon = <Software />
            break
        case "support":
            icon = <Support />
            break
        case "versioning":
            icon = <Versioning />
            break
        default:
            break;
    }

    return icon;
};

export default Icon;