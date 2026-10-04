export const siteConfig = {
  name: 'Vastra Heritage',
  tagline: 'Woven in Tradition',
  description:
    'Premium handloom sarees crafted by master weavers. Silk, Banarasi, Kanjivaram, and Bridal collections for the discerning connoisseur.',
  url: 'https://vastraheritage.in',
  email: 'hello@vastraheritage.in',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  address: {
    line1: 'Vastra Heritage, 12 Silk Weavers Lane',
    line2: 'Banjara Hills, Hyderabad',
    city: 'Telangana 500034',
    country: 'India',
  },
  storeHours: [
    { day: 'Monday – Friday', hours: '10:00 AM – 8:00 PM' },
    { day: 'Saturday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Sunday', hours: '11:00 AM – 6:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    pinterest: 'https://pinterest.com',
  },
  shipping: {
    freeAbove: 2999,
    standardCharge: 149,
    expressCharge: 299,
  },
  currency: '₹',
};

export type SiteConfig = typeof siteConfig;
