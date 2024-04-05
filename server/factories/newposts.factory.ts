import { setSeederFactory } from "typeorm-extension";
import { Newspost, User } from "../entity";

export default setSeederFactory(Newspost, (faker, user: User) => {

  const newspost = new Newspost();
  newspost.header = faker.lorem.sentence();
  newspost.text = faker.lorem.paragraph();
  newspost.author = user;

  return newspost;
});
