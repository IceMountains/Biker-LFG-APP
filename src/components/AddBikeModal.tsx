'use client'

import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { BikeType } from '@/types'

interface AddBikeModalProps {
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function AddBikeModal({ onClose, onSubmit }: AddBikeModalProps) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: BikeType.SPORT,
    mods: [''] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const bikeData = {
      ...formData,
      mods: formData.mods.filter(mod => mod.trim().length > 0)
    }
    
    onSubmit(bikeData)
  }

  const addMod = () => {
    setFormData(prev => ({
      ...prev,
      mods: [...prev.mods, '']
    }))
  }

  const removeMod = (index: number) => {
    if (formData.mods.length > 1) {
      setFormData(prev => ({
        ...prev,
        mods: prev.mods.filter((_, i) => i !== index)
      }))
    }
  }

  const updateMod = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      mods: prev.mods.map((mod, i) => i === index ? value : mod)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Add New Bike</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                Make *
              </label>
              <input
                type="text"
                id="make"
                required
                value={formData.make}
                onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
                className="input-field"
                placeholder="e.g., Honda, Yamaha, Harley-Davidson"
              />
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                id="model"
                required
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                className="input-field"
                placeholder="e.g., CBR600RR, Street Glide"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                id="year"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="input-field"
                placeholder="e.g., 2020"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                id="type"
                required
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as BikeType }))}
                className="input-field"
              >
                <option value={BikeType.SPORT}>Sport</option>
                <option value={BikeType.CRUISER}>Cruiser</option>
                <option value={BikeType.TOURING}>Touring</option>
                <option value={BikeType.ADVENTURE}>Adventure</option>
                <option value={BikeType.STANDARD}>Standard</option>
                <option value={BikeType.DUAL_SPORT}>Dual Sport</option>
                <option value={BikeType.SCOOTER}>Scooter</option>
              </select>
            </div>
          </div>

          {/* Modifications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Modifications (Optional)
              </label>
              <button
                type="button"
                onClick={addMod}
                className="btn-secondary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Mod</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.mods.map((mod, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={mod}
                    onChange={(e) => updateMod(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="e.g., Exhaust, Air Filter, LED Lights"
                  />
                  {formData.mods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMod(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
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
              Add Bike
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 