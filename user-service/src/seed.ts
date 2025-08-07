// user-service/src/seed.ts
import { AppDataSource } from "./entity/data-source";
import { User } from "./entity/User";
import * as bcrypt from "bcrypt";

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOneBy({ email: "test@example.com" });
  if (!existing) {
    const user = new User();
    user.email = "test@example.com";
    user.password = await bcrypt.hash("123456", 10);
    await userRepo.save(user);
    console.log(" User created");
  } else {
    console.log("User already exists");
  }

  process.exit(0);
}

seed();
