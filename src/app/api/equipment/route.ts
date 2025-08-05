import { NextResponse } from 'next/server'
import equipmentData from '@/data/equipment.json'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const manufacturer = searchParams.get('manufacturer')
    const category = searchParams.get('category')

    let filteredEquipment = equipmentData

    if (type) {
      filteredEquipment = filteredEquipment.filter(item => item.type === type)
    }

    if (manufacturer) {
      filteredEquipment = filteredEquipment.filter(item => 
        item.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
      )
    }

    if (category) {
      filteredEquipment = filteredEquipment.filter(item =>
        item.categories.some(cat => cat.name === category)
      )
    }

    // Sort by rating descending
    filteredEquipment.sort((a, b) => b.avgRating - a.avgRating)

    return NextResponse.json(filteredEquipment)
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ error: 'POST not implemented' }, { status: 501 })
}
