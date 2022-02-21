const { getAllUsers, editUser, deleteUser } = require("../routes/admin/user")

exports.plugin = {
    name : 'adminPlugin',
    register : async (server, options) => {
        server.route([
            {
                method : 'GET',
                path : '/getAllUsers',
                handler : getAllUsers,
                options : {
                    auth : false
                }
            },
            {
                method : 'POST',
                path : '/editUser',
                handler : editUser
            },
            {
                method : 'POST',
                path : '/deleteUser',
                handler : deleteUser
            }
        ])
    }
}