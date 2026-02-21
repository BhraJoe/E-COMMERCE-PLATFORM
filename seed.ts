import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
     console.log('Starting seed...');

     const categories = [
          { name: 'Living Room', slug: 'living-room', description: 'Premium furniture for your living space.' },
          { name: 'Kitchen', slug: 'kitchen', description: 'Functional and aesthetic kitchenware.' },
          { name: 'Bedroom', slug: 'bedroom', description: 'Comfort meets modern design.' },
     ];

     for (const cat of categories) {
          await prisma.category.upsert({
               where: { slug: cat.slug },
               update: {},
               create: cat,
          });
     }

     const livingRoom = await prisma.category.findUnique({ where: { slug: 'living-room' } });
     const kitchen = await prisma.category.findUnique({ where: { slug: 'kitchen' } });
     const bedroom = await prisma.category.findUnique({ where: { slug: 'bedroom' } });

     // Living Room Products
     if (livingRoom) {
          const livingRoomProducts = [
               {
                    name: 'Minimalist Oak Sofa',
                    slug: 'minimalist-oak-sofa',
                    description: 'Handcrafted oak sofa with premium linen upholstery. Perfect for modern living spaces.',
                    price: 1299.00,
                    images: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
                    stock: 5,
                    categoryId: livingRoom.id,
                    isFeatured: true,
               },
               {
                    name: 'Abstract Marble Lamp',
                    slug: 'abstract-marble-lamp',
                    description: 'Contemporary lighting fixture with a solid marble base. Elegant design for any room.',
                    price: 249.00,
                    images: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
                    stock: 12,
                    categoryId: livingRoom.id,
                    isFeatured: true,
               },
               {
                    name: 'Velvet Accent Chair',
                    slug: 'velvet-accent-chair',
                    description: 'Luxurious velvet armchair with gold-finished legs. A statement piece for your living room.',
                    price: 599.00,
                    images: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
                    stock: 8,
                    categoryId: livingRoom.id,
                    isFeatured: false,
               },
               {
                    name: 'Modern Coffee Table',
                    slug: 'modern-coffee-table',
                    description: 'Sleek coffee table with tempered glass top and metal frame.',
                    price: 449.00,
                    images: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800',
                    stock: 15,
                    categoryId: livingRoom.id,
                    isFeatured: false,
               },
               {
                    name: 'Floor Lamp Arc',
                    slug: 'floor-lamp-arc',
                    description: 'Contemporary arc floor lamp with adjustable height. Creates perfect ambient lighting.',
                    price: 329.00,
                    images: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800',
                    stock: 10,
                    categoryId: livingRoom.id,
                    isFeatured: false,
               },
               {
                    name: 'Bookshelf Unit',
                    slug: 'bookshelf-unit',
                    description: '5-tier modern bookshelf with industrial design. Perfect for displaying collectibles.',
                    price: 399.00,
                    images: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800',
                    stock: 7,
                    categoryId: livingRoom.id,
                    isFeatured: false,
               },
          ];

          for (const prod of livingRoomProducts) {
               await prisma.product.upsert({
                    where: { slug: prod.slug },
                    update: {},
                    create: prod,
               });
          }
     }

     // Kitchen Products
     if (kitchen) {
          const kitchenProducts = [
               {
                    name: 'Ceramic Dinner Set',
                    slug: 'ceramic-dinner-set',
                    description: '12-piece ceramic dinner set with elegant matte finish. Includes plates, bowls, and mugs.',
                    price: 189.00,
                    images: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
                    stock: 20,
                    categoryId: kitchen.id,
                    isFeatured: true,
               },
               {
                    name: 'Wooden Cutting Board',
                    slug: 'wooden-cutting-board',
                    description: 'Premium acacia wood cutting board with juice groove. Durable and food-safe.',
                    price: 49.00,
                    images: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
                    stock: 30,
                    categoryId: kitchen.id,
                    isFeatured: false,
               },
               {
                    name: 'Pendant Light Cluster',
                    slug: 'pendant-light-cluster',
                    description: 'Modern 3-light pendant cluster with brass finish. Perfect for kitchen islands.',
                    price: 279.00,
                    images: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&q=80&w=800',
                    stock: 12,
                    categoryId: kitchen.id,
                    isFeatured: false,
               },
               {
                    name: 'Bar Stool Set',
                    slug: 'bar-stool-set',
                    description: 'Set of 2 modern bar stools with adjustable height and footrest.',
                    price: 249.00,
                    images: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
                    stock: 15,
                    categoryId: kitchen.id,
                    isFeatured: false,
               },
               {
                    name: 'Marble Tray',
                    slug: 'marble-tray',
                    description: 'White marble serving tray with gold handles. Elegant for serving or decoration.',
                    price: 79.00,
                    images: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
                    stock: 25,
                    categoryId: kitchen.id,
                    isFeatured: false,
               },
               {
                    name: 'Wall Mounted Shelf',
                    slug: 'wall-mounted-shelf',
                    description: 'Set of 3 floating wooden shelves with hidden brackets. Modern kitchen storage.',
                    price: 129.00,
                    images: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
                    stock: 18,
                    categoryId: kitchen.id,
                    isFeatured: false,
               },
          ];

          for (const prod of kitchenProducts) {
               await prisma.product.upsert({
                    where: { slug: prod.slug },
                    update: {},
                    create: prod,
               });
          }
     }

     // Bedroom Products
     if (bedroom) {
          const bedroomProducts = [
               {
                    name: 'Platform Bed Frame',
                    slug: 'platform-bed-frame',
                    description: 'King size platform bed with upholstered headboard. Modern minimalist design.',
                    price: 899.00,
                    images: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
                    stock: 5,
                    categoryId: bedroom.id,
                    isFeatured: true,
               },
               {
                    name: 'Linen Bedding Set',
                    slug: 'linen-bedding-set',
                    description: 'Premium stonewashed linen duvet cover and sheet set. Natural and breathable.',
                    price: 349.00,
                    images: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
                    stock: 12,
                    categoryId: bedroom.id,
                    isFeatured: true,
               },
               {
                    name: 'Nightstand Pair',
                    slug: 'nightstand-pair',
                    description: 'Pair of modern nightstands with drawer and open shelf. Walnut wood finish.',
                    price: 299.00,
                    images: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=800',
                    stock: 8,
                    categoryId: bedroom.id,
                    isFeatured: false,
               },
               {
                    name: 'Dresser Chest',
                    slug: 'dresser-chest',
                    description: '6-drawer dresser with soft-close drawers. Spacious storage for any bedroom.',
                    price: 649.00,
                    images: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=800',
                    stock: 6,
                    categoryId: bedroom.id,
                    isFeatured: false,
               },
               {
                    name: 'Bedside Table Lamp',
                    slug: 'bedside-table-lamp',
                    description: 'Minimalist table lamp with fabric shade. Perfect ambient lighting for bedroom.',
                    price: 89.00,
                    images: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800',
                    stock: 20,
                    categoryId: bedroom.id,
                    isFeatured: false,
               },
               {
                    name: 'Vanity Mirror',
                    slug: 'vanity-mirror',
                    description: 'LED-lit vanity mirror with touch control. Hollywood-style makeup mirror.',
                    price: 199.00,
                    images: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800',
                    stock: 10,
                    categoryId: bedroom.id,
                    isFeatured: false,
               },
          ];

          for (const prod of bedroomProducts) {
               await prisma.product.upsert({
                    where: { slug: prod.slug },
                    update: {},
                    create: prod,
               });
          }
     }

     console.log('Seed completed successfully!');
}

main()
     .catch((e) => {
          console.error(e);
          process.exit(1);
     })
     .finally(async () => {
          await prisma.$disconnect();
     });
