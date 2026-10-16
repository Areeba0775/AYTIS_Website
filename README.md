# AYTI'S Academy Website

A responsive single-page website built with HTML5, CSS3, and Vanilla JavaScript.

## Files

- `index.html` — page structure and content
- `style.css` — responsive styling and animations
- `script.js` — WhatsApp setup, mobile navigation, teacher carousel, enquiry flow, gallery lightbox

## Run on Windows

1. Extract `aytis-academy.zip`.
2. Open the `aytis-academy` folder.
3. Double-click `index.html` to open it in your browser.
4. For a more reliable local preview, open the folder in VS Code and use the Live Server extension.

No Node.js, database, or backend is required.

## Before publishing

Open `script.js` and update the `CONFIG` object:

- `whatsappNumber`: your WhatsApp number in international digits only, e.g. `923001234567`
- `email`: the academy's real email address
- `instagram` and `tiktok`: real profile URLs
- `address`: the academy's actual address
- `images`: sample image URLs used by the main program sections

The current contact details and teacher profiles are examples. Replace them with actual academy information before publishing. Teacher names, roles, biographies, and portrait URLs are stored in the `teachers` array in `script.js`.

## Replacing photos

The website uses external Unsplash demo photos, so an internet connection is needed to load those images and the Google Fonts / Font Awesome icons. Every image section has a `REPLACE IMAGE` comment in `index.html` or `script.js`. You can use your own local images by putting them in `assets/images/` and changing the corresponding `src` to a relative path, for example:
`assets/images/hero-classroom.jpg`

The project does not include locally downloaded photographs.

## Notes

- WhatsApp buttons open a chat with a pre-filled message; they do not send automatically.
- The enquiry panel opens WhatsApp and does not store user information.
- Course fees, schedules, and duration are intentionally not invented.
- The 10 teacher profiles are editable sample content (4 male / 6 female); use real profiles and verified details before launch.
