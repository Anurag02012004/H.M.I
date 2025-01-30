import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Dashboard() {
  const campaigns = await prisma.campaign.findMany()

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">Campaign Dashboard</h1>
      <Link href="/campaign/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create New Campaign
      </Link>
      <div className="mt-8 grid grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{campaign.name}</h2>
            <p>Status: {campaign.status}</p>
            <p>Budget: ${campaign.budget}</p>
            <Link href={`/campaign/${campaign.id}`} className="text-blue-500 hover:underline">
              View Analytics
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}