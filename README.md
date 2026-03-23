# Time-Out: Coral Reef (Web App)

A calm, habit-forming web application to help you stay off your phone and grow your digital coral reef.

## Features
- **Coral Selection**: Choose your companion.
- **21-Day Challenge**: Track your progress and watch your coral evolve.
- **Statistics**: Visualize your phone-free time.
- **Family Ecosystem**: Connect with family and grow a shared reef.
- **Dock Mode**: A full-screen, calm display for focus.
- **PWA Ready**: Installable on iPhone home screen.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository or download the source.
2. Open your terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
To build the app for production (Vercel, Netlify, etc.):
```bash
npm run build
```
The output will be in the `dist/` folder.

## PWA Installation (iPhone)
1. Open the app in **Safari**.
2. Tap the **Share** button (square with up arrow).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

The app will now appear on your home screen and open as a standalone application without browser chrome.

## Tech Stack
- React 19
- Vite 6
- Tailwind CSS 4
- Framer Motion (motion)
- Lucide React (Icons)
- Recharts (Data Visualization)
