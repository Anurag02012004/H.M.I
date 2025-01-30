'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateCampaign() {
  const router = useRouter()
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/campaigns/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaign)
    })
    if (response.ok) {
      router.push('/home')
    } else {
      // Handle error
      console.error('Failed to create campaign')
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
            <Link href="/home" className="hover:text-blue-400">Back to Home</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Create Campaign</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Campaign Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={campaign.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={campaign.description}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="budget" className="block mb-2">Budget</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={campaign.budget}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block mb-2">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={campaign.startDate}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block mb-2">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={campaign.endDate}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create Campaign
          </button>
        </form>
      </main>
    </div>
  )
}