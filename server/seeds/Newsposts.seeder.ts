import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Newspost, User } from "../entity";

class NewspostsSeeders implements Seeder {
  track?: boolean;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {

const userfacrory = factoryManager.get(User);
const user = await userfacrory.save();

    const newsposts = factoryManager.get(Newspost);

    if (!newsposts) {
      throw new Error("Newspost not created");
    }
    await newsposts.saveMany(20, { author: user });
  }
}

export default NewspostsSeeders;
