
import footImg1 from "../assets/food/AllData/footImg1.jpg";
import footImg2 from "../assets/food/AllData/footImg2.jpg";
import footImg3 from "../assets/food/AllData/footImg3.jpg";
import footImg4 from "../assets/food/AllData/footImg4.jpg";
import footImg5 from "../assets/food/AllData/footImg5.jpg";
import footImg6 from "../assets/food/AllData/footImg6.jpg";
import footImg7 from "../assets/food/AllData/footImg7.jpg";
import footImg8 from "../assets/food/AllData/footImg8.jpg";
import footImg9 from "../assets/food/AllData/footImg9.jpg";
import footImg10 from "../assets/food/AllData/footImg10.jpg";

import pagoda1 from "../assets/pagoda/pagoda1.jpg";
import pagoda2 from "../assets/pagoda/pagoda2.jpg";
import pagoda3 from "../assets/pagoda/pagoda3.jpg";
import pagoda4 from "../assets/pagoda/pagoda4.jpg";
import pagoda5 from "../assets/pagoda/pagoda5.jpg";

import hotal1 from "../assets/hotal/hotal1.jpg";
import hotal2 from "../assets/hotal/hotal2.jpg";
import hotal3 from "../assets/hotal/hotal3.jpg";
import hotal4 from "../assets/hotal/hotal4.jpg";
import hotal5 from "../assets/hotal/hotal5.jpg";


export const navItems = [
  { label: "Home", href: "#" },
  {
    label: "Category",
    submenu: true,
    sublinks: [
      { name: "Pagoda", link: "pagoda" },
      { name: "Food", link: "food" },
      { name: "Hotal", link: "hotal" },
    ],
    href: '#'
  },
  { label: "Service", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "contactUs" },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];

export const AllDemoDataFood = [
  { id: 1, title: "Coconut Noodle", description: "This is Food 1.", img: footImg1, location: "Magway", views: 188, rating: 4.5, favourite: true },
  {
    id: 2, title: "Si Htamin", description: "This is Food 2.", img: footImg2, location: "Magway", views: 188, rating: 4.5, favourite: false
  },
  { id: 3, title: "Palm Cake", description: "This is Food 3.", img: footImg3, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 4, title: "Sesame Candy", description: "This is Food 4.", img: footImg4, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 5, title: "Fried Cricket", description: "This is Food 5.", img: footImg5, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 6, title: "Hta Min Pound", description: "This is Food 6.", img: footImg6, location: "Magway", views: 188, rating: 4.5, favourite: true },
  { id: 7, title: "Nan Gyi Thoke", description: "This is Food 7.", img: footImg7, location: "Magway", views: 188, rating: 4.5, favourite: true },
  { id: 8, title: "Spicy Sour Chicken", description: "This is Food 8.", img: footImg8, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 9, title: "Lemon Salad", description: "This is Food 9.", img: footImg9, location: "Magway", views: 188, rating: 4.5, favourite: true },
  { id: 10, title: "Mont Lone Yay Paw", description: "This is Food 10.", img: footImg10, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 1, title: "Coconut Noodle", description: "This is Food 1.", img: footImg1, location: "Magway", views: 188, rating: 4.5, favourite: true },
  { id: 2, title: "Si Htamin", description: "This is Food 2.", img: footImg2, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 3, title: "Palm Cake", description: "This is Food 3.", img: footImg3, location: "Magway", views: 188, raing: 4.5, favourite: false },
  { id: 4, title: "Sesame Candy", description: "This is Food 4.", img: footImg4, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 5, title: "Fried Cricket", description: "This is Food 5.", mg: footImg5, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 6, title: "Hta Min Pound", description: "This is Food 6.", img: footImg6, location: "Magway", views: 188, rating: 4.5, favourite: true },
  { id: 7, title: "Nan Gyi Thoke", description: "This is Food 7.", img: footImg7, location: "Magway", views: 188, rating: 4.5, favourite: true },
  { id: 8, title: "Spicy Sour Chicken", description: "This is Food 8.", img: footImg8, location: "Magway", views: 188, rating: 4.5, favourite: false },
  { id: 9, title: "Lemon Salad", description: "This is Food 9.", img: footImg9, location: "Magway", views: 188, rating: 4.5, favourite: true },
  { id: 10, title: "Mont Lone Yay Paw", description: "This is Food 10.", img: footImg10, location: "Magway", views: 188, rating: 4.5, favourite: false },
];

export const AllDemoDataPagoda = [
  {
    id: 1,
    title: "Mya Tha Lon Pagoda",
    description:
      "According to legend, the pagoda was initially built by a wealthy man called U Baw Gyaw and his wife. It was raised from its original height of 55.5 feet (16.9 m) to a height of 87 feet (27 m) by King Saw Lu (1077-1084) of Bagan. The pagoda faced a huge earthquake in 1847 and it was rebuilt by the mayor of Magway, Min Din Min Hla Kyaw Gaung to the present height of approximately 104 feet (32 m). It is famous because The Bed of Buddha is placed inside it.",
    img: pagoda1,
    location: "Magway",
    rating: 5.0,
    views: 188,
    favourite: true
  },
  {
    id: 2,
    title: "Pagoda 2",
    description: "This is Pagoda 2.",
    img: pagoda2,
    location: "Location 2",
    rating: 4.8,
    views: 120,
    favourite: false
  },
  {
    id: 3,
    title: "Pagoda 3",
    description: "This is Pagoda 3.",
    img: pagoda3,
    location: "Location 3",
    rating: 4.5,
    views: 95,
    favourite: true
  },
  // { id: 4, title: "Pagoda4", img: pagoda4, viewers: 5, rate: 2.5, favourite: false },
  // { id: 5, title: "Pagoda5", img: pagoda5, viewers: 6, rate: 2.5, favourite: false },
];

export const AllDemoDataHotal = [
  {
    id: 1,
    title: "Hotal 1",
    description: "This is Hotal1.",
    img: hotal1,
    location: "Location 1",
    rating: 4.5,
    views: 95,
    favourite: true
  },
  {
    id: 2,
    title: "Hotal 2",
    description: "This is Hotal2.",
    img: hotal2,
    location: "Location 2",
    rating: 4.5,
    views: 95,
    favourite: true
  },
  {
    id: 3,
    title: "Hotal 3",
    description: "This is Hotal3.",
    img: hotal3,
    location: "Location 3",
    rating: 4.5,
    views: 95,
    favourite: true
  },
  {
    id: 4,
    title: "Hotal 4",
    description: "This is Hotal4.",
    img: hotal4,
    location: "Location 4",
    rating: 4.5,
    views: 95,
    favourite: true
  },
  {
    id: 5,
    title: "Hotal 5",
    description: "This is Hotal5.",
    img: hotal5,
    location: "Location 5",
    rating: 4.5,
    views: 95,
    favourite: true
  },

];

export const reviews = [
  {
    name: "AVan",
    rating: 4,
    date: "12-1-2025",
    content:
      "This pagoda is amazing. I enjoyed the serene environment and the architectural design was breathtaking.",
  },
  {
    name: "Kathrine",
    rating: 3,
    date: "3-5-2025",
    content:
      "A peaceful place but a bit crowded during weekends. Still worth a visit if you're nearby.",
  },
  {
    name: "Konny",
    rating: 2,
    date: "23-4-2025",
    content:
      "Not quite what I expected. Maintenance could be better. The location is beautiful, though.",
  },
];