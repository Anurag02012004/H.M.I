import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function InfluencerProfile({ params }: { params: { id: string } }) {
  const influencer = await prisma.influencer.findUnique({
    where: { id: params.id },
    include: { user: true }
  })

  if (!influencer) {
    return <div>Influencer not found</div>
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-semibold mb-4">{influencer.user.name}</h1>
        <p>Niche: {influencer.niche}</p>
        <p>Location: {influencer.location}</p>
        <p>Followers: {influencer.followerCount}</p>
        <p>Engagement Rate: {influencer.engagementRate}%</p>
        <p className="mt-4">{influencer.bio}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
        {/* Add portfolio items here */}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {/* Add reviews here */}
      </div>
    </div>
  )
}