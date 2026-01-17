// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Create a PostgreSQL connection pool
const connectionString = "postgresql://postgres.mbalvfcbyufwsvoukhgx:admin%40123%40200486@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

if (!connectionString) {
  throw new Error('DATABASE_URL or DIRECT_URL must be set in environment variables');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

  // Test connection
  await prisma.$connect();
  console.log('Database connected successfully');

  // Check if data already exists
  const existingCategories = await prisma.category.count();
  const existingProducts = await prisma.product.count();

  if (existingCategories > 0 || existingProducts > 0) {
    console.log(`\n⚠️  Database already contains data:`);
    console.log(`   - Categories: ${existingCategories}`);
    console.log(`   - Products: ${existingProducts}`);
    console.log(`\n🔄 Run "npx prisma migrate reset" to clear and reseed the database.`);
    console.log(`   Or delete the data manually and run the seed again.\n`);
    return;
  }

  // First, seed categories
  const categories = [
    {
      name: 'Electronics & Components',
      slug: 'electronics-components',
      description: 'Industrial electronic components, LED systems, and power solutions',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      displayOrder: 1,
      status: 'active',
      seoTitle: 'Electronics & Components - Industrial B2B',
      seoDescription: 'High-quality electronic components for industrial applications',
    },
    {
      name: 'Textiles & Fabrics',
      slug: 'textiles-fabrics',
      description: 'Premium fabrics, yarns, and textile materials for manufacturing',
      imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea709f9d?w=600&h=400&fit=crop',
      displayOrder: 2,
      status: 'active',
      seoTitle: 'Textiles & Fabrics - Wholesale B2B',
      seoDescription: 'Quality textile materials for garment and industrial use',
    },
    {
      name: 'Industrial Machinery',
      slug: 'industrial-machinery',
      description: 'Heavy machinery, tools, and industrial equipment',
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
      displayOrder: 3,
      status: 'active',
      seoTitle: 'Industrial Machinery - B2B Equipment',
      seoDescription: 'Professional industrial machinery and equipment solutions',
    },
    {
      name: 'Chemicals & Materials',
      slug: 'chemicals-materials',
      description: 'Industrial chemicals, raw materials, and specialty compounds',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
      displayOrder: 4,
      status: 'active',
      seoTitle: 'Chemicals & Materials - Industrial Supply',
      seoDescription: 'Industrial chemicals and raw materials for manufacturing',
    },
    {
      name: 'Packaging Solutions',
      slug: 'packaging-solutions',
      description: 'Commercial packaging materials, boxes, and shipping supplies',
      imageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=400&fit=crop',
      displayOrder: 5,
      status: 'active',
      seoTitle: 'Packaging Solutions - B2B Supplies',
      seoDescription: 'Professional packaging materials and shipping solutions',
    },
    {
      name: 'Safety Equipment',
      slug: 'safety-equipment',
      description: 'Workplace safety gear, protective equipment, and industrial safety solutions',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      displayOrder: 6,
      status: 'active',
      seoTitle: 'Safety Equipment - Industrial Protection',
      seoDescription: 'Complete workplace safety and protective equipment',
    },
  ];

  // Create categories and store their IDs
  const categoryMap: Record<string, number> = {};
  
  for (const category of categories) {
    const created = await prisma.category.create({
      data: category,
    });
    console.log(`✓ Created category: ${created.name} (ID: ${created.id})`);
    
    // Map old category IDs to new ones
    if (category.slug === 'electronics-components') categoryMap['cat_001'] = created.id;
    if (category.slug === 'textiles-fabrics') categoryMap['cat_002'] = created.id;
    if (category.slug === 'industrial-machinery') categoryMap['cat_003'] = created.id;
    if (category.slug === 'chemicals-materials') categoryMap['cat_004'] = created.id;
    if (category.slug === 'packaging-solutions') categoryMap['cat_005'] = created.id;
    if (category.slug === 'safety-equipment') categoryMap['cat_006'] = created.id;
  }

  // Now seed products with proper camelCase field names
  const products = [
    {
      id: 'prod_elec_001',
      categoryId: categoryMap['cat_001'],
      productName: 'Industrial LED Bulbs 10W - Pack of 100',
      productCode: 'LED-10W-100',
      shortDescription: 'Energy-efficient 10W LED bulbs for industrial and commercial use',
      detailedDescription: 'Professional grade LED bulbs with 50,000 hour lifespan. Perfect for factories, warehouses, and commercial spaces. Energy-efficient and eco-friendly. Features: High luminosity, low heat emission, instant start, and universal E27 fitting. Certified ISO 9001 and CE compliant.',
      specifications: {
        Wattage: '10W',
        Voltage: '220-240V AC',
        Luminosity: '900 lumens',
        'Color Temperature': '6000K (Cool White)',
        Lifespan: '50,000 hours',
        'Base Type': 'E27',
        'Beam Angle': '270°',
        Certification: 'CE, RoHS, ISO 9001',
      },
      originCountry: 'India',
      isFeatured: true,
      status: 'active',
    },
    {
      id: 'prod_elec_002',
      categoryId: categoryMap['cat_001'],
      productName: 'Industrial Power Supply Unit 500W',
      productCode: 'PSU-500W-IND',
      shortDescription: 'Heavy-duty 500W switching power supply for industrial equipment',
      detailedDescription: 'Industrial-grade switching power supply with multiple output channels. Perfect for manufacturing plants, CNC machines, and automated systems. Features over-current, over-voltage, and short-circuit protection. 2-year manufacturer warranty. CE and RoHS certified.',
      specifications: {
        Wattage: '500W',
        'Input Voltage': '100-240V AC',
        'Output Channels': '4 channels',
        Efficiency: '≥85%',
        Cooling: 'Active fan cooling',
        Protection: 'OVP, OCP, SCP',
        Warranty: '2 years',
        Certification: 'CE, RoHS, FCC',
      },
      originCountry: 'India',
      isFeatured: true,
      status: 'active',
    },
    {
      id: 'prod_text_001',
      categoryId: categoryMap['cat_002'],
      productName: '100% Organic Cotton Fabric Roll - 100 Meters',
      productCode: 'COT-ORG-100M',
      shortDescription: 'Premium organic cotton fabric roll for garment manufacturing',
      detailedDescription: 'High-quality organic cotton fabric, GOTS certified. Perfect for clothing manufacturers, designers, and textile mills. Soft, breathable, and durable material with excellent color retention. Pre-washed and shrink-resistant. Available in natural white, ready for dyeing or direct use.',
      specifications: {
        Material: '100% Organic Cotton',
        GSM: '150',
        Width: '58 inches (147 cm)',
        Length: '100 meters',
        Weave: 'Plain weave',
        Color: 'Natural White',
        Shrinkage: '<3%',
        Certification: 'GOTS, OEKO-TEX',
      },
      material: '100% Organic Cotton',
      originCountry: 'India',
      isFeatured: true,
      status: 'active',
    },
    {
      id: 'prod_text_002',
      categoryId: categoryMap['cat_002'],
      productName: 'Synthetic Polyester Yarn 1kg Spool - Box of 50',
      productCode: 'YARN-POLY-50KG',
      shortDescription: 'High-strength polyester yarn for industrial textile production',
      detailedDescription: 'Premium synthetic polyester yarn with high tensile strength. Ideal for textile manufacturing, weaving, knitting, and industrial applications. Uniform thickness, excellent color fastness, and minimal shrinkage. Suitable for both light and heavy-duty fabrics.',
      specifications: {
        Material: '100% Polyester',
        'Weight per Spool': '1 kg',
        Denier: '300D',
        Twist: 'S/Z Twist',
        'Tensile Strength': 'High',
        Color: 'Natural',
        'Box Quantity': '50 spools',
        'Total Weight': '50 kg',
      },
      material: '100% Polyester',
      originCountry: 'India',
      isFeatured: false,
      status: 'active',
    },
    {
      id: 'prod_mach_001',
      categoryId: categoryMap['cat_003'],
      productName: 'Industrial CNC Milling Machine 3-Axis',
      productCode: 'CNC-MILL-3X',
      shortDescription: 'Professional 3-axis CNC milling machine for precision manufacturing',
      detailedDescription: 'High-precision CNC milling machine with 3-axis control. Perfect for metal fabrication, prototyping, and production runs. Features rigid cast iron construction, servo motors, and digital readout. Includes controller, software, and tool holders. Suitable for aluminum, steel, brass, and plastics.',
      specifications: {
        Axes: '3-axis (X, Y, Z)',
        'Work Table Size': '800 x 400 mm',
        'Travel X': '600 mm',
        'Travel Y': '400 mm',
        'Travel Z': '500 mm',
        'Spindle Speed': '8000 RPM',
        'Motor Power': '5.5 kW',
        'Control System': 'Fanuc/Siemens',
        Accuracy: '±0.01 mm',
      },
      originCountry: 'India',
      isFeatured: true,
      status: 'active',
    },
    {
      id: 'prod_chem_001',
      categoryId: categoryMap['cat_004'],
      productName: 'Industrial Grade Sodium Hydroxide (Caustic Soda) 25kg',
      productCode: 'CHEM-NAOH-25KG',
      shortDescription: '99% pure caustic soda flakes for industrial applications',
      detailedDescription: 'High-purity sodium hydroxide (NaOH) flakes for industrial use. Commonly used in chemical manufacturing, water treatment, paper production, and textile processing. Food-grade quality, suitable for soap making and biodiesel production. Packaged in moisture-resistant bags.',
      specifications: {
        'Chemical Formula': 'NaOH',
        Purity: '≥99%',
        Form: 'Flakes',
        Weight: '25 kg per bag',
        Grade: 'Industrial/Food Grade',
        Packaging: 'PE-lined woven bag',
        Storage: 'Keep dry, sealed',
        'Shelf Life': '24 months',
      },
      originCountry: 'India',
      isFeatured: false,
      status: 'active',
    },
    {
      id: 'prod_pack_001',
      categoryId: categoryMap['cat_005'],
      productName: 'Corrugated Cardboard Boxes 5-Ply - Pack of 100',
      productCode: 'BOX-5PLY-100',
      shortDescription: 'Heavy-duty corrugated shipping boxes for industrial packaging',
      detailedDescription: 'Professional 5-ply corrugated cardboard boxes for secure shipping and storage. High crush resistance and water resistance. Perfect for e-commerce, warehousing, and logistics. Can support up to 50kg stacking weight. Recyclable and eco-friendly.',
      specifications: {
        Material: '5-Ply Corrugated Cardboard',
        Size: '18" x 12" x 12" (L x W x H)',
        'Burst Strength': '250 PSI',
        'Edge Crush Test': '44 ECT',
        'Max Load': '50 kg',
        Color: 'Brown Kraft',
        Recyclable: 'Yes',
        Quantity: '100 boxes',
      },
      material: '5-Ply Corrugated Cardboard',
      originCountry: 'India',
      isFeatured: false,
      status: 'active',
    },
    {
      id: 'prod_safe_001',
      categoryId: categoryMap['cat_006'],
      productName: 'Industrial Safety Helmet with Visor - Box of 20',
      productCode: 'SAFE-HELM-20',
      shortDescription: 'Professional safety helmets with face shield for construction and manufacturing',
      detailedDescription: 'High-impact ABS safety helmets with integrated face visor. Meets international safety standards for construction, manufacturing, and industrial work environments. Features adjustable suspension, ventilation holes, and replaceable face shields. Protects against falling objects and debris.',
      specifications: {
        Material: 'ABS Plastic',
        Type: 'Full brim with face shield',
        Suspension: '6-point adjustable',
        Standards: 'ANSI Z89.1, EN 397',
        Color: 'Yellow/White',
        Weight: '450g per helmet',
        Size: 'Adjustable (53-63 cm)',
        Quantity: '20 helmets per box',
      },
      material: 'ABS Plastic',
      originCountry: 'India',
      isFeatured: false,
      status: 'active',
    },
  ];

  // Product images and pricing data
  const productData: Record<string, { images: string[]; pricing: { cost: number; currency: string; moq: number }; shipping: { incoterms: string } }> = {
    prod_elec_001: {
      images: [
        'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 45.5, currency: 'USD', moq: 100 },
      shipping: { incoterms: 'FOB' },
    },
    prod_elec_002: {
      images: [
        'https://images.unsplash.com/photo-1625603649668-09b6e64d3c63?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 285.0, currency: 'USD', moq: 50 },
      shipping: { incoterms: 'FOB' },
    },
    prod_text_001: {
      images: [
        'https://images.unsplash.com/photo-1558769132-cb1aea709f9d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1602697428394-1d99af9c193e?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 125.0, currency: 'USD', moq: 10 },
      shipping: { incoterms: 'CIF' },
    },
    prod_text_002: {
      images: [
        'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1591511042557-e6f6bc7d3e9e?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 425.0, currency: 'USD', moq: 1 },
      shipping: { incoterms: 'FOB' },
    },
    prod_mach_001: {
      images: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 18500.0, currency: 'USD', moq: 1 },
      shipping: { incoterms: 'FOB' },
    },
    prod_chem_001: {
      images: [
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 45.0, currency: 'USD', moq: 100 },
      shipping: { incoterms: 'FOB' },
    },
    prod_pack_001: {
      images: [
        'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558357575-7a93b6d1d3f5?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 195.0, currency: 'USD', moq: 1 },
      shipping: { incoterms: 'FOB' },
    },
    prod_safe_001: {
      images: [
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop',
      ],
      pricing: { cost: 340.0, currency: 'USD', moq: 1 },
      shipping: { incoterms: 'FOB' },
    },
  };

  // Create products with images and pricing
  for (const prod of products) {
    const additionalData = productData[prod.id];
    
    // Create product - pass the whole object directly
    const product = await prisma.product.create({
      data: prod,
    });
    
    console.log(`✓ Created product: ${product.productName}`);

    // Create product images
    if (additionalData?.images) {
      for (let i = 0; i < additionalData.images.length; i++) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            imageUrl: additionalData.images[i],
            isPrimary: i === 0,
            sortOrder: i,
          },
        });
      }
      console.log(`  ✓ Added ${additionalData.images.length} images`);
    }

    // Create pricing
    if (additionalData?.pricing) {
      await prisma.productPricing.create({
        data: {
          productId: product.id,
          minOrderQuantity: additionalData.pricing.moq,
          unit: 'units',
          priceFrom: additionalData.pricing.cost,
          currency: additionalData.pricing.currency,
          incoterm: additionalData.shipping?.incoterms || 'FOB',
        },
      });
      console.log(`  ✓ Added pricing: $${additionalData.pricing.cost} (MOQ: ${additionalData.pricing.moq})`);
    }
  }

  console.log('\n✅ Database seed completed successfully!');
  console.log(`📊 Created ${categories.length} categories and ${products.length} products`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });