import React from 'react';

const EXTERNAL_DATA_URL = 'https://www.fireworkpk.com';

function generateSiteMap() {
  const pages = [
    '',
    '/packages',
    '/gallery',
    '/events',
    '/clients',
    '/videos',
    '/about',
    '/contact',
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
    <url>
      <loc>${`${EXTERNAL_DATA_URL}${page}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  `;
    })
    .join('')}
</urlset>
`;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
} 