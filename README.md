# Biker LFG App 🏍️

A modern web application for motorcycle riders to find riding groups, plan rides, and connect with fellow enthusiasts.

## 🚀 Features

### Core Features (MVP)

#### 1. Ride Invitations (LFG System)
- Create rides with date, time, and meeting location
- Set ride type (cruise, sport, touring, beginner-friendly)
- Riders can join with 1 tap
- Real-time ride status and participant management

#### 2. Nearby Riders
- Browse rider profiles with name, bike(s), and preferred riding style
- Advanced filters for distance, bike type, or skill level
- Location-based rider discovery

#### 3. Route Planning & Sharing
- Create and share custom riding routes
- Add waypoints with different types (start, end, rest stops, fuel, food, scenic)
- Route difficulty ratings and tags
- Save routes for future use

#### 4. Rider Profiles
- Comprehensive rider bios and preferences
- Bike collection with modifications
- Riding style and skill level indicators
- Achievement badges for milestones (miles ridden, events attended)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Form Management**: React Hook Form + Zod validation
- **UI Components**: Custom components with Tailwind

## 📁 Project Structure

```
biker-lfg-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── rides/              # Rides page
│   │   ├── riders/             # Riders page
│   │   ├── routes/             # Routes page
│   │   └── profile/            # Profile page
│   ├── components/             # Reusable components
│   │   ├── RideCard.tsx        # Individual ride display
│   │   ├── RiderCard.tsx       # Individual rider display
│   │   ├── RouteCard.tsx       # Individual route display
│   │   ├── CreateRideModal.tsx # Ride creation modal
│   │   ├── CreateRouteModal.tsx # Route creation modal
│   │   ├── EditProfileModal.tsx # Profile editing modal
│   │   └── AddBikeModal.tsx    # Bike addition modal
│   └── types/                  # TypeScript type definitions
│       └── index.ts            # All app types and interfaces
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd biker-lfg-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Red tones (#ef4444) for motorcycle theme
- **Secondary**: Gray tones for UI elements
- **Accent**: Blue, green, yellow, orange for different ride types and skill levels

### Components
- **Cards**: Consistent card design with hover effects
- **Buttons**: Primary and secondary button styles
- **Modals**: Overlay modals for forms and detailed views
- **Forms**: Consistent input styling with validation states

## 📱 Pages Overview

### Homepage (`/`)
- Hero section with call-to-action
- Feature overview
- Quick access to main functions

### Rides (`/rides`)
- Browse available rides
- Filter by type, skill level, date
- Create new rides
- Join existing rides

### Riders (`/riders`)
- Discover nearby riders
- Filter by riding style, bike type, skill level
- View detailed rider profiles
- Connect with riders

### Routes (`/routes`)
- Browse shared routes
- Filter by difficulty and tags
- Create custom routes
- Save favorite routes

### Profile (`/profile`)
- Personal rider profile
- Bike collection management
- Achievement badges
- Recent activity feed

## 🔧 Development

### Adding New Features

1. **Create types** in `src/types/index.ts`
2. **Build components** in `src/components/`
3. **Create pages** in `src/app/`
4. **Update navigation** as needed

### Component Guidelines

- Use TypeScript for all components
- Follow the established naming conventions
- Use Tailwind CSS for styling
- Include proper accessibility attributes
- Add hover states and transitions

### State Management

Currently using React's built-in state management with `useState`. For future scaling, consider:
- Zustand for global state
- React Query for server state
- Context API for theme/auth state

## 🚀 Future Enhancements

### Phase 2 Features
- **Real-time Chat**: In-app messaging between riders
- **GPS Integration**: Real-time location sharing during rides
- **Weather Integration**: Weather forecasts for ride planning
- **Photo Sharing**: Ride photos and memories
- **Event System**: Motorcycle events and meetups

### Phase 3 Features
- **Mobile App**: React Native or PWA
- **Social Features**: Following, likes, comments
- **Advanced Analytics**: Ride statistics and insights
- **Marketplace**: Motorcycle parts and services
- **Insurance Integration**: Rider insurance quotes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Motorcycle community for inspiration
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Lucide for the beautiful icons

---

**Built with ❤️ for the motorcycle community** 