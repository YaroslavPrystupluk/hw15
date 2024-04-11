"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const entity_1 = require("../entity");
exports.default = (0, typeorm_extension_1.setSeederFactory)(entity_1.Newspost, (faker, user) => {
    const newspost = new entity_1.Newspost();
    newspost.title = faker.lorem.sentence();
    newspost.text = faker.lorem.paragraph();
    newspost.author = user;
    return newspost;
});
//# sourceMappingURL=newposts.factory.js.map