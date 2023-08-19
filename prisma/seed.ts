import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const username = "rachel";

  // cleanup the existing database
  await prisma.user.delete({ where: { username } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const match = await prisma.match.create({
    data: {
      seats: 4,
      rounds: 20
    }
  })

  await prisma.registration.create({
    data: {
      matchId: match.id,
      registrantId: user.id
    }
  })

  // await prisma.match.create({
  //   data: {
  //     seats: 4,
  //     rounds: 20,
  //     userId: user.id
  //   },
  // })


//   await prisma.note.create({
//     data: {
//       title: "My first note",
//       body: "Hello, world!",
//       userId: user.id,
//     },
//   });

//   await prisma.note.create({
//     data: {
//       title: "My second note",
//       body: "Hello, world!",
//       userId: user.id,
//     },
//   });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
