const UserController = require('../controllers/user.controller')
const ThoughtController = require('../controllers/thought.controller')

module.exports = (app) => {
    
    app.get('/api', UserController.index);
    
    // user api routes
    app.get('/api/users', UserController.findAllUsers)
    app.get('/api/users/:id', UserController.findAUser)
    app.get('/api/users/me', UserController.findMe)
    app.post('/api/users/:id', UserController.findAUser)
    app.post('/api/login/:username', UserController.loginUser)
    app.post('/api/users', UserController.createUser)
    app.put('/api/users/:id', UserController.updateUser)
    app.delete('/api/users/:id', UserController.deleteUser)
    
    // thoughts api routes
    app.get('/api/thoughts', ThoughtController.findAllThoughts)
    app.get('/api/thoughts/:id', ThoughtController.findAThought)
    app.post('/api/thoughts', ThoughtController.createThought)
    app.post('/api/thoughts/:id', ThoughtController.findAThought)
    app.put('/api/thoughts/:id', ThoughtController.updateThought)
    app.delete('/api/thoughts/:id', ThoughtController.forgetThought)
}



