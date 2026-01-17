import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc'
          }
        },
        pricing: true,
        category: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Transform to match frontend format
    const formattedProduct = {
      id: product.id,
      name: product.productName,
      sku: product.productCode,
      categoryId: product.categoryId.toString(),
      shortDescription: product.shortDescription,
      fullDescription: product.detailedDescription,
      images: product.images.map(img => img.imageUrl),
      thumbnailImage: product.images.find(img => img.isPrimary)?.imageUrl || product.images[0]?.imageUrl,
      specifications: product.specifications || {},
      pricing: {
        cost: product.pricing?.priceFrom || 0,
        currency: product.pricing?.currency || 'USD',
        moq: product.pricing?.minOrderQuantity || 1,
        showPrice: true,
      },
      shipping: {
        weight: 1,
        port: 'Port of Mumbai',
        shippingCost: 10,
        shippingTime: '15-20 days',
        incoterms: product.pricing?.incoterm || 'FOB',
      },
      customs: {
        hsCode: 'TBD',
        country: product.originCountry || 'India',
      },
      visibility: product.status === 'active',
      featured: product.isFeatured,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
