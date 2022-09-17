Yida Chen
# Content
- index.js: The main javascript file of the application
- views/todo.ejs & views/todoEdit.ejs: The views (layout) of the application
- models/ToDoTask.js: The schema of the TodoTask objects that we use to define the content and structure of data stored on MongoDB
- public/stylesheets/style.css: The css file that we use to style the element in this ToDoApp
- .env: The file that stored all environmental variables, such as the connection string to the MongoDB

# How to interact with the TODO App
1. Make sure you install npm with version > v6.0.0 on your machine.
2. Install dependencies by going to the top level of this folder/project and run `npm install`
3. To start the App use command `npm start`
4. This will serve the App on the **[http://localhost:3000/](http://localhost:3000/)**. You can open this link in your browser
5. You can add an TODO item by typing in the top input box of the page and hit the "plus" button on the right.
6. To edit the task you entered, hit the green edit button on the right of the TODO item. After completing the change hit confirm to submit the changes.
7. To delete the task, hit the red cross mark button on the right of the item.
8. To send a copy of this list of TODO to your email, enter your email address at the bottom input box and hit the "email" button on the right. 

# References:
The creation of this TODO app follow the instructions and code examples from the following webpages:  
[1] "Simple To-do List App with Node.js and MongoDB — Chapter 1," Diogo Pinheiro, [https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583](https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583)  
[2] "Simple To-do List App with Node.js and MongoDB — Chapter 2," Diogo Pinheiro, [https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-2-3780a1c5b039](https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-2-3780a1c5b039)  
[3] "Node.js Send an Email," W3 School, [https://www.w3schools.com/nodejs/nodejs_email.asp](https://www.w3schools.com/nodejs/nodejs_email.asp)

# Reflection
Compared with plain HTML, CSS, and JS, Node.JS is more modularized. We can achieve data storage, email sending, and user authentication easily using functions from existing modules. From my observations, Node.js uses a model-view-controller design pattern to guide the implemention of its web applications. Thus, I think software generated from Node.js will be more organized, extendable, and easier to maintain.
