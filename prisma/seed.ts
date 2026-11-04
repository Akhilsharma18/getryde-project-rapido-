import { PrismaClient, UserRole, VehicleCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding GETRYDE initial database...");

  // 1. Initial Pricing Rules
  const categories = [
    {
      vehicleCategory: VehicleCategory.BIKE,
      baseFare: 30,
      perKmRate: 9,
      perMinuteRate: 1.5,
      minimumFare: 40,
      maximumFare: 800,
    },
    {
      vehicleCategory: VehicleCategory.AUTO,
      baseFare: 40,
      perKmRate: 15,
      perMinuteRate: 2.0,
      minimumFare: 60,
      maximumFare: 1500,
    },
    {
      vehicleCategory: VehicleCategory.CAR,
      baseFare: 80,
      perKmRate: 22,
      perMinuteRate: 3.0,
      minimumFare: 120,
      maximumFare: 4000,
    },
  ];

  for (const cat of categories) {
    await prisma.pricingRule.upsert({
      where: { vehicleCategory: cat.vehicleCategory },
      update: cat,
      create: cat,
    });
  }

  // 2. Platform Commission (15% flat)
  await prisma.platformCommission.createMany({
    data: [
      { percentage: 15, flatFee: 0, isActive: true },
    ],
    skipDuplicates: true,
  });

  // 3. Demo Admin User
  await prisma.user.upsert({
    where: { phone: "+919999900000" },
    update: {},
    create: {
      phone: "+919999900000",
      name: "GETRYDE Platform Administrator",
      email: "admin@getryde.in",
      role: UserRole.SUPER_ADMIN,
      isVerified: true,
    },
  });

  // 4. Demo Rider User
  await prisma.user.upsert({
    where: { phone: "+919876543210" },
    update: {},
    create: {
      phone: "+919876543210",
      name: "Aarav Sharma",
      email: "aarav@example.com",
      role: UserRole.RIDER,
      isVerified: true,
      riderProfile: {
        create: {
          preferredVehicle: VehicleCategory.AUTO,
          totalRides: 28,
          avgRating: 4.9,
        },
      },
    },
  });

  // 5. Demo Driver User
  await prisma.user.upsert({
    where: { phone: "+919845012345" },
    update: {},
    create: {
      phone: "+919845012345",
      name: "Rajesh Kumar",
      email: "rajesh.driver@example.com",
      role: UserRole.DRIVER,
      isVerified: true,
      driverProfile: {
        create: {
          status: "APPROVED",
          availability: "ONLINE",
          licenseNumber: "KA0320180004921",
          totalRides: 840,
          avgRating: 4.92,
          vehicles: {
            create: {
              category: VehicleCategory.AUTO,
              make: "Bajaj",
              model: "Compact RE 4S",
              year: 2023,
              color: "Yellow / Green",
              plateNumber: "KA-03-AA-9988",
              status: "APPROVED",
              isActive: true,
              seatingCapacity: 3,
            },
          },
        },
      },
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
