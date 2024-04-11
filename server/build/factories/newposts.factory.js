"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_extension_1 = require("typeorm-extension");
var entity_1 = require("../entity");
exports.default = (0, typeorm_extension_1.setSeederFactory)(entity_1.Newspost, function (faker, user) {
    var newspost = new entity_1.Newspost();
    newspost.title = faker.lorem.sentence();
    newspost.text = faker.lorem.paragraph();
    newspost.author = user;
    return newspost;
});
//# sourceMappingURL=newposts.factory.js.map