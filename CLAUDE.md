# Woody Creek Ranch Website

## Instructions for AI Agents
<!-- DO NOT DELETE THIS SECTION — it tells AI agents how to maintain this document -->
When you finish a coding session, update this document before your final commit:
- Move any tasks you completed from "In-Progress Work" to "Recent Changes" with today's date, your branch name, and a brief summary of what you did
- If you discovered a bug or issue during your session, add it to "Active Issues" with the appropriate severity
- If you made an architectural decision (chose a library, established a pattern, changed a convention), add it to "Recent Decisions"
- If you encountered something that would trip up the next person working on this project, add it to "Known Gotchas"
- Always include the branch name in your Recent Changes entries, e.g. "Apr 20 (staging): Fixed SFTP retry logic"
- Do NOT modify Quick Reference or Architecture sections unless you made structural changes to the project
- Do NOT remove entries from Recent Changes — it is append-only (newest at top)
- Keep this document under 500 lines. If Recent Changes grows beyond 30 entries, remove the oldest ones.

## Quick Reference
<!-- Maintained by: Claris OS (auto-generated) and humans (manual edits) -->
- **What**: Luxury real estate website for Woody Creek Ranch, a 1,500-acre estate development in Collin County, TX. Features hero video, property showcase, and AI-powered chat concierge.
- **Stack**: React 19, Vite, Tailwind CSS, Vercel Serverless Functions, Claude API (Anthropic)
- **Repo**: NerdMikeV/woody-creek-ranch
- **Deploy**: Vercel (auto-deploy from main branch)
- **URLs**: 
  - Production: woodycreekranch.claris-ai.com
  - Vercel default: woody-creek-ranch.vercel.app
- **Key People**: Michael Fannin (ranch owner/client)
- **Last context sync**: 2026-04-23

## Current State
<!-- Maintained by: Claris OS auto-updater ONLY — do not edit manually -->
<!-- This section is regenerated from the Claris OS database whenever tasks, issues, or builds change -->

### Active Issues
- Image cropping: "The Vision" section trails-lifestyle.png crops out couple on left
- Image cropping: "Working Ranch" cattle-ranch.png shows logo in top-left corner
- Decorative box in "The Vision" section looks like broken UI element

### In-Progress Work
- DNS propagation for woodycreekranch.claris-ai.com (CNAME added in GoDaddy)

### Pending To-Dos
- Update button hrefs to mailto:michael@claris-ai.com links
- Fix image object-position for trails-lifestyle.png and cattle-ranch.png
- Remove or restyle decorative box element in "The Vision" section

### Pending Tests
- No tasks awaiting testing

## Recent Changes

## Recent Decisions
<!-- Maintained by: Both Claris OS (from decisions table) and Claude Code (from session discoveries) -->

- Apr 23: Using mailto links for contact buttons instead of form integration (demo simplicity)
- Apr 23: AI chat concierge uses Claude Sonnet via /api/chat serverless function — no "AI" branding, positioned as premium concierge service
- Apr 23: Video hero with static image fallback for slow connections/mobile
- Apr 23: Formspree considered but deferred — mailto sufficient for demo purposes

## Architecture & Patterns

## History
<!-- Maintained by: Claris OS (major milestones from builds/deploys) -->
<!-- Append-only, newest at top -->

- Apr 23: Initial site build with React/Vite/Tailwind, deployed to Vercel with custom domain
- Apr 14 (claris-build/1bea5041): chat — Changed the website footer copyright year from 2026 to 2024 as requested.
- Apr 13 (claris-build/096de89b): michael — Changed the hero section background from blue to natural stone colors.
- Apr 08 (claris-build/25455d51): michael — Implemented deep blue gradient background in hero section.
- Apr 07 (claris-build/9c5110e2): michael — Moved location text into vision section paragraph.
- Apr 04 (claris-build/e5f3e274): michael — Updated to show "1,500+ acres" throughout.
