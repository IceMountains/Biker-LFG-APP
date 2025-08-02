'use client'

import { Route, MapPin, Clock, Navigation, User, Bookmark } from 'lucide-react'
import { Route as RouteType, RouteDifficulty } from '@/types'
import { format } from 'date-fns'

interface RouteCardProps {
  route: RouteType
  onSave: () => void
}

const difficultyColors = {
  [RouteDifficulty.EASY]: 'bg-green-100 text-green-800',
  [RouteDifficulty.MODERATE]: 'bg-yellow-100 text-yellow-800',
  [RouteDifficulty.DIFFICULT]: 'bg-orange-100 text-orange-800',
  [RouteDifficulty.EXPERT]: 'bg-red-100 text-red-800',
}

export default function RouteCard({ route, onSave }: RouteCardProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{route.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{route.description}</p>
        </div>
        <button
          onClick={onSave}
          className="text-gray-400 hover:text-primary-600 transition-colors ml-2"
          title="Save route"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      {/* Difficulty and Stats */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[route.difficulty]}`}>
          {route.difficulty.toUpperCase()}
        </span>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Navigation className="h-4 w-4 mr-1" />
            <span>{route.distance} mi</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTime(route.estimatedTime)}</span>
          </div>
        </div>
      </div>

      {/* Waypoints */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Route</h4>
        <div className="space-y-2">
          {route.waypoints.slice(0, 3).map((waypoint, index) => (
            <div key={waypoint.id} className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-primary-600">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{waypoint.name}</p>
                <p className="text-xs text-gray-500 capitalize">{waypoint.type.replace('_', ' ')}</p>
              </div>
            </div>
          ))}
          {route.waypoints.length > 3 && (
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-500">...</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  +{route.waypoints.length - 3} more waypoints
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {route.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {route.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Creator */}
      <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
          <User className="h-4 w-4 text-primary-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Created by {route.creator.name}</p>
          <p className="text-xs text-gray-500">{format(route.createdAt, 'MMM dd, yyyy')}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 btn-primary">
          View Route
        </button>
        <button className="flex-1 btn-secondary">
          Use for Ride
        </button>
      </div>
    </div>
  )
} 