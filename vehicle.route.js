const express = require('express');
const vehicleRoutes = express.Router();

// Require the 'register.model' module and assign it to the variable 'Customer'
let Vehicle = require('./vehicle.model');
let OderVehicle = require('./OderVehicle.model');

// Define a route for adding a new customer
vehicleRoutes.route('/add').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let vehicle = new Vehicle(req.body);
     // Save the new customer to the database
     vehicle.save()
        .then(vehicle => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'vehicle' : 'new vehicle is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});


// Define a route for adding a new customer
vehicleRoutes.route('/oderadd').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let oderVehicle = new OderVehicle(req.body);
     // Save the new customer to the database
     OderVehicle.save()
        .then(vehicle => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'oderVehicle' : 'new Oder Vehicle is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});


//get all details
// Define a route for getting all customers
vehicleRoutes.route('/alloder').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    OderVehicle.find(function(err, vehicle) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(vehicle);
        }
    });
});



//get all details
// Define a route for getting all customers
vehicleRoutes.route('/vehicleGetAll').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Vehicle.find(function(err, vehicle) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(vehicle);
        }
    });
});





vehicleRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Vehicle.findById(id, function (err,register){
        res.json(register);
    });
});
// Define a route for updating a customer with a given id
vehicleRoutes.route('/Update/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the customer with the given id in the database
    Vehicle.findById(id, function (err, vehicle){
        if(!vehicle)
         // If no guide was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the guide's fields with the new data from the request body
            vehicle.vName = req.body.vName;
            vehicle.vType = req.body.vType;
            vehicle.vprice = req.body.vprice;
            vehicle.image = req.body.image;
            vehicle.description = req.body.description;
            vehicle.cNumber = req.body.cNumber;
       // Save the updated vehicle to the database
            vehicle.save().then(business => {
                // If the customer was updated successfully, return a success message
                res.json('Update Complete');
            })
                .catch(err =>{
                    // If there was an error updating the customer, return an error message
                    res.status(400).send("Unable to update data");
                });
        }
    });
});


vehicleRoutes.route('/delete/:id').get(function(req,res){
    Vehicle.findByIdAndRemove({_id:req.params.id}, function (err, customers){
        if(err)res.json(err);

        else res.json('Successfully Removed');
    });
});


vehicleRoutes.route('/oderdelete/:id').get(function(req,res){
    OderVehicle.findByIdAndRemove({_id:req.params.id}, function (err, customers){
        if(err)res.json(err);

        else res.json('Successfully Removed');
    });
});

// Define a route for updating a customer with a given id
vehicleRoutes.route('/oderupdate/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the customer with the given id in the database
    OderVehicle.findById(id, function (err, oderVehicle){
        if(!oderVehicle)
         // If no guide was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the guide's fields with the new data from the request body
            oderVehicle.OName = req.body.OName;
            oderVehicle.nic = req.body.nic;
            oderVehicle.email = req.body.email;
            oderVehicle.vehicle = req.body.vehicle;
            oderVehicle.price = req.body.price;
            oderVehicle.Qty = req.body.Qty;
            oderVehicle.status = req.body.status;


       // Save the updated oderVehicle to the database
            oderVehicle.save().then(business => {
                // If the customer was updated successfully, return a success message
                res.json('Update Complete');
            })
                .catch(err =>{
                    // If there was an error updating the customer, return an error message
                    res.status(400).send("Unable to update data");
                });
        }
    });
});



vehicleRoutes.route('/oderedit/:id').get(function (req,res){
    let id = req.params.id;
    OderVehicle.findById(id, function (err,register){
        res.json(register);
    });
});






module.exports = vehicleRoutes;