const previewData = [
  {
    id: 1,
    title: "Wireless Noise Cancelling Headphones",
    rating: 4.5,
    price: 149.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "Experience world-class sound and advanced noise cancellation with our latest wireless headphones.",
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Touch controls",
      "Bluetooth 5.0 connectivity",
      "Built-in voice assistant",
    ],
    specs: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "1.5 hours",
      Weight: "250g",
    },
    shipping:
      "Ships in 1-2 business days. Free shipping on orders over $50. Expedited options available at checkout.",
    reviews: [
      {
        name: "Jane D.",
        comment: "Amazing sound quality and great battery life!",
      },
      { name: "Mark T.", comment: "Love the comfort and noise cancellation." },
      { name: "Linda P.", comment: "Worth every penny, highly recommend!" },
    ],
    qa: [
      {
        question: "Does it support fast charging?",
        answer: "Yes, it charges fully in about 1.5 hours.",
      },
      {
        question: "Can I use it with a wired connection?",
        answer: "Yes, it includes an optional 3.5mm cable.",
      },
    ],
  },

  {
    id: 2,
    title: "Bluetooth Sports Earbuds",
    rating: 4.2,
    price: 59.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "Compact and sweat-resistant earbuds with great sound for workouts and on-the-go use.",
    features: [
      "Sweat-resistant",
      "6-hour battery life",
      "Built-in mic",
      "Bluetooth 5.1",
      "Secure fit",
    ],
    specs: {
      "Driver Size": "10mm",
      "Frequency Response": "20Hz - 18kHz",
      "Battery Life": "6 hours",
      "Charging Time": "1 hour",
      Weight: "50g",
    },
    shipping: "Ships in 24 hours. Free shipping on orders over $30.",
    reviews: [
      {
        name: "Alex B.",
        comment: "Great for running, lightweight and clear sound.",
      },
      {
        name: "Sonia P.",
        comment: "Battery lasts long enough for my gym sessions.",
      },
    ],
    qa: [
      {
        question: "Is it waterproof?",
        answer: "It's sweat-resistant but not fully waterproof.",
      },
      {
        question: "Does it work with iPhones?",
        answer: "Yes, it's compatible with all Bluetooth devices.",
      },
    ],
  },

  {
    id: 3,
    title: "Wired Over-Ear Studio Headphones",
    rating: 4.7,
    price: 99.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "Designed for studio professionals and audiophiles with unmatched clarity and comfort.",
    features: [
      "Closed-back design",
      "Detachable cable",
      "Comfortable cushions",
      "High-fidelity sound",
      '1/4" adapter included',
    ],
    specs: {
      "Driver Size": "50mm",
      "Frequency Response": "10Hz - 22kHz",
      "Battery Life": "N/A",
      "Charging Time": "N/A",
      Weight: "280g",
    },
    shipping: "Free 2-day shipping for studio gear.",
    reviews: [
      { name: "Rahul S.", comment: "Crystal clear sound and very durable." },
    ],
    qa: [
      {
        question: "Does it require batteries?",
        answer: "No, it's fully wired.",
      },
    ],
  },

  {
    id: 4,
    title: "Kids Wireless Headphones",
    rating: 4.0,
    price: 39.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "Safe, colorful, and volume-limited headphones perfect for children.",
    features: [
      "Volume-limiting technology",
      "Colorful design",
      "Wireless and wired modes",
      "Foldable",
      "8-hour battery life",
    ],
    specs: {
      "Driver Size": "30mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "8 hours",
      "Charging Time": "1 hour",
      Weight: "150g",
    },
    shipping: "Ships same day. Kid-safe packaging included.",
    reviews: [
      {
        name: "Priya G.",
        comment: "My kids love them and I love the volume cap!",
      },
    ],
    qa: [
      {
        question: "Can two kids share with a splitter?",
        answer: "Yes, it supports splitters.",
      },
    ],
  },

  {
    id: 5,
    title: "Gaming Headset with Mic",
    rating: 4.6,
    price: 89.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "Immersive 7.1 surround sound and clear mic make this perfect for gamers.",
    features: [
      "7.1 Surround Sound",
      "Detachable mic",
      "RGB lighting",
      "USB + 3.5mm support",
      "Memory foam padding",
    ],
    specs: {
      "Driver Size": "53mm",
      "Frequency Response": "15Hz - 25kHz",
      "Battery Life": "Wired",
      "Charging Time": "N/A",
      Weight: "320g",
    },
    shipping: "Standard delivery in 3 days. Free gaming stickers included.",
    reviews: [
      {
        name: "Arjun M.",
        comment: "Audio is epic for FPS games. Mic is super clear!",
      },
    ],
    qa: [
      {
        question: "Compatible with PS5?",
        answer: "Yes, via USB or 3.5mm jack.",
      },
    ],
  },

  {
    id: 6,
    title: "Premium ANC Earbuds",
    rating: 4.3,
    price: 129.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "True wireless ANC earbuds with touch control and case charging.",
    features: [
      "Active Noise Cancellation",
      "24-hour battery with case",
      "IPX4 water resistance",
      "USB-C fast charging",
      "Dual-mic for calls",
    ],
    specs: {
      "Driver Size": "9mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "24 hours (with case)",
      "Charging Time": "1.2 hours",
      Weight: "60g (with case)",
    },
    shipping: "Free delivery and returns within 7 days.",
    reviews: [
      {
        name: "Sneha K.",
        comment: "Perfect for travel and commute. ANC works great.",
      },
    ],
    qa: [
      {
        question: "Does the case support wireless charging?",
        answer: "No, only USB-C.",
      },
    ],
  },

  {
    id: 7,
    title: "Open-Ear Bone Conduction Headphones",
    rating: 4.0,
    price: 74.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "Safe and innovative design keeps your ears open while listening.",
    features: [
      "Bone conduction tech",
      "Open-ear design",
      "8-hour battery",
      "Water-resistant",
      "Lightweight build",
    ],
    specs: {
      "Driver Size": "N/A",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "8 hours",
      "Charging Time": "1.5 hours",
      Weight: "30g",
    },
    shipping: "Ships within 2 days. Fitness-friendly box.",
    reviews: [
      {
        name: "Tina Z.",
        comment:
          "Feels weird at first, but so comfortable and safe for outdoors.",
      },
    ],
    qa: [
      {
        question: "Can you wear glasses with it?",
        answer: "Yes, fits fine with glasses.",
      },
    ],
  },

  {
    id: 8,
    title: "Studio Reference Monitors",
    rating: 4.8,
    price: 249.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "Professional-grade over-ear headphones for critical audio production.",
    features: [
      "Flat frequency response",
      "Replaceable ear cushions",
      "Foldable design",
      "Detachable cable",
      "Pro-level monitoring",
    ],
    specs: {
      "Driver Size": "45mm",
      "Frequency Response": "5Hz - 35kHz",
      "Battery Life": "N/A",
      "Charging Time": "N/A",
      Weight: "290g",
    },
    shipping: "Premium shipping included. Audio engineer certified.",
    reviews: [
      {
        name: "Dev R.",
        comment: "Neutral sound, perfect for mixing and mastering.",
      },
    ],
    qa: [
      {
        question: "Does it color the sound?",
        answer: "No, it offers a flat response.",
      },
    ],
  },

  {
    id: 9,
    title: "Budget Wired Earphones",
    rating: 3.9,
    price: 9.99,
    image: "https://via.placeholder.com/500x500",
    description: "Affordable and reliable earphones with mic for daily use.",
    features: [
      "Built-in mic",
      "In-line controls",
      "Tangle-free wire",
      "3.5mm jack",
      "Lightweight design",
    ],
    specs: {
      "Driver Size": "8mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "N/A",
      "Charging Time": "N/A",
      Weight: "20g",
    },
    shipping: "Low-cost shipping available.",
    reviews: [
      {
        name: "Zaid K.",
        comment: "Good enough for calls and music at this price.",
      },
    ],
    qa: [
      {
        question: "Does it work with laptops?",
        answer: "Yes, with 3.5mm jack.",
      },
    ],
  },

  {
    id: 10,
    title: "Luxury Wood-Finish Headphones",
    rating: 4.9,
    price: 349.99,
    image: "https://via.placeholder.com/500x500",
    description:
      "High-end headphones with a real wood finish and audiophile-grade performance.",
    features: [
      "Hand-crafted wooden cups",
      "Natural acoustic tuning",
      "Balanced cables",
      "Detachable wire",
      "Luxury leather headband",
    ],
    specs: {
      "Driver Size": "52mm",
      "Frequency Response": "10Hz - 40kHz",
      "Battery Life": "N/A",
      "Charging Time": "N/A",
      Weight: "330g",
    },
    shipping: "Premium packaging and express delivery included.",
    reviews: [
      {
        name: "Nikita A.",
        comment: "Top-tier audio and absolutely beautiful craftsmanship.",
      },
    ],
    qa: [
      {
        question: "Are the wood parts real?",
        answer: "Yes, made from genuine walnut.",
      },
    ],
  },
];

const cartItems = [
  { name: "White School Shirt", price: 350, quantity: 2 },
  { name: "Navy Trousers", price: 400, quantity: 1 },
];

const totalPrice = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const user = {
  name: "Nilesh Pratap Singh",
  address: "123 CGC Lane, Punjab",
  phone: "790500198",
};

export { previewData, cartItems, totalPrice, user };
