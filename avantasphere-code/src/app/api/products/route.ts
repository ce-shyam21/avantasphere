import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Get categoryId from query params if provided
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    // Build query based on filters
    const where: any = {
      status: 'active',
    }

    // If categoryId is provided, filter by category
    if (categoryId) {
      where.categoryId = parseInt(categoryId)
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc'
          }
        },
        pricing: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform to match frontend format
    const formattedProducts = products.map((product) => ({
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