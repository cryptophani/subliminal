# Subliminal - High Energy Audio Streaming Platform

A Spotify-like streaming platform specifically designed for subliminal audio tracks, binaural beats, affirmations, and healing frequencies.

## Features

### Audio Player
- Persistent bottom player (Spotify-style)
- **Real-time audio visualizer** (Web Audio API)
- Full playback controls (play, pause, next, previous)
- Shuffle and repeat modes
- Volume control with mute toggle
- Real-time progress tracking
- YouTube video support via react-player
- Audio file support (MP3, WAV, etc.)
- Track completion tracking for achievements

### Home Page
- Hero section with **animated pulsing gradients**
- **Animated hero text and buttons** with Framer Motion
- Trending tracks section
- Featured playlists with grid layout
- Recent uploads showcase
- Category-based track organization

### Upload System
- Drag-and-drop file upload
- YouTube link integration
- Track metadata form (title, description, category)
- Multiple file support
- Real-time upload feedback

### Categories
- Manifestation
- Wealth & Abundance
- Confidence
- Sleep & Relaxation
- Healing
- Focus & Productivity
- Relationships
- Anxiety Relief
- Meditation

### High-Energy Features 🔥

#### Visual Effects
- **Animated particle background** with floating particles and glow orbs
- **3D card tilt effects** on track cards (mouse-responsive)
- **Dynamic glow effects** on playing tracks
- **Pulsing gradient animations** throughout the UI
- **Smooth micro-interactions** on all interactive elements
- **Audio visualizer** with frequency bars (purple/pink/orange gradient)

#### Session Tracking & Gamification
- **Real-time session timer** tracks current listening session
- **Streak tracking** - maintain daily listening streaks
- **Total listening time** accumulation
- **Achievement system** with 9+ unlockable badges:
  - 🎧 First Hour - 1 hour total listening
  - ⭐ Dedicated Listener - 10 hours total
  - 🏆 Transformation Master - 100 hours total
  - 🔥 3-Day Streak
  - 💪 Week Warrior - 7-day streak
  - 👑 Monthly Master - 30-day streak
  - 🎵 Explorer - 10 tracks completed
  - 🌟 Enthusiast - 50 tracks completed
  - 💎 Centurion - 100 tracks completed
- **Achievement notifications** with custom animations
- **Stats widget** in sidebar showing all progress

#### Enhanced Track Cards
- 3D tilt effect following mouse movement
- Scale animations on hover/tap
- Gradient play buttons with shadows
- Pulsing glow effect on currently playing track
- Spring physics animations

### UI/UX
- Dark theme with vibrant gradients (purple, pink, orange)
- **High-performance Framer Motion animations**
- Fully responsive design
- Category-based emoji icons
- Toast notifications for user actions
- **Particle effects** and ambient background animations
- **Achievement toasts** with emoji and custom styling

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI)
- **State Management:** Zustand
- **Audio Player:** React Player
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
subliminal/
├── app/
│   ├── layout.tsx          # Root layout with Nav, Sidebar, Player, Particles
│   ├── page.tsx            # Home page (with animations)
│   ├── providers.tsx       # React providers (Toaster)
│   └── upload/
│       └── page.tsx        # Upload page
├── components/
│   ├── effects/
│   │   └── particle-background.tsx  # Animated particle background
│   ├── layout/
│   │   ├── nav.tsx         # Top navigation
│   │   └── sidebar.tsx     # Left sidebar with stats widget
│   ├── player/
│   │   ├── audio-player.tsx    # Persistent audio player with visualizer
│   │   └── audio-visualizer.tsx # Real-time audio visualizer
│   ├── session/
│   │   └── stats-widget.tsx    # Session stats, streaks, achievements
│   ├── upload/
│   │   ├── file-upload.tsx     # Drag-and-drop file upload
│   │   └── youtube-link.tsx    # YouTube link input
│   ├── ui/                     # shadcn/ui components
│   └── track-card.tsx          # Enhanced 3D track cards
├── lib/
│   ├── utils.ts               # Utility functions
│   ├── mock-data.ts           # Sample tracks and playlists
│   └── session-tracker.ts     # Session tracking & achievements
├── store/
│   └── player-store.ts        # Zustand player state
└── types/
    └── index.ts               # TypeScript interfaces
```

## Key Features Explained

### Audio Player State Management
The player uses Zustand for state management, handling:
- Current track and queue
- Play/pause state
- Volume control
- Shuffle and repeat modes
- Progress tracking

### Track Cards
Interactive cards that display:
- Thumbnail or category emoji
- Track title and creator
- Play/pause button on hover
- Play count and likes
- Visual playing indicator

### Upload System
Two upload methods:
1. **File Upload:** Drag-and-drop or click to select audio files
2. **YouTube Links:** Paste YouTube URLs to embed videos

## Next Steps

To make this production-ready, you would need to:

1. **Backend Integration:**
   - Set up Supabase or another backend
   - Implement file storage for audio uploads
   - Create database schema for tracks, users, playlists
   - Add authentication (Auth0, Supabase Auth, etc.)

2. **YouTube API:**
   - Integrate YouTube Data API for metadata fetching
   - Handle video validation and thumbnail extraction

3. **Additional Features:**
   - Search functionality
   - User profiles
   - Playlist creation and management
   - Like/save tracks
   - Comments and ratings
   - Following creators
   - Recommendations algorithm

4. **Performance:**
   - Lazy loading for track cards
   - Image optimization
   - Audio caching
   - CDN for static assets

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
