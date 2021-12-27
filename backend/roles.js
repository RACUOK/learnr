const AccessControl = require('accesscontrol')
const ac = new AccessControl()

exports.roles(function () {
    ac.grant("guest")
    .readAny("question")
    .readAny("reply")

    ac.grant("basic")
    .extend("guest")
    .createOwn("question")
    .updateOwn("question")
    .deleteOwn("question")


    return ac
})()