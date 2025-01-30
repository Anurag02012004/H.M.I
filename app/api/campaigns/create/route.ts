import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const { name, description, budget, startDate, endDate } = body

  const campaign = await prisma.campaign.create({
    data: {
      name,
      description,
      budget: parseFloat(budget),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'ACTIVE',
    },
  })

  return NextResponse.json(campaign)
}