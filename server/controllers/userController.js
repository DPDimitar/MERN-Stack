var UserModel = require('../models/userModel.js');
var PostModel = require('../models/postModel');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {

        return res.json([{id: 1, user: 'DP'}, {id: 2, user: 'TP'}]);

        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: async function (req, res, next) {

        var user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        try {
            await user.save();
            return res.status(201).json({
                message: 'Successfully registered',
                error: 0
            });

        } catch (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: 1
                });
            }
        }
    },

    login: async function (req, res) {
        console.log("logging in")

        UserModel.authenticate(req.body.username, req.body.password, async function (error, user) {
            if (error || !user) {
                console.log("error")
                return res.status(401).json({message: "Wrong username or password", error: 1});
            } else {
                let counter = 0;
                req.session.userId = user._id;
                const posts = await PostModel.find({userid: user._id});
                if(posts) {
                    for (let i = 0; i < posts.length; i++) {
                        counter += posts[i].up_votes.length + posts[i].down_votes.length
                    }
                }
                return res.status(201).json({
                    message: "Successfully logged in",
                    error: 0,
                    user: user,
                    user_posts: posts.length,
                    totalVotes: counter
                });
            }
        })
    },

    logout: async function (req, res, next) {
        if (req.session.userId) {
            try {
                console.log("Logging out", req.session.userId);
                req.session.destroy();
                return res.status(201).json({error: 0, message: "Logged out!"});
            } catch (err) {
                console.log("Error");
                return next(err);
            }
        }
        console.log("Outside IF");
        console.log(req.session);
        console.log(req.session.userId);

        return res.status(201).json({error: 0, message: "No user logged in"});
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
