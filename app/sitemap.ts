import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://axonydigital.com",
      lastModified: new Date(),
       changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: "https://axonydigital.com/services",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: "https://axonydigital.com/work",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: "https://axonydigital.com/contact",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: "https://axonydigital.com/about",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}


