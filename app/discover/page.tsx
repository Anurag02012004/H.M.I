"use client"

import { useState } from "react"
import Link from "next/link"

interface Influencer {
  id: string
  name: string
  niche: string
  location: string
  followerCount: number
  engagementRate: number
}

export default function DiscoverInfluencers() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [filters, setFilters] = useState({
    niche: "",
    location: "",
    followerCount: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/influencers/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch influencers")
      }

      const data = await response.json()
      setInfluencers(data)
    } catch (err) {
      setError("An error occurred while fetching influencers. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">
              <Link href="/home">H.M.I.</Link>
            </div>
            <Link href="/home" className="hover:text-blue-400">
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Discover Influencers</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              name="niche"
              placeholder="Niche"
              value={filters.niche}
              onChange={handleFilterChange}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            />
            <select
              name="followerCount"
              value={filters.followerCount}
              onChange={handleFilterChange}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              <option value="">Follower Count</option>
              <option value="0-1000">0 - 1,000</option>
              <option value="1000-5000">1,000 - 5,000</option>
              <option value="5000-10000">5,000 - 10,000</option>
              <option value="10000+">10,000+</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && <div className="bg-red-600 text-white p-4 rounded mb-6">{error}</div>}

        {isLoading ? (
          <div className="text-center">
            <p className="text-xl">Loading influencers...</p>
          </div>
        ) : influencers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencers.map((influencer: Influencer) => (
              <div key={influencer.id} className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{influencer.name}</h2>
                <p>Niche: {influencer.niche}</p>
                <p>Location: {influencer.location}</p>
                <p>Followers: {influencer.followerCount.toLocaleString()}</p>
                <p>Engagement Rate: {influencer.engagementRate.toFixed(2)}%</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl">No influencers found. Try adjusting your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}

