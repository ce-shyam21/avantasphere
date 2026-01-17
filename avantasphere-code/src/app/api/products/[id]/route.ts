import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true
    pricing: true
    category: true
  }
}>

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        pricing: true,
        category: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const productData = product as ProductWithRelations

    return NextResponse.json({
      id: productData.id,
      name: productData.productName,
      sku: productData.productCode,
      categoryId: productData.categoryId.toString(),
      shortDescription: productData.shortDescription,
      fullDescription: productData.detailedDescription,

      images: productData.images.map(img => img.imageUrl),

      thumbnailImage:
        productData.images.find(img => img.isPrimary)?.imageUrl ||
        productData.images[0]?.imageUrl,

      specifications: productData.specifications || {},

      pricing: {
        cost: productData.pricing?.priceFrom || 0,
        currency: productData.pricing?.currency || 'USD',
        moq: productData.pricing?.minOrderQuantity || 1,
        showPrice: true,
      },

      visibility: productData.status === 'active',
      featured: productData.isFeatured,
      createdAt: productData.createdAt.toISOString(),
      updatedAt: productData.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
