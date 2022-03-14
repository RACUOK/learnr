const AccessControl = require('accesscontrol')
const ac = new AccessControl()

exports.roles = (function () {

    ac.grant("basic")
    .createOwn("question")
    .updateOwn("question")
    .deleteOwn("question")
    .createOwn("reply")
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