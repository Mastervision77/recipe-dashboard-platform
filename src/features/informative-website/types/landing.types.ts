
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface HeroSection {
  img: string;
  title: LocalizedText;
  subtitle: LocalizedText;
}

export interface LandingData {
    id: number;
    header: HeroSection;
    // about: AboutSection;
    // values: ValuesSection;
    // why_choose_us: WhyChooseUsSection;
    // services: ServicesSection;
    // team: TeamSection;
    // faq: FAQSection;
}


export interface LandingDto {
    data: LandingData;
}