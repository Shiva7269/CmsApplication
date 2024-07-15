import { FooterItem } from "./footer-item";
import { ContactInfo } from "./contact-info";

export interface PageComponent {
    name: string;
    footerItems?: FooterItem[];
    contactInfo?: ContactInfo;
    titles?: { contactUs: string; quickLinks: string; followUs: string };
}
