// Load the express module
const express = require("express");
const app = express();

// Load the dotenv module that allows us to load environmental variables from .env file
const dotenv = require("dotenv");

// Load the model for TodoTask
const TodoTask = require("./models/ToDoTask");

// Load the content from the .env file
dotenv.config();

// Load in the mongoose module that allows us to interact with the mongodb
const mongoose = require("mongoose");

// Load in the nodemailer module that allows our webpage to send email to dedicate address
const nodemailer = require('nodemailer');

// Create the transporter for email sending
const transporter = nodemailer.createTransport({
    // Use gmail as a host
    host: 'smtp.gmail.com',
    auth: {
        // Email address of the sender
        user: 'homeworktestbedchen@gmail.com',
        // Using Google App password since less secure access is no longer available for gmail
        pass: 'cakmgitixtbytzkm'
    }
});

// Connect to the mongodb using the credentials
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    // Output connection success message if successfully connected
    console.log("Conection to Mongodb database is successful!");
    // Host the app on port 3000 of the local server
    app.listen(process.env.PORT || 5000);
});

// Link with the resource under public
app.use("/static", express.static("public"));

// urlencoded allow us to extract data from the submitted form
// The data can be found from the body attribute of the request
app.use(express.urlencoded({ extended: true }));

// Load the view (the layout of the todo app) from the ejs files under the views folder
app.set("view engine", "ejs");

// GET method for rendering the todo app page using the view (layout) in todo.ejs 
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        // pass the todoTasks object as argument tasks to the ejs file
        res.render("todo.ejs", { todoTasks: tasks });
    });
 });

// POST method for adding entered task into the mongodb database
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });

    // If insertion request is successful delivered
    // Try waiting for the insertion complete and redirect to the main page
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
    // If error happened, redirect to the main page
        res.redirect("/");
    }
});

// POST method for sending current list of TODO items to the entered email address
app.post('/email/', async (req, res) => {
    // Construct the email content, which is a list of current TODO items
    var email_content = await "Your TODO List:\n\n";
    TodoTask.find({}, (err, tasks) => {
        var i = 0;
        // Iterate through all items and add them to the content
        tasks.forEach(element => {
            i += 1;
            email_content = email_content + i +". " + element.content + "\n";    
        });;

        email_content += "\nBest,\n\nYour TODO APP";
        
        // Configure the mail options
        var mailOptions = {
            // Email sent from testbed email address
            from: 'homeworktestbedchen@gmail.com',
            // To the entered email address from users
            to: req.body.email_address,
            // With a subject of 'A copy of your TODO List'
            subject: 'A copy of your TODO List!',
            // And list of TODO items as content
            text: email_content
        };
        
        // Try sending the mail with configured mail options above
        try {
            transporter.sendMail(mailOptions, function(error, info){
                // If an error occured output the error in log
                if (error) {
                    console.log(error);
                } else {
                    // If success, output the successful message
                    console.log('Email sent: ' + info.response);
                }
            });
            // Redirect to the main page
            res.redirect("/");
        }
        catch(err) {
            res.redirect("/");
        }
    });
});

// Get & Post method for editing the TODO item, use /edit/:id (Todo Task id in mongo database) as the route
app.route("/edit/:id").get((req, res) => {
    // Get the id of the editing todo item from the request body
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        // Pass the todoTasks objects and id of editing item to the todoEdit.ejs
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
}).post((req, res) => {
    // Post method for updating the edited todo items to the mongo database
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        // If an error occurs send error code 500 back to user
        if (err) return res.send(500, err);
        // Redirect to the main page
        res.redirect("/");
    });
});

// Get method for deleting an todo item
app.route("/remove/:id").get((req, res) => {
    // Get the id of the item that users want to delete
    const id = req.params.id;
    // Find that item and delete it from the mongodb collection
    TodoTask.findByIdAndRemove(id, err => {
        // If an error occurs send the error code 500 to the users
        if (err) return res.send(500, err);
        // Redirect to the main page
        res.redirect("/");
    });
});    
