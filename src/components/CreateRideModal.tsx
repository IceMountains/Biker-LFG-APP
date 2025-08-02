'use client'

import { useState } from 'react'
import { X, MapPin, Calendar, Clock } from 'lucide-react'
import { RideType, SkillLevel, CreateRideData } from '@/types'

interface CreateRideModalProps {
  onClose: () => void
  onSubmit: (data: CreateRideData) => void
}

export default function CreateRideModal({ onClose, onSubmit }: CreateRideModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    meetingLocation: {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0
    },
    rideType: RideType.CRUISE,
    skillLevel: SkillLevel.BEGINNER,
    maxRiders: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const rideData: CreateRideData = {
      title: formData.title,
      description: formData.description,
      date: new Date(`${formData.date}T${formData.time}`),
      meetingLocation: formData.meetingLocation,
      rideType: formData.rideType,
      skillLevel: formData.skillLevel,
      maxRiders: formData.maxRiders ? parseInt(formData.maxRiders) : undefined
    }
    
    onSubmit(rideData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Create a New Ride</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Ride Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="input-field"
              placeholder="e.g., Sunday Morning Cruise"
            />
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
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="input-field"
              placeholder="Describe your ride, meeting point, route, etc."
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  id="time"
                  required
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          {/* Meeting Location */}
          <div>
            <label htmlFor="meetingLocation" className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="meetingLocation"
                required
                value={formData.meetingLocation.name}
                onChange={(e) => handleInputChange('meetingLocation', {
                  ...formData.meetingLocation,
                  name: e.target.value
                })}
                className="input-field pl-10"
                placeholder="e.g., Central Park, Starbucks on Main St"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Full Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.meetingLocation.address}
              onChange={(e) => handleInputChange('meetingLocation', {
                ...formData.meetingLocation,
                address: e.target.value
              })}
              className="input-field"
              placeholder="Full address for GPS navigation"
            />
          </div>

          {/* Ride Type and Skill Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rideType" className="block text-sm font-medium text-gray-700 mb-2">
                Ride Type *
              </label>
              <select
                id="rideType"
                required
                value={formData.rideType}
                onChange={(e) => handleInputChange('rideType', e.target.value as RideType)}
                className="input-field"
              >
                <option value={RideType.CRUISE}>Cruise</option>
                <option value={RideType.SPORT}>Sport</option>
                <option value={RideType.TOURING}>Touring</option>
                <option value={RideType.BEGINNER}>Beginner</option>
                <option value={RideType.ADVENTURE}>Adventure</option>
                <option value={RideType.TRACK_DAY}>Track Day</option>
              </select>
            </div>
            <div>
              <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level *
              </label>
              <select
                id="skillLevel"
                required
                value={formData.skillLevel}
                onChange={(e) => handleInputChange('skillLevel', e.target.value as SkillLevel)}
                className="input-field"
              >
                <option value={SkillLevel.BEGINNER}>Beginner</option>
                <option value={SkillLevel.INTERMEDIATE}>Intermediate</option>
                <option value={SkillLevel.ADVANCED}>Advanced</option>
                <option value={SkillLevel.EXPERT}>Expert</option>
              </select>
            </div>
          </div>

          {/* Max Riders */}
          <div>
            <label htmlFor="maxRiders" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Riders (Optional)
            </label>
            <input
              type="number"
              id="maxRiders"
              min="1"
              value={formData.maxRiders}
              onChange={(e) => handleInputChange('maxRiders', e.target.value)}
              className="input-field"
              placeholder="Leave empty for unlimited"
            />
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
              Create Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 