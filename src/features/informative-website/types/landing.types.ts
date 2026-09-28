export interface LocalizedText {
    en: string;
    ar: string;
}

export interface AboutContent {
    title: LocalizedText;
    subtitle: LocalizedText;
}

export interface AboutSection {
    img: File | string;
    mission: AboutContent;
    vision: AboutContent;
    ourstory: AboutContent;
}

export interface HeroSection {
    img: File | string;
    title: LocalizedText;
    subtitle: LocalizedText;
}

export interface ValueCard {
    title: LocalizedText;
    subtitle: LocalizedText;
    icon: string;
}

export interface ValuesSection {
    title: LocalizedText;
    cards: ValueCard[];
}
export interface WhyChooseUsCard {
    title: LocalizedText;
    subtitle: LocalizedText;
    img: File | string;
}

export interface WhyChooseUsSection {
    title: LocalizedText;
    subtitle: LocalizedText;
    cards: WhyChooseUsCard[];
}

export interface ServicesCard {
    itle: LocalizedText;
    subtitle: LocalizedText;
    icon: string;
    img: string | File;
}
export interface ServicesSection {
    title: LocalizedText;
    img: string | File;
    cards: ServicesCard[];
}

export interface CatalogSection { 
    title: LocalizedText; 
    subtitle: LocalizedText; 
    img: string | File; 
}


export type SocialPlatform =
    | "facebook"
    | "instagram"
    | "tiktok"
    | "twitter";

export interface SocialMedia {
    url: string;
    platform: SocialPlatform;
}

export interface TeamCard {
    title: LocalizedText;
    subtitle: LocalizedText;
    socailmedia: SocialMedia;
    img: File | string;
}

export interface TeamSection {
    section: LocalizedText;
    title: LocalizedText;
    subtitle: LocalizedText;
    cards: TeamCard[];
}

export interface FaqItem {
    title: LocalizedText;
    subtitle: LocalizedText;
}

export interface FaqSection {
    description: LocalizedText;
    faq: FaqItem[];
}

export interface LandingData {
    id: number;
    header: HeroSection;
    about: AboutSection;
    values: ValuesSection;
    why_choose_us: WhyChooseUsSection;
    services: ServicesSection;
    catalog:CatalogSection;
    our_team: TeamSection;
    faq: FaqSection;
}

export interface LandingDto {
    data: LandingData;
}