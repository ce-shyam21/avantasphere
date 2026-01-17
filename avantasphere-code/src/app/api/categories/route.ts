import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type CategoryType = Awaited<
  ReturnType<typeof prisma.category.findMany>
>[number]

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { status: 'active' },
      orderBy: { displayOrder: 'asc' },
    })

    const formattedCategories = categories.map((cat: CategoryType) => ({
      id: cat.id.toString(),
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.imageUrl,
      featured: true,
      subCategories: [],
      createdAt: cat.createdAt.toISOString(),
      updatedAt: cat.updatedAt.toISOString(),
    }))

    return NextResponse.json({ categories: formattedCategories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
