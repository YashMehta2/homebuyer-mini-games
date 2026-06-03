# Nest Navigate — Homebuyer Mini Games

## Game Concept
Nest Navigate is an educational platform built to demystify the daunting process of buying a first home. Instead of throwing a wall of financial jargon at the user, it breaks the homebuyer journey down into three interactive mini-games that teach practical lessons through simulation. 

The games are designed to be extremely approachable—even a 10-year-old could understand the concepts. In "Bid Battle", players learn that crafting a winning offer requires more than just offering the highest price; they must balance earnest money and contingencies against AI competitors. "Rate Roulette" puts them in the driver's seat of locking a mortgage rate, demonstrating exactly how a tiny 0.5% fluctuation can cost tens of thousands of dollars over 30 years. Finally, "Stack the Close" gamifies the closing process by having the user sort a dizzying list of fees into standard, negotiable, or fake "junk" buckets. 

Through these simulations, the platform builds a "Homebuyer Readiness Score" to prepare users for the real world.

## How to Run Locally

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/YashMehta2/homebuyer-mini-games.git
   cd homebuyer-mini-games
   ```
2. Install the required dependencies using npm:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Tech Choices
- **React + Vite:** Chosen for rapid development and fast hot-module reloading. React's state management via hooks makes it very simple to drill state down from the main App to the mini-games without overhead.
- **Vanilla CSS:** To keep the project lightweight and strictly adhering to modern CSS standards (CSS Variables, Flexbox, Grid), I avoided Tailwind or styled-components. The application uses a custom "glassmorphism" dark-mode theme built entirely from scratch to give it a premium feel.
- **No External State Libraries:** I chose not to use Redux or Context API because the application state is simple enough to be managed directly at the top level and passed down as props, keeping the codebase extremely readable for early-career developers.
- **No External UI Component Libraries:** Everything from the progress rings to the tooltips to the image carousels was built from scratch.
- **Phaser 3 (Visual Enhancements):** Integrated as a purely visual layer to add dynamic 2D animations (like the animated dashboard neighborhood and confetti particle explosions) without cluttering or altering the core React state logic.

## What I'd Do With More Time
- **Backend & Persistence:** Add a backend to store user scores via `localStorage` or a lightweight database like Supabase/Firebase, allowing users to track their readiness score over multiple sessions.
- **Animations:** Implement more sophisticated Framer Motion or CSS keyframe animations for page transitions and game completion celebrations to make it feel even more polished.
- **More Scenarios:** Expand the library of houses and loan scenarios, perhaps integrating a live API to pull actual current interest rates instead of using a randomized generator.
- **Accessibility (a11y):** Do a full audit for keyboard navigation and screen reader support, especially on the interactive sliders and custom checkboxes.

## Known Issues
- Tooltips currently have a fixed max-width, which can occasionally look cramped if viewing on very narrow mobile screens.
- The Rate Roulette graph is built using inline SVG elements; while lightweight, resizing the window drastically while the graph is animating could cause minor layout shifts.
- The default browser styling on range inputs (`<input type="range">`) in "Bid Battle" can look slightly different across different browsers (Chrome vs. Safari vs. Firefox) since there is no heavy cross-browser CSS reset used for them.
