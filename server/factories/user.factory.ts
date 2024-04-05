import { setSeederFactory } from 'typeorm-extension'
import crypto from 'crypto'
import { User } from '../entity'

export default setSeederFactory(User, (faker) => {
  const password = crypto.createHash('sha256').update('password').digest('hex')
  const user = new User()
  user.email = faker.internet.email()
  user.password = faker.internet.password(password)
  return user
})
