import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const roleData: Prisma.RoleCreateInput[] = [
  {
    name: 'DIRIGENTE',
    routines: 'CREATE/READ/UPDATE',
  },
  {
    name: 'DIRETOR',
    routines: 'CREATE/READ/UPDATE',
  },
  {
    name: 'SUPERINTENDENTE',
    routines: 'CREATE/READ/UPDATE',
  },
  {
    name: 'COORDENADOR',
    routines: 'CREATE/READ/UPDATE',
  },
  {
    name: 'FUNCIONARIO',
    routines: 'CREATE/READ/UPDATE',
  }
];

const userData: Prisma.UserUncheckedCreateInput[] = [
  {
    name: 'System Admin',
    email: 'sysadmin@mata62.com',
    password: 'sysadmin123',
    cpf: '123.456.789-00',
    phone: '(11)4002-8922',
    roleId: 1,
  }
];

async function main() {
  console.log(`Start seeding ...`);

  for (const r of roleData) {
    const role = await prisma.role.create({
      data: r,
    });
    console.log(`Created role with id: ${role.id}`);
  }

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
