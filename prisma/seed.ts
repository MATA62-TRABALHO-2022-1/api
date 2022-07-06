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
        name: 'ADMIN',
        email: 'admin@mata62.com',
        password: crypto.createHmac('sha256', 'admin').digest('hex'),
        cpf: '000.000.000-00',
        phone: '(11)4002-8922',
        roleId: 6,
        instituitionId: 1,
    },
    {
        name: 'Fulano da Silva',
        email: 'fulano@mata62.com',
        password: crypto.createHmac('sha256', 'fulano123').digest('hex'),
        cpf: '123.456.789-00',
        phone: '(12)4002-8922',
        roleId: 4,
        instituitionId: 2,
    },
    {
        name: 'Sicrano dos Santos',
        email: 'sicrano@mata62.com',
        password: crypto.createHmac('sha256', 'sicrano123').digest('hex'),
        cpf: '123.456.789-01',
        phone: '(13)4002-8922',
        roleId: 9,
        instituitionId: 1,
    },
    {
        name: 'Beltrano de Souza',
        email: 'beltrano@mata62.com',
        password: crypto.createHmac('sha256', 'beltrano123').digest('hex'),
        cpf: '123.456.789-02',
        phone: '(14)4002-8922',
        roleId: 3,
        instituitionId: 1,
    },
    {
        name: 'Delano de Souza',
        email: 'delano@mata62.com',
        password: crypto.createHmac('sha256', 'delano123').digest('hex'),
        cpf: '123.456.789-03',
        phone: '(15)4002-8922',
        roleId: 8,
        instituitionId: 2,
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
