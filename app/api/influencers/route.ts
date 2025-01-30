import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location')
  const niche = searchParams.get('niche')
  const followerCount = searchParams.get('followerCount')

  let whereClause: any = {}

  if (location) {
    whereClause.location = { contains: location, mode: 'insensitive' }
  }

  if (niche) {
    whereClause.niche = niche
  }

  if (followerCount) {
    const [min, max] = followerCount.split('-').map(Number)
    whereClause.followerCount = { gte: min, lte: max || undefined }
  }

  const influencers = await prisma.influencer.findMany({
    where: whereClause,
    include: { user: true }
  })

  return NextResponse.json(influencers)
}