# Lumixa

**Tagline:** Reveal More. See Better.

Lumixa is a modern, responsive web application that helps users view Facebook-hosted images at the largest resolution accessible through their image URLs.

Users can paste a Facebook image URL, validate it, attempt to remove thumbnail-size restrictions where possible, preview accessible image variants, compare image dimensions, and open the best available image in a new browser tab.

## 1. Project Goals

Build a polished, fast, mobile-friendly image utility with:

- A simple URL input and one-click image processing
- Automatic Facebook image URL validation
- Thumbnail parameter detection
- Safe URL variant generation
- Image preview and dimension detection
- Best-accessible-image selection
- One-click opening of an image in a new tab
- Clear error messages for expired or invalid URLs
- Responsive design and accessible controls
- SEO-friendly metadata and documentation

**Important:** Lumixa must not promise that every image can be recovered in its original resolution. The application can only display images that Facebook makes accessible.

## 2. Brand Identity

- Brand name: Lumixa
- Cloudflare Pages project name: `lumixa`
- Expected default URL: `https://lumixa.pages.dev`
- Tagline: `Reveal More. See Better.`
- Product category: Facebook image viewer and image URL utility

The default URL is an example and will work only after successful deployment and domain assignment.

### Design Direction

Create a premium, modern interface inspired by polished SaaS tools.

- Dark navy or deep purple background
- Subtle violet and blue gradients
- Clean typography and generous spacing
- Rounded cards and input fields
- Smooth, lightweight animations
- Magic sparkle icon or minimal geometric logo
- High contrast and accessible text
- Responsive layouts for mobile, tablet, and desktop

Avoid excessive animations, clutter, and misleading claims.

## 3. Core User Workflow

1. The user pastes a Facebook image URL.
2. Lumixa validates the URL and its hostname.
3. The application analyzes the URL parameters.
4. The original URL is tested first.
5. Lumixa generates safe alternative URL candidates when appropriate.
6. Each accessible candidate is loaded and its actual displayed or intrinsic dimensions are measured when possible.
7. The application compares the available results and recommends the largest verified image.
8. The user previews the image.
9. The user clicks **Open Best Image** to open the selected URL in a new tab.

If no better candidate works, preserve the original working URL and explain the limitation.

## 4. Facebook URL Processing

Facebook image URLs may contain parameters such as:

- `stp`
- `cstp`
- `ctp`
- `_nc_cat`
- `_nc_sid`
- `_nc_ohc`
- `_nc_oc`
- `oh`
- `oe`

Some parameters describe image transformations or dimensions. Others are related to delivery, authorization, signatures, or expiration.

### Processing Rules

- Preserve the original URL.
- Parse URLs using the standard JavaScript `URL` API.
- Validate HTTPS and allow only explicitly supported Facebook image CDN hostnames.
- Detect thumbnail parameters such as `ctp=s100x100`.
- Generate a candidate that removes only the thumbnail parameter when appropriate.
- Keep the original signed URL available as a fallback.
- Never blindly remove the entire query string.
- Never assume that changing `cstp=mx1243x1240` to `cstp=mx2048x2048` will work.
- Do not modify signed parameters such as `oh` and `oe` in an attempt to forge a valid signature.
- Test candidate URLs independently.
- Do not claim success until an image has actually loaded.
- Do not label an image as original or full-resolution unless that status can be verified.

A modified URL may fail with `URL signature mismatch`, `Bad URL hash`, HTTP errors, or an expired-link response.

If a candidate fails, continue with other safe candidates or fall back to the original URL.

## 5. Image Preview and Resolution Detection

For every successfully loaded candidate, attempt to determine:

- Image URL
- Natural image width
- Natural image height
- Aspect ratio
- Whether the image loaded successfully

Use the browser's `HTMLImageElement.naturalWidth` and `HTMLImageElement.naturalHeight` when available.

Rank successfully loaded images primarily by their verified pixel dimensions. Do not treat a larger URL parameter as proof of a larger image.

If dimensions cannot be inspected, show the image as accessible but mark its resolution as unknown.

Do not upscale images and describe them as genuine HD.

### Preview Actions

Include:

- Image preview
- Width × height display
- Open Best Image
- Open Original URL
- Copy Image URL
- Try Again
- Clear Input

Open images using a new browser tab with appropriate `noopener` protection.

## 6. User Interface Requirements

### Header

- Lumixa logo and brand name
- Short tagline
- Small About or Help link

### Hero Section

Suggested heading:

**See Your Facebook Photos in Better Quality**

Suggested description:

Paste a Facebook image URL to explore accessible image sizes and open the best available version.

### URL Input Card

Include:

- Large URL input or textarea
- Paste-friendly interface
- Reveal Image button
- Clear button
- Input validation messages

### Processing State

Display a lightweight loading animation and messages such as:

- Validating URL
- Checking available image versions
- Comparing image dimensions

Never display fabricated progress or success.

### Results Section

Display:

- The best successfully loaded image
- Actual dimensions when available
- A list of tested candidates
- Success or failure status for each candidate
- Open Best Image button
- Copy URL button

### Error States

Provide helpful messages for:

- Invalid URL
- Unsupported hostname
- Invalid or expired signed URL
- No accessible image
- Network error
- Image dimensions unavailable

## 7. Technical Stack

Prefer a lightweight implementation suitable for Cloudflare Pages.

Recommended default:

- HTML5
- CSS3
- Vanilla JavaScript
- Native browser URL and Image APIs

Avoid unnecessary dependencies.

If the existing repository already uses React, Vite, or Next.js, inspect it first and preserve its established framework unless there is a strong reason to change it.

Do not replace existing project files blindly. Review the repository, identify its current structure, and make changes that fit the existing application.

## 8. CORS and Browser Limitations

Browsers can often display cross-origin images without allowing JavaScript to read their pixel data or fetch arbitrary response details.

Lumixa should distinguish between:

1. An image that can be displayed.
2. An image whose dimensions can be measured.
3. An image whose underlying response can be inspected.

Do not assume that a failed `fetch()` means an image cannot be displayed.

Do not introduce a proxy simply to bypass browser restrictions.

If a backend or proxy is genuinely necessary, document the trade-offs and implement strict SSRF protection, hostname validation, redirect validation, timeouts, response-size limits, and content-type checks.

Never build an unrestricted URL-fetching endpoint.

## 9. Security and Privacy

- Accept only HTTPS URLs from explicitly supported Facebook image hosts.
- Reject arbitrary domains and unsupported protocols.
- Validate every candidate URL before attempting to load it.
- Do not execute user-supplied URL content.
- Avoid storing submitted URLs or image data unnecessarily.
- Do not log sensitive query parameters.
- Never expose server secrets in frontend code.
- Do not bypass Facebook authentication or access controls.
- Use safe external-link handling.
- Keep the application functional without collecting user accounts or personal information.

## 10. SEO Requirements

Implement appropriate metadata:

**Suggested page title:**

`Lumixa - Facebook Image Viewer`

**Suggested meta description:**

`Use Lumixa to view accessible Facebook image versions, inspect image dimensions, and open the best available image URL.`

Additional requirements:

- Semantic HTML
- One clear H1
- Descriptive headings
- Descriptive button labels
- Open Graph metadata
- Favicon
- Canonical URL only when the production domain is confirmed
- `robots.txt` and sitemap where appropriate
- Fast page loading
- Mobile-friendly layout
- Helpful original content explaining how the tool works

Do not promise a Google ranking or keyword position. SEO performance depends on content quality, usefulness, indexing, competition, and other factors.

## 11. Cloudflare Pages Deployment

Deploy the application to Cloudflare Pages using the `lumixa` project name.

For a static HTML/CSS/JavaScript application:

- Build command: leave empty if no build is required.
- Build output directory: the directory containing `index.html`.
- Ensure the homepage is available at `/`.
- Test the deployed application over HTTPS.
- Confirm that the production URL works on mobile and desktop.

If the repository uses a build framework, use its appropriate build command and output directory rather than applying static settings blindly.

## 12. Testing Checklist

Before considering the project complete, verify:

- [ ] The homepage loads without console errors.
- [ ] Valid Facebook image URLs are accepted.
- [ ] Invalid URLs are rejected.
- [ ] Unsupported hostnames are rejected.
- [ ] The original URL is tested first.
- [ ] Thumbnail parameters are detected correctly.
- [ ] Alternative candidates preserve required parameters.
- [ ] Failed variants do not break the entire workflow.
- [ ] Image dimensions are measured when available.
- [ ] The best verified candidate is selected.
- [ ] The original URL remains available as a fallback.
- [ ] Copy URL works.
- [ ] Open Best Image works.
- [ ] Loading, error, and empty states work.
- [ ] Layout is responsive.
- [ ] Keyboard navigation works.
- [ ] No false claim of guaranteed original resolution is displayed.
- [ ] Cloudflare Pages deployment succeeds.

## 13. Development Instructions for Codex

Before coding:

1. Inspect the current repository and its existing files.
2. Identify the framework, dependencies, scripts, and deployment configuration.
3. Preserve working code and avoid unnecessary rewrites.
4. Implement the application according to this README.
5. Use clean, maintainable, well-structured code.
6. Handle errors explicitly and avoid silent failures.
7. Test the primary workflow using the supplied sample URL when it is accessible.
8. Do not fabricate successful image loads or dimensions.
9. Update this README if the actual implementation differs from the documented behavior.
10. Finish by reporting the files changed, features implemented, tests performed, and any known limitations.

## Final Product Goal

Lumixa should be a fast, trustworthy, easy-to-use Facebook image URL utility with a memorable brand and a polished interface.

The primary objective is to help users discover the largest accessible image version without falsely promising that every thumbnail can be converted into its original full-resolution photo.



# Lumixa

**Tagline:** Reveal More. See Better.

Lumixa is a modern Facebook image URL viewer built with React, Vite, and Node.js. It helps users inspect Facebook image URLs, test accessible image variants, compare verified image dimensions, and open the best accessible version.

## 1. Technology Stack

### Frontend

- React
- Vite
- JavaScript or TypeScript (prefer TypeScript for maintainability)
- React Hooks
- CSS Modules or a well-organized global CSS architecture
- Lucide React for icons, if needed

### Backend

- Node.js
- Express.js only if backend functionality is required
- REST API for any server-side operations that cannot safely or reliably run in the browser

### Deployment

- Cloudflare Pages for the React frontend
- Cloudflare Workers or a separately deployed Node.js service if a backend is required

**Important:** Cloudflare Pages static hosting does not run a persistent Node.js/Express server. Vite uses Node.js during development and building. If server-side endpoints are required on Cloudflare, use Cloudflare Workers or Pages Functions.

## 2. Recommended Project Structure

```text
lumixa/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── UrlInput.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── CandidateList.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/
│   │   └── useImageCandidates.ts
│   ├── lib/
│   │   ├── validateUrl.ts
│   │   ├── imageCandidates.ts
│   │   └── imageDimensions.ts
│   ├── types/
│   │   └── image.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── server/
│   └── index.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── .env.example
└── README.md
```

The `server/` directory is optional. Do not add a backend merely for the sake of using Node.js.

## 3. Core Features

- Responsive and polished interface
- Facebook image URL input
- URL validation and hostname allowlisting
- Original URL testing
- Safe thumbnail-parameter detection
- Alternative URL candidate testing
- Image preview and verified dimension detection
- Best-accessible-image selection
- Copy image URL
- Open image in a new tab
- Loading, success, empty, and error states
- Mobile-friendly interface
- Accessible keyboard controls
- SEO metadata and optimized performance

## 4. Image Processing Rules

1. Preserve the original URL.
2. Validate HTTPS and explicitly supported Facebook CDN hostnames.
3. Test the original URL first.
4. Detect thumbnail parameters such as `ctp=s100x100`.
5. Generate safe alternative candidates only when appropriate.
6. Preserve signed parameters unless a tested transformation is known to work.
7. Test candidates independently and retain the original as a fallback.
8. Measure actual image dimensions where possible.
9. Select the largest verified accessible image.
10. Never claim that a URL contains the original resolution unless that can be verified.

Facebook signed URLs may expire or reject modified parameters. Lumixa must explain these limitations rather than claiming guaranteed HD retrieval.

## 5. UI and Design

Create a premium dark interface with:

- Deep navy and purple gradients
- Violet accent colors
- Rounded cards and input fields
- Subtle animations
- A clean Lumixa wordmark
- Responsive layouts
- Clear image dimensions
- A prominent Reveal Image button
- A results area showing tested candidates

Suggested hero heading:

**See Your Facebook Photos in Better Quality**

Suggested description:

Paste a Facebook image URL to explore accessible image versions and open the best available result.

## 6. Security

- Never accept arbitrary remote URLs for backend fetching.
- Validate hostnames and every redirect if server-side fetching is implemented.
- Prevent SSRF, open redirects, and unbounded downloads.
- Set timeouts and response-size limits.
- Never expose secrets in frontend code.
- Do not bypass authentication or access controls.
- Avoid logging complete signed URLs.
- Do not store submitted image URLs unnecessarily.

Prefer browser-based image loading when sufficient. A failed browser `fetch()` does not necessarily mean an image cannot be displayed.

## 7. Cloudflare Pages Deployment

For the Vite frontend:

- Build command: `npm run build`
- Build output directory: `dist`
- Production build: `npm run build`
- Local development: `npm run dev`

Use Cloudflare Pages with the project name `lumixa`.

If a backend is necessary, deploy compatible API endpoints using Cloudflare Workers or Pages Functions, or deploy the Node.js server separately. Do not expect a persistent Express server to run inside static Pages hosting.

## 8. Codex Instructions

Before implementing:

1. Inspect the existing repository.
2. Preserve working files and existing conventions.
3. Configure React and Vite if not already configured.
4. Use TypeScript unless the existing project requires JavaScript.
5. Build reusable React components and custom hooks.
6. Keep URL transformation logic separate from UI components.
7. Add clear loading and error handling.
8. Test with the provided Facebook sample URL if accessible.
9. Verify production build using `npm run build`.
10. Document deployment and known limitations.

Do not invent successful results, image dimensions, or original-resolution availability.

## Final Goal

Deliver a production-ready, responsive React application powered by Vite, with a clean architecture and a secure, optional Node.js backend where justified. The frontend must deploy successfully to Cloudflare Pages under the Lumixa brand.

## Implemented Application

The repository now contains a static React, Vite, and TypeScript frontend. No backend or image proxy is used: candidate images are loaded directly by the browser and compared using `HTMLImageElement.naturalWidth` and `naturalHeight`.

### Local development

```bash
npm install
npm run dev
```

Create a production build with `npm run build`. Cloudflare Pages should use that build command and publish the `dist` directory under the `lumixa` project name.

### Current limitations

- Lumixa accepts HTTPS `fbcdn.net` hosts and their subdomains. Other Facebook pages, redirects, and arbitrary image hosts are intentionally rejected.
- Safe variant generation is intentionally limited to removing recognized `ctp={width}x{height}`, `ctp=s{width}x{height}`, and `ctp=p{width}x{height}` thumbnail parameters. Signed delivery and expiry parameters are preserved.
- Browser image loading can confirm display accessibility and usually exposes intrinsic dimensions, but it cannot inspect the underlying cross-origin HTTP response.
- Facebook may reject modified or expired signed URLs. Lumixa falls back to the original candidate when it remains accessible.
- Clipboard access depends on browser support and a secure browsing context.

