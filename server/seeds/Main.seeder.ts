import { type DataSource } from 'typeorm'
import { type Seeder, type SeederFactoryManager, runSeeder } from 'typeorm-extension'
import { NewspostsSeeders } from '.'

class MainSeeders implements Seeder {
  track?: boolean
  async run (
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeder(dataSource, NewspostsSeeders)
  }
}

export default MainSeeders
