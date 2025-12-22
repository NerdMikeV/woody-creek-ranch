# CLAUDE.md - Instructions for Claude Code

## Project Overview

This is **Woody Creek Ranch** - a luxury real estate website for a 1,500-acre estate development in Collin County, Texas. The site showcases the property's diverse landscape and includes an AI-powered chat concierge.

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions (for AI chat)
- **AI**: Claude API (Anthropic) for property concierge chat
- **Deployment Target**: Vercel

## Project Structure

```
woody-creek-ranch/
├── api/
│   └── chat.js              # Vercel serverless function for Claude API
├── public/
│   ├── images/              # All property images
│   │   ├── hero-aerial.png  # Main aerial shot (hero fallback)
│   │   ├── tree-farm.png    # 800-acre tree farm
│   │   ├── cattle-ranch.png # Black Angus operation
│   │   ├── trophy-fishing.png # Bass fishing
│   │   ├── deer-wildlife.png  # Whitetail deer program
│   │   ├── trails-lifestyle.png # Couple on walking trail
│   │   ├── heron-lake.png   # Serene lake scene
│   │   └── creek-waterfall.png # Creek with waterfall
│   └── videos/
│       ├── hero-flyover.mp4 # Main hero background video
│       ├── cattle-herd.mp4  # Black Angus herd moving
│       └── fishing-action.mp4 # Fishing action shot
├── src/
│   ├── App.jsx              # Main site component
│   ├── components/
│   │   └── ChatWidget.jsx   # AI property concierge
│   ├── main.jsx
│   └── index.css            # Tailwind entry
├── vercel.json              # Vercel config
├── vite.config.js
└── package.json
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

**Note**: The chat feature won't work locally without the API key. To test locally:
1. Create a `.env` file with `ANTHROPIC_API_KEY=your-key-here`
2. You'd need to run a local proxy or use `vercel dev`

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Woody Creek Ranch website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/woody-creek-ranch.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New" → "Project"
3. Import the `woody-creek-ranch` repository
4. Vercel auto-detects Vite - leave defaults
5. **IMPORTANT**: Add environment variable before deploying:
   - Click "Environment Variables"
   - Add: `ANTHROPIC_API_KEY` = `[the API key]`
6. Click "Deploy"

### Step 3: Custom Domain (Optional)

After deployment, you can add a custom domain in Vercel project settings.

## Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Claude API key for chat feature | Yes (for chat) |

## Key Features

### 1. Hero Video Background
- Auto-playing, muted, looping video
- Falls back to static image on slow connections/mobile
- Location: `public/videos/hero-flyover.mp4`

### 2. AI Property Concierge (Chat Widget)
- Floating chat button in bottom-right corner
- Powered by Claude API via `/api/chat` serverless function
- Pre-configured with property knowledge
- No "AI" branding - appears as premium concierge service

### 3. Interactive Feature Cards
- Hover effects reveal descriptions
- Images zoom on hover
- Located in "The Land" section

### 4. Parallax Quote Section
- Uses `heron-lake.png` as background
- Owner's vision quote

## Customization Notes

### To update property information:
Edit the `PROPERTY_CONTEXT` constant in `src/components/ChatWidget.jsx`

### To change colors:
Look for these CSS custom properties in `src/App.jsx`:
- `.text-gold { color: #c9a962; }`
- `.bg-gold { background-color: #c9a962; }`

### To add/modify features:
Edit the `features` array in `src/App.jsx`

### To replace media:
Simply replace files in `public/images/` or `public/videos/` keeping the same filenames.

## Troubleshooting

### Chat not working after deploy?
- Check that `ANTHROPIC_API_KEY` is set in Vercel environment variables
- Check Vercel function logs for errors

### Videos not playing on mobile?
- iOS requires `playsinline` attribute (already included)
- Some mobile browsers block autoplay - fallback image will show

### Images not loading?
- Ensure files are in `public/` directory (not `src/`)
- Check file paths start with `/` (e.g., `/images/hero-aerial.png`)

## Performance Notes

- Videos are ~10-13MB each - consider compressing for production
- Images are PNG - could convert to WebP for faster loading
- Fonts loaded from Google Fonts CDN

## Future Enhancements (Ideas)

1. **Contact Form Integration** - Connect to email service (SendGrid, Resend)
2. **Interactive Property Map** - Clickable regions showing lot types
3. **Image Gallery Lightbox** - Full-screen image viewing
4. **Video Modal** - Dedicated video showcase section
5. **Analytics** - Add Vercel Analytics or Google Analytics
