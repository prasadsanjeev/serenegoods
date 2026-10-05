# SereneGoods

A static site with two main sections: Sanjeev’s website-building portfolio and Amazon Canada affiliate finds.

## Preview locally

Run `python3 -m http.server 4173` in this folder, then open http://localhost:4173.
No package installation or build step is required. Publish the repository root on your existing static host.

## Files and content

- `index.html`: personal homepage, website work, services, Amazon category links, about and contact.
- `studio.css` and `studio.js`: homepage styling and accessible mobile navigation.
- `finds.html`: affiliate hub with the existing product and category links.
- `affiliate-shell.css`: shared colour and navigation updates for the affiliate, about and privacy pages.
- Existing category HTML files: product descriptions and Amazon links.

## Add portfolio projects

Copy the `<article class="project-card">` inside `.work-grid` in `index.html` and replace its title, description, preview and link with a real project. The current SereneGoods card is labelled as a personal project. For multiple cards, group the articles in a wrapper within `.work-grid`, alongside the services panel.

The website enquiry links use the existing `hello@serenegoods.ca` address. Update every occurrence if you want enquiries sent elsewhere.

Keep the Amazon Associate disclosure beside affiliate content and preserve sponsored link attributes when editing product links. The previous inactive newsletter form has been replaced with a working email suggestion link.
