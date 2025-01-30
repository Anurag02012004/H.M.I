import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function CampaignAnalytics({ params }: { params: { id: string } }) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id }
  })

  if (!campaign) {
    return <div>Campaign not found</div>
  }

  // In a real application, you would fetch actual analytics data here
  const analyticsData = {
    reach: 10000,
    engagement: 2000,
    conversions: 500
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">{campaign.name} Analytics</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Performance Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold">Reach</h3>
            <p className="text-2xl">{analyticsData.reach}</p>
          </div>
          <div>
            <h3 className="font-semibold">Engagement</h3>
            <p className="text-2xl">{analyticsData.engagement}</p>
          </div>
          <div>
            <h3 className="font-semibold">Conversions</h3>
            <p className="text-2xl">{analyticsData.conversions}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Influencer Performance</h2>
        {/* Add influencer performance data here */}
      </div>
      <button className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
        Download Report
      </button>
    </div>
  )
}