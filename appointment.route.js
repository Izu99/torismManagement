const express = require('express');
const appointmentRoutes = express.Router();

// Require the 'model' module and assign it to the variable 'Customer'
let Appointment = require('./Appoinment.model');
// Define a route for adding a new customer
appointmentRoutes.route('/add').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let appointment = new Appointment(req.body);
     // Save the new customer to the database
    appointment.save()
        .then(appointment => {
            // If the appointment was saved successfully, return a success message
            res.status(200).json({'appointment' : 'new appointment is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the appointment, return an error message
            res.status(400).send("Unable to save database")
        });
});

//get all details
// Define a route for getting all appointments
appointmentRoutes.route('/getall').get(function(req, res) {
    // Find all documents in the 'appointment' collection
    Appointment.find(function(err, registers) {
        if (err) {
            // If there was an error finding appointments, log the error to the console
            console.log(err);
            // If appointments were found successfully, return them as a JSON response
        } else {
            res.json(registers);
        }
    });
});




appointmentRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Appointment.findById(id, function (err,register){
        res.json(register);
    });
});
// Define a route for updating a appointment with a given id
appointmentRoutes.route('/update/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the appointment with the given id in the database
    Appointment.findById(id, function (err, appointment){
        if(!appointment)
         // If no appointment was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the appointment's fields with the new data from the request body
            appointment.aID = req.body.aID;
            appointment.Name = req.body.Name;
            appointment.Treatement = req.body.Treatement;
        
            
             // Save the updated appointment to the database
            appointment.save().then(business => {
                // If the appointment was updated successfully, return a success message
                res.json('Update Complete');
            })
                .catch(err =>{
                    // If there was an error updating the appointment, return an error message
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

// Define a DELETE route at '/delete/:id'
appointmentRoutes.route('/delete/:id').get(function(req,res){
    // Use the 'findByIdAndRemove' method of the 'appointment' model to delete a appointment by ID
    Appointment.findByIdAndRemove({_id:req.params.id}, function (err, appointment){
         // If there is an error, respond with the error message in JSON format
        if(err)res.json(err);
        // If the appointment is successfully deleted, respond with a success message in JSON format
        else res.json('Successfully Removed');
    });
});




appointmentRoutes.route('/regLogin').post(function (req, res) {
    // Retrieve email and password from the request body
    let email = req.body.email;
    let password = req.body.password;
    //let appointment = new appointment(req.body);
    // Log the login details for debugging purposes
    console.log("Your Login Details " + email + " " + password);
    // Use the 'findOne' method of the 'appointment' model to find a appointment with the specified email and password
    Appointment.findOne({ email: email, password: password }, function (err, appointment) {
        // If there is an error, respond with a 500 Internal Server Error message
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        // If no appointment is found with the specified email and password, respond with a 401 Unauthorized message
        } else if (!appointment) {
            res.status(401).send("Invalid Credentials");
        // If a appointment is found with the specified email and password, respond with a 200 OK message and the appointment object in JSON format
        } else {
            res.status(200).send({
                message: "Successful Login",
                appointment: appointment
            });
        }
    });
});





module.exports = appointmentRoutes;