let bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        },

        function(req, username, password, done) {
            let generateHash = function(password) {

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                if (user) {

                    return done(null, false, {
                        message : 'This username already exists'
                    });

                } else {
                    let userPassword = generateHash(password);
                    let data =
                        {
                            mail: req.body.mail,
                            password: userPassword,
                            rePassword: req.body.rePassword,
                            username: username,
                            isAdmin: req.body.isAdmin

                        };

                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });

        }

    ));

    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });

    });

    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'username',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function(req, username, password, done) {

            let User = user;

            let isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);

            };

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                if (!user) {

                    return done(null, false, {
                        message: 'User does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }

                let userinfo = user.get();
                console.info("User with login " + username + " successfully logged in.");
                return done(null, userinfo);


            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }

    ));

};