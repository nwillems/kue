
var kue = require('../');

// create our job queue

var jobs = kue.createQueue();

// one minute

console.log("Patience, this is taking approx 2 minutes")

var minute = 60000; 
var seconds = 1000;

var email = {}

setTimeout(function(){ 
    console.log("Job created at: ", (new Date()));
    email = jobs.create('email', {
    title: 'Account renewal required'
  , to: 'tj@learnboost.com'
  , template: 'renewal-email'
}).save();}, (125*seconds));

//This below process call, will timeout!
jobs.processNew('email', function(job, done){
    console.log("Imediate", (new Date()), (job.data ? job.data : job));
    if(job.data)
        done();
});

setTimeout(function(){
    console.log("Started listening delayed on: ", (new Date()));
    jobs.processNew('email', function(job, done){
        console.log("Delayed", (new Date()), (job.data ? job.data : job));
        if(job.data)
            done();
    });
}, 60*seconds);

// start the UI
kue.app.listen(3000);
console.log('UI started on port 3000');

var now = new Date();
console.log("Approx started at: ", now);
