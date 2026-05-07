const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bindzo8.com';
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Bindzo 8';
const PHONE = process.env.NEXT_PUBLIC_PHONE || '';
const EMAIL = process.env.NEXT_PUBLIC_EMAIL_2 || 'info@bindzo8.com';

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/nav_logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    contactType: 'customer service',
    email: EMAIL,
  },
  sameAs: [
    process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '',
    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || '',
    process.env.NEXT_PUBLIC_SOCIAL_BEHANCE || '',
  ].filter(Boolean),
});

export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: COMPANY_NAME,
  image: `${SITE_URL}/nav_logo.png`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: PHONE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2nd Street, Gandhipuram, Coimbatore, Tamil Nadu 641012', // Add if available
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641012',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 11.0192549,
    longitude: 76.9661506,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    opens: '09:00',
    closes: '19:00',
  },
});

export const getServiceSchema = (
  name: string,
  description: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: COMPANY_NAME,
  },
  areaServed: 'Worldwide',
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
