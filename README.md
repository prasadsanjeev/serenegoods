# SereneGoods

A static site with two main sections: Sanjeev’s website-building portfolio and Amazon Canada affiliate finds.

## Preview locally

Run `python3 -m http.server 4173` in this folder, then open http://localhost:4173.
No package installation or build step is required. Publish the repository root on your existing static host.

## Files and content

- `index.html`: personal homepage, website work, services, Amazon category links, about and contact.
- `studio.css` and `studio.js`: homepage styling, mobile navigation, contact form, and GSAP animations (loaded from jsDelivr; the page still works, unanimated, if they fail to load or the visitor prefers reduced motion).
- `robots.txt`, `sitemap.xml`, `llms.txt`, `og-image.png`, `favicon.svg`: search and AI visibility (SEO / AEO / GEO). The homepage `<head>` holds the canonical URL (`https://www.serenegoods.ca/`), Open Graph tags, and JSON-LD (business, person, website and FAQ). If you edit the FAQ on the page, update the matching `FAQPage` answers in the JSON-LD too. Add any new page to `sitemap.xml`.
- `finds.html`: affiliate hub with the existing product and category links.
- `affiliate-shell.css`: shared colour and navigation updates for the affiliate, about and privacy pages.
- Existing category HTML files: product descriptions and Amazon links.

## Add portfolio projects

The Website Work section features five client sites: QRforLess, Anish & Nisarg, StaffingPro, Cultural Connect Durham, and Velvet Ribbons. Each card links directly to the client’s HTTPS website in a new tab.

To add a project, copy an `<a class="project-card …">` inside `.client-work-grid` in `index.html`, then edit the category tag, the name and tagline inside `.mini-window`, the description, domain and link, and add a colour class (see `.qr-project` in `studio.css`). The first two cards display larger; the rest sit three to a row. Brand cards are typographic project previews, not screenshots. Velvet Ribbons showcases its luxury gift wrapping studio and enquiry flow; Anish & Nisarg includes both the real estate website and CRM system.

The website enquiry links use the existing `hello@serenegoods.ca` address. Update every occurrence if you want enquiries sent elsewhere.

Keep the Amazon Associate disclosure beside affiliate content and preserve sponsored link attributes when editing product links. The previous inactive newsletter form has been replaced with a working email suggestion link.
