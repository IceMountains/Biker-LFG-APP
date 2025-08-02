'use client'

import { useState } from 'react'
import { X, MapPin } from 'lucide-react'
import { Rider, RidingStyle, SkillLevel } from '@/types'

interface EditProfileModalProps {
  user: Rider
  onClose: () => void
  onSubmit: (data: Partial<Rider>) => void
}

export default function EditProfileModal({ user, onClose, onSubmit }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || '',
    city: user.location.city,
    state: user.location.state,
    skillLevel: user.skillLevel,
    ridingStyles: user.ridingStyle
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const updatedData: Partial<Rider> = {
      name: formData.name,
      bio: formData.bio,
      location: {
        ...user.location,
        city: formData.city,
        state: formData.state
      },
      skillLevel: formData.skillLevel,
      ridingStyle: formData.ridingStyles
    }
    
    onSubmit(updatedData)
  }

  const toggleRidingStyle = (style: RidingStyle) => {
    setFormData(prev => ({
      ...prev,
      ridingStyles: prev.ridingStyles.includes(style)
        ? prev.ridingStyles.filter(s => s !== style)
        : [...prev.ridingStyles, style]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
              placeholder="Your name"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="input-field"
              placeholder="Tell us about yourself and your riding experience..."
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="input-field pl-10"
                  placeholder="City"
                />
              </div>
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                id="state"
                required
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                className="input-field"
                placeholder="State"
              />
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level *
            </label>
            <select
              id="skillLevel"
              required
              value={formData.skillLevel}
              onChange={(e) => setFormData(prev => ({ ...prev, skillLevel: e.target.value as SkillLevel }))}
              className="input-field"
            >
              <option value={SkillLevel.BEGINNER}>Beginner</option>
              <option value={SkillLevel.INTERMEDIATE}>Intermediate</option>
              <option value={SkillLevel.ADVANCED}>Advanced</option>
              <option value={SkillLevel.EXPERT}>Expert</option>
            </select>
          </div>

          {/* Riding Styles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Riding Styles *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(RidingStyle).map((style) => (
                <label key={style} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.ridingStyles.includes(style)}
                    onChange={() => toggleRidingStyle(style)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-900 capitalize">
                    {style.replace('_', ' ')}
                  </span>
                </label>
              ))}
            </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 