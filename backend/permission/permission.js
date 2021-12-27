const {roles} = require('../roles')
const AccessControl = require('accesscontrol')

exports.grantAccess = function(action, resource) {
    return async (req,res,next) => {
        try{
            permission = roles.can(req.user.userRole)[action](resource)
            if (!permission.granted) {
                return res.status(401).json({error: "You don't have permission"})
            }
            next()
        } catch(error) {
            next(error)
        }
    }
}