import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const { niche, location, followerCount } = body

  let whereClause: any = {}

  if (niche) {
    whereClause.niche = { contains: niche, mode: 'insensitive' }
  }

  if (location) {
    whereClause.location = { contains: location, mode: 'insensitive' }
  }

  if (followerCount) {
    const [min, max] = followerCount.split('-').map(Number)
    whereClause.followerCount = { gte: min, lt: max || undefined }
  }

  const influencers = await prisma.influencer.findMany({
    where: whereClause,
  })

  return NextResponse.json(influencers)
}