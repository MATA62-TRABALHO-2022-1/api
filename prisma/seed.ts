import * as crypto from 'crypto';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const roleData: Prisma.RoleCreateInput[] = [
    {
        name: 'COORDENADOR_CARE',
        routines: '',
    },
    {
        name: 'DIRIGENTE_INST_PARCEIRA',
        routines: '',
    },
    {
        name: 'DIRIGENTE_INST_VALIDADORA',
        routines: '',
    },
    {
        name: 'DIRETOR_INST_PARCEIRA',
        routines: '',
    },
    {
        name: 'DIRETOR_INST_VALIDADORA',
        routines: '',
    },
    {
        name: 'SUPERINTENDENTE_INST_PARCEIRA',
        routines: '',
    },
    {
        name: 'SUPERINTENDENTE_INST_VALIDADORA',
        routines: '',
    },
    {
        name: 'FUNCIONARIO_INST_PARCEIRA',
        routines: '',
    },
    {
        name: 'FUNCIONARIO_INST_VALIDADORA',
        routines: '',
    }
];

const instituitionData: Prisma.InstituitionUncheckedCreateInput[] = [
    {
        name: 'Instituto de Matemática e Estatística',
        address: 'Avenida Adhemar de Barros',
        city: 'Salvador',
        state: 'Bahia',
        keeper: 'UFBA',
        mecCredibility: '100',
        isPartner: false,
    },
    {
        name: 'Instituto de Computação',
        address: 'Avenida Milton Santos',
        city: 'Salvador',
        state: 'Bahia',
        keeper: 'UFBA',
        mecCredibility: '100',
        isPartner: true,
    },
];

const userData: Prisma.UserUncheckedCreateInput[] = [
    {
        name: 'System Admin',
        email: 'sysadmin@mata62.com',
        password: crypto.createHmac('sha256', 'sysadmin123').digest('hex'),
        cpf: '123.456.789-00',
        phone: '(11)4002-8922',
        roleId: 6,
        instituitionId: 1,
    }
];

async function main() {
    console.log('Start seeding ...');

    for (const r of roleData) {
        const role = await prisma.role.create({
            data: r,
        });
        console.log(`Created role with id: ${role.id}`);
    }

    for (const i of instituitionData) {
        const instituition = await prisma.instituition.create({
            data: i,
        });
        console.log(`Created instituition with id: ${instituition.id}`);
    }

    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
