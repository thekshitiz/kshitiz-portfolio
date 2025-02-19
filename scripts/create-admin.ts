import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await hash('your-password', 12)

    const admin = await prisma.user.create({
        data: {
            name: 'Kshitiz Raj',
            email: 'freelancekshitiz@gmail.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log('Admin created:', admin)
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
