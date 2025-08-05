import { NextResponse } from 'next/server'
import equipmentData from '@/data/equipment.json'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const equipment = equipmentData.find(item => item.id === id)

    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 })
    }

    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { rating, comment } = body

    const equipment = equipmentData.find(item => item.id === id)
    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 })
    }

    const newReview = {
      id: Date.now().toString(),
      rating: Number(rating),
      comment: comment ?? null,
      createdAt: new Date().toISOString(),
    }
    equipment.reviews.push(newReview)
    equipment.avgRating =
      equipment.reviews.reduce((sum, r) => sum + r.rating, 0) /
      equipment.reviews.length

    const filePath = path.join(process.cwd(), 'src/data/equipment.json')
    await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), 'utf-8')

    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Error saving review:', error)
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 })
  }
}