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
          hash: hashedPassword
        }
      }
    }
  });

  // await prisma.note.create({
  //   data: {
  //     title: "My first note",
  //     body: "Hello, world!",
  //     userId: user.id
  //   }
  // });

  // await prisma.note.create({
  //   data: {
  //     title: "My second note",
  //     body: "Hello, world!",
  //     userId: user.id
  //   }
  // });

  const match = await prisma.match.create({
    data: {
      rounds: 20,
      seatLimit: 4,
      stage: "pre"
    }
  });

  const player = await prisma.player.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      },
      displayName: user.username,
      match: {
        connect: {
          id: match.id
        }
      }
    },
    include: {
      user: {},
      match: {}
    }
  });
  console.log(player);

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
