'use client'

import { useState } from 'react'
import { Bike, MapPin, Users, Calendar, Star, Route } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('rides')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Bike className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Biker LFG</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/rides" className="text-gray-600 hover:text-primary-600 transition-colors">
                Rides
              </Link>
              <Link href="/riders" className="text-gray-600 hover:text-primary-600 transition-colors">
                Riders
              </Link>
              <Link href="/routes" className="text-gray-600 hover:text-primary-600 transition-colors">
                Routes
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-primary-600">Riding Crew</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with nearby riders, plan epic rides, and join motorcycle groups. 
            Your next adventure is just a tap away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              Create a Ride
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              Find Riders
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Ride Together
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <Bike className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Ride Invitations</h4>
              <p className="text-gray-600">Create and join rides with one tap</p>
            </div>
            <div className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Nearby Riders</h4>
              <p className="text-gray-600">Find riders in your area</p>
            </div>
            <div className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <Route className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Route Planning</h4>
              <p className="text-gray-600">Plan and share amazing routes</p>
            </div>
            <div className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Rider Profiles</h4>
              <p className="text-gray-600">Show off your bikes and achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ready to Ride?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Plan a Ride</h4>
              <p className="text-gray-600 mb-4">Create a ride invitation with date, time, and location</p>
              <button className="btn-primary">Start Planning</button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Find Riders</h4>
              <p className="text-gray-600 mb-4">Discover nearby riders with similar interests</p>
              <button className="btn-secondary">Browse Riders</button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Route className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Share Routes</h4>
              <p className="text-gray-600 mb-4">Upload and share your favorite riding routes</p>
              <button className="btn-secondary">Upload Route</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bike className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold">Biker LFG</span>
          </div>
          <p className="text-gray-400">
            Connect, ride, and explore together. © 2024 Biker LFG
          </p>
        </div>
      </footer>
    </div>
  )
} 