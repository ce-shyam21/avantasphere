import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const where: {
      status: string
      categoryId?: number
    } = { status: 'active' }

    if (categoryId) {
      where.categoryId = Number(categoryId)
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        pricing: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.productName,
      sku: product.productCode,
      categoryId: product.categoryId.toString(),
      shortDescription: product.shortDescription,
      fullDescription: product.detailedDescription,

      images: product.images.map(
        (img: { imageUrl: string }) => img.imageUrl
      ),

      thumbnailImage:
        product.images.find(
          (img: { isPrimary: boolean }) => img.isPrimary
        )?.imageUrl ?? product.images[0]?.imageUrl,

      specifications: product.specifications ?? {},

      pricing: {
        cost: product.pricing?.priceFrom ?? 0,
        currency: product.pricing?.currency ?? 'USD',
        moq: product.pricing?.minOrderQuantity ?? 1,
        showPrice: true,
      },

      visibility: product.status === 'active',
      featured: product.isFeatured,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }))

    return NextResponse.json({ products: formattedProducts })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
