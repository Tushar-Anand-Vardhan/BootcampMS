# BootcampMS
Bootcamp Management System

INTRODUCTION
The purpose of this document is to describe the design of “Bootcamp Management System”.

GOAL
Bootcamp is an immersive experience for both NCGs and mentors. The goal is to design a system that can be used by NCGs, Mentors, and Admin to manage various aspects of bootcamp.

USE CASES
The following are the use cases that need to be addressed in bootcamp management system.

Version – V1
NCG Registration
Ability to register an NCG to the bootcamp by asking all necessary details.
Assignments
Create/Modify/Delete new assignments
Grade individual NCG’s based on performance for a specific assignment
Individual vs Team Assignments
Leaderboard
Gather results for all assignments and show individual & team leaderboards
Basic UI
Version - V2
Basic RBAC support (Role-based access control)
Roles: Admin, NCG, Mentors
Basic authentication with username and password
Should be able to create local users and assign roles
Advanced Grading System
Provide different weightage to different assignments. Example – Project is more weighted than other assignments.
Instead of simply using absolute grading while calculating leaderboard, use Relative grading for individual assignments.
Enhanced UI
Version - V3
Automatic Resource Creation
For a given team, automatically create wiki pages, git repository, etc.
Team Auto-Pairing
Using parameters like proficiency, assigned BU, and qualifications (B.Tech / M.Tech), automatically come up with teams.
Allow modifications from Admin if needed
Advanced UI
TOOLS & TECHNOLOGY
The MEAN stack is JavaScript-based framework for developing web applications. MEAN is named after MongoDB, Express, Angular, and Node, the four key technologies that make up the layers of the stack.

MongoDB - document database
Express(.js) - Node.js web framework
Angular - a client-side JavaScript framework
Node(.js) - the premier JavaScript web server
The MEAN stack is one of the most popular technology concepts for building web applications.





1. Angular
    Angular JS is an open-source JavaScript framework which is maintained by Google and it is used for making frontend of bootcamp management system.
    At the very top of the MEAN stack is Angular, the self-styled “A JavaScript MVFramework”   (MVW stands for “Model View and Whatever”).
    Angular allows you to extend your HTML tags with metadata in order to create dynamic, interactive web experiences much more powerfully than, say, building them yourself with static HTML and JavaScript (or jQuery).
    Angular has all of the bells and whistles you’d expect from a front-end JavaScript framework, including form validation, localization, and communication with your back-end service.
       We have used following packages in angular :-

       a) Clarity :   Clarity is an open source design system that brings together UX guidelines, an HTML/CSS framework, and Angular components.

       b) OrgChart.js  :  OrgChart.js is a simple, flexible and highly customizable organization chart plugin for presenting the structure of your organization and the relationships in an elegant way.

   

       We have also used lazy loading and feature modelling in our code:

       a) Lazy loading 

            Lazy loading is a technique in Angular that allows you to load JavaScript components asynchronously when a specific route is activated. It improves the speed of the application load time by splitting the application into several bundles. When the                    user navigates through the app, the bundles are loaded as required.

       b) Feature Module

           A feature module is an organizational best practice, as opposed to a concept of the core Angular API. A feature module delivers a cohesive set of functionality focused on a specific application need such as a user workflow, routing, or forms.

2. Express.js and Node.js Server Tier
The next level down is Express.js, running on a Node.js server. Express.js calls itself a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is.
Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses. By making XML HTTP requests (XHRs),r GETs, or POSTs from our Angular.js front end, that you can connect to.
Express.js functions that power our application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks or using Promises, to access and update data in our MongoDB database.
Additional modules used cookie-parser and cors.
3. MongoDB Database Tier
If our application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as Angular, Express, and Node.
That’s where MongoDB comes in: JSON documents created in our Angular front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval.
 DB_URI = "mongodb+srv://BootcampMS-core4:Password1234@cluster0.usbydzk.mongodb.net/?retryWrites=true&w=majority"
4. Github
       We have used github to store our code. Here is the link: https://github.com/Tushar-Anand-Vardhan/BootcampMS



AUTHENTICATION FLOW






WORKFLOW
Admin create new user
User can register in bootcamp management system
User can login to bootcamp management system
Admin can get all users data.
Now, admin can create the assignment for NCG
Same assignment can be allotted to all the NCG’s
NCG can submit the assignment.
NCG can log out from the bootcamp management system.
Admin can get single user submission data.
Then, admin can upload or update the marks of the NCG.
Admin can delete user.
VARIOUS API USED


Based on Admin, Mentor and User/NCG Role

1. Admin/Mentor Role
Serial No. 	Method	Description	API Path	API Request 	API Response
1.	POST	
Create new admin





http://localhost:4000/api/v1/user/add	
{
"name":" Neha Sharma",
"email":"neha@gmail.com",
"role":"Admin"
}



{
"success": true,
"newUser": {
"name": " Neha Sharma",
"email": "neha@gmail.com",
"password": "",
"role": "Admin",
"totalMarks": 0,
"assignments": [],
"_id": "62dba42dd7b8fbb4713cfe53",
"__v": 0
}
}



2. 	POST	Register Admin	http://localhost:4000/api/v1/user/register	
{
"email":"neha@gmail.com",
"password":"Neha@123"
}



{
"success": true,
"user": {
"_id": "62dba42dd7b8fbb4713cfe53",
"name": " Neha Sharma",
"email": "neha@gmail.com",
"password": "$2a$10$XGwUQl.95JrriimPRw1/OeXiHXg7fT/JovGK3bzkvz52tAW85VCKm",
"role": "Admin",
"totalMarks": 0,
"assignments": [
"62dba8a8b521953cd3d9f1a5",
"62dba91ea73bee816cef96a8"
],
"__v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGJhNDJkZDdiOGZiYjQ3MTNjZmU1MyIsImlhdCI6MTY1ODU2NjQ1MCwiZXhwIjoxNjU4OTk4NDUwfQ.GJVrGASN_-ZjIGuIoyrIgOX14rXFDQIuFVdX1Bl3TnI"
}



3.	POST	Login Admin	http://localhost:4000/api/v1/user/login	
{
"email":"neha@gmail.com",
"password":"Neha@123"
}



{
"success": true,
"user": {
"_id": "62dba42dd7b8fbb4713cfe53",
"name": " Neha Sharma",
"email": "neha@gmail.com",
"password": "$2a$10$XGwUQl.95JrriimPRw1/OeXiHXg7fT/JovGK3bzkvz52tAW85VCKm",
"role": "Admin",
"totalMarks": 0,
"assignments": [
"62dba8a8b521953cd3d9f1a5",
"62dba91ea73bee816cef96a8"
],
"__v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGJhNDJkZDdiOGZiYjQ3MTNjZmU1MyIsImlhdCI6MTY1ODU2NjUxMSwiZXhwIjoxNjU4OTk4NTExfQ.LLgV_HylMSiHn3p-f6VQPMl7xXRjtjL89hbv_Xu8LVo"
}



4.	POST	Create Assignment	
http://localhost:4000/api/v1/admin/assignments/createAssignmentForAll



{
"title":"Assignment_1",
"content":"Database",
"credit":5,
"dueDate":"2022-07-25"

}





{
"success": true,
"newAssignment": {
"title": "Assignment_1",
"content": "Database",
"credit": 5,
"maxMarks": 100,
"AllAssignmentStatus": 0,
"ncgSubmittedLink": [

{
"ncg_id": "62da990b992751ecefc6e405",
"link": "",
"status": 0,
"marks": 0,
"_id": "62dba20dd7b8fbb4713cfe40",
"date": "2022-07-23T07:23:57.985Z"
}
],
"_id": "62dba20dd7b8fbb4713cfe36",
"dueDate": "2022-07-23T07:23:57.986Z",
"__v": 0
}
}





5. 	GET	Get Single User Submission	http://localhost:4000/api/v1/admin/assignments/getSingleUserSubmission/62dba20dd7b8fbb4713cfe36/62da990b992751ecefc6e405	


{
"success": true,
"singleUserSubmission": {
"ncg_id": "62da990b992751ecefc6e405",
"link": "github.link",
"status": 1,
"marks": 0,
"_id": "62dba20dd7b8fbb4713cfe40",
"date": "2022-07-23T07:23:57.985Z"
}
}



6.	POST	Upload Or Update Marks	http://localhost:4000/api/v1/admin/assignments/uploadOrUpdateMarks/62dba20dd7b8fbb4713cfe36/62da990b992751ecefc6e405	
{
"marks":95,
"link":"github.link"
}



{
"success": true
}



7.	GET	Get All Users	http://localhost:4000/api/v1/users	


{
"success": true,
"allUsers": [
{
"_id": "62dd076ceec6c6bd9c2355fa",
"name": "Neha Sharma",
"email": "neha@gmail.com",
"role": "admin",
"totalMarks": 0,
"assignments": [
"62dd0bb2eec6c6bd9c235601",
"62dd368aeec6c6bd9c235612",
"62de3d5ee9c233358ab89aa6",
"62de3d7e2f96db7e4374fdfd",
"62de3dcff6502e1509110eaf",
"62de3f2992f74269b6c74cdd",
"62de401992f74269b6c74d05",
"62de4f80fdd6bf4778f96c7a",
"62de4fbffdd6bf4778f96c8b",
"62de537729bdf1fa9ce3be3d",
"62de538729bdf1fa9ce3be4f",
"62ded5afeaf01814d5bb7895",
"62dedad461cee885fdf7e941",
"62dedb4391c90a82eb9e268b",
"62df8afd663707d4d90c42dd"
],
"__v": 0
},
{
"_id": "62de5290fdd6bf4778f96ca2",
"name": " Riya",
"email": "riya@gmail.com",
"role": "Admin",
"totalMarks": 0,
"assignments": [
"62de537729bdf1fa9ce3be3d",
"62de538729bdf1fa9ce3be4f",
"62ded5afeaf01814d5bb7895",
"62dedad461cee885fdf7e941",
"62dedb4391c90a82eb9e268b",
"62df8afd663707d4d90c42dd"
],
"__v": 0
},
{
"_id": "62df89fe3bfc66b25c0f77b6",
"name": "Meena Malik",
"email": "meena@gmail.com",
"role": "NCG",
"totalMarks": 800,
"assignments": [
"62df8afd663707d4d90c42dd",
"62df98bbdfc11f4fdcb510db"
],
"__v": 0,
"team": "62df98b5dfc11f4fdcb510c7"
}
]
}



8.	DELETE	Delete User	http://localhost:4000/api/v1/user/delete	
{
"id":"62da8dac992751ecefc6e3e8"
}

{
"success": true,
"message": "user deleted successfully"
}

9.	GET 	Get All Teams	http://localhost:4000/api/v1/getAllTeams	


{
"success": true,
"allTeams": [
{
"members": [],
"_id": "62dba2fc25eb9e925109ebbf",
"teamName": "Team1",
"teamMembers": [
"62da56927e7d9ce009891912",
"62da56927e7d9ce009891913",
"62da56927e7d9ce009891914"
],
"teamAssignments": [],
"__v": 0
},
{
"members": [],
"_id": "62dba2fc25eb9e925109ebc0",
"teamName": "Team2",
"teamMembers": [
"62da56927e7d9ce009891915",
"62da56927e7d9ce009891916",
"62da75198ce08a389809ca09"
],
"teamAssignments": [],
"__v": 0
},
{
"members": [],
"_id": "62dba2fc25eb9e925109ebc1",
"teamName": "Team3",
"teamMembers": [
"62da98ac992751ecefc6e401",
"62da990b992751ecefc6e405"
],
"teamAssignments": [],
"__v": 0
}
]
}



10.	POST	Create All Teams	http://localhost:4000/api/v1/admin/teams/createAllTeams	


{
"success": true,
"allTeams": [
{
"teamName": "Team1",
"teamMembers": [
"62dc4b94f4085c25fbd6f312",
"62dc4b94f4085c25fbd6f313",
"62dc4b94f4085c25fbd6f314"
],
"teamAssignments": [],
"teamMentor": "62dc4b94f4085c25fbd6f31a",
"_id": "62df8a91663707d4d90c42c7",
"__v": 0
},
{
"teamName": "Team2",
"teamMembers": [
"62dc4b94f4085c25fbd6f315",
"62dc4b94f4085c25fbd6f316",
"62dc4b94f4085c25fbd6f317"
],
"teamAssignments": [],
"teamMentor": "62dc59cf47c89ebc23f2de90",
"_id": "62df8a91663707d4d90c42c8",
"__v": 0
},
{
"teamName": "Team3",
"teamMembers": [
"62dc4b94f4085c25fbd6f318",
"62df89fe3bfc66b25c0f77b6"
],
"teamAssignments": [],
"teamMentor": "62dc59e447c89ebc23f2de94",
"_id": "62df8a91663707d4d90c42c9",
"__v": 0
}
]
}



11.	POST	Create Assignment For All Teams	http://localhost:4000/api/v1/admin/assignments/createAssignmentForAll	
{
"title":"TeamAssignment_1",
"content":"Backend_Frontend",
"credit":10,
"dueDate":"2022-07-29"

}



{
"success": true,
"newAssignment": {
"title": "TeamAssignment_1",
"content": "Backend_Frontend",
"credit": 10,
"maxMarks": 100,
"assignmentType": "individual",
"AllAssignmentStatus": 0,
"ncgSubmittedLink": [
{
"ncg_id": "62dc4b94f4085c25fbd6f312",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42de",
"date": "2022-07-26T06:34:37.295Z"
},
{
"ncg_id": "62dc4b94f4085c25fbd6f313",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42df",
"date": "2022-07-26T06:34:37.297Z"
},
{
"ncg_id": "62dc4b94f4085c25fbd6f314",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42e0",
"date": "2022-07-26T06:34:37.297Z"
},
{
"ncg_id": "62dc4b94f4085c25fbd6f315",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42e1",
"date": "2022-07-26T06:34:37.297Z"
},
{
"ncg_id": "62dc4b94f4085c25fbd6f316",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42e2",
"date": "2022-07-26T06:34:37.297Z"
},
{
"ncg_id": "62dc4b94f4085c25fbd6f317",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42e3",
"date": "2022-07-26T06:34:37.298Z"
},
{
"ncg_id": "62dc4b94f4085c25fbd6f318",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42e4",
"date": "2022-07-26T06:34:37.298Z"
},
{
"ncg_id": "62df89fe3bfc66b25c0f77b6",
"link": "",
"status": 0,
"marks": 0,
"_id": "62df8afd663707d4d90c42e5",
"date": "2022-07-26T06:34:37.298Z"
}
],
"_id": "62df8afd663707d4d90c42dd",
"dueDate": "2022-07-26T06:34:37.298Z",
"teamSubmittedLink": [],
"__v": 0
}
}



12.	POST	Upload Or Update Team Marks	http://localhost:4000/api/v1/admin/assignments/uploadOrUpdateTeamMarks/62df98f0dfc11f4fdcb510e9/62df98b5dfc11f4fdcb510c7	
{
"marks":80,
"link":"backend_frontend.com"
}



{
"success": true
}





2. User Role
Serial No.	Method	Description	API Path 	API Request 	API Response
1. 	POST	Register User	http://localhost:4000/api/v1/user/register	
{
"email":"reena@gmail.com",
"password":"Reena@123"
}



{
"success": true,
"user": {
"_id": "62da990b992751ecefc6e405",
"name": "Reena Malik",
"email": "reena@gmail.com",
"password": "$2a$10$LKmYImkfxvrckefZb3O6TuCPFQkz9wiVUfKxnHXZZTaSa5oNuCWxK",
"role": "NCG",
"totalMarks": 0,
"assignments": [],
"__v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGE5OTBiOTkyNzUxZWNlZmM2ZTQwNSIsImlhdCI6MTY1ODQ5MzIzMiwiZXhwIjoxNjU4OTI1MjMyfQ.EUhs2FgZhZzmpxPJHRY5Y4fqnCkdFmCjeJpjZXZ88Rg"
}



2.	POST	Login User	http://localhost:4000/api/v1/user/login	
{
"email":"reena@gmail.com",
"password":"Reena@123"
}



{
"success": true,
"user": {
"_id": "62da990b992751ecefc6e405",
"name": "Reena Malik",
"email": "reena@gmail.com",
"password": "$2a$10$LKmYImkfxvrckefZb3O6TuCPFQkz9wiVUfKxnHXZZTaSa5oNuCWxK",
"role": "NCG",
"totalMarks": 0,
"assignments": [],
"__v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGE5OTBiOTkyNzUxZWNlZmM2ZTQwNSIsImlhdCI6MTY1ODU2MDgwNSwiZXhwIjoxNjU4OTkyODA1fQ.19pgX7-iKphNlz5T4y5O_NJBsICE_-bGhLl7xi3eXPk"
}





3. 	POST	Update User	http://localhost:4000/api/v1/user/update	
{
"id":"62da990b992751ecefc6e405",
"newName":"Meena Malik",
"newEmail":"meena@gmail.com",
"newRole":"NCG"
}



{
"success": true,
"updatedUser": {
"_id": "62da990b992751ecefc6e405",
"name": "Meena Malik",
"email": "meena@gmail.com",
"role": "NCG",
"totalMarks": 0,
"assignments": [],
"__v": 0
}
}



4.	POST	Submit Assignment	http://localhost:4000/api/v1/user/submitAssignment/62da9766992751ecefc6e3f5	
{
"ncgSubmittedLink":{
"link":"github.link"
}
}



{
"success": true
}



5. 	POST	Logout User	http://localhost:4000/api/v1/user/logout	


{
"success": true,
"message": "Meena Malik logged out"
}



6.	POST	Submit Team Assignment	http://localhost:4000/api/v1/teams/submitTeamAssignment/62df98f0dfc11f4fdcb510e9	
{
"teamSubmittedLink":{
"link":"somethin.drive.com"
}
}



{
"success": true
}



7.	GET	getTeamMembers	http://localhost:4000/api/v1/teams/getTeamMembers	


{
"success": true,
"teamMembers": {
"_id": "62dfb9dbd565497f7f015976",
"teamMembers": [
"62dfaa7ba31844721520742e",
"62dfb9cfd565497f7f01596c"
],
"teamMentor": "62dfaa7ba318447215207432"
}
}





FUNCTIONS DETAILS


1. User Controller
    It contains all the functions that are used to be performed by the User/NCG.



Serial No.	Functions	Description
1.	addUserFromExcel	Data will be stored in excel sheet
2.	addUser	Admin can add user
3.	getAllUsers	Admin or mentor can get all NCG's who has enrolled for the bootcamp course.
4.	updateUser	With help of this function details of Admin, Mentor, NCG can be updated.
5.	removeUser	With help of this function details of admin can remove any mentor or NCG.
6.	registerUser	With help of this function Admin, mentor or NCG can register themselves to this bootcamp course.
7.	loginUser	With help of this function Admin, mentor or NCG can login themselves to this bootcamp course. 
8.	logoutUser	With help of this function Admin, mentor or NCG can login out themselves from this bootcamp course.
9.	submitAssignment	With help of this function NCG can submit their assignments to this bootcamp course. 
10.	getLeaderboardInfo	This function helps us to know the details of leaderboard, which tells us which NCG has the top rank.
2. Assignment Controller
​It contains all the functions that are used to be performed by the Admin related to the assignment.



Serial No.	Functions	Description
1.	createAssignmentForAll	This function creates the assignment for all individual NCG's.
2.	Add an assignment	Admin uses this function to add a new assignment.
3.	getAllAssignments	Admin uses this function to get all the assignments in everyone's (Admin, Mentor, NCG) dashboard.
4.	getAssignment/{AssnID}	Admin uses this function to get the assignment for a particular single NCG.
5.	updateAssignment	Admin uses this function to update the assignment that is given to NCG's.
6.	deleteAssignment	Admin can delete the assignment that is assigned to NCG by using this function.
7.	getSingleUserSubmission/{AssnId}	Admin gets submission link provided by a NCG for a given assignment.
8.	uploadOrUpdateMarks	Admin update marks for a particular NCG for a given assignment.
3. Team Controller
​It contains all the functions that are used to be performed by the Admin related to the team.



Serial No.	Functions	Description
1.	addTeam	Admin can use this function to add NCG's to the team. With help of this function admin is able to make team of 3 NCG's.
2.	
getAllTeams

With help of this function admin can get all the teams in the admin dashboard.
3.	getTeam	NCG/Mentor can get their team
4.	createTeamAssignment	Admin or mentor can create team assignment for the NCG's team.
5.	removeTeam	Admin or mentor can remove a team.
​



NOTE
1. All the password entered by the users, have been hashed using bcryptJS and encrypted using SHA 256 then stored at the backend. 

2. All the users can set password with a certain policy i.e. 

     a) Minimum length of the password should be 8. 

     b) Maximum length of the password is 100.

     c) It must contain at least one uppercase, one lowercase, one digit and one special character.

     d) Password should not contain spaces.

3. Email id of the users should be in standard format like  "xyz@ example.com"

4. We have used authentication, authorization for the users.

5. We have used error handling in our code.















