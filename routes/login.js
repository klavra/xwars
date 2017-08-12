var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Connection to Database
var dbURI = 'mongodb://adminXwars:123456789@localhost:27017/xwars';
mongoose.connect(dbURI);

//Connection Events
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
	user: {type:String, require: true},
	email: {type:String, require: true},
	password: {type:String, require: true}
},{collection:'users'});

var userData = mongoose.model('userData',userDataSchema);

/*
var messageDataSchema = new Schema({
	email1: {type:String, require:true},
	email2: {type:String, require:true},
	message: {type:String, require:true}
},{collection:'messages'});

var structuresDataSchema = new Schema({
	email:  {type:String, require:true},
	constructionCenterLevel: {type:Number, require:true, min: 1, max: 100},
	investigationCenterLevel: {type:Number, require:true, min: 1, max: 100},
});

var resourcesSchema = new Schema({
	email: {type:String, require:true},
	steel: {type:Number, require:true}, 
	cristal: {type:Number, require:true},
	frubin: {type:Number, require:true}, 
	orizin: {type:Number, require:true},
	frurozin: {type:Number, require:true},
	gold: {type:Number, require:true}
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

module.exports = router;