import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true
    pricing: true
    category: true
  }
}>

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = (await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        pricing: true,
        category: true,
      },
    })) as ProductWithRelations | null

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: product.id,
      name: product.productName,
      sku: product.productCode,
      categoryId: product.categoryId.toString(),
      shortDescription: product.shortDescription,
      fullDescription: product.detailedDescription,

      images: product.images.map(
        (img: ProductWithRelations['images'][number]) => img.imageUrl
      ),

      thumbnailImage:
        product.images.find(
          (img: ProductWithRelations['images'][number]) => img.isPrimary
        )?.imageUrl || product.images[0]?.imageUrl,

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
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
