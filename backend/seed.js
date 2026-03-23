const mongoose = require('mongoose');
const dotenv = require('dotenv');
const City = require('./models/City');
const Place = require('./models/Place');
const User = require('./models/User');
const Review = require('./models/Review');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Sample city data for Indian cities
const citiesData = [
  {
    name: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    history: 'Mumbai, formerly known as Bombay, is the financial capital of India. It was originally a group of seven islands that were merged through land reclamation. The city has a rich colonial history, having been under Portuguese and British rule. Today, it is a bustling metropolis known for Bollywood, business, and its vibrant culture.',
    importance: 'Mumbai is India\'s financial hub, home to the Bombay Stock Exchange and numerous multinational corporations. It is also the heart of the Indian film industry (Bollywood) and a major port city. The city represents the economic aspirations of millions of Indians.',
    whyVisit: 'Mumbai offers a unique blend of colonial architecture, modern skyscrapers, beautiful beaches, and vibrant street food culture. Experience the energy of Bollywood, explore historic monuments, enjoy the scenic Marine Drive, and indulge in diverse culinary experiences.',
    howToReach: 'By Air: Chhatrapati Shivaji Maharaj International Airport (BOM) connects to major cities worldwide.\nBy Train: Mumbai Central and CST are major railway stations.\nBy Road: Well-connected via NH48 and other highways.\nLocal transport includes local trains, buses, taxis, and auto-rickshaws.',
    places: []
  },
  {
    name: 'Delhi',
    heroImage: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800',
    history: 'Delhi has been the capital of various empires throughout history, including the Mughal Empire and the British Raj. The city has been continuously inhabited for over 2,500 years. Old Delhi was the capital of the Mughal Empire, while New Delhi was built by the British as the imperial capital in 1911.',
    importance: 'Delhi is the capital of India and serves as the political and administrative center of the country. It houses the Parliament, Supreme Court, and various government ministries. The city is also a major cultural and historical hub, with numerous UNESCO World Heritage Sites.',
    whyVisit: 'Delhi is a treasure trove of history, culture, and architecture. Explore magnificent Mughal monuments, experience the bustling markets of Old Delhi, visit world-class museums, and savor the diverse street food. The city seamlessly blends ancient heritage with modern development.',
    howToReach: 'By Air: Indira Gandhi International Airport (DEL) is well-connected globally.\nBy Train: New Delhi Railway Station, Old Delhi Railway Station, and Hazrat Nizamuddin are major stations.\nBy Road: Connected via NH44, NH48, and other highways.\nMetro system provides excellent connectivity within the city.',
    places: []
  },
  {
    name: 'Jaipur',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800',
    history: 'Jaipur, also known as the Pink City, was founded in 1727 by Maharaja Sawai Jai Singh II. It is the capital of Rajasthan and was one of the first planned cities in India. The city was painted pink in 1876 to welcome the Prince of Wales, and the tradition continues today.',
    importance: 'Jaipur is a major tourist destination and part of the Golden Triangle tourist circuit (Delhi-Agra-Jaipur). It is known for its magnificent palaces, forts, and rich Rajput heritage. The city is also a hub for gemstones, jewelry, and handicrafts.',
    whyVisit: 'Jaipur offers a royal experience with its stunning palaces, majestic forts, and vibrant bazaars. Explore the architectural marvels, shop for traditional handicrafts and jewelry, experience Rajasthani culture, and enjoy the warm hospitality of the Pink City.',
    howToReach: 'By Air: Jaipur International Airport (JAI) connects to major Indian cities.\nBy Train: Jaipur Junction is well-connected to major cities.\nBy Road: Connected via NH48 and NH52.\nLocal transport includes buses, taxis, and auto-rickshaws.',
    places: []
  },
  {
    name: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    history: 'Goa was a Portuguese colony for over 450 years until it was liberated in 1961. The Portuguese influence is still visible in the architecture, cuisine, and culture. Goa has a unique blend of Indian and Portuguese heritage, making it culturally distinct from the rest of India.',
    importance: 'Goa is India\'s smallest state and a major tourist destination known for its beautiful beaches, vibrant nightlife, and Portuguese-influenced architecture. It is also known for its laid-back lifestyle, seafood cuisine, and numerous festivals. The state has a significant Christian population and is famous for its churches and cathedrals.',
    whyVisit: 'Goa offers pristine beaches, water sports, vibrant nightlife, and a relaxed atmosphere. Explore Portuguese colonial architecture, visit ancient churches, enjoy fresh seafood, and experience the unique Goan culture that blends Indian and Portuguese traditions.',
    howToReach: 'By Air: Goa International Airport (GOI) in Dabolim connects to major cities.\nBy Train: Madgaon and Vasco da Gama are major railway stations.\nBy Road: Well-connected via NH66.\nLocal transport includes buses, taxis, bikes, and scooters for rent.',
    places: []
  },
  {
    name: 'Varanasi',
    heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    history: 'Varanasi, also known as Kashi or Benares, is one of the oldest continuously inhabited cities in the world, with a history spanning over 3,000 years. It is considered one of the holiest cities in Hinduism and Buddhism. The city is mentioned in ancient Hindu texts and has been a center of learning and spirituality for millennia.',
    importance: 'Varanasi is the spiritual capital of India and a major pilgrimage site for Hindus. It is believed that dying in Varanasi leads to moksha (liberation). The city is also important for Buddhists as Buddha gave his first sermon at nearby Sarnath. Varanasi is renowned for its ghats, temples, and traditional silk weaving.',
    whyVisit: 'Varanasi offers a profound spiritual experience with its ancient ghats, sacred Ganga Aarti ceremonies, and numerous temples. Witness the cycle of life and death, explore narrow alleys filled with history, shop for Banarasi silk, and experience the timeless traditions of this holy city.',
    howToReach: 'By Air: Lal Bahadur Shastri International Airport (VNS) connects to major cities.\nBy Train: Varanasi Junction and Mughal Sarai are major stations.\nBy Road: Connected via NH2 and NH56.\nLocal transport includes cycle-rickshaws, auto-rickshaws, and boats.',
    places: []
  }
];

// Sample places data
const placesData = {
  Mumbai: [
    {
      name: 'Gateway of India',
      images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'],
      history: 'The Gateway of India is an arch monument built during the 20th century in Mumbai. It was erected to commemorate the landing of King George V and Queen Mary at Apollo Bunder on their visit to India in 1911.',
      importance: 'The Gateway of India is one of Mumbai\'s most iconic landmarks and a symbol of the city. It represents the colonial history and serves as a major tourist attraction.',
      howToReach: 'Located in South Mumbai, easily accessible by taxi, bus, or train to CST station. The nearest railway station is Chhatrapati Shivaji Maharaj Terminus (CST).',
      mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.123456789!2d72.8347!3d18.9220',
      safetyTips: ['Be cautious of pickpockets in crowded areas', 'Avoid visiting late at night', 'Keep belongings secure']
    },
    {
      name: 'Marine Drive',
      images: ['https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800'],
      history: 'Marine Drive is a 3.6-kilometer-long boulevard in South Mumbai. It was built in the 1920s and is known as the "Queen\'s Necklace" due to its curved shape and street lights that resemble a string of pearls.',
      importance: 'Marine Drive is Mumbai\'s most famous promenade and offers stunning views of the Arabian Sea. It\'s a popular spot for locals and tourists to relax and enjoy the sea breeze.',
      howToReach: 'Accessible by taxi, bus, or train. Nearest stations are Churchgate and Marine Lines.',
      mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.123456789!2d72.8200!3d18.9400',
      safetyTips: ['Be careful while walking near the sea', 'Avoid visiting during high tide', 'Keep an eye on your belongings']
    }
  ],
  Delhi: [
    {
      name: 'Red Fort',
      images: ['https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800'],
      history: 'The Red Fort was the main residence of the Mughal emperors for nearly 200 years. It was built by Shah Jahan in 1639 and is a UNESCO World Heritage Site.',
      importance: 'The Red Fort is a symbol of Mughal power and Indian independence. It\'s where the Prime Minister hoists the national flag on Independence Day.',
      howToReach: 'Located in Old Delhi, accessible by metro (Chandni Chowk station), bus, or taxi.',
      mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.123456789!2d77.2410!3d28.6562',
      safetyTips: ['Carry water and wear comfortable shoes', 'Be aware of touts', 'Keep tickets safe']
    },
    {
      name: 'India Gate',
      images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'],
      history: 'India Gate is a war memorial built in 1931 to honor the soldiers of the British Indian Army who died in World War I. It stands as a symbol of sacrifice and valor.',
      importance: 'India Gate is one of Delhi\'s most iconic landmarks and a popular gathering place. The surrounding area is beautifully landscaped and perfect for evening walks.',
      howToReach: 'Easily accessible by metro (Central Secretariat or Pragati Maidan stations), bus, or taxi.',
      mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.123456789!2d77.2295!3d28.6129',
      safetyTips: ['Be cautious in crowded areas', 'Watch out for traffic', 'Keep valuables secure']
    }
  ],
  Jaipur: [
    {
      name: 'Hawa Mahal',
      images: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800'],
      history: 'Hawa Mahal, or the Palace of Winds, was built in 1799 by Maharaja Sawai Pratap Singh. It features a unique five-story facade with 953 small windows.',
      importance: 'Hawa Mahal is one of Jaipur\'s most recognizable landmarks. Its unique architecture allows cool air to flow through, making it a natural air conditioning system.',
      howToReach: 'Located in the heart of Jaipur, accessible by auto-rickshaw, taxi, or bus.',
      mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.123456789!2d75.8267!3d26.9239',
      safetyTips: ['Wear comfortable shoes for climbing', 'Be cautious on narrow stairs', 'Carry water']
    }
  ]
};

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await City.deleteMany({});
    await Place.deleteMany({});
    console.log('Cleared existing data');

    // Create cities and places
    for (const cityData of citiesData) {
      // Create city
      const city = await City.create({
        name: cityData.name,
        heroImage: cityData.heroImage,
        history: cityData.history,
        importance: cityData.importance,
        whyVisit: cityData.whyVisit,
        howToReach: cityData.howToReach,
        places: []
      });

      // Create places for this city
      const cityPlaces = placesData[cityData.name] || [];
      for (const placeData of cityPlaces) {
        const place = await Place.create({
          cityId: city._id,
          name: placeData.name,
          images: placeData.images,
          history: placeData.history,
          importance: placeData.importance,
          howToReach: placeData.howToReach,
          mapLink: placeData.mapLink,
          safetyTips: placeData.safetyTips
        });

        // Add place to city
        city.places.push(place._id);
      }

      await city.save();
      console.log(`Created city: ${city.name} with ${cityPlaces.length} places`);
    }

    // Create sample reviews
    const allCities = await City.find();
    const sampleReviews = [
      {
        name: 'Sarah Johnson',
        rating: 5,
        message: 'Amazing experience! The travel guide helped me discover hidden gems I never would have found otherwise. Highly recommended!',
        cityId: allCities[0]?._id || null
      },
      {
        name: 'Michael Chen',
        rating: 5,
        message: 'Best travel resource I\'ve used. Detailed information, beautiful photos, and helpful safety tips. Made my trip planning so much easier!',
        cityId: allCities[1]?._id || null
      },
      {
        name: 'Emma Williams',
        rating: 4,
        message: 'Great platform with comprehensive city guides. The tourist places section is particularly helpful. Would love to see more cities added!',
        cityId: allCities[2]?._id || null
      },
      {
        name: 'David Brown',
        rating: 5,
        message: 'Incredible detail and accuracy. The how-to-reach sections saved me so much time. This is now my go-to travel planning tool!',
        cityId: allCities[0]?._id || null
      },
      {
        name: 'Priya Sharma',
        rating: 5,
        message: 'As a local, I can confirm the information is spot-on! The history sections are well-researched and the safety tips are very practical.',
        cityId: allCities[3]?._id || null
      }
    ];

    await Review.deleteMany({});
    for (const reviewData of sampleReviews) {
      if (reviewData.cityId) {
        await Review.create(reviewData);
      }
    }
    console.log(`Created ${sampleReviews.length} sample reviews`);

    // Create a default admin user (if not exists)
    const adminExists = await User.findOne({ email: 'rajdm1218@gmail.com' });
    if (!adminExists) {
      await User.create({
        name: 'Raj',
        email: 'rajdm1218@gmail.com',
        password: 'RajSin@1218',
        role: 'admin'
      });

    }

    console.log('Database seeded successfully!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();

