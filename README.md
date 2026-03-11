# Luck-based-Coincidences

A mock online casino built purely for fun. There’s no real money involved—only virtual chips, games, and upgrade/attribute mechanics driven by luck. The goal is to create an entertaining experience with a progression system and cosmetic upgrades.

## Current Features
- **Homepage** (`index.html`) with casino-themed design and balance display. Feature tiles link to individual pages.
- **Games** cover a broad casino suite: slots, roulette, blackjack, craps, poker (high-card), baccarat, **Coin Flip**, **Keno**, **Wheel of Fortune**, and **Video Poker** (five-card draw). All games feature realistic odds, animations, and paytables; many allow multiple bet types. Roulette lets you bet numbers or colors with equal red/black and single green zero. Winning payouts are subject to a small luck‑based double‑payout chance.
- **Cashier** (`cashier.html`) lets you buy or cash chips (UI only for now).
- **Denominations:** base chip = $1; virtual chip graphics available for $1, $50, $100, $500 values.
- **Attributes:** three upgradeable stats (Luck, Charisma, Strategy) maxing out at 10/5/5 respectively; costs escalate and are displayed dynamically. Luck improves win chances and grants a chance to double any payout. Charisma/Strategy currently placeholder bonuses for future expansions.
- **Achievements** are unlocked automatically based on gameplay (hot streaks, big wins, first upgrade) and visible on `achievements.html` with icons. Stats persist via `localStorage` and are used to compute unlocks across sessions.
- **Profile** (`profile.html`) shows full stat breakdown including money made/lost, upgrades, achievements unlocked, consecutive wins, win/loss rates and current luck level. Stats refresh live as you play.
- **UI & Experience:** unified dark casino background, consistent header/navigation, card flip animations, coin/wheel spinning, chip bounce effects, and page transitions for a polished feel. Works completely offline.

## Getting Started
1. Open `index.html` in a web browser.
2. Navigate using the header or homepage tiles.
3. Place bets on any game; balance updates are stored locally and persist between sessions.
4. Purchase attributes to influence outcomes, and watch achievements unlock on the dedicated page.

## Production Ready Notes
This is a static, self-contained HTML/JS/CSS project with no server dependencies. All state is stored in `localStorage`; simply serve the folder or open files directly. Assets are CSS-generated (no external images), and all animations use CSS keyframes for smooth playback. The code has been refactored for reusability and future extension.

### Deploying
You can host the repository on any static‑site provider (Render, GitHub Pages, Netlify, etc.).
- On **Render**, create a *Static Site* and connect the repo.
- Leave the build command blank (no build necessary).
- A minimal `package.json` is included so the deploy step won’t error with "couldn't find a package.json".
- Set the publish directory to `/` (root of repo).

Once deployed, the site serves `index.html` automatically.

Other hosts simply need to point to the repo’s root; no additional configuration required.

## Credits & Contact
Built by Chill-Guys-IV. Suggestions welcome via email or GitHub issues.

## Getting Started
1. Open `index.html` in a browser to explore the home screen.
2. Use the links/buttons on the homepage to navigate to individual game pages or the cashier.
3. Each game allows you to set a bet amount; winning or losing adjusts your balance (stored in local storage) just like a real casino.
4. Visit **Profile** to view live stats; the values update automatically as you play.

## Future Work
- Implement actual games (slots, poker, etc.).
- Build a chip economy and wire up upgrades/attributes.
- Add achievements and deeper progression.

> Don’t spend all your chips in one game!

If you have ideas or suggestions, feel free to email the developer.
