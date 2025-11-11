# Subliminal - High Energy Audio Streaming Platform

A Spotify-like streaming platform specifically designed for subliminal audio tracks, binaural beats, affirmations, and healing frequencies.

## Features

### Audio Player
- Persistent bottom player (Spotify-style)
- Full playback controls (play, pause, next, previous)
- Shuffle and repeat modes
- Volume control with mute toggle
- Real-time progress tracking
- YouTube video support via react-player
- Audio file support (MP3, WAV, etc.)

### Home Page
- Hero section with gradient design
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

### UI/UX
- Dark theme with vibrant gradients (purple, pink, orange)
- Smooth animations and transitions
- Responsive design
- Category-based emoji icons
- Toast notifications for user actions

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
│   ├── layout.tsx          # Root layout with Nav, Sidebar, Player
│   ├── page.tsx            # Home page
│   ├── providers.tsx       # React providers (Toaster)
│   └── upload/
│       └── page.tsx        # Upload page
├── components/
│   ├── layout/
│   │   ├── nav.tsx         # Top navigation
│   │   └── sidebar.tsx     # Left sidebar with categories
│   ├── player/
│   │   └── audio-player.tsx # Persistent audio player
│   ├── upload/
│   │   ├── file-upload.tsx  # Drag-and-drop file upload
│   │   └── youtube-link.tsx # YouTube link input
│   ├── ui/                  # shadcn/ui components
│   └── track-card.tsx       # Track display card
├── lib/
│   ├── utils.ts            # Utility functions
│   └── mock-data.ts        # Sample tracks and playlists
├── store/
│   └── player-store.ts     # Zustand player state
└── types/
    └── index.ts            # TypeScript interfaces
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
