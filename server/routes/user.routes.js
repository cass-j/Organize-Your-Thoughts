const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    
    app.get('/api', UserController.index);
    
    // user api routes
    app.get('/api/users', UserController.findAllUsers)
    app.get('/api/users/:id', UserController.findAUser)
    app.post('/api/users', UserController.createUser)
    app.put('/api/users/:id', UserController.updateUser)
    app.delete('/api/users/:id', UserController.deleteUser)
}