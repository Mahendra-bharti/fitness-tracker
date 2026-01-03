# PWA Icons Setup Guide

To complete the PWA setup, you need to create icon files. Here are the required sizes:

## Required Icons

1. **pwa-192x192.png** - 192x192 pixels
2. **pwa-512x512.png** - 512x512 pixels

## Quick Setup Options

### Option 1: Use an Online Icon Generator
1. Create a 512x512px square icon with your app logo/design
2. Use [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) or similar tool
3. Place generated icons in the `/public` folder

### Option 2: Create Icons Manually
1. Design a 512x512px icon (can use Figma, Canva, etc.)
2. Export as PNG
3. Create two sizes:
   - `public/pwa-192x192.png` (resize to 192x192)
   - `public/pwa-512x512.png` (keep at 512x512)

### Option 3: Use a Simple Design
For a quick start, you can use any fitness/gaming themed icon or even a simple gradient square with "FQ" text.

## Icon Design Tips
- Use bright, contrasting colors
- Keep design simple and recognizable at small sizes
- Ensure important elements are centered
- Consider using a fitness/gaming theme (weights, trophy, etc.)

## Testing
After adding icons, the PWA will work when you:
1. Build the project: `npm run build`
2. Serve the build: `npm run preview`
3. Test in mobile browser and look for "Add to Home Screen" prompt

