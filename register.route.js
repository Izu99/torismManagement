const express = require('express');
const registerRoutes = express.Router();

// Require the 'register.model' module and assign it to the variable 'Customer'
let Customer = require('./register.model');
// Define a route for adding a new customer
registerRoutes.route('/add').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let customer = new Customer(req.body);
     // Save the new customer to the database
    customer.save()
        .then(customer => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'customer' : 'new Customer is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});

//get all details
// Define a route for getting all customers
registerRoutes.route('/getall').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Customer.find(function(err, registers) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(registers);
        }
    });
});





registerRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Customer.findById(id, function (err,register){
        res.json(register);
    });
});
// Define a route for updating a customer with a given id
registerRoutes.route('/update/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the customer with the given id in the database
    Customer.findById(id, function (err, customer){
        if(!customer)
         // If no customer was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the customer's fields with the new data from the request body
            customer.firstName = req.body.firstName;
            customer.lastName = req.body.lastName;
            customer.email = req.body.email;
            customer.countryCode = req.body.countryCode;
            customer.phoneNu = req.body.phoneNu;
            customer.nic = req.body.nic;
            customer.address = req.body.address;
            customer.nationality = req.body.nationality;
            customer.country = req.body.country;
            customer.password = req.body.password;
            customer.cpassword = req.body.cpassword;

             // Save the updated customer to the database
            customer.save().then(business => {
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

// Define a DELETE route at '/delete/:id'
registerRoutes.route('/delete/:id').get(function(req,res){
    // Use the 'findByIdAndRemove' method of the 'Customer' model to delete a customer by ID
    Customer.findByIdAndRemove({_id:req.params.id}, function (err, customer){
         // If there is an error, respond with the error message in JSON format
        if(err)res.json(err);
        // If the customer is successfully deleted, respond with a success message in JSON format
        else res.json('Successfully Removed');
    });
});



registerRoutes.route('/regLogin').post(function (req, res) {
    // Retrieve email and password from the request body
    let email = req.body.email;
    let password = req.body.password;
    //let customer = new Customer(req.body);
    // Log the login details for debugging purposes
    console.log("Your Login Details " + email + " " + password);
    // Use the 'findOne' method of the 'Customer' model to find a customer with the specified email and password
    Customer.findOne({ email: email, password: password }, function (err, customer) {
        // If there is an error, respond with a 500 Internal Server Error message
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        // If no customer is found with the specified email and password, respond with a 401 Unauthorized message
        } else if (!customer) {
            res.status(401).send("Invalid Credentials");
        // If a customer is found with the specified email and password, respond with a 200 OK message and the customer object in JSON format
        } else {
            res.status(200).send({
                message: "Successful Login",
                customer: customer
            });
        }
    });
});





module.exports = registerRoutes;