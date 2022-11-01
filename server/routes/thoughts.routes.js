const ThoughtController = require('../controllers/thought.controller')

module.exports = (app) => {

    // thoughts api routes
    app.get('/api/thoughts', ThoughtController.findAllThoughts)
    app.get('/api/thoughts/:id', ThoughtController.findAThought)
    app.post('/api/thoughts', ThoughtController.createThought)
    app.put('/api/thoughts/:id', ThoughtController.updateThought)
    app.delete('/api/thoughts/:id', ThoughtController.forgetThought)
}

