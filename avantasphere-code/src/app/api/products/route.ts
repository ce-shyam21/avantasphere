import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const products = await prisma.product.findMany({
      where: {
        status: 'active',
        ...(categoryId && { categoryId: Number(categoryId) }),
      },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        pricing: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      products: products.map(product => ({
        id: product.id,
        name: product.productName,
        sku: product.productCode,
        categoryId: product.categoryId.toString(),
        shortDescription: product.shortDescription,
        fullDescription: product.detailedDescription,

        images: product.images.map(img => img.imageUrl),

        thumbnailImage:
          product.images.find(img => img.isPrimary)?.imageUrl ||
          product.images[0]?.imageUrl,

        specifications: product.specifications || {},

        pricing: {
          cost: product.pricing?.priceFrom || 0,
          currency: product.pricing?.currency || 'USD',
          moq: product.pricing?.minOrderQuantity || 1,
          showPrice: true,
        },

        visibility: product.status === 'active',
        featured: product.isFeatured,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
