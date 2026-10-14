const vendors = [
  {
    id: "kafe-bilal",
    name: "Ayam Gepuk Top Global",
    location: "Mahallah Bilal, Block C",
    openHours: "10:00 AM - 8:00 PM",
    menu: [
      {
        id: "item-1",
        name: "Ayam Gepuk",
        description: "Fried chicken with sambal",
        price: 8,
        category: "Rice",
        available: true,
      },
      {
        id: "item-2",
        name: "Nasi Goreng",
        description: "Fried rice with chicken",
        price: 7,
        category: "Rice",
        available: true,
      },
      {
        id: "item-3",
        name: "Mie Goreng",
        description: "Fried noodles",
        price: 6,
        category: "Noodles",
        available: false,
      },
    ],
  },
  {
    id: "kafe-aminah",
    name: "Kafe Mahallah Aminah",
    location: "Mahallah Aminah, Ground Floor",
    openHours: "8:00 AM - 9:00 PM",
    isOpen: true,
    menu: [
      {
        id: "ami-1",
        name: "Nasi Ayam Penyet",
        description: "Smashed fried chicken with sambal and rice",
        price: 9,
        category: "Rice",
        available: true,
      },
      {
        id: "ami-2",
        name: "Air Bandung",
        description: "Rose syrup with milk",
        price: 3,
        category: "Drinks",
        available: true,
      },
    ],
  },
];

export default vendors;
