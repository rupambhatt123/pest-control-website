export interface ContactInfo {
  location: string;
  phone: string;
  email: string;
  timing: string;
  responseNote: string;
}

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface HeroData {
  tag: string;
  titlePrimary: string;
  titleHighlight: string;
  titleSecondary: string;
  description: string;
  imageUrl: string;
}

export interface AboutData {
  tag: string;
  headingPrefix: string;
  headingHighlight: string;
  subheading: string;
  description: string;
  points: string[];
  imageUrl: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  feedback: string;
  avatar: string;
  rating: number;
}

export interface BlogItem {
  id: number;
  title: string;
  imageUrl: string;
}

export interface FooterLinkGroup {
  title: string;
  links: string[];
}

export interface WebsiteData {
  contactInfo: ContactInfo;
  navigation: NavLink[];
  hero: HeroData;
  about: AboutData;
  servicesTag: string;
  servicesHeadingPrefix: string;
  servicesHeadingHighlight: string;
  servicesHeadingSuffix: string;
  services: ServiceItem[];
  testimonialsTag: string;
  testimonialsHeading: string;
  testimonials: TestimonialItem[];
  blogTag: string;
  blogHeadingPrefix: string;
  blogHeadingHighlight: string;
  blogSubheading: string;
  blogs: BlogItem[];
  footerAbout: string;
  footerQuickLinks: string[];
  footerServices: string[];
  copyright: string;
}