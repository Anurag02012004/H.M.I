import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()

  const campaign = await prisma.campaign.create({
    data: {
      name: body.name,
      description: body.description,
      budget: parseFloat(body.budget),
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      status: 'ACTIVE'
    }
  })

  return NextResponse.json(campaign)
}