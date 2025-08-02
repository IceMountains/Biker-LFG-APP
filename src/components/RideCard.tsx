'use client'

import { Motorcycle, MapPin, Calendar, Users, Clock } from 'lucide-react'
import { Ride, RideType, SkillLevel } from '@/types'
import { format } from 'date-fns'

interface RideCardProps {
  ride: Ride
  onJoin: () => void
}

const rideTypeColors = {
  [RideType.CRUISE]: 'bg-blue-100 text-blue-800',
  [RideType.SPORT]: 'bg-red-100 text-red-800',
  [RideType.TOURING]: 'bg-green-100 text-green-800',
  [RideType.BEGINNER]: 'bg-yellow-100 text-yellow-800',
  [RideType.ADVENTURE]: 'bg-purple-100 text-purple-800',
  [RideType.TRACK_DAY]: 'bg-orange-100 text-orange-800',
}

const skillLevelColors = {
  [SkillLevel.BEGINNER]: 'bg-green-100 text-green-800',
  [SkillLevel.INTERMEDIATE]: 'bg-yellow-100 text-yellow-800',
  [SkillLevel.ADVANCED]: 'bg-orange-100 text-orange-800',
  [SkillLevel.EXPERT]: 'bg-red-100 text-red-800',
}

export default function RideCard({ ride, onJoin }: RideCardProps) {
  const isFull = ride.maxRiders && ride.currentRiders.length >= ride.maxRiders
  const spotsLeft = ride.maxRiders ? ride.maxRiders - ride.currentRiders.length : null

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{ride.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{ride.description}</p>
        </div>
      </div>

      {/* Ride Type and Skill Level */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${rideTypeColors[ride.rideType]}`}>
          {ride.rideType.replace('_', ' ').toUpperCase()}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${skillLevelColors[ride.skillLevel]}`}>
          {ride.skillLevel.toUpperCase()}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{format(ride.date, 'MMM dd, yyyy')}</span>
          <Clock className="h-4 w-4 ml-4 mr-2" />
          <span>{format(ride.date, 'h:mm a')}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="truncate">{ride.meetingLocation.name}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>
            {ride.currentRiders.length} joined
            {ride.maxRiders && ` / ${ride.maxRiders} max`}
          </span>
        </div>
      </div>

      {/* Organizer */}
      <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
          <Motorcycle className="h-4 w-4 text-primary-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Organized by {ride.organizer.name}</p>
          <p className="text-xs text-gray-500">{ride.organizer.location.city}, {ride.organizer.location.state}</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onJoin}
        disabled={isFull}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isFull
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        {isFull ? 'Ride Full' : `Join Ride${spotsLeft ? ` (${spotsLeft} spots left)` : ''}`}
      </button>
    </div>
  )
} 