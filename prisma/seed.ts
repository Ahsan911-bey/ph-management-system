import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // 1. Create Admin User
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123', // Hardcoded as requested
      role: 'ADMIN',
    },
  })
  console.log(`Admin user created: ${admin.username}`)

  // 2. Create Categories
  const categoryNames = ['Painkillers', 'Antibiotics', 'Vitamins', 'First Aid']
  const categories = []
  
  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    categories.push(category)
  }
  console.log(`Created ${categories.length} categories.`)

  // 3. Create sample medicines
  const medicinesData = [
    {
      name: 'Paracetamol 500mg',
      description: 'Standard pain relief and fever reduction',
      price: 5.99,
      stock: 100,
      expiryDate: new Date('2026-12-31'),
      categoryId: categories.find(c => c.name === 'Painkillers')?.id || categories[0].id,
    },
    {
      name: 'Amoxicillin 250mg',
      description: 'Antibiotic for bacterial infections',
      price: 12.50,
      stock: 50,
      expiryDate: new Date('2025-06-30'),
      categoryId: categories.find(c => c.name === 'Antibiotics')?.id || categories[0].id,
    },
    {
      name: 'Vitamin C 1000mg',
      description: 'Immune system support',
      price: 8.99,
      stock: 200,
      expiryDate: new Date('2027-01-15'),
      categoryId: categories.find(c => c.name === 'Vitamins')?.id || categories[0].id,
    }
  ]

  for (const med of medicinesData) {
    // Note: Upsert needs a unique identifier, but medicine name isn't unique in schema.
    // We'll just check if it exists first.
    const existingMed = await prisma.medicine.findFirst({
      where: { name: med.name }
    })
    
    if (!existingMed) {
      await prisma.medicine.create({
        data: med,
      })
    }
  }
  console.log(`Created sample medicines.`)
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
