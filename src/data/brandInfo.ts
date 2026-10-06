export interface BrandInfo {
  name: string;
  shortName: string;
  tagline: string;
  subtagline: string;
  location: string;
  city: string;
  country: string;
  whatsappDisplay: string;
  whatsappNumber: string;
  email: string;
}

export const BRAND_INFO: BrandInfo = {
  name: "Ismail Clothing Center",
  shortName: "Ismail Clothing",
  tagline: "Ladies Unstitched Fabric & Bespoke Master Stitching",
  subtagline: "Exquisite Pakistani unstitched lawn, chiffon, cotton & khaddar collections tailored to perfection in Rawalpindi.",
  location: "Rawalpindi, Pakistan",
  city: "Rawalpindi",
  country: "Pakistan",
  whatsappDisplay: "03282305470",
  whatsappNumber: "923282305470",
  email: "amsiddiquikhan147@gmail.com",
};

/**
 * Builds a direct WhatsApp click-to-chat URL with pre-filled message
 */
export function createWhatsAppUrl(message?: string): string {
  const defaultMsg = "Assalam o Alaikum, I would like to inquire about your ladies clothing and stitching services.";
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${text}`;
}

/**
 * Builds a mailto link with pre-filled subject and body
 */
export function createEmailUrl(subject?: string, body?: string): string {
  const defaultSubject = `Inquiry: ${BRAND_INFO.name}`;
  const defaultBody = "Assalam o Alaikum,\n\nI am contacting you regarding your ladies unstitched clothing and stitching services.\n\nThank you.";
  return `mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(subject || defaultSubject)}&body=${encodeURIComponent(body || defaultBody)}`;
}
