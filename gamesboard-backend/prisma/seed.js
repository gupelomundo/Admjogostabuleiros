const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function calculateBirthday(age) {
  const currentDate = new Date();
  const year = currentDate.getFullYear() - age;
  const month = getRandomInt(0, 11); // Mês aleatório
  const day = getRandomInt(1, 28); // Dia aleatório (assumindo sempre 28 para simplificar)

  return new Date(year, month, day);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const userData = [
  {
    name: "Felipe",
    email: "felipe@unoeste.com",
    password: "123456",
    gender: "male",
    authType: "admin",
    birthday: calculateBirthday(25),
    games: {
      create: [],
    },
  },
  {
    name: "Angela",
    email: "angela@unoeste.com",
    password: "22222",
    gender: "female",
    authType: "common",
    birthday: calculateBirthday(21),
    games: {
      create: [
        {
          name: "Dungeon and Dragons",
          description: "Jogo de RPG",
          price: 100.0,
          available: true,
          category: "RPG",
          image: `https://s2-techtudo.glbimg.com/C3GPvh6ECD-33n8Df_v1EecSL9o=/0x0:1600x1000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/m/H/k84eHgTA2l7JhjO3Q6Aw/wallpaper-2560-x-1600-wallpaper.jpg`,
        },
        {
          name: "Coup",
          description: "Jogo de blefe",
          price: 50.0,
          available: true,
          category: "Blefe",
          image:
            "https://theboardgameshow.files.wordpress.com/2014/01/coup.jpg",
        },
      ],
    },
  },
  {
    name: "João",
    email: "joao@example.com",
    password: "abcdef",
    gender: "male",
    authType: "common",
    birthday: calculateBirthday(18),
    games: {
      create: [
        {
          name: "Chess",
          description: "Classic strategy game",
          price: 0,
          available: true,
          category: "Estratégia",
          image:
            "https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png",
        },
        {
          name: "Monopoly",
          description: "Family board game",
          price: 30.0,
          available: true,
          category: "Familia",
          image:
            "https://m.media-amazon.com/images/I/81ZbSo9bcjL._AC_SL1500_.jpg",
        },
      ],
    },
  },
  {
    name: "Maria",
    email: "maria@example.com",
    password: "qwerty",
    gender: "female",
    authType: "common",
    birthday: calculateBirthday(30),
    games: {
      create: [
        {
          name: "Scrabble",
          description: "Word game",
          price: 25.0,
          available: true,
          category: "Palavras",
          image:
            "https://m.media-amazon.com/images/I/71MnIcDzTHL._AC_SL1379_.jpg",
        },
      ],
    },
  },
  {
    name: "Pedro",
    email: "pedro@example.com",
    password: "12345678",
    gender: "male",
    authType: "common",
    birthday: calculateBirthday(19),
    games: {
      create: [],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
