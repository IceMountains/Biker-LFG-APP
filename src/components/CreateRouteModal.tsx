'use client'

import { useState } from 'react'
import { X, MapPin, Plus, Trash2 } from 'lucide-react'
import { RouteDifficulty, WaypointType, CreateRouteData } from '@/types'

interface CreateRouteModalProps {
  onClose: () => void
  onSubmit: (data: CreateRouteData) => void
}

interface WaypointForm {
  name: string
  latitude: string
  longitude: string
  type: WaypointType
  description: string
}

export default function CreateRouteModal({ onClose, onSubmit }: CreateRouteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: RouteDifficulty.MODERATE,
    tags: '',
    isPublic: true,
    waypoints: [
      {
        name: '',
        latitude: '',
        longitude: '',
        type: WaypointType.START,
        description: ''
      }
    ] as WaypointForm[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const routeData: CreateRouteData = {
      name: formData.name,
      description: formData.description,
      waypoints: formData.waypoints.map(wp => ({
        name: wp.name,
        latitude: parseFloat(wp.latitude),
        longitude: parseFloat(wp.longitude),
        type: wp.type,
        description: wp.description || undefined
      })),
      difficulty: formData.difficulty,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      isPublic: formData.isPublic
    }
    
    onSubmit(routeData)
  }

  const addWaypoint = () => {
    setFormData(prev => ({
      ...prev,
      waypoints: [...prev.waypoints, {
        name: '',
        latitude: '',
        longitude: '',
        type: WaypointType.CHECKPOINT,
        description: ''
      }]
    }))
  }

  const removeWaypoint = (index: number) => {
    if (formData.waypoints.length > 1) {
      setFormData(prev => ({
        ...prev,
        waypoints: prev.waypoints.filter((_, i) => i !== index)
      }))
    }
  }

  const updateWaypoint = (index: number, field: keyof WaypointForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      waypoints: prev.waypoints.map((wp, i) => 
        i === index ? { ...wp, [field]: value } : wp
      )
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Create a New Route</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Route Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="e.g., Pacific Coast Highway"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty *
              </label>
              <select
                id="difficulty"
                required
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as RouteDifficulty }))}
                className="input-field"
              >
                <option value={RouteDifficulty.EASY}>Easy</option>
                <option value={RouteDifficulty.MODERATE}>Moderate</option>
                <option value={RouteDifficulty.DIFFICULT}>Difficult</option>
                <option value={RouteDifficulty.EXPERT}>Expert</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-field"
              placeholder="Describe your route, highlights, challenges, etc."
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="input-field"
              placeholder="e.g., scenic, coastal, twisty, mountains"
            />
          </div>

          {/* Waypoints */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Waypoints</h3>
              <button
                type="button"
                onClick={addWaypoint}
                className="btn-secondary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Waypoint</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.waypoints.map((waypoint, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900">Waypoint {index + 1}</h4>
                    {formData.waypoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWaypoint(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={waypoint.name}
                        onChange={(e) => updateWaypoint(index, 'name', e.target.value)}
                        className="input-field"
                        placeholder="e.g., San Francisco"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type *
                      </label>
                      <select
                        required
                        value={waypoint.type}
                        onChange={(e) => updateWaypoint(index, 'type', e.target.value as WaypointType)}
                        className="input-field"
                      >
                        <option value={WaypointType.START}>Start</option>
                        <option value={WaypointType.END}>End</option>
                        <option value={WaypointType.CHECKPOINT}>Checkpoint</option>
                        <option value={WaypointType.REST_STOP}>Rest Stop</option>
                        <option value={WaypointType.FUEL}>Fuel</option>
                        <option value={WaypointType.FOOD}>Food</option>
                        <option value={WaypointType.SCENIC}>Scenic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude *
                      </label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={waypoint.latitude}
                        onChange={(e) => updateWaypoint(index, 'latitude', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 37.7749"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude *
                      </label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={waypoint.longitude}
                        onChange={(e) => updateWaypoint(index, 'longitude', e.target.value)}
                        className="input-field"
                        placeholder="e.g., -122.4194"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={waypoint.description}
                      onChange={(e) => updateWaypoint(index, 'description', e.target.value)}
                      className="input-field"
                      placeholder="Additional details about this waypoint"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
              Make this route public (visible to all riders)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Route
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 