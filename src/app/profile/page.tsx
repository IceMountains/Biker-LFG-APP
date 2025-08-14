'use client'

import { useState } from 'react'
import { User, Bike, MapPin, Star, Award, Edit, Plus, Settings } from 'lucide-react'
import { Rider, RidingStyle, SkillLevel, BikeType } from '@/types'
import EditProfileModal from '@/components/EditProfileModal'
import AddBikeModal from '@/components/AddBikeModal'

// Mock user data
const mockUser: Rider = {
  id: '1',
  name: 'Mike Johnson',
  email: 'mike@example.com',
  avatar: '/avatars/mike.jpg',
  bio: 'Love cruising on my Harley. Always up for a weekend ride! Been riding for 5 years and love exploring new roads.',
  location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', state: 'NY' },
  bikes: [
    {
      id: '1',
      make: 'Harley-Davidson',
      model: 'Street Glide',
      year: 2020,
      type: BikeType.CRUISER,
      mods: ['Vance & Hines Exhaust', 'K&N Air Filter', 'LED Headlights'],
      image: '/bikes/harley.jpg'
    },
    {
      id: '2',
      make: 'Honda',
      model: 'CBR600RR',
      year: 2018,
      type: BikeType.SPORT,
      mods: ['Yoshimura Exhaust', 'Power Commander', 'Racing Sprockets'],
      image: '/bikes/cbr.jpg'
    }
  ],
  ridingStyle: [RidingStyle.CRUISE, RidingStyle.TOURING, RidingStyle.SPORT],
  skillLevel: SkillLevel.INTERMEDIATE,
  badges: [
    { id: '1', name: 'First Ride', description: 'Completed first group ride', icon: '🎯', earnedAt: new Date('2023-01-15') },
    { id: '2', name: '1000 Miles', description: 'Rode 1000 miles', icon: '🏆', earnedAt: new Date('2023-06-20') },
    { id: '3', name: 'Weekend Warrior', description: 'Completed 10 weekend rides', icon: '⚡', earnedAt: new Date('2023-08-10') },
    { id: '4', name: 'Route Explorer', description: 'Created 5 routes', icon: '🗺️', earnedAt: new Date('2023-09-15') }
  ],
  totalMiles: 5000,
  ridesCompleted: 25,
  createdAt: new Date('2023-01-01')
}

export default function ProfilePage() {
  const [user, setUser] = useState<Rider>(mockUser)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddBikeModal, setShowAddBikeModal] = useState(false)

  const handleUpdateProfile = (updatedData: Partial<Rider>) => {
    setUser(prev => ({ ...prev, ...updatedData }))
    setShowEditModal(false)
  }

  const handleAddBike = (bikeData: any) => {
    // TODO: Implement add bike logic
    console.log('Adding bike:', bikeData)
    setShowAddBikeModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowEditModal(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-primary-600" />
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.skillLevel === SkillLevel.BEGINNER ? 'bg-green-100 text-green-800' :
                  user.skillLevel === SkillLevel.INTERMEDIATE ? 'bg-yellow-100 text-yellow-800' :
                  user.skillLevel === SkillLevel.ADVANCED ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.skillLevel.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{user.location.city}, {user.location.state}</span>
              </div>

              {user.bio && (
                <p className="text-gray-700 mb-6">{user.bio}</p>
              )}

              {/* Riding Styles */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Riding Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {user.ridingStyle.map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {style.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{user.totalMiles.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Miles</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{user.ridesCompleted}</p>
                  <p className="text-sm text-gray-600">Rides Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{user.bikes.length}</p>
                  <p className="text-sm text-gray-600">Bikes Owned</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bikes Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">My Bikes</h3>
              <button
                onClick={() => setShowAddBikeModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Bike</span>
              </button>
            </div>

            <div className="space-y-4">
              {user.bikes.map((bike) => (
                <div key={bike.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <Bike className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {bike.year} {bike.make} {bike.model}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize mb-2">
                        {bike.type.replace('_', ' ')}
                      </p>
                      {bike.mods.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Modifications:</p>
                          <div className="flex flex-wrap gap-1">
                            {bike.mods.map((mod, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {mod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="h-6 w-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900">Badges & Achievements</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                  <p className="text-xs text-gray-500">
                    {badge.earnedAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {user.badges.length === 0 && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No badges earned yet. Start riding to earn achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Bike className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Joined "Sunday Morning Cruise"</p>
                <p className="text-sm text-gray-600">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Earned "Route Explorer" badge</p>
                <p className="text-sm text-gray-600">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Connected with Sarah Chen</p>
                <p className="text-sm text-gray-600">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateProfile}
        />
      )}

      {/* Add Bike Modal */}
      {showAddBikeModal && (
        <AddBikeModal
          onClose={() => setShowAddBikeModal(false)}
          onSubmit={handleAddBike}
        />
      )}
    </div>
  )
} 