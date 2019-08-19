import * as database from 'server/services/database'
import { truncateAll } from 'server/utils/database'

function useDatabase() {
  beforeAll(async () => {
    await database.connect()
    await truncateAll()
  })

  beforeEach(async () => {
    await truncateAll()
  })

  afterAll(async () => {
    await database.disconnect()
  })
}

export default useDatabase
