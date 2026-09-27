export interface LocalizedText {
    en: string;
    ar: string;
}

export interface AboutContent {
    title: LocalizedText;
    subtitle: LocalizedText;
}

export interface AboutSection {
    img:File|  string;
    mission: AboutContent;
    vision: AboutContent;
    ourstory: AboutContent;
}

export interface HeroSection {
    img: File| string;
    title: LocalizedText;
    subtitle: LocalizedText;
}

export interface LandingData {
    id: number;
    header: HeroSection;
    about: AboutSection;
}

export interface LandingDto {
    data: LandingData;
}