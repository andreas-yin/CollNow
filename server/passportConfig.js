const LocalStrategy = require('passport-local');
const { updateAnswerVote } = require('./db');
const { emailExists, createUser, matchPassword } = require('./dbUsersHelper');

module.exports = (passport) => {

    //To set up users that register
    passport.use("local-signup", new LocalStrategy({
        usernameField: "email", //Define the properties of your HTTP POST request body (JSON) if they are not called 'username' and 'password'
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const { salutation, academic_title, first_name, last_name, role, user_specialty } = req.body;
            const userExists = await emailExists(email);
            if (userExists) {
                return done(null, false);
            }
            const user = await createUser(email, password, salutation, academic_title, first_name, last_name, role, user_specialty);
            return done(null, { // this returns the user object 
                user_id: user.user_id,
                email: user.email,
                academic_title: user.academic_title,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                user_specialty: user.user_specialty
            });
        } catch (error) {
            done(error);
        }
    }));


    //To log users in
    passport.use("local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, async (email, password, done) => {
        try {
            const user = await emailExists(email);
            if (!user) return done(null, false);
            const isMatch = await matchPassword(password, user.password);
            if (!isMatch) return done(null, false);
            return done(null, { //this logs the user in and returns the user object 
                user_id: user.user_id,
                email: user.email,
                academic_title: user.academic_title,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                user_specialty: user.user_specialty
            });
        } catch (error) {
            return done(error, false);
        }
    }));

    return passport;
};