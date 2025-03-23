// npx prisma db seed
const prisma = require("../configs/prisma");
const bcrypt = require("bcryptjs");
const { districtData } = require("../data/districts");
const { provinceData } = require("../data/provinces");

// console.log(provinceData);

const hashedPassword = bcrypt.hashSync("123456", 10);

const userData = [
  {
    username: "admin",
    email: "admin@test.com",
    password: hashedPassword,
    role: "ADMIN",
  },
  {
    username: "andy",
    email: "andy@test.com",
    password: hashedPassword,
    profileImage:
      "https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg",
  },
  {
    username: "bob",
    email: "bob@test.com",
    password: hashedPassword,
    profileImage: "https://images.pexels.com/photos/3930029/pexels-photo-3930029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    username: "canny",
    email: "canny@test.com",
    password: hashedPassword,
    profileImage: "https://images.pexels.com/photos/547557/pexels-photo-547557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    username: "danny",
    email: "danny@test.com",
    password: hashedPassword,
    profileImage: "https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    username: "john_doe",
    email: "john.doe123@example.com",
    password: hashedPassword,
    profileImage: "https://images.pexels.com/photos/925263/pexels-photo-925263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    username: "sarah_lee",
    email: "sarah.lee789@example.com",
    password: hashedPassword,
  },
  {
    username: "michael_23",
    email: "michael23@example.com",
    password: hashedPassword,
  },
  {
    username: "emily_smith",
    email: "emily.smith456@example.com",
    password: hashedPassword,
    profileImage: "https://images.pexels.com/photos/2901913/pexels-photo-2901913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    username: "daniel_brown",
    email: "daniel.brown101@example.com",
    password: hashedPassword,
  },
  {
    username: "laura_lynn",
    email: "laura.lynn202@example.com",
    password: hashedPassword,
  },
  {
    username: "kevin_martin",
    email: "kevin.martin303@example.com",
    password: hashedPassword,
    profileImage: "https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    username: "olivia_white",
    email: "olivia.white404@example.com",
    password: hashedPassword,
  },
  {
    username: "charlie_green",
    email: "charlie.green505@example.com",
    password: hashedPassword,
    profileImage: "https://images.pexels.com/photos/1136575/pexels-photo-1136575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    username: "anna_black",
    email: "anna.black606@example.com",
    password: hashedPassword,
    profileImage:
      "https://images.pexels.com/photos/1250643/pexels-photo-1250643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const postData = [
  {
    id: 1,
    userId: 4,
    placeId: 1,
    title: "Stunning views at Wat Phra Kaew (Temple of the Emerald Buddha).",
    content:
      "My adventure to Wat Phra Kaew (Temple of the Emerald Buddha) was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 316,
    view: 15021,
  },
  {
    id: 2,
    userId: 4,
    placeId: 2,
    title: "Remarkable experiences at Ancient City (Muang Boran).",
    content:
      "During my visit to Ancient City (Muang Boran), I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1129,
    view: 6734,
  },
  {
    id: 3,
    userId: 3,
    placeId: 3,
    title: "A wonderful escape to Wat Phra Si Rattana Satsadaram (Wat Yai).",
    content:
      "During my visit to Wat Phra Si Rattana Satsadaram (Wat Yai), I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1090,
    view: 5426,
  },
  {
    id: 4,
    userId: 4,
    placeId: 4,
    title: "Unforgettable journey to Wat Phra Dhammakaya.",
    content:
      "My adventure to Wat Phra Dhammakaya was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 426,
    view: 9322,
  },
  {
    id: 5,
    userId: 3,
    placeId: 5,
    title: "A delightful day at Wat Yai Chaimongkol.",
    content:
      "Visiting Wat Yai Chaimongkol was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 692,
    view: 7949,
  },
  {
    id: 6,
    userId: 3,
    placeId: 6,
    title: "Captivating moments at Wat Muang.",
    content:
      "During my visit to Wat Muang, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 940,
    view: 5555,
  },
  {
    id: 7,
    userId: 3,
    placeId: 7,
    title: "A peaceful visit to Phra Prang Sam Yot.",
    content:
      "Visiting Phra Prang Sam Yot was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 357,
    view: 7396,
  },
  {
    id: 8,
    userId: 5,
    placeId: 8,
    title: "Exploring the beauty of Wat Phra Non Chakkrasi Worawihan!",
    content:
      "My adventure to Wat Phra Non Chakkrasi Worawihan was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 933,
    view: 9666,
  },
  {
    id: 9,
    userId: 4,
    placeId: 9,
    title: "Exploring the beauty of Chai Nat Bird Park!",
    content:
      "Visiting Chai Nat Bird Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 812,
    view: 8849,
  },
  {
    id: 10,
    userId: 5,
    placeId: 10,
    title: "My adventurous trip to Phra Phutthabat Woramahawihan.",
    content:
      "Phra Phutthabat Woramahawihan exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1050,
    view: 1189,
  },
  {
    id: 11,
    userId: 3,
    placeId: 11,
    title: "Stunning views at Pattaya Beach.",
    content:
      "During my visit to Pattaya Beach, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1301,
    view: 10001,
  },
  {
    id: 12,
    userId: 4,
    placeId: 12,
    title: "A wonderful escape to Suan Son Beach.",
    content:
      "Suan Son Beach offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 1619,
    view: 8734,
  },
  {
    id: 13,
    userId: 5,
    placeId: 13,
    title: "A delightful day at Namtok Phlio National Park.",
    content:
      "Namtok Phlio National Park offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 1441,
    view: 4556,
  },
  {
    id: 14,
    userId: 4,
    placeId: 14,
    title: "A peaceful visit to Ko Chang.",
    content:
      "During my visit to Ko Chang, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 859,
    view: 6393,
  },
  {
    id: 15,
    userId: 5,
    placeId: 15,
    title: "Remarkable experiences at Wat Sothonwararam Worawihan.",
    content:
      "Visiting Wat Sothonwararam Worawihan was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 900,
    view: 9433,
  },
  {
    id: 16,
    userId: 3,
    placeId: 16,
    title: "Exploring the beauty of Khao Yai National Park!",
    content:
      "Visiting Khao Yai National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 787,
    view: 8513,
  },
  {
    id: 17,
    userId: 2,
    placeId: 17,
    title: "Discovering the charm of Sarika Waterfall.",
    content:
      "Visiting Sarika Waterfall was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 536,
    view: 7235,
  },
  {
    id: 18,
    userId: 4,
    placeId: 18,
    title: "A delightful day at Aranyaprathet Border Market.",
    content:
      "During my visit to Aranyaprathet Border Market, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 571,
    view: 1775,
  },
  {
    id: 19,
    userId: 4,
    placeId: 19,
    title: "A delightful day at Wat Phra That Phanom.",
    content:
      "During my visit to Wat Phra That Phanom, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 488,
    view: 4152,
  },
  {
    id: 20,
    userId: 5,
    placeId: 20,
    title: "Unforgettable journey to Phanom Rung Historical Park.",
    content:
      "My adventure to Phanom Rung Historical Park was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 1103,
    view: 4943,
  },
  {
    id: 21,
    userId: 5,
    placeId: 21,
    title: "Unforgettable journey to Prasat Hin Phimai.",
    content:
      "Prasat Hin Phimai offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 746,
    view: 2021,
  },
  {
    id: 22,
    userId: 3,
    placeId: 22,
    title: "A wonderful escape to Preah Vihear National Park.",
    content:
      "Visiting Preah Vihear National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 880,
    view: 4843,
  },
  {
    id: 23,
    userId: 3,
    placeId: 23,
    title: "Exploring the beauty of Sam Phan Bok!",
    content:
      "Visiting Sam Phan Bok was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 1089,
    view: 7873,
  },
  {
    id: 24,
    userId: 5,
    placeId: 24,
    title: "Exploring the beauty of Wat Phra That Kong Khao Noi!",
    content:
      "Wat Phra That Kong Khao Noi exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1160,
    view: 5297,
  },
  {
    id: 25,
    userId: 3,
    placeId: 25,
    title: "A peaceful visit to Tat Ton National Park.",
    content:
      "Tat Ton National Park offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 546,
    view: 8629,
  },
  {
    id: 26,
    userId: 4,
    placeId: 26,
    title: "Exploring the beauty of Phu Pha Yon National Park!",
    content:
      "During my visit to Phu Pha Yon National Park, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1399,
    view: 2016,
  },
  {
    id: 27,
    userId: 3,
    placeId: 27,
    title: "A delightful day at Phu Thok.",
    content:
      "Phu Thok exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 453,
    view: 1878,
  },
  {
    id: 28,
    userId: 2,
    placeId: 28,
    title: "A delightful day at Phu Kradueng National Park.",
    content:
      "Phu Kradueng National Park offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 1296,
    view: 5859,
  },
  {
    id: 29,
    userId: 5,
    placeId: 29,
    title: "Unforgettable journey to Phu Wiang Dinosaur Museum.",
    content:
      "Phu Wiang Dinosaur Museum exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 285,
    view: 9684,
  },
  {
    id: 30,
    userId: 2,
    placeId: 30,
    title: "Exploring the beauty of Red Lotus Lake (Nong Han Kumphawapi)!",
    content:
      "Visiting Red Lotus Lake (Nong Han Kumphawapi) was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 384,
    view: 1064,
  },
  {
    id: 31,
    userId: 2,
    placeId: 31,
    title: "Exploring the beauty of Phu Ruea National Park!",
    content:
      "Phu Ruea National Park exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1392,
    view: 6463,
  },
  {
    id: 32,
    userId: 2,
    placeId: 32,
    title: "A delightful day at Wat Pho Chai.",
    content:
      "Visiting Wat Pho Chai was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 346,
    view: 3695,
  },
  {
    id: 33,
    userId: 5,
    placeId: 33,
    title: "A delightful day at Khao Yai National Park (Maha Sarakham Side).",
    content:
      "During my visit to Khao Yai National Park (Maha Sarakham Side), I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1308,
    view: 6892,
  },
  {
    id: 34,
    userId: 3,
    placeId: 34,
    title: "Exploring the beauty of Bueng Phalan Chai!",
    content:
      "Visiting Bueng Phalan Chai was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 393,
    view: 7184,
  },
  {
    id: 35,
    userId: 5,
    placeId: 35,
    title: "My adventurous trip to Lam Pao Dam.",
    content:
      "Lam Pao Dam offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 1049,
    view: 12450,
  },
  {
    id: 36,
    userId: 5,
    placeId: 36,
    title: "A wonderful escape to Phu Phan National Park.",
    content:
      "Phu Phan National Park exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1257,
    view: 9996,
  },
  {
    id: 37,
    userId: 4,
    placeId: 37,
    title: "Remarkable experiences at Phra That Phanom.",
    content:
      "Phra That Phanom exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 752,
    view: 9154,
  },
  {
    id: 38,
    userId: 4,
    placeId: 38,
    title: "Exploring the beauty of Wat Phu Dan Tae!",
    content:
      "Wat Phu Dan Tae exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 503,
    view: 4840,
  },
  {
    id: 39,
    userId: 2,
    placeId: 39,
    title: "A delightful day at Doi Inthanon National Park.",
    content:
      "Visiting Doi Inthanon National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 1211,
    view: 7910,
  },
  {
    id: 40,
    userId: 3,
    placeId: 40,
    title: "Exploring the beauty of Wat Phra That Hariphunchai!",
    content:
      "Visiting Wat Phra That Hariphunchai was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 517,
    view: 7938,
  },
  {
    id: 41,
    userId: 2,
    placeId: 41,
    title: "My adventurous trip to Wat Phra That Lampang Luang.",
    content:
      "During my visit to Wat Phra That Lampang Luang, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 773,
    view: 6134,
  },
  {
    id: 42,
    userId: 3,
    placeId: 42,
    title: "A delightful day at Sirikit Dam.",
    content:
      "My adventure to Sirikit Dam was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 731,
    view: 8858,
  },
  {
    id: 43,
    userId: 4,
    placeId: 43,
    title: "A wonderful escape to Phrae Muang Phi Forest Park.",
    content:
      "My adventure to Phrae Muang Phi Forest Park was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 640,
    view: 3790,
  },
  {
    id: 44,
    userId: 2,
    placeId: 44,
    title: "Discovering the charm of Doi Phu Kha National Park.",
    content:
      "My adventure to Doi Phu Kha National Park was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 850,
    view: 6116,
  },
  {
    id: 45,
    userId: 5,
    placeId: 45,
    title: "A delightful day at Phayao Lake.",
    content:
      "My adventure to Phayao Lake was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 299,
    view: 8574,
  },
  {
    id: 46,
    userId: 4,
    placeId: 46,
    title: "Discovering the charm of Wat Rong Khun (White Temple).",
    content:
      "My adventure to Wat Rong Khun (White Temple) was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 488,
    view: 11564,
  },
  {
    id: 47,
    userId: 2,
    placeId: 47,
    title: "Captivating moments at Pai Canyon.",
    content:
      "My adventure to Pai Canyon was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 553,
    view: 7668,
  },
  {
    id: 48,
    userId: 5,
    placeId: 48,
    title: "Captivating moments at Bueng Boraphet.",
    content:
      "During my visit to Bueng Boraphet, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1033,
    view: 4157,
  },
  {
    id: 49,
    userId: 5,
    placeId: 49,
    title: "Remarkable experiences at Huai Kha Khaeng Wildlife Sanctuary.",
    content:
      "During my visit to Huai Kha Khaeng Wildlife Sanctuary, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 756,
    view: 3693,
  },
  {
    id: 50,
    userId: 5,
    placeId: 50,
    title: "A wonderful escape to Kamphaeng Phet Historical Park.",
    content:
      "Kamphaeng Phet Historical Park offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 422,
    view: 6450,
  },
  {
    id: 51,
    userId: 5,
    placeId: 51,
    title: "Discovering the charm of Mae Sot Border Market.",
    content:
      "Mae Sot Border Market exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 821,
    view: 6592,
  },
  {
    id: 52,
    userId: 4,
    placeId: 52,
    title: "Captivating moments at Sukhothai Historical Park.",
    content:
      "My adventure to Sukhothai Historical Park was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 1157,
    view: 8392,
  },
  {
    id: 53,
    userId: 2,
    placeId: 53,
    title: "A delightful day at Phitsanulok Railway Station.",
    content:
      "My adventure to Phitsanulok Railway Station was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 424,
    view: 7776,
  },
  {
    id: 54,
    userId: 5,
    placeId: 54,
    title: "A wonderful escape to Wat Tha Luang.",
    content:
      "Wat Tha Luang exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 399,
    view: 8526,
  },
  {
    id: 55,
    userId: 3,
    placeId: 55,
    title: "Captivating moments at Khao Kho National Park.",
    content:
      "During my visit to Khao Kho National Park, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1101,
    view: 4748,
  },
  {
    id: 56,
    userId: 2,
    placeId: 56,
    title: "A peaceful visit to Damnoen Saduak Floating Market.",
    content:
      "Damnoen Saduak Floating Market exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 479,
    view: 2998,
  },
  {
    id: 57,
    userId: 4,
    placeId: 57,
    title: "A peaceful visit to Erawan National Park.",
    content:
      "During my visit to Erawan National Park, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1061,
    view: 10002,
  },
  {
    id: 58,
    userId: 2,
    placeId: 58,
    title: "Remarkable experiences at Wat Pa Lelai Worawihan.",
    content:
      "Visiting Wat Pa Lelai Worawihan was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 958,
    view: 6232,
  },
  {
    id: 59,
    userId: 3,
    placeId: 59,
    title: "A delightful day at Phutthamonthon.",
    content:
      "Visiting Phutthamonthon was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 741,
    view: 4581,
  },
  {
    id: 60,
    userId: 4,
    placeId: 60,
    title: "Unforgettable journey to Wat Chong Lom.",
    content:
      "My adventure to Wat Chong Lom was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 907,
    view: 8554,
  },
  {
    id: 61,
    userId: 2,
    placeId: 61,
    title: "Stunning views at Amphawa Floating Market.",
    content:
      "Amphawa Floating Market offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 624,
    view: 4696,
  },
  {
    id: 62,
    userId: 5,
    placeId: 62,
    title: "A wonderful escape to Cha-Am Beach.",
    content:
      "My adventure to Cha-Am Beach was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 1015,
    view: 1698,
  },
  {
    id: 63,
    userId: 2,
    placeId: 63,
    title: "Discovering the charm of Hua Hin Beach.",
    content:
      "My adventure to Hua Hin Beach was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 1539,
    view: 5737,
  },
  {
    id: 64,
    userId: 5,
    placeId: 64,
    title: "Captivating moments at Khao Luang National Park.",
    content:
      "During my visit to Khao Luang National Park, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 1091,
    view: 9164,
  },
  {
    id: 65,
    userId: 5,
    placeId: 65,
    title: "A peaceful visit to Railay Beach.",
    content:
      "My adventure to Railay Beach was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 835,
    view: 6249,
  },
  {
    id: 66,
    userId: 2,
    placeId: 66,
    title: "Discovering the charm of Similan Islands National Park.",
    content:
      "Similan Islands National Park offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 557,
    view: 13502,
  },
  {
    id: 67,
    userId: 3,
    placeId: 67,
    title: "My adventurous trip to Phuket Old Town.",
    content:
      "During my visit to Phuket Old Town, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 996,
    view: 10655,
  },
  {
    id: 68,
    userId: 5,
    placeId: 68,
    title: "Remarkable experiences at Ko Samui.",
    content:
      "Ko Samui exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1195,
    view: 9958,
  },
  {
    id: 69,
    userId: 3,
    placeId: 69,
    title: "My adventurous trip to Ko Surin National Park.",
    content:
      "Visiting Ko Surin National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 459,
    view: 14520,
  },
  {
    id: 70,
    userId: 5,
    placeId: 70,
    title: "Discovering the charm of Chumphon National Park.",
    content:
      "Chumphon National Park exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1151,
    view: 8125,
  },
  {
    id: 71,
    userId: 4,
    placeId: 71,
    title: "A peaceful visit to Hat Yai Municipal Park.",
    content:
      "Hat Yai Municipal Park offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 963,
    view: 7287,
  },
  {
    id: 72,
    userId: 2,
    placeId: 72,
    title: "Stunning views at Tarutao National Park.",
    content:
      "Visiting Tarutao National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 989,
    view: 5282,
  },
  {
    id: 73,
    userId: 3,
    placeId: 73,
    title: "Unforgettable journey to Hat Chao Mai National Park.",
    content:
      "Visiting Hat Chao Mai National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 679,
    view: 1659,
  },
  {
    id: 74,
    userId: 5,
    placeId: 74,
    title: "Captivating moments at Thale Noi Waterbird Park.",
    content:
      "Thale Noi Waterbird Park offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 844,
    view: 2986,
  },
  {
    id: 75,
    userId: 4,
    placeId: 75,
    title: "Exploring the beauty of Kru Se Mosque!",
    content:
      "Kru Se Mosque offered an incredibly relaxing experience with its stunning landscapes and welcoming locals. I loved the tranquility and the cultural insights I gained during my stay. Perfect for nature lovers!",
    budget: 566,
    view: 3911,
  },
  {
    id: 76,
    userId: 4,
    placeId: 76,
    title: "Captivating moments at Betong.",
    content:
      "My adventure to Betong was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 990,
    view: 9680,
  },
  {
    id: 77,
    userId: 2,
    placeId: 77,
    title: "My adventurous trip to Narathiwat.",
    content:
      "My adventure to Narathiwat was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 726,
    view: 6759,
  },
  {
    id: 78,
    userId: 2,
    placeId: 78,
    title: "Stunning views at Doi Phu Kha National Park.",
    content:
      "Visiting Doi Phu Kha National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 1430,
    view: 6191,
  },
  {
    id: 79,
    userId: 4,
    placeId: 79,
    title: "My adventurous trip to Wat Phra That Khao Noi.",
    content:
      "My adventure to Wat Phra That Khao Noi was remarkable! The unique scenery and vibrant atmosphere made this trip unforgettable. The locals were friendly, and I learned many interesting things. A must-see destination for travelers.",
    budget: 514,
    view: 5426,
  },
  {
    id: 80,
    userId: 5,
    placeId: 80,
    title: "Remarkable experiences at Sin Thao Rock Salt Pond.",
    content:
      "Sin Thao Rock Salt Pond exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1171,
    view: 9322,
  },
  {
    id: 81,
    userId: 3,
    placeId: 81,
    title: "Discovering the charm of Wat Phra That Chae Haeng.",
    content:
      "Wat Phra That Chae Haeng exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 643,
    view: 7949,
  },
  {
    id: 82,
    userId: 2,
    placeId: 82,
    title: "Unforgettable journey to Doi Phu Wae National Park.",
    content:
      "Visiting Doi Phu Wae National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 1484,
    view: 5555,
  },
  {
    id: 83,
    userId: 5,
    placeId: 83,
    title: "Captivating moments at Tambon Silapetch Farmstay Farmerschool.",
    content:
      "Tambon Silapetch Farmstay Farmerschool exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 1156,
    view: 9666,
  },
  {
    id: 84,
    userId: 4,
    placeId: 84,
    title: "A delightful day at Doi Samer Dao National Park.",
    content:
      "Visiting Doi Samer Dao National Park was an extraordinary experience. The historical significance and beautiful architecture were truly impressive. Everyone there was kind, making the experience very special.",
    budget: 1131,
    view: 2528,
  },
  {
    id: 85,
    userId: 4,
    placeId: 85,
    title:
      "A delightful day at Phu Fa Pattana (Development) Center Accommodation.",
    content:
      "Phu Fa Pattana (Development) Center Accommodation exceeded my expectations! I was fascinated by the unique blend of history and natural beauty. The experience was enriching and highly enjoyable. Definitely a memorable visit!",
    budget: 946,
    view: 6393,
  },
  {
    id: 86,
    userId: 5,
    placeId: 86,
    title: "A peaceful visit to Walking Street, Wat Phumin.",
    content:
      "During my visit to Walking Street, Wat Phumin, I enjoyed breathtaking views and a peaceful atmosphere. It was the perfect escape from daily life. The local people were welcoming, and the site provided excellent photo opportunities. I highly recommend visiting!",
    budget: 313,
    view: 9433,
  },
  {
    id: 87,
    userId: 5,
    placeId: 87,
    title: "Meeting Moo Deng, the cutest hippo at Khao Kheow!",
    content:
      "Visiting Moo Deng at Khao Kheow Open Zoo was an unforgettable experience. She was playful, adorable, and her rosy cheeks were even cuter in person. It's clear why she's become so popular—seeing her splash around brought genuine joy. Highly recommend for families and animal lovers!",
    budget: 450,
    view: 12500,
  },
];

const placeData = [
  {
    id: 1,
    name: "Wat Phra Kaew (Temple of the Emerald Buddha)",
    description:
      "The most sacred Buddhist temple in Thailand, located within the Grand Palace in Bangkok.",
    latitude: 13.75,
    longitude: 100.4917,
    provinceId: 1,
    districtId: 1,
    category: "temple",
  },
  {
    id: 2,
    name: "Ancient City (Muang Boran)",
    description:
      "An open-air museum featuring replicas of Thailand's historical and architectural landmarks.",
    latitude: 13.5458,
    longitude: 100.6139,
    provinceId: 2,
    districtId: 53,
    category: "historicalSite",
  },
  {
    id: 3,
    name: "Wat Phra Si Rattana Satsadaram (Wat Yai)",
    description:
      "A significant Buddhist temple in Nonthaburi, known for its beautiful architecture and historical importance.",
    latitude: 13.8569,
    longitude: 100.5186,
    provinceId: 3,
    districtId: 57,
    category: "temple",
  },
  {
    id: 4,
    name: "Wat Phra Dhammakaya",
    description:
      "A large and modern Buddhist temple known for its unique architecture and meditation practices.",
    latitude: 14.0722,
    longitude: 100.6219,
    provinceId: 4,
    districtId: 64,
    category: "temple",
  },
  {
    id: 5,
    name: "Wat Yai Chaimongkol",
    description:
      "A historical temple in Ayutthaya known for its large reclining Buddha image and chedi.",
    latitude: 14.3497,
    longitude: 100.5739,
    provinceId: 5,
    districtId: 70,
    category: "temple",
  },
  {
    id: 6,
    name: "Wat Muang",
    description:
      "Home to the largest sitting Buddha image in Thailand, located in Ang Thong.",
    latitude: 14.5936,
    longitude: 100.4181,
    provinceId: 6,
    districtId: 86,
    category: "temple",
  },
  {
    id: 7,
    name: "Phra Prang Sam Yot",
    description:
      "A Khmer-style temple in Lopburi known for its monkey inhabitants.",
    latitude: 14.8028,
    longitude: 100.6128,
    provinceId: 7,
    districtId: 93,
    category: "historicalSite",
  },
  {
    id: 8,
    name: "Wat Phra Non Chakkrasi Worawihan",
    description:
      "A temple in Sing Buri known for its large reclining Buddha image.",
    latitude: 14.8872,
    longitude: 100.4042,
    provinceId: 8,
    districtId: 104,
    category: "temple",
  },
  {
    id: 9,
    name: "Chai Nat Bird Park",
    description:
      "A large bird park in Chai Nat, home to a variety of bird species.",
    latitude: 15.1878,
    longitude: 100.1264,
    provinceId: 9,
    districtId: 110,
    category: "zooWildlife",
  },
  {
    id: 10,
    name: "Phra Phutthabat Woramahawihan",
    description: "A temple in Saraburi that houses a sacred Buddha footprint.",
    latitude: 14.8111,
    longitude: 100.7078,
    provinceId: 10,
    districtId: 126,
    category: "temple",
  },
  {
    id: 11,
    name: "Pattaya Beach",
    description:
      "A popular beach destination in Chonburi, known for its vibrant nightlife and water activities.",
    latitude: 12.9242,
    longitude: 100.8794,
    provinceId: 11,
    districtId: 134,
    category: "beachIsland",
  },
  {
    id: 12,
    name: "Suan Son Beach",
    description:
      "A peaceful beach in Rayong, known for its pine trees and relaxing atmosphere.",
    latitude: 12.6394,
    longitude: 101.3789,
    provinceId: 12,
    districtId: 142,
    category: "beachIsland",
  },
  {
    id: 13,
    name: "Namtok Phlio National Park",
    description:
      "A national park in Chanthaburi featuring waterfalls and lush forests.",
    latitude: 12.5694,
    longitude: 102.1694,
    provinceId: 13,
    districtId: 150,
    category: "nationalPark",
  },
  {
    id: 14,
    name: "Ko Chang",
    description:
      "A beautiful island in Trat, known for its white sandy beaches and clear waters.",
    latitude: 12.1167,
    longitude: 102.3167,
    provinceId: 14,
    districtId: 166,
    category: "beachIsland",
  },
  {
    id: 15,
    name: "Wat Sothonwararam Worawihan",
    description:
      "A revered temple in Chachoengsao, known for its beautiful architecture and sacred Buddha image.",
    latitude: 13.6706,
    longitude: 101.0825,
    provinceId: 15,
    districtId: 167,
    category: "temple",
  },
  {
    id: 16,
    name: "Khao Yai National Park",
    description:
      "A large national park in Prachin Buri, known for its diverse wildlife and scenic landscapes.",
    latitude: 14.3333,
    longitude: 101.3833,
    provinceId: 16,
    districtId: 179,
    category: "nationalPark",
  },
  {
    id: 17,
    name: "Sarika Waterfall",
    description:
      "A beautiful waterfall in Nakhon Nayok, surrounded by lush greenery.",
    latitude: 14.2889,
    longitude: 101.3417,
    provinceId: 17,
    districtId: 185,
    category: "nationalPark",
  },
  {
    id: 18,
    name: "Aranyaprathet Border Market",
    description:
      "A bustling border market in Sa Kaeo, offering a variety of goods from Thailand and Cambodia.",
    latitude: 13.6828,
    longitude: 102.5517,
    provinceId: 18,
    districtId: 194,
    category: "marketShopping",
  },
  {
    id: 19,
    name: "Wat Phra That Phanom",
    description:
      "A significant temple in Nakhon Ratchasima, known for its beautiful architecture and historical importance.",
    latitude: 16.9408,
    longitude: 104.7297,
    provinceId: 19,
    districtId: 212,
    category: "temple",
  },
  {
    id: 20,
    name: "Phanom Rung Historical Park",
    description:
      "A Khmer temple complex in Buriram, known for its intricate carvings and stunning architecture.",
    latitude: 14.5322,
    longitude: 102.9439,
    provinceId: 20,
    districtId: 236,
    category: "historicalSite",
  },
  {
    id: 21,
    name: "Prasat Hin Phimai",
    description: "A large and well-preserved Khmer temple complex in Surin.",
    latitude: 15.2289,
    longitude: 102.4889,
    provinceId: 21,
    districtId: 257,
    category: "historicalSite",
  },
  {
    id: 22,
    name: "Preah Vihear National Park",
    description:
      "A national park in Si Sa Ket, featuring the ancient Preah Vihear temple.",
    latitude: 14.6361,
    longitude: 104.6858,
    provinceId: 22,
    districtId: 273,
    category: "nationalPark",
  },
  {
    id: 23,
    name: "Sam Phan Bok",
    description:
      "The 'Grand Canyon of Thailand' along the Mekong River in Ubon Ratchathani, known for its unique rock formations.",
    latitude: 16.0594,
    longitude: 105.3561,
    provinceId: 23,
    districtId: 292,
    category: "viewpointScenic",
  },
  {
    id: 24,
    name: "Wat Phra That Kong Khao Noi",
    description:
      "An ancient chedi in Yasothon, known for its historical significance and beautiful architecture.",
    latitude: 15.7925,
    longitude: 104.1481,
    provinceId: 24,
    districtId: 317,
    category: "temple",
  },
  {
    id: 25,
    name: "Tat Ton National Park",
    description:
      "A national park in Chaiyaphum, featuring waterfalls and scenic hiking trails.",
    latitude: 16.1417,
    longitude: 102.0417,
    provinceId: 25,
    districtId: 326,
    category: "nationalPark",
  },
  {
    id: 26,
    name: "Phu Pha Yon National Park",
    description:
      "A national park in Amnat Charoen, known for its sandstone cliffs and forests.",
    latitude: 16.0239,
    longitude: 104.7931,
    provinceId: 26,
    districtId: 342,
    category: "nationalPark",
  },
  {
    id: 27,
    name: "Phu Thok",
    description:
      "A unique sandstone mountain in Bueng Kan with a series of wooden staircases leading to a temple on its summit.",
    latitude: 18.0678,
    longitude: 103.9669,
    provinceId: 27,
    districtId: 349,
    category: "viewpointScenic",
  },
  {
    id: 28,
    name: "Phu Kradueng National Park",
    description:
      "A popular national park in Nong Bua Lamphu, known for its scenic plateau and hiking trails.",
    latitude: 16.8667,
    longitude: 101.8167,
    provinceId: 28,
    districtId: 357,
    category: "nationalPark",
  },
  {
    id: 29,
    name: "Phu Wiang Dinosaur Museum",
    description:
      "A museum in Khon Kaen featuring dinosaur fossils and exhibits.",
    latitude: 16.6333,
    longitude: 102.3833,
    provinceId: 29,
    districtId: 378,
    category: "historicalSite",
  },
  {
    id: 30,
    name: "Red Lotus Lake (Nong Han Kumphawapi)",
    description: "A lake in Udon Thani known for its blooming red lotuses.",
    latitude: 17.1833,
    longitude: 103.0167,
    provinceId: 30,
    districtId: 392,
    category: "viewpointScenic",
  },
  {
    id: 31,
    name: "Phu Ruea National Park",
    description:
      "A national park in Loei, known for its cool climate and scenic mountain views.",
    latitude: 17.4833,
    longitude: 101.35,
    provinceId: 31,
    districtId: 415,
    category: "nationalPark",
  },
  {
    id: 32,
    name: "Wat Pho Chai",
    description:
      "A temple in Nong Khai, known for its beautiful architecture and sacred Buddha image.",
    latitude: 17.8731,
    longitude: 102.7381,
    provinceId: 32,
    districtId: 423,
    category: "temple",
  },
  {
    id: 33,
    name: "Khao Yai National Park (Maha Sarakham Side)",
    description:
      "Part of the Khao Yai National Park, offering diverse wildlife and natural landscapes.",
    latitude: 16.2,
    longitude: 102.35,
    provinceId: 33,
    districtId: 432,
    category: "nationalPark",
  },
  {
    id: 34,
    name: "Bueng Phalan Chai",
    description:
      "A large public park in Roi Et, featuring a lake and recreational facilities.",
    latitude: 16.05,
    longitude: 103.65,
    provinceId: 34,
    districtId: 445,
    category: "viewpointScenic",
  },
  {
    id: 35,
    name: "Lam Pao Dam",
    description:
      "A large reservoir in Kalasin, offering scenic views and recreational activities.",
    latitude: 16.5167,
    longitude: 103.5833,
    provinceId: 35,
    districtId: 465,
    category: "viewpointScenic",
  },
  {
    id: 36,
    name: "Phu Phan National Park",
    description:
      "A national park in Sakon Nakhon, known for its forests and rock formations.",
    latitude: 16.9,
    longitude: 104.1,
    provinceId: 36,
    districtId: 500,
    category: "nationalPark",
  },
  {
    id: 37,
    name: "Phra That Phanom",
    description:
      "A significant temple in Nakhon Phanom, known for its beautiful architecture and historical importance.",
    latitude: 16.9408,
    longitude: 104.7297,
    provinceId: 37,
    districtId: 505,
    category: "temple",
  },
  {
    id: 38,
    name: "Wat Phu Dan Tae",
    description:
      "A temple in Mukdahan, known for its hilltop location and panoramic views.",
    latitude: 16.5417,
    longitude: 104.7167,
    provinceId: 38,
    districtId: 513,
    category: "temple",
  },
  {
    id: 39,
    name: "Doi Inthanon National Park",
    description:
      "Home to Thailand's highest peak, offering scenic views and cool climate.",
    latitude: 18.5917,
    longitude: 98.4917,
    provinceId: 39,
    districtId: 520,
    category: "nationalPark",
  },
  {
    id: 40,
    name: "Wat Phra That Hariphunchai",
    description:
      "A significant temple in Lamphun, known for its historical importance and beautiful architecture.",
    latitude: 18.57,
    longitude: 99.0,
    provinceId: 40,
    districtId: 545,
    category: "temple",
  },
  {
    id: 41,
    name: "Wat Phra That Lampang Luang",
    description:
      "A significant temple in Lampang, known for its beautiful architecture and historical importance.",
    latitude: 18.25,
    longitude: 99.3833,
    provinceId: 41,
    districtId: 553,
    category: "temple",
  },
  {
    id: 42,
    name: "Sirikit Dam",
    description:
      "A large dam in Uttaradit, offering scenic views and recreational activities.",
    latitude: 17.65,
    longitude: 100.5833,
    provinceId: 42,
    districtId: 566,
    category: "viewpointScenic",
  },
  {
    id: 43,
    name: "Phrae Muang Phi Forest Park",
    description:
      "A forest park in Phrae, known for its unique rock formations and scenic views.",
    latitude: 18.15,
    longitude: 100.15,
    provinceId: 43,
    districtId: 575,
    category: "nationalPark",
  },
  {
    id: 44,
    name: "Doi Phu Kha National Park",
    description:
      "A national park in Nan, known for its scenic mountain views and diverse wildlife.",
    latitude: 19.1833,
    longitude: 100.9167,
    provinceId: 44,
    districtId: 583,
    category: "nationalPark",
  },
  {
    id: 45,
    name: "Phayao Lake",
    description:
      "A large freshwater lake in Phayao, offering scenic views and recreational activities.",
    latitude: 19.1667,
    longitude: 99.9167,
    provinceId: 45,
    districtId: 598,
    category: "viewpointScenic",
  },
  {
    id: 46,
    name: "Wat Rong Khun (White Temple)",
    description:
      "A unique and contemporary temple in Chiang Rai, known for its white color and intricate details.",
    latitude: 19.8292,
    longitude: 99.7619,
    provinceId: 46,
    districtId: 607,
    category: "temple",
  },
  {
    id: 47,
    name: "Pai Canyon",
    description:
      "A scenic canyon in Mae Hong Son, offering hiking trails and panoramic views.",
    latitude: 19.35,
    longitude: 98.4333,
    provinceId: 47,
    districtId: 627,
    category: "viewpointScenic",
  },
  {
    id: 48,
    name: "Bueng Boraphet",
    description:
      "The largest freshwater swamp in Thailand, located in Nakhon Sawan.",
    latitude: 15.7167,
    longitude: 100.1833,
    provinceId: 48,
    districtId: 632,
    category: "viewpointScenic",
  },
  {
    id: 49,
    name: "Huai Kha Khaeng Wildlife Sanctuary",
    description:
      "A large wildlife sanctuary in Uthai Thani, known for its diverse wildlife and forests.",
    latitude: 15.5,
    longitude: 99.3,
    provinceId: 49,
    districtId: 647,
    category: "zooWildlife",
  },
  {
    id: 50,
    name: "Kamphaeng Phet Historical Park",
    description:
      "A historical park in Kamphaeng Phet, featuring ancient ruins and temples.",
    latitude: 16.4833,
    longitude: 99.5167,
    provinceId: 50,
    districtId: 655,
    category: "historicalSite",
  },
  {
    id: 51,
    name: "Mae Sot Border Market",
    description:
      "A bustling border market in Tak, offering a variety of goods from Thailand and Myanmar.",
    latitude: 16.7167,
    longitude: 98.5667,
    provinceId: 51,
    districtId: 671,
    category: "marketShopping",
  },
  {
    id: 52,
    name: "Sukhothai Historical Park",
    description:
      "A historical park in Sukhothai, featuring ancient ruins and temples.",
    latitude: 17.0,
    longitude: 99.7,
    provinceId: 52,
    districtId: 675,
    category: "historicalSite",
  },
  {
    id: 53,
    name: "Phitsanulok Railway Station",
    description:
      "A landmark railway station in Phitsanulok, known for its historical architecture.",
    latitude: 16.8167,
    longitude: 100.25,
    provinceId: 53,
    districtId: 684,
    category: "historicalSite",
  },
  {
    id: 54,
    name: "Wat Tha Luang",
    description:
      "A significant temple in Phichit, known for its beautiful architecture and sacred Buddha image.",
    latitude: 16.4333,
    longitude: 100.35,
    provinceId: 54,
    districtId: 693,
    category: "temple",
  },
  {
    id: 55,
    name: "Khao Kho National Park",
    description:
      "A national park in Phetchabun, known for its scenic mountain views and cool climate.",
    latitude: 16.6167,
    longitude: 100.9833,
    provinceId: 55,
    districtId: 715,
    category: "nationalPark",
  },
  {
    id: 56,
    name: "Damnoen Saduak Floating Market",
    description:
      "A famous floating market in Ratchaburi, offering a unique shopping and dining experience.",
    latitude: 13.5167,
    longitude: 99.95,
    provinceId: 56,
    districtId: 719,
    category: "marketShopping",
  },
  {
    id: 57,
    name: "Erawan National Park",
    description:
      "A national park in Kanchanaburi, known for its beautiful seven-tiered waterfall.",
    latitude: 14.3833,
    longitude: 99.1333,
    provinceId: 57,
    districtId: 726,
    category: "nationalPark",
  },
  {
    id: 58,
    name: "Wat Pa Lelai Worawihan",
    description:
      "A significant temple in Suphan Buri, known for its beautiful architecture and sacred Buddha image.",
    latitude: 14.4667,
    longitude: 100.1167,
    provinceId: 58,
    districtId: 739,
    category: "temple",
  },
  {
    id: 59,
    name: "Phutthamonthon",
    description:
      "A large Buddhist park in Nakhon Pathom, featuring a large standing Buddha image.",
    latitude: 13.7833,
    longitude: 100.3167,
    provinceId: 59,
    districtId: 755,
    category: "temple",
  },
  {
    id: 60,
    name: "Wat Chong Lom",
    description:
      "A temple in Samut Sakhon, known for its unique architecture and coastal location.",
    latitude: 13.5333,
    longitude: 100.2833,
    provinceId: 60,
    districtId: 756,
    category: "temple",
  },
  {
    id: 61,
    name: "Amphawa Floating Market",
    description:
      "A popular floating market in Samut Songkhram, known for its evening atmosphere and firefly tours.",
    latitude: 13.42,
    longitude: 99.95,
    provinceId: 61,
    districtId: 761,
    category: "marketShopping",
  },
  {
    id: 62,
    name: "Cha-Am Beach",
    description:
      "A popular beach destination in Phetchaburi, known for its long sandy beach and family-friendly atmosphere.",
    latitude: 12.7833,
    longitude: 99.9667,
    provinceId: 62,
    districtId: 765,
    category: "beachIsland",
  },
  {
    id: 63,
    name: "Hua Hin Beach",
    description:
      "A popular beach destination in Prachuap Khiri Khan, known for its long sandy beach and royal history.",
    latitude: 12.5667,
    longitude: 99.95,
    provinceId: 63,
    districtId: 776,
    category: "beachIsland",
  },
  {
    id: 64,
    name: "Khao Luang National Park",
    description:
      "A national park in Nakhon Si Thammarat, known for its mountains and waterfalls.",
    latitude: 8.4167,
    longitude: 99.75,
    provinceId: 64,
    districtId: 778,
    category: "nationalPark",
  },
  {
    id: 65,
    name: "Railay Beach",
    description:
      "A scenic beach in Krabi, known for its limestone cliffs and rock climbing.",
    latitude: 8.0167,
    longitude: 98.8333,
    provinceId: 65,
    districtId: 801,
    category: "beachIsland",
  },
  {
    id: 66,
    name: "Similan Islands National Park",
    description:
      "A national park in Phang Nga, known for its beautiful islands and diving spots.",
    latitude: 8.6333,
    longitude: 97.65,
    provinceId: 66,
    districtId: 813,
    category: "nationalPark",
  },
  {
    id: 67,
    name: "Phuket Old Town",
    description:
      "A historic district in Phuket, known for its Sino-Portuguese architecture and colorful buildings.",
    latitude: 7.8833,
    longitude: 98.3833,
    provinceId: 67,
    districtId: 817,
    category: "historicalSite",
  },
  {
    id: 68,
    name: "Ko Samui",
    description:
      "A beautiful island in Surat Thani, known for its white sandy beaches and clear waters.",
    latitude: 9.5333,
    longitude: 99.9333,
    provinceId: 68,
    districtId: 823,
    category: "beachIsland",
  },
  {
    id: 69,
    name: "Ko Surin National Park",
    description:
      "A national park in Ranong, known for its beautiful islands and diving spots.",
    latitude: 9.4167,
    longitude: 97.8667,
    provinceId: 69,
    districtId: 843,
    category: "nationalPark",
  },
  {
    id: 70,
    name: "Chumphon National Park",
    description:
      "A national park in Chumphon, known for its beaches and islands.",
    latitude: 10.4833,
    longitude: 99.1833,
    provinceId: 70,
    districtId: 844,
    category: "nationalPark",
  },
  {
    id: 71,
    name: "Hat Yai Municipal Park",
    description:
      "A large park in Songkhla, featuring a lake, gardens, and recreational facilities.",
    latitude: 7.0,
    longitude: 100.4667,
    provinceId: 71,
    districtId: 862,
    category: "viewpointScenic",
  },
  {
    id: 72,
    name: "Tarutao National Park",
    description:
      "A national park in Satun, known for its beautiful islands and diving spots.",
    latitude: 6.6167,
    longitude: 99.6667,
    provinceId: 72,
    districtId: 868,
    category: "nationalPark",
  },
  {
    id: 73,
    name: "Hat Chao Mai National Park",
    description: "A national park in Trang, known for its beaches and islands.",
    latitude: 7.35,
    longitude: 99.3,
    provinceId: 73,
    districtId: 875,
    category: "nationalPark",
  },
  {
    id: 74,
    name: "Thale Noi Waterbird Park",
    description:
      "A large wetland area in Phatthalung, known for its diverse birdlife.",
    latitude: 7.6,
    longitude: 100.1667,
    provinceId: 74,
    districtId: 885,
    category: "zooWildlife",
  },
  {
    id: 75,
    name: "Kru Se Mosque",
    description:
      "A historic mosque in Pattani, known for its unique architecture and cultural significance.",
    latitude: 6.875,
    longitude: 101.25,
    provinceId: 75,
    districtId: 896,
    category: "historicalSite",
  },
  {
    id: 76,
    name: "Betong",
    description:
      "The southernmost town in Thailand, known for its cool climate and scenic mountain views.",
    latitude: 5.7667,
    longitude: 101.0667,
    provinceId: 76,
    districtId: 909,
    category: "viewpointScenic",
  },
  {
    id: 77,
    name: "Narathiwat",
    description:
      "Narathiwat is the southernmost province in Thailand, known for its cultural diversity and natural beauty.",
    latitude: 6.4333,
    longitude: 101.8167,
    provinceId: 77,
    districtId: 916,
    category: "viewpointScenic",
  },
  {
    id: 78,
    name: "Doi Phu Kha National Park (Alternate Viewpoint)",
    description: "Stunning nature, pink blossoms in February, campsite.",
    latitude: 19.20056,
    longitude: 101.08065,
    provinceId: 44,
    districtId: 583,
    category: "nationalPark",
  },
  {
    id: 79,
    name: "Wat Phra That Khao Noi",
    description:
      "Gold icon of a walking Buddha, The 15th-century temple, Sunset-viewing spot",
    latitude: 18.769818,
    longitude: 100.750495,
    provinceId: 44,
    districtId: 583,
    category: "temple",
  },
  {
    id: 80,
    name: "Sin Thao Rock Salt Pond",
    description:
      "The only one rock salt pond in the world, The ancient rock salt pond",
    latitude: 19.150311,
    longitude: 101.154931,
    provinceId: 44,
    districtId: 594,
    category: "historicalSite",
  },
  {
    id: 81,
    name: "Wat Phra That Chae Haeng",
    description:
      "The Royal Temple of King Rama IX, The ancient lanna temple, Fascinating architecture",
    latitude: 18.758243,
    longitude: 100.791668,
    provinceId: 44,
    districtId: 596,
    category: "temple",
  },
  {
    id: 82,
    name: "Doi Phu Wae National Park",
    description:
      "A land of majestic mountains and drifting mist., Unique local flora and rare plant species; Khor tree and the Dok Ku Lap Phan Pi (Thai Rose of the North)",
    latitude: 19.385833,
    longitude: 101.116667,
    provinceId: 44,
    districtId: 597,
    category: "nationalPark",
  },
  {
    id: 83,
    name: "Tambon Silapetch Farmstay Farmerschool",
    description:
      "A place to explore the art of rice cultivation through the hands-on wisdom of local villagers.",
    latitude: 19.1082,
    longitude: 100.943792,
    provinceId: 44,
    districtId: 587,
    category: "historicalSite",
  },
  {
    id: 84,
    name: "Doi Samer Dao National Park",
    description:
      "A popular camping site, Watching the stars at night, Watching the sea of mist at the sunrise",
    latitude: 18.376333,
    longitude: 100.827506,
    provinceId: 44,
    districtId: 586,
    category: "nationalPark",
  },
  {
    id: 85,
    name: "Phu Fa Pattana (Development) Center Accommodation",
    description:
      "A Royal Project of HRH Princess Maha Chakri Sirindhorn, A conservation-focused destination offering opportunities to experience natural wonders and immerse in local culture.",
    latitude: 19.024851,
    longitude: 101.20537,
    provinceId: 44,
    districtId: 594,
    category: "historicalSite",
  },
  {
    id: 86,
    name: "Walking Street, Wat Phumin",
    description:
      "A lively street lined with food stalls, everyday goods, clothing, and souvenirs.",
    latitude: 18.775341,
    longitude: 100.771599,
    provinceId: 44,
    districtId: 583,
    category: "marketShopping",
  },
  {
    id: 87,
    name: "Moo Deng, Khao Kheow Open Zoo",
    description:
      "The beloved pygmy hippopotamus known for her playful antics, viral fame, and rosy cheeks, attracting visitors worldwide.",
    latitude: 13.216356,
    longitude: 101.05646,
    provinceId: 11,
    districtId: 137,
    category: "zooWildlife",
  },
];

const commentsData = [
  {
    postId: 78,
    userId: 6,
    parentId: null,
    content:
      "Doi Phu Kha sounds amazing! The combination of history and nature must have been breathtaking. 😍",
  },
  {
    postId: 78,
    userId: 2,
    parentId: 1,
    content:
      "Absolutely! The blend of rich history and stunning natural beauty made it an unforgettable experience. Definitely a place worth visiting! 🌿✨",
  },
  {
    postId: 78,
    userId: 7,
    parentId: null,
    content:
      "I’ve heard so much about Doi Phu Kha! The architecture and scenery must make it such a unique destination. ✨",
  },
  {
    postId: 78,
    userId: 5,
    parentId: null,
    content:
      "Sounds like an incredible trip! The kindness of the people really adds so much to the experience. 😊",
  },
  {
    postId: 78,
    userId: 8,
    parentId: null,
    content:
      "What a wonderful place to visit! I’d love to learn more about the history and architecture there. 💫",
  },
  {
    postId: 84,
    userId: 7,
    parentId: null,
    content:
      "Doi Samer Dao sounds like an incredible place to visit! The mix of history and beauty must have been so enriching. 🌄✨",
  },
  {
    postId: 84,
    userId: 4,
    parentId: 6,
    content:
      "It really was! The architecture was so unique, and the views were breathtaking. Definitely a must-see destination! 😍",
  },
  {
    postId: 84,
    userId: 10,
    parentId: null,
    content:
      "Wow, this place looks amazing! The kindness of the people really adds to the whole experience. I’d love to visit one day! 😊",
  },
  {
    postId: 84,
    userId: 4,
    parentId: 8,
    content:
      "It was so heartwarming to meet such kind people! If you ever go, make sure to visit the historical sites too—they’re full of stories. 💬",
  },
  {
    postId: 31,
    userId: 14,
    parentId: null,
    content:
      "Phu Ruea National Park sounds like a dream! The mix of history and nature must have been so captivating. 😍🌿",
  },
  {
    postId: 31,
    userId: 9,
    parentId: null,
    content:
      "What a stunning place to visit! I can see why this would be so enriching. Definitely adding it to my travel list! 🌄",
  },
  {
    postId: 31,
    userId: 10,
    parentId: null,
    content:
      "Wow, this place looks incredible! The natural beauty combined with history makes it so unique. I’d love to visit one day! 🏞️✨",
  },
  {
    postId: 1,
    userId: 11,
    parentId: null,
    content:
      "Wat Phra Kaew sounds absolutely amazing! The vibrant atmosphere must have made the experience so magical. ✨",
  },
  {
    postId: 1,
    userId: 12,
    parentId: null,
    content:
      "Wow, this temple is definitely on my bucket list now! I can only imagine how stunning the views and atmosphere must have been. 🏯💖",
  },
  {
    postId: 1,
    userId: 15,
    parentId: 14,
    content:
      "Such a beautiful place to visit! The mix of history, culture, and friendly locals makes it sound like an unforgettable experience. 🌿",
  },
  {
    postId: 1,
    userId: 9,
    parentId: null,
    content:
      "I’ve always wanted to visit Wat Phra Kaew! The Emerald Buddha is so iconic, and it sounds like you had an amazing time. 😍",
  },
  {
    postId: 1,
    userId: 7,
    parentId: null,
    content:
      "It’s always great to visit a place with such rich history and culture. I’m sure the local friendliness added so much to your experience! 😊",
  },
  {
    postId: 69,
    userId: 7,
    parentId: null,
    content:
      "Ko Surin National Park looks amazing! The blend of history and nature must have made it such a unique experience. 🏝️✨",
  },
  {
    postId: 69,
    userId: 8,
    parentId: null,
    content:
      "I’ve heard great things about Ko Surin! The kindness of the people there really makes all the difference, doesn’t it? 😊",
  },
  {
    postId: 69,
    userId: 9,
    parentId: null,
    content:
      "Wow, it sounds like you had a truly unforgettable time! The historical significance and beautiful architecture must have been breathtaking. 🏛️💖",
  },
  {
    postId: 69,
    userId: 11,
    parentId: null,
    content:
      "Ko Surin must be a hidden gem! I bet the scenic views and warm locals made the trip so special. 🌿🌟",
  },
  {
    postId: 66,
    userId: 12,
    parentId: null,
    content:
      "Similan Islands sound like a paradise! The mix of tranquility and natural beauty must have been so refreshing. 🌊🌿",
  },
  {
    postId: 66,
    userId: 13,
    parentId: null,
    content:
      "It must have been so peaceful to unwind in such a beautiful place! The cultural insights sound like a great addition to the experience. 🏝️✨",
  },
  {
    postId: 66,
    userId: 14,
    parentId: null,
    content:
      "What an amazing getaway! I bet the welcoming locals made the experience even more special. 🌞🌴",
  },
  {
    postId: 87,
    userId: 14,
    parentId: null,
    content:
      "Moo Deng sounds like such a cutie! Her playful personality must have made the visit so fun. 🐄💖",
  },
  {
    postId: 87,
    userId: 15,
    parentId: null,
    content:
      "Her rosy cheeks sound like the perfect charm! I’ll definitely make sure to visit Khao Kheow Open Zoo next time I’m in the area. 🐄🌟",
  },
  {
    postId: 87,
    userId: 6,
    parentId: null,
    content:
      "Moo Deng sounds like such a character! The zoo must be an amazing place for families to visit. 🐾🌿",
  },
  {
    postId: 87,
    userId: 7,
    parentId: null,
    content:
      "How adorable! It must have been so special watching Moo Deng splash around. What a memorable experience! 🦓✨",
  },
];

const wishlistData = [
  // User 2 - 10 data
  { postId: 2, userId: 2 },
  { postId: 4, userId: 2 },
  { postId: 5, userId: 2 },
  { postId: 7, userId: 2 },
  { postId: 9, userId: 2 },
  { postId: 11, userId: 2 },
  { postId: 12, userId: 2 },
  { postId: 14, userId: 2 },
  { postId: 16, userId: 2 },
  { postId: 18, userId: 2 },

  // User 4 - 3 data
  { postId: 1, userId: 4 },
  { postId: 6, userId: 4 },
  { postId: 13, userId: 4 },

  // User 5 - 5 more data
  { postId: 3, userId: 5 },
  { postId: 8, userId: 5 },
  { postId: 10, userId: 5 },
  { postId: 17, userId: 5 },
  { postId: 19, userId: 5 },
];

const postImageData = [
  {
    postId: 1,
    url: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/62/2024/08/29074834/Emerald-Buddha.jpg",
  },
  {
    postId: 1,
    url: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/62/2024/08/29075839/bangkok-temple.jpg",
  },
  {
    postId: 1,
    url: "https://image.bangkokbiznews.com/uploads/images/md/2024/04/cJ5itd3nYLOZBjsjGN8s.webp",
  },
  {
    postId: 1,
    url: "https://static.thairath.co.th/media/Dtbezn3nNUxytg04aoTrWJbi0OE1tVlA6p2lMnWL9aNs5m.webp",
  },

  { postId: 2, url: "https://picsum.photos/id/103/800/600" },

  { postId: 3, url: "https://picsum.photos/id/104/800/600" },
  { postId: 3, url: "https://picsum.photos/id/105/800/600" },
  { postId: 3, url: "https://picsum.photos/id/106/800/600" },

  { postId: 4, url: "https://picsum.photos/id/107/800/600" },

  { postId: 5, url: "https://picsum.photos/id/108/800/600" },
  { postId: 5, url: "https://picsum.photos/id/109/800/600" },
  { postId: 5, url: "https://picsum.photos/id/110/800/600" },
  { postId: 5, url: "https://picsum.photos/id/111/800/600" },

  { postId: 6, url: "https://picsum.photos/id/112/800/600" },

  { postId: 7, url: "https://picsum.photos/id/113/800/600" },
  { postId: 7, url: "https://picsum.photos/id/114/800/600" },

  { postId: 8, url: "https://picsum.photos/id/115/800/600" },
  { postId: 8, url: "https://picsum.photos/id/116/800/600" },
  { postId: 8, url: "https://picsum.photos/id/117/800/600" },

  { postId: 9, url: "https://picsum.photos/id/118/800/600" },

  { postId: 10, url: "https://picsum.photos/id/119/800/600" },
  { postId: 10, url: "https://picsum.photos/id/120/800/600" },

  {
    postId: 11,
    url: "https://spacebar.th/_next/image?url=https%3A%2F%2Fcdn.spacebar.th%2Fhippopotamus_moo_deng_khao_kheow_open_zoo_fashion_t_shirts_SPACEBAR_Photo03_55534dd86d.jpg&w=3840&q=75",
  },
  {
    postId: 11,
    url: "https://roijang.com/wp-content/uploads/2022/09/shutterstock_1449822626-1.jpg",
  },
  {
    postId: 11,
    url: "https://www.gooutthailand.com/wp-content/uploads/2024/03/space-inspirium-6.webp",
  },
  {
    postId: 11,
    url: "https://www.gooutthailand.com/wp-content/uploads/2023/02/wat-khao-tabeak.jpg",
  },
  {
    postId: 11,
    url: "https://www.gooutthailand.com/wp-content/uploads/2023/02/Wat-Saen-Suk-1.jpg",
  },

  { postId: 12, url: "https://picsum.photos/id/122/800/600" },
  { postId: 12, url: "https://picsum.photos/id/123/800/600" },
  { postId: 13, url: "https://picsum.photos/id/124/800/600" },
  { postId: 14, url: "https://picsum.photos/id/125/800/600" },
  { postId: 14, url: "https://picsum.photos/id/126/800/600" },
  { postId: 14, url: "https://picsum.photos/id/127/800/600" },
  { postId: 14, url: "https://picsum.photos/id/128/800/600" },
  { postId: 14, url: "https://picsum.photos/id/129/800/600" },
  { postId: 15, url: "https://picsum.photos/id/130/800/600" },
  { postId: 16, url: "https://picsum.photos/id/131/800/600" },
  { postId: 17, url: "https://picsum.photos/id/132/800/600" },
  { postId: 17, url: "https://picsum.photos/id/133/800/600" },
  { postId: 17, url: "https://picsum.photos/id/134/800/600" },
  { postId: 17, url: "https://picsum.photos/id/135/800/600" },
  { postId: 17, url: "https://picsum.photos/id/136/800/600" },
  { postId: 18, url: "https://picsum.photos/id/137/800/600" },
  { postId: 19, url: "https://picsum.photos/id/138/800/600" },
  { postId: 20, url: "https://picsum.photos/id/139/800/600" },
  { postId: 20, url: "https://picsum.photos/id/140/800/600" },
  { postId: 20, url: "https://picsum.photos/id/141/800/600" },
  { postId: 20, url: "https://picsum.photos/id/142/800/600" },
  { postId: 21, url: "https://picsum.photos/id/143/800/600" },
  { postId: 21, url: "https://picsum.photos/id/144/800/600" },
  { postId: 22, url: "https://picsum.photos/id/145/800/600" },
  { postId: 22, url: "https://picsum.photos/id/146/800/600" },
  { postId: 22, url: "https://picsum.photos/id/147/800/600" },
  { postId: 22, url: "https://picsum.photos/id/148/800/600" },
  { postId: 22, url: "https://picsum.photos/id/149/800/600" },
  { postId: 23, url: "https://picsum.photos/id/150/800/600" },
  { postId: 23, url: "https://picsum.photos/id/151/800/600" },
  { postId: 23, url: "https://picsum.photos/id/152/800/600" },
  { postId: 23, url: "https://picsum.photos/id/153/800/600" },
  { postId: 24, url: "https://picsum.photos/id/154/800/600" },
  { postId: 25, url: "https://picsum.photos/id/155/800/600" },
  { postId: 25, url: "https://picsum.photos/id/156/800/600" },
  { postId: 25, url: "https://picsum.photos/id/157/800/600" },
  { postId: 25, url: "https://picsum.photos/id/158/800/600" },
  { postId: 26, url: "https://picsum.photos/id/159/800/600" },
  { postId: 26, url: "https://picsum.photos/id/160/800/600" },
  { postId: 26, url: "https://picsum.photos/id/161/800/600" },
  { postId: 27, url: "https://picsum.photos/id/162/800/600" },
  { postId: 27, url: "https://picsum.photos/id/163/800/600" },
  { postId: 27, url: "https://picsum.photos/id/164/800/600" },
  { postId: 28, url: "https://picsum.photos/id/165/800/600" },
  { postId: 28, url: "https://picsum.photos/id/166/800/600" },
  { postId: 28, url: "https://picsum.photos/id/167/800/600" },
  { postId: 29, url: "https://picsum.photos/id/168/800/600" },
  { postId: 29, url: "https://picsum.photos/id/169/800/600" },
  { postId: 29, url: "https://picsum.photos/id/170/800/600" },
  { postId: 29, url: "https://picsum.photos/id/171/800/600" },
  { postId: 29, url: "https://picsum.photos/id/172/800/600" },
  { postId: 30, url: "https://picsum.photos/id/173/800/600" },
  { postId: 30, url: "https://picsum.photos/id/174/800/600" },
  { postId: 30, url: "https://picsum.photos/id/175/800/600" },
  { postId: 30, url: "https://picsum.photos/id/176/800/600" },
  { postId: 31, url: "https://picsum.photos/id/177/800/600" },
  { postId: 32, url: "https://picsum.photos/id/178/800/600" },
  { postId: 32, url: "https://picsum.photos/id/179/800/600" },
  { postId: 32, url: "https://picsum.photos/id/180/800/600" },
  { postId: 33, url: "https://picsum.photos/id/181/800/600" },
  { postId: 34, url: "https://picsum.photos/id/182/800/600" },
  { postId: 34, url: "https://picsum.photos/id/183/800/600" },
  { postId: 34, url: "https://picsum.photos/id/184/800/600" },
  { postId: 34, url: "https://picsum.photos/id/185/800/600" },
  { postId: 34, url: "https://picsum.photos/id/186/800/600" },

  {
    postId: 35,
    url: "https://img.salehere.co.th/p/1200x0/2024/10/17/v4q368bwn2wq.jpg",
  },
  {
    postId: 35,
    url: "https://img.salehere.co.th/p/1200x0/2024/10/17/hsgso82inggi.jpg",
  },
  {
    postId: 35,
    url: "https://img.salehere.co.th/p/1200x0/2023/05/15/a7bk2b65uuyg.jpg",
  },
  {
    postId: 35,
    url: "https://mpics.mgronline.com/pics/Images/558000003769501.JPEG",
  },
  {
    postId: 35,
    url: "https://f.ptcdn.info/068/064/000/prs2sq69i8bZ4TfUbB4-o.jpg",
  },

  { postId: 36, url: "https://picsum.photos/id/190/800/600" },
  { postId: 36, url: "https://picsum.photos/id/191/800/600" },
  { postId: 36, url: "https://picsum.photos/id/192/800/600" },
  { postId: 36, url: "https://picsum.photos/id/193/800/600" },
  { postId: 36, url: "https://picsum.photos/id/194/800/600" },
  { postId: 37, url: "https://picsum.photos/id/195/800/600" },
  { postId: 37, url: "https://picsum.photos/id/196/800/600" },
  { postId: 37, url: "https://picsum.photos/id/197/800/600" },
  { postId: 37, url: "https://picsum.photos/id/198/800/600" },
  { postId: 38, url: "https://picsum.photos/id/199/800/600" },
  { postId: 38, url: "https://picsum.photos/id/200/800/600" },
  { postId: 38, url: "https://picsum.photos/id/201/800/600" },
  { postId: 38, url: "https://picsum.photos/id/202/800/600" },
  { postId: 38, url: "https://picsum.photos/id/203/800/600" },
  { postId: 39, url: "https://picsum.photos/id/204/800/600" },
  { postId: 39, url: "https://picsum.photos/id/205/800/600" },
  { postId: 40, url: "https://picsum.photos/id/206/800/600" },
  { postId: 40, url: "https://picsum.photos/id/207/800/600" },
  { postId: 41, url: "https://picsum.photos/id/208/800/600" },
  { postId: 41, url: "https://picsum.photos/id/209/800/600" },
  { postId: 41, url: "https://picsum.photos/id/210/800/600" },
  { postId: 41, url: "https://picsum.photos/id/211/800/600" },
  { postId: 42, url: "https://picsum.photos/id/212/800/600" },
  { postId: 42, url: "https://picsum.photos/id/213/800/600" },
  { postId: 42, url: "https://picsum.photos/id/214/800/600" },
  { postId: 42, url: "https://picsum.photos/id/215/800/600" },
  { postId: 42, url: "https://picsum.photos/id/216/800/600" },
  { postId: 43, url: "https://picsum.photos/id/217/800/600" },
  { postId: 43, url: "https://picsum.photos/id/218/800/600" },
  { postId: 43, url: "https://picsum.photos/id/219/800/600" },
  { postId: 44, url: "https://picsum.photos/id/220/800/600" },
  { postId: 44, url: "https://picsum.photos/id/221/800/600" },
  { postId: 44, url: "https://picsum.photos/id/222/800/600" },
  { postId: 44, url: "https://picsum.photos/id/223/800/600" },
  { postId: 44, url: "https://picsum.photos/id/224/800/600" },
  { postId: 45, url: "https://picsum.photos/id/225/800/600" },
  { postId: 45, url: "https://picsum.photos/id/226/800/600" },

  {
    postId: 46,
    url: "https://mediaim.expedia.com/destination/1/b2b932a4085070071017067c968054ea.jpg",
  },
  {
    postId: 46,
    url: "https://f.ptcdn.info/238/011/000/1382444728-DSC00752-o.jpg",
  },
  {
    postId: 46,
    url: "https://แท็กซี่เชียงราย.com/wp-content/uploads/2018/05/24799350_897187063778320_4446437608502318282_o.jpg",
  },
  {
    postId: 46,
    url: "https://www.ballthai.com/wp-content/uploads/2021/04/Singha-Stadium.jpg",
  },
  {
    postId: 46,
    url: "https://s.isanook.com/tr/0/ud/286/1430409/265494124_1082778869203438_90.jpg?ip/resize/w728/q80/jpg",
  },

  { postId: 47, url: "https://picsum.photos/id/229/800/600" },
  { postId: 47, url: "https://picsum.photos/id/230/800/600" },
  { postId: 47, url: "https://picsum.photos/id/231/800/600" },
  { postId: 47, url: "https://picsum.photos/id/232/800/600" },
  { postId: 47, url: "https://picsum.photos/id/233/800/600" },
  { postId: 48, url: "https://picsum.photos/id/234/800/600" },
  { postId: 48, url: "https://picsum.photos/id/235/800/600" },
  { postId: 48, url: "https://picsum.photos/id/236/800/600" },
  { postId: 48, url: "https://picsum.photos/id/237/800/600" },
  { postId: 48, url: "https://picsum.photos/id/238/800/600" },
  { postId: 49, url: "https://picsum.photos/id/239/800/600" },
  { postId: 49, url: "https://picsum.photos/id/240/800/600" },
  { postId: 49, url: "https://picsum.photos/id/241/800/600" },
  { postId: 49, url: "https://picsum.photos/id/242/800/600" },
  { postId: 50, url: "https://picsum.photos/id/243/800/600" },
  { postId: 50, url: "https://picsum.photos/id/244/800/600" },
  { postId: 50, url: "https://picsum.photos/id/245/800/600" },
  { postId: 51, url: "https://picsum.photos/id/246/800/600" },
  { postId: 51, url: "https://picsum.photos/id/247/800/600" },
  { postId: 51, url: "https://picsum.photos/id/248/800/600" },
  { postId: 51, url: "https://picsum.photos/id/249/800/600" },
  { postId: 51, url: "https://picsum.photos/id/250/800/600" },
  { postId: 52, url: "https://picsum.photos/id/251/800/600" },
  { postId: 52, url: "https://picsum.photos/id/252/800/600" },
  { postId: 52, url: "https://picsum.photos/id/253/800/600" },
  { postId: 53, url: "https://picsum.photos/id/254/800/600" },
  { postId: 53, url: "https://picsum.photos/id/255/800/600" },
  { postId: 53, url: "https://picsum.photos/id/256/800/600" },
  { postId: 54, url: "https://picsum.photos/id/257/800/600" },
  { postId: 54, url: "https://picsum.photos/id/258/800/600" },
  { postId: 54, url: "https://picsum.photos/id/259/800/600" },
  { postId: 54, url: "https://picsum.photos/id/260/800/600" },
  { postId: 55, url: "https://picsum.photos/id/261/800/600" },
  { postId: 56, url: "https://picsum.photos/id/262/800/600" },
  { postId: 56, url: "https://picsum.photos/id/263/800/600" },

  {
    postId: 57,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/ad/ac/54/caption.jpg?w=1400&h=-1&s=1",
  },
  {
    postId: 57,
    url: "https://www.riverkwairesotel.net/wp-content/uploads/2019/11/kwai-bridge.jpg.webp",
  },
  {
    postId: 57,
    url: "https://www.pelago.com/img/products/TH-Thailand/kanchanaburi-river-kwai-death-railway-tour/0508-0619_kanchanaburi-river-kwai-death-railway-tour-thailand-pelago0.jpg",
  },
  {
    postId: 57,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/e4/d6/96/caption.jpg?w=1800&h=1000&s=1",
  },
  {
    postId: 57,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/94/da/73/the-two-babies.jpg?w=1400&h=800&s=1",
  },

  { postId: 58, url: "https://picsum.photos/id/267/800/600" },
  { postId: 58, url: "https://picsum.photos/id/268/800/600" },
  { postId: 58, url: "https://picsum.photos/id/269/800/600" },
  { postId: 58, url: "https://picsum.photos/id/270/800/600" },
  { postId: 59, url: "https://picsum.photos/id/271/800/600" },
  { postId: 59, url: "https://picsum.photos/id/272/800/600" },
  { postId: 60, url: "https://picsum.photos/id/273/800/600" },
  { postId: 60, url: "https://picsum.photos/id/274/800/600" },
  { postId: 61, url: "https://picsum.photos/id/275/800/600" },
  { postId: 61, url: "https://picsum.photos/id/276/800/600" },
  { postId: 61, url: "https://picsum.photos/id/277/800/600" },
  { postId: 61, url: "https://picsum.photos/id/278/800/600" },
  { postId: 62, url: "https://picsum.photos/id/279/800/600" },
  { postId: 62, url: "https://picsum.photos/id/280/800/600" },
  { postId: 63, url: "https://picsum.photos/id/281/800/600" },
  { postId: 64, url: "https://picsum.photos/id/282/800/600" },
  { postId: 64, url: "https://picsum.photos/id/283/800/600" },
  { postId: 64, url: "https://picsum.photos/id/284/800/600" },
  { postId: 64, url: "https://picsum.photos/id/285/800/600" },
  { postId: 65, url: "https://picsum.photos/id/286/800/600" },

  {
    postId: 66,
    url: "https://www.sawasdeeandaman.com/wp-content/uploads/2020/09/14883576_1483595794990322_1258532841946902986_o.jpg",
  },
  {
    postId: 66,
    url: "https://img.kapook.com/u/2021/sutasinee/05/Koh-Panyee13.jpg",
  },
  {
    postId: 66,
    url: "https://f.tpkcdn.com/images-720/45bfd06d9754940f8b353ef89d39b74b.jpg",
  },
  {
    postId: 66,
    url: "https://cms.dmpcdn.com/travel/2020/12/29/e4b4c3e0-49cc-11eb-89e4-35f1a97d3869_original.jpg",
  },
  {
    postId: 66,
    url: "https://www.smilethailandtour.com/images/editor/179341097_158963452832657_3064183782855250575_n.jpg",
  },

  {
    postId: 67,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/44/6c/8c/palace-of-the-elephants.jpg?w=900&h=500&s=1",
  },
  {
    postId: 67,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/49/f6/e1/img-20171115-104952-largejpg.jpg?w=1000&h=600&s=1",
  },
  {
    postId: 67,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/11/31/ac/img-2531-largejpg.jpg?w=1400&h=-1&s=1",
  },
  {
    postId: 67,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/45/da/9e/caption.jpg?w=1400&h=800&s=1",
  },
  {
    postId: 67,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/a4/d0/06/photo0jpg.jpg?w=1100&h=700&s=1",
  },

  { postId: 68, url: "https://picsum.photos/id/291/800/600" },
  { postId: 68, url: "https://picsum.photos/id/292/800/600" },
  { postId: 68, url: "https://picsum.photos/id/293/800/600" },

  {
    postId: 69,
    url: "https://img.wongnai.com/p/1920x0/2018/12/28/77e5bb7fa7a045ba83a80c5150148e43.jpg",
  },
  {
    postId: 69,
    url: "https://img.wongnai.com/p/1920x0/2022/04/13/f9443cf64efc40db9996ec0a61a58653.jpg",
  },
  {
    postId: 69,
    url: "https://img.wongnai.com/p/1920x0/2024/09/17/e1ccfa325b9643ce89b851f9a9a4727e.jpg",
  },
  {
    postId: 69,
    url: "https://img.wongnai.com/p/1920x0/2018/12/28/e13c52e9ad6c4b41bcb31aaff77dfd29.jpg",
  },
  {
    postId: 69,
    url: "https://img.wongnai.com/p/1920x0/2018/12/31/a5ed08a06f8340109c383e014c568bdf.jpg",
  },

  { postId: 70, url: "https://picsum.photos/id/299/800/600" },
  { postId: 71, url: "https://picsum.photos/id/300/800/600" },
  { postId: 71, url: "https://picsum.photos/id/301/800/600" },
  { postId: 71, url: "https://picsum.photos/id/302/800/600" },
  { postId: 72, url: "https://picsum.photos/id/303/800/600" },
  { postId: 72, url: "https://picsum.photos/id/304/800/600" },
  { postId: 72, url: "https://picsum.photos/id/305/800/600" },
  { postId: 73, url: "https://picsum.photos/id/306/800/600" },
  { postId: 73, url: "https://picsum.photos/id/307/800/600" },
  { postId: 73, url: "https://picsum.photos/id/308/800/600" },
  { postId: 73, url: "https://picsum.photos/id/309/800/600" },
  { postId: 74, url: "https://picsum.photos/id/310/800/600" },
  { postId: 75, url: "https://picsum.photos/id/311/800/600" },
  { postId: 76, url: "https://picsum.photos/id/312/800/600" },
  { postId: 76, url: "https://picsum.photos/id/313/800/600" },
  { postId: 77, url: "https://picsum.photos/id/314/800/600" },
  { postId: 77, url: "https://picsum.photos/id/315/800/600" },
  { postId: 77, url: "https://picsum.photos/id/316/800/600" },
  { postId: 77, url: "https://picsum.photos/id/317/800/600" },
  { postId: 77, url: "https://picsum.photos/id/318/800/600" },
  {
    postId: 78,
    url: "https://f.tpkcdn.com/images-720/690c782e46c6c4f26e947f659424dfa1.jpg",
  },
  {
    postId: 78,
    url: "https://res.cloudinary.com/drcejgsvh/image/upload/v1742694423/landscape-with-mist-pha-tung-mountain_35977-1793_o8p7cc.avif",
  },
  {
    postId: 78,
    url: "https://res.cloudinary.com/drcejgsvh/image/upload/v1742694424/sea-mist-top-mountain-sunrise-sri-nan-national-park-nan-thailand_52075-336_vkzoyy.avif",
  },
  {
    postId: 78,
    url: "https://res.cloudinary.com/drcejgsvh/image/upload/v1742694424/morning-mist-doi-phu-kha-national-park-w-900_da7zsz.jpg",
  },

  {
    postId: 79,
    url: "https://www.prd.go.th/th/file/get/file/20240904e5b90d2ecf4bfd01d36c1b36343ff015144711.jpg",
  },
  {
    postId: 80,
    url: "https://img.wongnai.com/p/1920x0/2021/12/20/8fe0062008c940889982b07edf340048.jpg",
  },
  {
    postId: 81,
    url: "https://www.matichonweekly.com/wp-content/uploads/2023/04/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B8%E0%B9%81%E0%B8%8A%E0%B9%88%E0%B9%81%E0%B8%AB%E0%B9%89%E0%B8%87-cover-2227--1536x922.jpg",
  },
  {
    postId: 82,
    url: "https://travel.mthai.com/app/uploads/2015/01/10599529_822619207794473_5549047632274721127_n.jpg",
  },
  {
    postId: 83,
    url: "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/73364256_146545126737094_5127476148606861312_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFfT1Nockrw2TtkPjp_D-mbh3MxfgETh6WHczF-AROHpZDNpWWtArYq8ANzbPolCVU&_nc_ohc=brYxinJ0ty8Q7kNvgFx8Uz2&_nc_oc=AdkHY5iZYMacejy8apcYISjPiCvjdsLwpgxNUnyj5IE6JUUl2s72Dl1X91JFzecpDB4&_nc_zt=23&_nc_ht=scontent.fbkk5-3.fna&_nc_gid=3VBgPBoJuV-EQke_58Qvgg&oh=00_AYEmFwjZN7kJU7S9U1dhtmn_CtdCRU00bauo8O7jbrZKeQ&oe=68047935",
  },
  {
    postId: 84,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/89/fb/36/caption.jpg?w=2000&h=-1&s=1",
  },
  {
    postId: 85,
    url: "https://ak-d.tripcdn.com/images/1mk3u2234c2mi3ots4C26_C_1200_800_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
  },
  {
    postId: 86,
    url: "https://img.wongnai.com/p/1920x0/2023/01/07/25d994d81885413e959ec5948a317793.jpg",
  },
  {
    postId: 87,
    url: "https://res.cloudinary.com/drcejgsvh/image/upload/v1742688075/pexels-photo-17069254_wbfvcw.jpg",
  },
  {
    postId: 87,
    url: "https://images.pexels.com/photos/18441436/pexels-photo-18441436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    postId: 87,
    url: "https://images.pexels.com/photos/12000868/pexels-photo-12000868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    postId: 87,
    url: "https://images.pexels.com/photos/29973754/pexels-photo-29973754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    postId: 87,
    url: "https://images.pexels.com/photos/19155065/pexels-photo-19155065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

async function seedDB() {
  await prisma.user.createMany({
    data: userData,
  });

  await prisma.province.createMany({
    data: provinceData,
  });

  await prisma.district.createMany({
    data: districtData,
  });

  await prisma.place.createMany({
    data: placeData,
  });

  await prisma.post.createMany({
    data: postData,
  });

  await prisma.comment.createMany({
    data: commentsData,
  });

  await prisma.wishlist.createMany({
    data: wishlistData,
  });

  await prisma.postImage.createMany({
    data: postImageData,
  });
}

seedDB();
