'use client'

import { useState } from 'react'
import { Motorcycle, MapPin, Calendar, Users, Plus, Filter, Search } from 'lucide-react'
import { Ride, RideType, SkillLevel, RideStatus } from '@/types'
import RideCard from '@/components/RideCard'
import CreateRideModal from '@/components/CreateRideModal'

// Mock data for development
const mockRides: Ride[] = [
  {
    id: '1',
    title: 'Sunday Morning Cruise',
    description: 'Easy going cruise through the countryside. Perfect for beginners!',
    organizer: {
      id: '1',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', state: 'NY' },
      bikes: [],
      ridingStyle: [],
      skillLevel: SkillLevel.INTERMEDIATE,
      badges: [],
      totalMiles: 5000,
      ridesCompleted: 25,
      createdAt: new Date()
    },
    date: new Date('2024-01-15T09:00:00'),
    meetingLocation: {
      name: 'Central Park',
      address: 'Central Park, New York, NY',
      latitude: 40.7829,
      longitude: -73.9654
    },
    rideType: RideType.CRUISE,
    skillLevel: SkillLevel.BEGINNER,
    maxRiders: 10,
    currentRiders: [],
    status: RideStatus.PLANNING,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Twisty Mountain Roads',
    description: 'Advanced ride through challenging mountain passes. Experienced riders only.',
    organizer: {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      location: { latitude: 34.0522, longitude: -118.2437, city: 'Los Angeles', state: 'CA' },
      bikes: [],
      ridingStyle: [],
      skillLevel: SkillLevel.EXPERT,
      badges: [],
      totalMiles: 15000,
      ridesCompleted: 50,
      createdAt: new Date()
    },
    date: new Date('2024-01-20T08:00:00'),
    meetingLocation: {
      name: 'Angeles Crest Highway',
      address: 'Angeles Crest Highway, CA',
      latitude: 34.2594,
      longitude: -118.1965
    },
    rideType: RideType.SPORT,
    skillLevel: SkillLevel.ADVANCED,
    maxRiders: 6,
    currentRiders: [],
    status: RideStatus.PLANNING,
    createdAt: new Date()
  }
]

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>(mockRides)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRideType, setSelectedRideType] = useState<RideType | 'all'>('all')
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel | 'all'>('all')

  const filteredRides = rides.filter(ride => {
    const matchesSearch = ride.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRideType = selectedRideType === 'all' || ride.rideType === selectedRideType
    const matchesSkillLevel = selectedSkillLevel === 'all' || ride.skillLevel === selectedSkillLevel
    
    return matchesSearch && matchesRideType && matchesSkillLevel
  })

  const handleJoinRide = (rideId: string) => {
    // TODO: Implement join ride logic
    console.log('Joining ride:', rideId)
  }

  const handleCreateRide = (rideData: any) => {
    // TODO: Implement create ride logic
    console.log('Creating ride:', rideData)
    setShowCreateModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Motorcycle className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Rides</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Ride</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Ride Type Filter */}
            <select
              value={selectedRideType}
              onChange={(e) => setSelectedRideType(e.target.value as RideType | 'all')}
              className="input-field"
            >
              <option value="all">All Ride Types</option>
              <option value={RideType.CRUISE}>Cruise</option>
              <option value={RideType.SPORT}>Sport</option>
              <option value={RideType.TOURING}>Touring</option>
              <option value={RideType.BEGINNER}>Beginner</option>
              <option value={RideType.ADVENTURE}>Adventure</option>
              <option value={RideType.TRACK_DAY}>Track Day</option>
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
                setSelectedRideType('all')
                setSelectedSkillLevel('all')
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Rides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onJoin={() => handleJoinRide(ride.id)}
            />
          ))}
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-12">
            <Motorcycle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rides found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or create the first ride in your area!
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create a Ride
            </button>
          </div>
        )}
      </div>

      {/* Create Ride Modal */}
      {showCreateModal && (
        <CreateRideModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateRide}
        />
      )}
    </div>
  )
} 