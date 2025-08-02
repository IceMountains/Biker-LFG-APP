'use client'

import { Motorcycle, MapPin, Star, Users, Award } from 'lucide-react'
import { Rider, RidingStyle, SkillLevel } from '@/types'

interface RiderCardProps {
  rider: Rider
  onConnect: () => void
}

const skillLevelColors = {
  [SkillLevel.BEGINNER]: 'bg-green-100 text-green-800',
  [SkillLevel.INTERMEDIATE]: 'bg-yellow-100 text-yellow-800',
  [SkillLevel.ADVANCED]: 'bg-orange-100 text-orange-800',
  [SkillLevel.EXPERT]: 'bg-red-100 text-red-800',
}

const ridingStyleColors = {
  [RidingStyle.CRUISE]: 'bg-blue-100 text-blue-800',
  [RidingStyle.SPORT]: 'bg-red-100 text-red-800',
  [RidingStyle.TOURING]: 'bg-green-100 text-green-800',
  [RidingStyle.ADVENTURE]: 'bg-purple-100 text-purple-800',
  [RidingStyle.TRACK]: 'bg-orange-100 text-orange-800',
  [RidingStyle.STREET]: 'bg-gray-100 text-gray-800',
}

export default function RiderCard({ rider, onConnect }: RiderCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          {rider.avatar ? (
            <img 
              src={rider.avatar} 
              alt={rider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <Motorcycle className="h-8 w-8 text-primary-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{rider.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{rider.location.city}, {rider.location.state}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${skillLevelColors[rider.skillLevel]}`}>
              {rider.skillLevel.toUpperCase()}
            </span>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              <span>{rider.ridesCompleted} rides</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {rider.bio && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{rider.bio}</p>
      )}

      {/* Riding Styles */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Riding Styles</h4>
        <div className="flex flex-wrap gap-1">
          {rider.ridingStyle.map((style) => (
            <span
              key={style}
              className={`px-2 py-1 rounded-full text-xs font-medium ${ridingStyleColors[style]}`}
            >
              {style.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Bikes */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Bikes</h4>
        <div className="space-y-2">
          {rider.bikes.map((bike) => (
            <div key={bike.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                <Motorcycle className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {bike.year} {bike.make} {bike.model}
                </p>
                {bike.mods.length > 0 && (
                  <p className="text-xs text-gray-500 truncate">
                    Mods: {bike.mods.slice(0, 2).join(', ')}
                    {bike.mods.length > 2 && '...'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{rider.totalMiles.toLocaleString()}</p>
          <p className="text-xs text-gray-600">Total Miles</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{rider.ridesCompleted}</p>
          <p className="text-xs text-gray-600">Rides Completed</p>
        </div>
      </div>

      {/* Badges */}
      {rider.badges.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Badges</h4>
          <div className="flex space-x-2">
            {rider.badges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="flex items-center space-x-1 px-2 py-1 bg-yellow-50 rounded-full"
                title={badge.description}
              >
                <span className="text-sm">{badge.icon}</span>
                <span className="text-xs font-medium text-yellow-800">{badge.name}</span>
              </div>
            ))}
            {rider.badges.length > 3 && (
              <div className="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                <span className="text-xs text-gray-600">+{rider.badges.length - 3} more</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onConnect}
        className="w-full btn-primary"
      >
        Connect
      </button>
    </div>
  )
} 