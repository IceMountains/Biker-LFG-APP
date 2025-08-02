'use client'

import { useState } from 'react'
import { Route, MapPin, Search, Plus, Filter, Clock, Navigation } from 'lucide-react'
import { Route as RouteType, RouteDifficulty } from '@/types'
import RouteCard from '@/components/RouteCard'
import CreateRouteModal from '@/components/CreateRouteModal'

// Mock data for development
const mockRoutes: RouteType[] = [
  {
    id: '1',
    name: 'Pacific Coast Highway',
    description: 'Scenic coastal route from San Francisco to Los Angeles with breathtaking ocean views.',
    creator: {
      id: '1',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', state: 'NY' },
      bikes: [],
      ridingStyle: [],
      skillLevel: 'intermediate' as any,
      badges: [],
      totalMiles: 5000,
      ridesCompleted: 25,
      createdAt: new Date()
    },
    waypoints: [
      { id: '1', name: 'San Francisco', latitude: 37.7749, longitude: -122.4194, type: 'start' as any },
      { id: '2', name: 'Big Sur', latitude: 36.2704, longitude: -121.8081, type: 'scenic' as any },
      { id: '3', name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437, type: 'end' as any }
    ],
    distance: 450,
    estimatedTime: 480, // 8 hours
    difficulty: RouteDifficulty.MODERATE,
    tags: ['coastal', 'scenic', 'highway'],
    isPublic: true,
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'Tail of the Dragon',
    description: '318 curves in 11 miles - one of the most challenging and famous motorcycle roads in America.',
    creator: {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      location: { latitude: 34.0522, longitude: -118.2437, city: 'Los Angeles', state: 'CA' },
      bikes: [],
      ridingStyle: [],
      skillLevel: 'expert' as any,
      badges: [],
      totalMiles: 15000,
      ridesCompleted: 50,
      createdAt: new Date()
    },
    waypoints: [
      { id: '4', name: 'Deals Gap', latitude: 35.5167, longitude: -83.9500, type: 'start' as any },
      { id: '5', name: 'Tail of the Dragon', latitude: 35.5167, longitude: -83.9500, type: 'checkpoint' as any },
      { id: '6', name: 'Cherohala Skyway', latitude: 35.5167, longitude: -83.9500, type: 'end' as any }
    ],
    distance: 11,
    estimatedTime: 60, // 1 hour
    difficulty: RouteDifficulty.EXPERT,
    tags: ['twisty', 'challenging', 'famous'],
    isPublic: true,
    createdAt: new Date('2023-08-20')
  },
  {
    id: '3',
    name: 'Blue Ridge Parkway',
    description: '469-mile scenic drive through the Appalachian Mountains with stunning fall colors.',
    creator: {
      id: '3',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      location: { latitude: 39.7392, longitude: -104.9903, city: 'Denver', state: 'CO' },
      bikes: [],
      ridingStyle: [],
      skillLevel: 'advanced' as any,
      badges: [],
      totalMiles: 8000,
      ridesCompleted: 30,
      createdAt: new Date()
    },
    waypoints: [
      { id: '7', name: 'Shenandoah National Park', latitude: 38.5228, longitude: -78.4347, type: 'start' as any },
      { id: '8', name: 'Great Smoky Mountains', latitude: 35.6118, longitude: -83.5496, type: 'end' as any }
    ],
    distance: 469,
    estimatedTime: 960, // 16 hours
    difficulty: RouteDifficulty.MODERATE,
    tags: ['scenic', 'mountains', 'fall-colors'],
    isPublic: true,
    createdAt: new Date('2023-09-10')
  }
]

export default function RoutesPage() {
  const [routes, setRoutes] = useState<RouteType[]>(mockRoutes)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<RouteDifficulty | 'all'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = Array.from(new Set(routes.flatMap(route => route.tags)))

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesDifficulty = selectedDifficulty === 'all' || route.difficulty === selectedDifficulty
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => route.tags.includes(tag))
    
    return matchesSearch && matchesDifficulty && matchesTags
  })

  const handleCreateRoute = (routeData: any) => {
    // TODO: Implement create route logic
    console.log('Creating route:', routeData)
    setShowCreateModal(false)
  }

  const handleSaveRoute = (routeId: string) => {
    // TODO: Implement save route logic
    console.log('Saving route:', routeId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Route className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Routes</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Route</span>
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
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as RouteDifficulty | 'all')}
              className="input-field"
            >
              <option value="all">All Difficulties</option>
              <option value={RouteDifficulty.EASY}>Easy</option>
              <option value={RouteDifficulty.MODERATE}>Moderate</option>
              <option value={RouteDifficulty.DIFFICULT}>Difficult</option>
              <option value={RouteDifficulty.EXPERT}>Expert</option>
            </select>

            {/* Tags Filter */}
            <select
              value={selectedTags[0] || 'all'}
              onChange={(e) => setSelectedTags(e.target.value === 'all' ? [] : [e.target.value])}
              className="input-field"
            >
              <option value="all">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedDifficulty('all')
                setSelectedTags([])
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onSave={() => handleSaveRoute(route.id)}
            />
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <Route className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No routes found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or create the first route in your area!
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create a Route
            </button>
          </div>
        )}
      </div>

      {/* Create Route Modal */}
      {showCreateModal && (
        <CreateRouteModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateRoute}
        />
      )}
    </div>
  )
} 