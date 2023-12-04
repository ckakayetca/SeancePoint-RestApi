# REST API for Seance-Point

This API has the following endpoints:

# SEANCES public
- GET /seances - GET ALL SEANCES
- GET /seances/:id - GET SPECIFIC SEANCE
- GET /seances/:id/reviews - GET SEANCE REVIEWS

# SEANCES private (logged in)
- POST /seances/create - POST A NEW SEANCE
- GET /seances/my-seances - GET MY SEANCES
- PUT /seances/:id - EDIT SEANCE
- DELETE /seances/:id - DELETE SEANCE
- POST /seances/:id/appointments - MAKE AN APPOINTMENT
- POST /seances/:id/reviews - POST A REVIEW
- PUT /seances/:id/reviews/:reviewId - EDIT REVIEW
- DELETE /seances/:id/reviews/:reviewId - DELETE REVIEW

# USERS public
- POST /users/login - LOGIN
- POST /users/register - REGISTER

# USERS private (logged in)
- GET /users/logout - LOGOUT
- GET /users/profile - GET USER INFO (VERIFY IF LOGGED IN)
- PUT /users/profile - EDIT PROFILE INFO

# MY APPOINTMENTS (logged in)
- GET /my-appointments - GET MY APPOINTMENTS
- DELETE /my-appointments/:id - CANCEL APPOINTMENT

In order to run, please do not forget to run the "npm i" command. This API uses the libraries which are mentioned in the package.json file