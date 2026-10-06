import { PrismaClient, UserRole, PropertyType, PropertyStatus, VerificationStatus, BookingStatus, EmergencyReason, EmergencyStatus, LocalPartnerStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding development data...');

  await prisma.emergencyRequest.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.localPartner.deleteMany();
  await prisma.user.deleteMany();

  console.log('📦 Cleared existing data');

  const passwordHash = await bcrypt.hash('password123', 10);

  const host1 = await prisma.user.create({
    data: {
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@example.com',
      phone: '+919876543210',
      passwordHash,
      role: UserRole.HOST,
    },
  });

  const host2 = await prisma.user.create({
    data: {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+919876543211',
      passwordHash,
      role: UserRole.HOST,
    },
  });

  const host3 = await prisma.user.create({
    data: {
      name: 'Amit Singh',
      email: 'amit.singh@example.com',
      phone: '+919876543212',
      passwordHash,
      role: UserRole.HOST,
    },
  });

  const guest1 = await prisma.user.create({
    data: {
      name: 'Anjali Gupta',
      email: 'anjali.gupta@example.com',
      phone: '+919876543220',
      passwordHash,
      role: UserRole.GUEST,
    },
  });

  const guest2 = await prisma.user.create({
    data: {
      name: 'Vikram Mehta',
      email: 'vikram.mehta@example.com',
      phone: '+919876543221',
      passwordHash,
      role: UserRole.GUEST,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@gharstay.com',
      phone: '+919876543200',
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  const localPartner1 = await prisma.user.create({
    data: {
      name: 'Suresh Auto Driver',
      email: 'suresh.auto@example.com',
      phone: '+919876543230',
      passwordHash,
      role: UserRole.LOCAL_PARTNER,
    },
  });

  await prisma.localPartner.create({
    data: {
      userId: localPartner1.id,
      area: 'Jaipur City Center',
      status: LocalPartnerStatus.ACTIVE,
    },
  });

  console.log('👥 Created users');

  const amenities = await Promise.all([
    'WiFi', 'Air Conditioning', 'Heating', 'Kitchen', 'Washing Machine',
    'TV', 'Parking', 'Hot Water', 'Refrigerator', 'Microwave',
    'Iron', 'Hair Dryer', 'Essentials', 'Workspace', 'Fire Extinguisher',
    'Smoke Alarm', 'First Aid Kit', 'Security Cameras', 'Lock on Bedroom Door',
    'Private Entrance', 'Balcony', 'Garden', 'Pool', 'Gym', 'Elevator',
  ].map(name => prisma.amenity.create({ data: { name } })));

  console.log('🛋️ Created amenities');

  const properties = await Promise.all([
    prisma.property.create({
      data: {
        hostId: host1.id,
        title: 'Cozy Room Near Hawa Mahal',
        description: 'Beautiful private room in a heritage haveli, walking distance to Hawa Mahal and City Palace. Perfect for tourists exploring the Pink City.',
        city: 'Jaipur',
        locality: 'Johari Bazar',
        address: '123 Johari Bazar, Near Hawa Mahal, Jaipur 302001',
        latitude: 26.9239,
        longitude: 75.8267,
        pricePerNight: 1800,
        propertyType: PropertyType.PRIVATE_ROOM,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
            { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[1].id },
            { amenityId: amenities[6].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[11].id },
            { amenityId: amenities[16].id },
            { amenityId: amenities[17].id },
            { amenityId: amenities[19].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host1.id,
        title: 'Entire Heritage Haveli - 3 BHK',
        description: 'Spacious 3BHK heritage haveli with traditional Rajasthani architecture. Ideal for families attending weddings or large groups.',
        city: 'Jaipur',
        locality: 'Civil Lines',
        address: '45 Civil Lines, Jaipur 302006',
        latitude: 26.9124,
        longitude: 75.7873,
        pricePerNight: 8500,
        propertyType: PropertyType.ENTIRE_HOME,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
            { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
            { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
          ],
        },
        amenities: {
          create: amenities.slice(0, 15).map(a => ({ amenityId: a.id })),
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host2.id,
        title: 'Peaceful Room Near SMS Hospital',
        description: 'Quiet private room very close to SMS Hospital. Perfect for patients and attendants visiting for medical treatment. 24/7 assistance available.',
        city: 'Jaipur',
        locality: 'C-Scheme',
        address: '78 C-Scheme, Near SMS Hospital, Jaipur 302001',
        latitude: 26.9124,
        longitude: 75.7873,
        pricePerNight: 1200,
        propertyType: PropertyType.PRIVATE_ROOM,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
            { url: 'https://images.unsplash.com/photo-1560448075-6e8c9e7b8b4a?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[1].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[11].id },
            { amenityId: amenities[16].id },
            { amenityId: amenities[18].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host2.id,
        title: 'Modern Apartment in Udaipur Lake View',
        description: 'Stunning 2BHK apartment with lake view. Close to City Palace and Lake Pichola. Perfect for couples and small families.',
        city: 'Udaipur',
        locality: 'Chandpole',
        address: '56 Chandpole, Near Lake Pichola, Udaipur 313001',
        latitude: 24.5854,
        longitude: 73.7125,
        pricePerNight: 3500,
        propertyType: PropertyType.ENTIRE_HOME,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
            { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[1].id },
            { amenityId: amenities[3].id },
            { amenityId: amenities[5].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[8].id },
            { amenityId: amenities[11].id },
            { amenityId: amenities[18].id },
            { amenityId: amenities[19].id },
            { amenityId: amenities[22].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host2.id,
        title: 'Budget Room for Exam Students',
        description: 'Affordable private room near coaching centers and exam halls. Quiet environment for studying. Monthly discounts available.',
        city: 'Kota',
        locality: 'Talwandi',
        address: '12 Talwandi, Near Allen Career Institute, Kota 324005',
        latitude: 25.2138,
        longitude: 75.8648,
        pricePerNight: 800,
        propertyType: PropertyType.PRIVATE_ROOM,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[11].id },
            { amenityId: amenities[13].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host3.id,
        title: 'Homestay Near Golden Temple - Amritsar',
        description: 'Authentic Punjabi homestay experience. Walk to Golden Temple. Home-cooked meals available. Warm hospitality guaranteed.',
        city: 'Amritsar',
        locality: 'Golden Temple Road',
        address: '34 Golden Temple Road, Amritsar 143001',
        latitude: 31.6200,
        longitude: 74.8765,
        pricePerNight: 2200,
        propertyType: PropertyType.HOMESTAY,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800' },
            { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[1].id },
            { amenityId: amenities[3].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[11].id },
            { amenityId: amenities[16].id },
            { amenityId: amenities[19].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host3.id,
        title: 'Guest House Near Railway Station - Jodhpur',
        description: 'Clean and comfortable guest house rooms. 5 min walk from Jodhpur Junction. Great for early morning trains and business travelers.',
        city: 'Jodhpur',
        locality: 'Station Road',
        address: '89 Station Road, Near Jodhpur Junction, Jodhpur 342001',
        latitude: 26.2389,
        longitude: 73.0243,
        pricePerNight: 1500,
        propertyType: PropertyType.GUEST_HOUSE,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.PENDING,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[1].id },
            { amenityId: amenities[6].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[11].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host1.id,
        title: 'Riverside Cottage - Rishikesh',
        description: 'Peaceful cottage on the banks of Ganga. Ideal for yoga retreats, meditation, and spiritual seekers. Ganga view from balcony.',
        city: 'Rishikesh',
        locality: 'Tapovan',
        address: 'Tapovan, Near Ram Jhula, Rishikesh 249137',
        latitude: 30.0869,
        longitude: 78.2676,
        pricePerNight: 2800,
        propertyType: PropertyType.ENTIRE_HOME,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
            { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[3].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[11].id },
            { amenityId: amenities[18].id },
            { amenityId: amenities[19].id },
            { amenityId: amenities[21].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host3.id,
        title: 'Spare Room in Family Home - Varanasi',
        description: 'Comfortable room in a local family home near Assi Ghat. Experience authentic Banarasi culture. Home-cooked vegetarian meals available.',
        city: 'Varanasi',
        locality: 'Assi Ghat',
        address: 'Assi Ghat Road, Varanasi 221005',
        latitude: 25.3176,
        longitude: 82.9739,
        pricePerNight: 1000,
        propertyType: PropertyType.PRIVATE_ROOM,
        status: PropertyStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1560448204-603b3fc33d2e?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[11].id },
            { amenityId: amenities[16].id },
          ],
        },
      },
    }),
    prisma.property.create({
      data: {
        hostId: host2.id,
        title: 'Business Stay Near IT Park - Pune',
        description: 'Modern 1BHK apartment in Hinjewadi Phase 1. High-speed WiFi, dedicated workspace. Perfect for business travelers and remote workers.',
        city: 'Pune',
        locality: 'Hinjewadi',
        address: 'Rajiv Gandhi Infotech Park, Hinjewadi Phase 1, Pune 411057',
        latitude: 18.5915,
        longitude: 73.7389,
        pricePerNight: 2500,
        propertyType: PropertyType.ENTIRE_HOME,
        status: PropertyStatus.PENDING_VERIFICATION,
        verificationStatus: VerificationStatus.UNVERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' },
          ],
        },
        amenities: {
          create: [
            { amenityId: amenities[0].id },
            { amenityId: amenities[1].id },
            { amenityId: amenities[3].id },
            { amenityId: amenities[4].id },
            { amenityId: amenities[5].id },
            { amenityId: amenities[7].id },
            { amenityId: amenities[8].id },
            { amenityId: amenities[13].id },
            { amenityId: amenities[18].id },
          ],
        },
      },
    }),
  ]);

  console.log('🏠 Created properties');

  const booking1 = await prisma.booking.create({
    data: {
      propertyId: properties[0].id,
      guestId: guest1.id,
      checkIn: new Date('2025-02-15'),
      checkOut: new Date('2025-02-18'),
      guests: 2,
      totalAmount: 5400,
      status: BookingStatus.CONFIRMED,
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      propertyId: properties[3].id,
      guestId: guest2.id,
      checkIn: new Date('2025-03-01'),
      checkOut: new Date('2025-03-05'),
      guests: 1,
      totalAmount: 3200,
      status: BookingStatus.COMPLETED,
    },
  });

  console.log('📅 Created bookings');

  await prisma.review.create({
    data: {
      propertyId: properties[0].id,
      guestId: guest1.id,
      rating: 5,
      comment: 'Amazing stay! The host was very welcoming and the location is perfect for exploring Jaipur. Room was clean and comfortable.',
    },
  });

  await prisma.review.create({
    data: {
      propertyId: properties[0].id,
      guestId: guest2.id,
      rating: 4,
      comment: 'Great value for money. Close to all tourist spots. Would recommend!',
    },
  });

  await prisma.review.create({
    data: {
      propertyId: properties[3].id,
      guestId: guest2.id,
      rating: 5,
      comment: 'Perfect for my hospital visit. Very close to SMS Hospital and the host was very understanding of my situation.',
    },
  });

  await prisma.review.create({
    data: {
      propertyId: properties[4].id,
      guestId: guest1.id,
      rating: 4,
      comment: 'Good budget option for students. Quiet and clean. The host provides great study environment.',
    },
  });

  await prisma.review.create({
    data: {
      propertyId: properties[5].id,
      guestId: guest1.id,
      rating: 5,
      comment: 'Incredible homestay experience! The family treated us like their own. Food was amazing and Golden Temple is just a walk away.',
    },
  });

  console.log('⭐ Created reviews');

  await prisma.emergencyRequest.create({
    data: {
      guestId: guest1.id,
      city: 'Jaipur',
      locality: 'C-Scheme',
      purpose: EmergencyReason.HOSPITAL,
      description: 'Need accommodation near SMS Hospital for 3 nights. Mother admitted for surgery.',
      status: EmergencyStatus.FULFILLED,
    },
  });

  await prisma.emergencyRequest.create({
    data: {
      guestId: guest2.id,
      city: 'Udaipur',
      locality: 'City Center',
      purpose: EmergencyReason.UNEXPECTED_TRAVEL,
      description: 'Train cancelled, need urgent stay for tonight. 2 adults.',
      status: EmergencyStatus.IN_PROGRESS,
    },
  });

  await prisma.emergencyRequest.create({
    data: {
      city: 'Kota',
      locality: 'Talwandi',
      purpose: EmergencyReason.FAMILY_EMERGENCY,
      description: 'Family emergency, need place for 2 nights. 3 people.',
      status: EmergencyStatus.OPEN,
    },
  });

  console.log('🚨 Created emergency requests');

  console.log('✅ Seeding completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`   Users: 7 (3 hosts, 2 guests, 1 admin, 1 local partner)`);
  console.log(`   Properties: ${properties.length}`);
  console.log(`   Amenities: ${amenities.length}`);
  console.log(`   Bookings: 2`);
  console.log(`   Reviews: 5`);
  console.log(`   Emergency Requests: 3`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });