import fs from 'fs';
import path from 'path';
import { createSitemap } from '../src/lib/sitemap.js';
import { generateSlug } from '../src/lib/slugUtils.js';

const DOMAIN = 'https://renewableenergy-directory.com';
const SITEMAP_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');
const COMPANY_DATA_PATH = path.resolve(process.cwd(), 'src/lib/companyData.json');

async function generateSitemap() {
  console.log('Generating sitemap...');

  const companyData = JSON.parse(fs.readFileSync(COMPANY_DATA_PATH, 'utf-8'));

  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/privacy', priority: 0.5, changefreq: 'yearly' },
    { url: '/terms', priority: 0.5, changefreq: 'yearly' },
    { url: '/sitemap', priority: 0.6, changefreq: 'monthly' },
  ];

  const companyPages = companyData.map(company => ({
    url: `/${generateSlug(company.name)}`,
    priority: 0.7,
    changefreq: 'monthly',
  }));

  const allPages = [...pages, ...companyPages];

  const sitemap = createSitemap(DOMAIN, allPages);

  fs.writeFileSync(SITEMAP_PATH, sitemap);

  console.log(`Sitemap generated at ${SITEMAP_PATH}`);
}

generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
});
