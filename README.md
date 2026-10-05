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

The Website Work section features five client sites: QRforLess, Anish & Nisarg, StaffingPro, Cultural Connect Durham, and Velvet Ribbons. Each card links directly to the client’s HTTPS website in a new tab.

To add a project, copy an `<article class="project-card client-project …">` inside `.client-work-grid` in `index.html`, then edit the name, category, description, domain and both links. Keep the card before the `.client-services` panel. Brand cards are typographic project previews, not screenshots. Velvet Ribbons showcases its luxury gift wrapping studio and enquiry flow; Anish & Nisarg includes both the real estate website and CRM system.

The website enquiry links use the existing `hello@serenegoods.ca` address. Update every occurrence if you want enquiries sent elsewhere.

Keep the Amazon Associate disclosure beside affiliate content and preserve sponsored link attributes when editing product links. The previous inactive newsletter form has been replaced with a working email suggestion link.
