const AccessControl = require('accesscontrol')
const ac = new AccessControl()

exports.roles = (function () {
    ac.grant("guest")
    .readAny("question")
    .readAny("reply")

    ac.grant("basic")
    .extend("guest")
    .createOwn("question")
    .updateOwn("question")
    .deleteOwn("question")
    .createAny("reply")
    .updateOwn("reply")
    .deleteOwn("reply")

    ac.grant("editor")
    .extend("basic")
    .updateAny("question")
    .deleteAny("question")
    .updateAny("reply")
    .deleteAny("reply")


    return ac
})()