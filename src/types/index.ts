export interface Rider {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location: {
    latitude: number
    longitude: number
    city: string
    state: string
  }
  bikes: Bike[]
  ridingStyle: RidingStyle[]
  skillLevel: SkillLevel
  badges: Badge[]
  totalMiles: number
  ridesCompleted: number
  createdAt: Date
}

export interface Bike {
  id: string
  make: string
  model: string
  year: number
  type: BikeType
  mods: string[]
  image?: string
}

export interface Ride {
  id: string
  title: string
  description: string
  organizer: Rider
  date: Date
  meetingLocation: {
    name: string
    address: string
    latitude: number
    longitude: number
  }
  rideType: RideType
  skillLevel: SkillLevel
  maxRiders?: number
  currentRiders: Rider[]
  route?: Route
  status: RideStatus
  createdAt: Date
}

export interface Route {
  id: string
  name: string
  description: string
  creator: Rider
  waypoints: Waypoint[]
  distance: number // in miles
  estimatedTime: number // in minutes
  difficulty: RouteDifficulty
  tags: string[]
  isPublic: boolean
  createdAt: Date
}

export interface Waypoint {
  id: string
  name: string
  latitude: number
  longitude: number
  type: WaypointType
  description?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: Date
}

export enum RidingStyle {
  CRUISE = 'cruise',
  SPORT = 'sport',
  TOURING = 'touring',
  ADVENTURE = 'adventure',
  TRACK = 'track',
  STREET = 'street'
}

export enum BikeType {
  SPORT = 'sport',
  CRUISER = 'cruiser',
  TOURING = 'touring',
  ADVENTURE = 'adventure',
  STANDARD = 'standard',
  DUAL_SPORT = 'dual_sport',
  SCOOTER = 'scooter'
}

export enum RideType {
  CRUISE = 'cruise',
  SPORT = 'sport',
  TOURING = 'touring',
  BEGINNER = 'beginner',
  ADVENTURE = 'adventure',
  TRACK_DAY = 'track_day'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum RouteDifficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  DIFFICULT = 'difficult',
  EXPERT = 'expert'
}

export enum WaypointType {
  START = 'start',
  END = 'end',
  REST_STOP = 'rest_stop',
  FUEL = 'fuel',
  FOOD = 'food',
  SCENIC = 'scenic',
  CHECKPOINT = 'checkpoint'
}

export enum RideStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface CreateRideData {
  title: string
  description: string
  date: Date
  meetingLocation: {
    name: string
    address: string
    latitude: number
    longitude: number
  }
  rideType: RideType
  skillLevel: SkillLevel
  maxRiders?: number
}

export interface CreateRouteData {
  name: string
  description: string
  waypoints: Omit<Waypoint, 'id'>[]
  difficulty: RouteDifficulty
  tags: string[]
  isPublic: boolean
} 