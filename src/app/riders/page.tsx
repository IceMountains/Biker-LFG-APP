'use client'

import { useState } from 'react'
import { Users, MapPin, Bike, Search, Filter, Star } from 'lucide-react'
import { Rider, RidingStyle, BikeType, SkillLevel } from '@/types'
import RiderCard from '@/components/RiderCard'

// Mock data for development
const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: '/avatars/mike.jpg',
    bio: 'Love cruising on my Harley. Always up for a weekend ride!',
    location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', state: 'NY' },
    bikes: [
      {
        id: '1',
        make: 'Harley-Davidson',
        model: 'Street Glide',
        year: 2020,
        type: BikeType.CRUISER,
        mods: ['Exhaust', 'Air Filter'],
        image: '/bikes/harley.jpg'
      }
    ],
    ridingStyle: [RidingStyle.CRUISE, RidingStyle.TOURING],
    skillLevel: SkillLevel.INTERMEDIATE,
    badges: [
      { id: '1', name: 'First Ride', description: 'Completed first group ride', icon: '🎯', earnedAt: new Date('2023-01-15') },
      { id: '2', name: '1000 Miles', description: 'Rode 1000 miles', icon: '🏆', earnedAt: new Date('2023-06-20') }
    ],
    totalMiles: 5000,
    ridesCompleted: 25,
    createdAt: new Date('2023-01-01')
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: '/avatars/sarah.jpg',
    bio: 'Sport bike enthusiast. Track days and mountain roads are my jam!',
    location: { latitude: 34.0522, longitude: -118.2437, city: 'Los Angeles', state: 'CA' },
    bikes: [
      {
        id: '2',
        make: 'Yamaha',
        model: 'YZF-R1',
        year: 2022,
        type: BikeType.SPORT,
        mods: ['Exhaust', 'ECU Flash', 'Suspension'],
        image: '/bikes/r1.jpg'
      }
    ],
    ridingStyle: [RidingStyle.SPORT, RidingStyle.TRACK],
    skillLevel: SkillLevel.EXPERT,
    badges: [
      { id: '3', name: 'Track Master', description: 'Completed 10 track days', icon: '🏁', earnedAt: new Date('2023-08-10') },
      { id: '4', name: '5000 Miles', description: 'Rode 5000 miles', icon: '🏆', earnedAt: new Date('2023-09-15') }
    ],
    totalMiles: 15000,
    ridesCompleted: 50,
    createdAt: new Date('2022-06-01')
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    avatar: '/avatars/alex.jpg',
    bio: 'Adventure rider. Love exploring off-road trails and long-distance touring.',
    location: { latitude: 39.7392, longitude: -104.9903, city: 'Denver', state: 'CO' },
    bikes: [
      {
        id: '3',
        make: 'BMW',
        model: 'R 1250 GS',
        year: 2021,
        type: BikeType.ADVENTURE,
        mods: ['Panniers', 'Skid Plate', 'LED Lights'],
        image: '/bikes/gs.jpg'
      }
    ],
    ridingStyle: [RidingStyle.ADVENTURE, RidingStyle.TOURING],
    skillLevel: SkillLevel.ADVANCED,
    badges: [
      { id: '5', name: 'Adventure Seeker', description: 'Completed 5 adventure rides', icon: '🗺️', earnedAt: new Date('2023-07-05') }
    ],
    totalMiles: 8000,
    ridesCompleted: 30,
    createdAt: new Date('2022-09-01')
  }
]

export default function RidersPage() {
  const [riders, setRiders] = useState<Rider[]>(mockRiders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRidingStyle, setSelectedRidingStyle] = useState<RidingStyle | 'all'>('all')
  const [selectedBikeType, setSelectedBikeType] = useState<BikeType | 'all'>('all')
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel | 'all'>('all')
  const [maxDistance, setMaxDistance] = useState('50')

  const filteredRiders = riders.filter(rider => {
    const matchesSearch = rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rider.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rider.bikes.some(bike => 
                           bike.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bike.model.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    
    const matchesRidingStyle = selectedRidingStyle === 'all' || 
                              rider.ridingStyle.includes(selectedRidingStyle)
    
    const matchesBikeType = selectedBikeType === 'all' || 
                           rider.bikes.some(bike => bike.type === selectedBikeType)
    
    const matchesSkillLevel = selectedSkillLevel === 'all' || 
                             rider.skillLevel === selectedSkillLevel
    
    return matchesSearch && matchesRidingStyle && matchesBikeType && matchesSkillLevel
  })

  const handleConnect = (riderId: string) => {
    // TODO: Implement connect logic
    console.log('Connecting with rider:', riderId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Riders</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search riders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Riding Style Filter */}
            <select
              value={selectedRidingStyle}
              onChange={(e) => setSelectedRidingStyle(e.target.value as RidingStyle | 'all')}
              className="input-field"
            >
              <option value="all">All Styles</option>
              <option value={RidingStyle.CRUISE}>Cruise</option>
              <option value={RidingStyle.SPORT}>Sport</option>
              <option value={RidingStyle.TOURING}>Touring</option>
              <option value={RidingStyle.ADVENTURE}>Adventure</option>
              <option value={RidingStyle.TRACK}>Track</option>
              <option value={RidingStyle.STREET}>Street</option>
            </select>

            {/* Bike Type Filter */}
            <select
              value={selectedBikeType}
              onChange={(e) => setSelectedBikeType(e.target.value as BikeType | 'all')}
              className="input-field"
            >
              <option value="all">All Bike Types</option>
              <option value={BikeType.SPORT}>Sport</option>
              <option value={BikeType.CRUISER}>Cruiser</option>
              <option value={BikeType.TOURING}>Touring</option>
              <option value={BikeType.ADVENTURE}>Adventure</option>
              <option value={BikeType.STANDARD}>Standard</option>
              <option value={BikeType.DUAL_SPORT}>Dual Sport</option>
              <option value={BikeType.SCOOTER}>Scooter</option>
            </select>

            {/* Skill Level Filter */}
            <select
              value={selectedSkillLevel}
              onChange={(e) => setSelectedSkillLevel(e.target.value as SkillLevel | 'all')}
              className="input-field"
            >
              <option value="all">All Skill Levels</option>
              <option value={SkillLevel.BEGINNER}>Beginner</option>
              <option value={SkillLevel.INTERMEDIATE}>Intermediate</option>
              <option value={SkillLevel.ADVANCED}>Advanced</option>
              <option value={SkillLevel.EXPERT}>Expert</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedRidingStyle('all')
                setSelectedBikeType('all')
                setSelectedSkillLevel('all')
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Riders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRiders.map((rider) => (
            <RiderCard
              key={rider.id}
              rider={rider}
              onConnect={() => handleConnect(rider.id)}
            />
          ))}
        </div>

        {filteredRiders.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No riders found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or expand your search area!
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 