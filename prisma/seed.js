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
  },
  {
    username: "bob",
    email: "bob@test.com",
    password: hashedPassword,
  },
  {
    username: "canny",
    email: "canny@test.com",
    password: hashedPassword,
  },
  {
    username: "danny",
    email: "danny@test.com",
    password: hashedPassword,
  },
];

const postData = [
  {
    id: 1,
    title: "A wonderful experience at Erawan Elephant Museum",
    content:
      "A great place to visit with family and friends. Lots of fun activities!",
    budget: 1459,
    userId: 5,
    placeId: 12,
  },
  {
    id: 2,
    title: "A must-visit place: Wat Phumin",
    content: "A hidden gem! Perfect for taking photos and enjoying nature.",
    budget: 1325,
    userId: 4,
    placeId: 20,
  },
  {
    id: 3,
    title: "Unforgettable moments at Khao Yai National Park",
    content: "If you love nature, this place is a must-visit!",
    budget: 1693,
    userId: 5,
    placeId: 6,
  },
  {
    id: 4,
    title: "My adventure at Wat Phumin",
    content:
      "Had an amazing time exploring this place. The atmosphere was incredible!",
    budget: 4181,
    userId: 2,
    placeId: 20,
  },
  {
    id: 5,
    title: "A day well spent at Khao Chang Phueak",
    content:
      "I was surprised by how much I enjoyed this trip. Definitely coming back again!",
    budget: 1621,
    userId: 5,
    placeId: 5,
  },
  {
    id: 6,
    title: "What I loved about Rom Hub Market",
    content: "A hidden gem! Perfect for taking photos and enjoying nature.",
    budget: 4682,
    userId: 3,
    placeId: 13,
  },
  {
    id: 7,
    title: "Unforgettable moments at Damnoen Saduak Floating Market",
    content:
      "A fantastic place for relaxation and sightseeing. Highly recommended!",
    budget: 3176,
    userId: 4,
    placeId: 2,
  },
  {
    id: 8,
    title: "A memorable trip to Khao Kho with family",
    content: "A hidden gem! Perfect for taking photos and enjoying nature.",
    budget: 4038,
    userId: 2,
    placeId: 8,
  },
  {
    id: 9,
    title: "Unforgettable moments at Khao Chang Phueak",
    content: "I enjoyed the beautiful views and peaceful surroundings.",
    budget: 743,
    userId: 3,
    placeId: 5,
  },
  {
    id: 10,
    title: "Relaxing and enjoying Wat Phumin",
    content:
      "I was surprised by how much I enjoyed this trip. Definitely coming back again!",
    budget: 4769,
    userId: 3,
    placeId: 20,
  },
  {
    id: 11,
    title: "What I loved about Khao Yai National Park",
    content:
      "The scenery was breathtaking, and the experience was unforgettable.",
    budget: 1680,
    userId: 2,
    placeId: 6,
  },
  {
    id: 12,
    title: "A wonderful experience at Koh Larn",
    content: "A hidden gem! Perfect for taking photos and enjoying nature.",
    budget: 1003,
    userId: 4,
    placeId: 10,
  },
  {
    id: 13,
    title: "A wonderful experience at Wat Phumin",
    content:
      "The scenery was breathtaking, and the experience was unforgettable.",
    budget: 3740,
    userId: 3,
    placeId: 20,
  },
  {
    id: 14,
    title: "A wonderful experience at Amphawa Floating Market",
    content:
      "I was surprised by how much I enjoyed this trip. Definitely coming back again!",
    budget: 1271,
    userId: 2,
    placeId: 18,
  },
  {
    id: 15,
    title: "A day well spent at Khao Chang Phueak",
    content: "If you love nature, this place is a must-visit!",
    budget: 2108,
    userId: 4,
    placeId: 5,
  },
  {
    id: 16,
    title: "A wonderful experience at Wat Phra Kaew",
    content:
      "A fantastic place for relaxation and sightseeing. Highly recommended!",
    budget: 3493,
    userId: 3,
    placeId: 14,
  },
  {
    id: 17,
    title: "A must-visit place: Rom Hub Market",
    content: "If you love nature, this place is a must-visit!",
    budget: 702,
    userId: 5,
    placeId: 13,
  },
  {
    id: 18,
    title: "An incredible journey to Amphawa Floating Market",
    content:
      "Had an amazing time exploring this place. The atmosphere was incredible!",
    budget: 4648,
    userId: 4,
    placeId: 18,
  },
  {
    id: 19,
    title: "A must-visit place: Koh Larn",
    content: "I enjoyed the beautiful views and peaceful surroundings.",
    budget: 3019,
    userId: 3,
    placeId: 10,
  },
  {
    id: 20,
    title: "What I loved about Khao Kho",
    content:
      "A great place to visit with family and friends. Lots of fun activities!",
    budget: 2270,
    userId: 4,
    placeId: 8,
  },
];

const placeData = [
  {
    id: 1,
    name: "Mon Bridge",
    description:
      "A famous wooden bridge in Sangkhla Buri, known for its scenic views and cultural significance.",
    latitude: 15.1522,
    longitude: 98.4569,
    provinceId: 57,
    districtId: 733,
  },
  {
    id: 2,
    name: "Damnoen Saduak Floating Market",
    description:
      "A vibrant floating market where vendors sell fresh produce and local delicacies.",
    latitude: 13.5221,
    longitude: 99.9544,
    provinceId: 56,
    districtId: 719,
  },
  {
    id: 3,
    name: "Wat Tham Sua",
    description:
      "A stunning temple situated on a hilltop with breathtaking views of the surrounding area.",
    latitude: 14.0335,
    longitude: 99.4881,
    provinceId: 57,
    districtId: 731,
  },
  {
    id: 4,
    name: "Cheow Lan Dam",
    description:
      "A picturesque reservoir in Khao Sok National Park, known for its emerald-green waters and limestone cliffs.",
    latitude: 8.9952,
    longitude: 98.8175,
    provinceId: 68,
    districtId: 828,
  },
  {
    id: 5,
    name: "Khao Chang Phueak",
    description:
      "A challenging hiking trail with rewarding panoramic views at the summit.",
    latitude: 14.7076,
    longitude: 98.3682,
    provinceId: 57,
    districtId: 732,
  },
  {
    id: 6,
    name: "Khao Yai National Park",
    description:
      "One of Thailand's largest national parks, home to diverse wildlife and beautiful waterfalls.",
    latitude: 14.4351,
    longitude: 101.3662,
    provinceId: 19,
    districtId: 218,
  },
  {
    id: 7,
    name: "Erawan Waterfall",
    description:
      "A multi-tiered waterfall with crystal-clear pools, perfect for swimming and relaxation.",
    latitude: 14.3723,
    longitude: 99.1441,
    provinceId: 57,
    districtId: 729,
  },
  {
    id: 8,
    name: "Khao Kho",
    description:
      "A mountain destination known for its cool climate, misty mornings, and stunning viewpoints.",
    latitude: 16.5782,
    longitude: 100.9977,
    provinceId: 55,
    districtId: 715,
  },
  {
    id: 9,
    name: "Bang Saen Beach",
    description:
      "A popular beach destination near Bangkok, ideal for a quick weekend getaway.",
    latitude: 13.2863,
    longitude: 100.9166,
    provinceId: 11,
    districtId: 131,
  },
  {
    id: 10,
    name: "Koh Larn",
    description:
      "A beautiful island near Pattaya with white sandy beaches and crystal-clear waters.",
    latitude: 12.9236,
    longitude: 100.7924,
    provinceId: 11,
    districtId: 134,
  },
  {
    id: 11,
    name: "Chao Lao Beach",
    description:
      "A quiet and relaxing beach in Chanthaburi, great for swimming and seafood dining.",
    latitude: 12.5262,
    longitude: 101.9253,
    provinceId: 13,
    districtId: 152,
  },
  {
    id: 12,
    name: "Erawan Elephant Museum",
    description:
      "A unique museum featuring a giant three-headed elephant statue and historical artifacts.",
    latitude: 13.6174,
    longitude: 100.5895,
    provinceId: 2,
    districtId: 51,
  },
  {
    id: 13,
    name: "Rom Hub Market",
    description:
      "A market famous for its train passing through the stalls, creating an exciting experience.",
    latitude: 13.4075,
    longitude: 99.9986,
    provinceId: 61,
    districtId: 759,
  },
  {
    id: 14,
    name: "Wat Phra Kaew",
    description:
      "The most sacred Buddhist temple in Thailand, located in the Grand Palace complex.",
    latitude: 13.7516,
    longitude: 100.4925,
    provinceId: 1,
    districtId: 1,
  },
  {
    id: 15,
    name: "Wat Mahathat",
    description:
      "An ancient temple in Ayutthaya, known for the Buddha head entwined in tree roots.",
    latitude: 14.3552,
    longitude: 100.5674,
    provinceId: 5,
    districtId: 70,
  },
  {
    id: 16,
    name: "Dream World Theme Park",
    description:
      "A popular amusement park with thrilling rides and themed attractions.",
    latitude: 13.9903,
    longitude: 100.6894,
    provinceId: 4,
    districtId: 65,
  },
  {
    id: 17,
    name: "Pai",
    description:
      "A charming town in the mountains, famous for its laid-back atmosphere and hot springs.",
    latitude: 19.3551,
    longitude: 98.4409,
    provinceId: 47,
    districtId: 627,
  },
  {
    id: 18,
    name: "Amphawa Floating Market",
    description:
      "A weekend floating market offering delicious street food and boat rides.",
    latitude: 13.4211,
    longitude: 99.9551,
    provinceId: 61,
    districtId: 761,
  },
  {
    id: 19,
    name: "Khao Ngu Stone Park",
    description:
      "A scenic park featuring limestone mountains and a peaceful lake.",
    latitude: 13.5637,
    longitude: 99.7931,
    provinceId: 56,
    districtId: 716,
  },
  {
    id: 20,
    name: "Wat Phumin",
    description:
      "A historic temple in Nan, known for its unique murals and architecture.",
    latitude: 18.7743,
    longitude: 100.7729,
    provinceId: 44,
    districtId: 583,
  },
];

const commentsData = [
  {
    postId: 1,
    userId: 2,
    parentId: null,
    content: "comment1",
  },
  {
    postId: 1,
    userId: 1,
    parentId: 1,
    content: "comment1.1",
  },
  {
    postId: 1,
    userId: 3,
    parentId: 1,
    content: "comment1.2",
  },
  {
    postId: 1,
    userId: 5,
    parentId: null,
    content: "comment2",
  },
  {
    postId: 1,
    userId: 1,
    parentId: 2,
    content: "comment2.1",
  },
  {
    postId: 2,
    userId: 3,
    parentId: null,
    content: "comment1",
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
}

seedDB();
