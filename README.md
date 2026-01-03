# FitQuest - Gamified Fitness & Task Tracker

A beautiful, mobile-first Progressive Web App (PWA) that gamifies your fitness and task tracking experience. Built with React, Tailwind CSS, and Framer Motion.

![FitQuest](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC) ![PWA](https://img.shields.io/badge/PWA-enabled-4285F4)

## 🎮 Features

### Core Functionality
- ✅ Add daily fitness tasks and normal tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Automatic daily reset based on date
- ✅ Full LocalStorage persistence (no backend needed!)

### Gamification System
- 🏆 **XP System**: Earn XP for completing tasks (20 XP for fitness, 10 XP for normal tasks)
- 📈 **Level System**: Level up as you gain XP with progressive difficulty
- 🔥 **Streak Counter**: Maintain your daily streak - lose it if you miss a day!
- 🎖️ **Badge System**: Unlock badges like Beginner, Consistent, Champion, Fitness Fanatic, and Dedicated
- ✨ **Animations**: Beautiful level-up and badge unlock animations using Framer Motion

### User Interface
- 📱 **Mobile-First Design**: Optimized for mobile devices with a native app feel
- 🎨 **Modern UI**: Clean, minimal, fitness-inspired design with gradient themes
- 📊 **Dashboard**: View XP progress, level, streak, and today's tasks
- 🏅 **Rewards Page**: See all your unlocked badges and progress
- 📈 **Stats Page**: Weekly progress visualization and comprehensive statistics

### PWA Features
- 🔧 **Offline Support**: Works offline with service worker caching
- 📲 **Installable**: Can be installed on Android and iOS devices
- 🚀 **Standalone Mode**: Runs in full-screen standalone mode
- ⚡ **Fast Loading**: Optimized performance with Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gamified-fitness-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📱 PWA Installation

### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. The app will appear on your home screen

### iOS
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will appear on your home screen

## 🏗️ Project Structure

```
gamified-fitness-tracker/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # PWA icons
├── src/
│   ├── components/            # React components
│   │   ├── Navbar.jsx
│   │   ├── XPProgressBar.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   ├── AddTaskModal.jsx
│   │   ├── LevelUpModal.jsx
│   │   └── BadgeUnlockModal.jsx
│   ├── pages/                 # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Rewards.jsx
│   │   └── Stats.jsx
│   ├── context/               # React Context
│   │   └── AppContext.jsx
│   ├── utils/                 # Utility functions
│   │   ├── storage.js         # LocalStorage management
│   │   ├── gamification.js    # XP, levels, badges logic
│   │   └── taskHelpers.js     # Task utilities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Key Features Explained

### Data Persistence
All data is stored in browser LocalStorage. No backend or database required!
- Tasks are stored with date-based organization
- User progress (XP, level, streak, badges) persists across sessions
- Automatic cleanup of tasks older than 30 days

### Daily Reset Logic
- Tasks automatically reset each day at midnight (based on date change)
- Streaks are maintained if you complete tasks consecutively
- Missing a day breaks your streak

### XP & Level System
- **Fitness Tasks**: 20 XP
- **Normal Tasks**: 10 XP
- Each level requires exponentially more XP (base: 100, multiplier: 1.5x)
- Level calculation is automatic based on total XP

### Badge System
- **Beginner** 🌱: Complete your first task
- **Consistent** 🔥: Maintain a 7-day streak
- **Champion** 🏆: Reach level 10
- **Fitness Fanatic** 💪: Complete 50 fitness tasks
- **Dedicated** ⭐: Maintain a 30-day streak

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready animation library
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library
- **Vite PWA Plugin**: PWA capabilities

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color scheme.

### Adjusting XP Values
Modify values in `src/utils/gamification.js`:
- `XP_PER_FITNESS_TASK`
- `XP_PER_NORMAL_TASK`
- `BASE_XP_FOR_LEVEL`

### Adding New Badges
Add badge definitions in `src/utils/gamification.js` in the `BADGES` object.

## 📝 Code Quality

- ✅ Modular component structure
- ✅ Reusable utility functions
- ✅ Well-commented code
- ✅ React best practices (hooks, context)
- ✅ Clean separation of concerns
- ✅ TypeScript-ready structure (can be migrated)

## 🚀 Future Enhancements

Possible additions (not included):
- Backend integration ready (API structure designed for easy migration)
- Theme system with level-based unlocks
- Social features
- Export/import data
- Dark mode toggle
- Push notifications

## 📄 License

MIT License - feel free to use this project for your portfolio!

## 👨‍💻 Author

Built as a portfolio-ready, interview-worthy project demonstrating:
- Modern React development
- PWA implementation
- Gamification design
- LocalStorage management
- Animation and UX design

---

**Ready to level up your fitness journey? Start tracking today!** 💪🏆

