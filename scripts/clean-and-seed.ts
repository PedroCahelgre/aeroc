import { db } from '../src/lib/db'
import bcrypt from 'bcryptjs'

async function cleanAndSeed() {
  try {
    console.log('🧹 Limpando banco de dados...')

    // Delete all data in correct order due to foreign key constraints
    await db.orderStatusHistory.deleteMany()
    await db.orderItem.deleteMany()
    await db.order.deleteMany()
    await db.product.deleteMany()
    await db.category.deleteMany()
    await db.admin.deleteMany()
    await db.user.deleteMany()

    console.log('✅ Banco de dados limpo!')

    // Now run the seed
    console.log('🌱 Iniciando seed do banco de dados...')

    // Create admin users
    const adminPassword1 = await bcrypt.hash('87168087', 10)
    const adminPassword2 = await bcrypt.hash('12345678', 10)

    // Create user for admin 1
    const user1 = await db.user.upsert({
      where: { email: 'comerciochalegre@gmail.com' },
      update: {},
      create: {
        email: 'comerciochalegre@gmail.com',
        name: 'Admin Principal',
        role: 'ADMIN'
      }
    })

    // Create admin 1
    await db.admin.upsert({
      where: { email: 'comerciochalegre@gmail.com' },
      update: {},
      create: {
        email: 'comerciochalegre@gmail.com',
        password: adminPassword1,
        name: 'Admin Principal',
        role: 'ADMIN',
        userId: user1.id
      }
    })

    // Create user for admin 2
    const user2 = await db.user.upsert({
      where: { email: 'aeropizza@admin.com' },
      update: {},
      create: {
        email: 'aeropizza@admin.com',
        name: 'Admin AeroPizza',
        role: 'ADMIN'
      }
    })

    // Create admin 2
    await db.admin.upsert({
      where: { email: 'aeropizza@admin.com' },
      update: {},
      create: {
        email: 'aeropizza@admin.com',
        password: adminPassword2,
        name: 'Admin AeroPizza',
        role: 'ADMIN',
        userId: user2.id
      }
    })

    console.log('✅ Administradores criados com sucesso!')

    // Create categories
    const pizzaCategory = await db.category.upsert({
      where: { name: 'Pizzas Tradicionais' },
      update: {},
      create: {
        name: 'Pizzas Tradicionais',
        description: 'As pizzas clássicas que todos amam'
      }
    })

    const gourmetCategory = await db.category.upsert({
      where: { name: 'Pizzas Gourmet' },
      update: {},
      create: {
        name: 'Pizzas Gourmet',
        description: 'Pizzas especiais com ingredientes premium'
      }
    })

    const drinksCategory = await db.category.upsert({
      where: { name: 'Bebidas' },
      update: {},
      create: {
        name: 'Bebidas',
        description: 'Refrigerantes e sucos naturais'
      }
    })

    console.log('✅ Categorias criadas com sucesso!')

    // Create products
    await db.product.create({
      data: {
        name: 'Margherita',
        description: 'Molho de tomate, muçarela, manjericão fresco e azeite extra virgem',
        price: 35.90,
        categoryId: pizzaCategory.id,
        preparationTime: 20,
        ingredients: 'Molho de tomate, muçarela, manjericão fresco, azeite extra virgem',
        image: '/pizzas/margherita.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Calabresa Especial',
        description: 'Calabresa artesanal, cebola roxa, azeitona preta e queijo muçarela',
        price: 42.90,
        categoryId: pizzaCategory.id,
        preparationTime: 25,
        ingredients: 'Molho de tomate, muçarela, calabresa artesanal, cebola roxa, azeitona preta',
        image: '/pizzas/calabresa.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Portuguesa Tradicional',
        description: 'Presunto de qualidade, muçarela, ovo cozido, cebola e azeitona',
        price: 45.90,
        categoryId: pizzaCategory.id,
        preparationTime: 25,
        ingredients: 'Molho de tomate, muçarela, presunto, ovo cozido, cebola, azeitona preta',
        image: '/pizzas/portuguesa.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Frango com Catupiry',
        description: 'Frango desfiado refogado, catupiry cremoso, milho verde e orégano',
        price: 44.90,
        categoryId: gourmetCategory.id,
        preparationTime: 30,
        ingredients: 'Molho de tomate, muçarela, frango desfiado, catupiry, milho verde, orégano',
        image: '/pizzas/frango-catupiry.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Quatro Queijos Gourmet',
        description: 'Muçarela, parmesão, gorgonzola e provolone com toque de noz moscada',
        price: 48.90,
        categoryId: gourmetCategory.id,
        preparationTime: 28,
        ingredients: 'Molho branco, muçarela, parmesão, gorgonzola, provolone, noz moscada',
        image: '/pizzas/quatro-queijos.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Pepperoni Deluxe',
        description: 'Dupla de pepperoni, queijo cheddar extra e pimenta calabresa',
        price: 46.90,
        categoryId: gourmetCategory.id,
        preparationTime: 25,
        ingredients: 'Molho de tomate, muçarela, pepperoni duplo, cheddar, pimenta calabresa',
        image: '/pizzas/pepperoni.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Vegetariana Especial',
        description: 'Pimentões coloridos, cogumelos frescos, tomate cereja, azeitona e rúcula',
        price: 41.90,
        categoryId: gourmetCategory.id,
        preparationTime: 22,
        ingredients: 'Molho de tomate, muçarela, pimentões, cogumelos, tomate cereja, azeitona, rúcula',
        image: '/pizzas/vegetariana.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Pizza Chocolate',
        description: 'Base de chocolate, nutella, morangos frescos, chantilly e raspas de chocolate',
        price: 38.90,
        categoryId: gourmetCategory.id,
        preparationTime: 15,
        ingredients: 'Base de chocolate, nutella, morangos frescos, chantilly, raspas de chocolate',
        image: '/pizzas/chocolate.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Coca-Cola 2L',
        description: 'Refrigerante de cola tradicional gelado 2 litros',
        price: 12.90,
        categoryId: drinksCategory.id,
        preparationTime: 0,
        ingredients: 'Refrigerante de cola, água gaseificada, açúcar, cafeína',
        image: '/bebidas/coca-cola.jpg'
      }
    })

    await db.product.create({
      data: {
        name: 'Suco de Laranja Natural 500ml',
        description: 'Suco natural de laranja espremido na hora, sem conservantes',
        price: 8.90,
        categoryId: drinksCategory.id,
        preparationTime: 5,
        ingredients: 'Laranja natural, água mineral, gelo, açúcar opcional',
        image: '/bebidas/suco-laranja.jpg'
      }
    })

    console.log('✅ 10 produtos criados com sucesso!')
    console.log('🎉 Banco de dados populado com sucesso!')

  } catch (error) {
    console.error('❌ Erro no clean and seed:', error)
    throw error
  }
}

cleanAndSeed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })