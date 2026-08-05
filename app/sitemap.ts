import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://veraadigital.com",
      lastModified: new Date(),
       changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: "https://veraadigital.com/services",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: "https://veraadigital.com/work",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: "https://veraadigital.com/contact",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: "https://veraadigital.com/about",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}


