var PostModel = require('../models/postModel.js');

/**
 * postController.js
 *
 * @description :: Server-side logic for managing posts.
 */
module.exports = {

    /**
     * postController.list()
     */
    list: async function (req, res) {

        try {
            const posts = await PostModel.find({reports: {$lt: 5}}).sort({datetime: 'desc'}).populate('userid');
            return res.json(posts);
        } catch (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }
        }
    },

    /**
     * postController.show()
     */
    show: async function (req, res) {

        var id = req.params.id;

        try {
            const post = await PostModel.findOne({_id: id}).populate('userid');
            return res.json(post);

        } catch (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }
            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }
        }

    },

    /**
     * postController.create()
     */
    create: async function (req, res) {

        var post = new PostModel({
            name: req.body.name,
            file: req.file.filename,
            userid: req.session.userId,
            datetime: new Date(),
            tags: JSON.parse(req.body.tags),
            up_votes: [],
            down_votes: [],
            reports: 0
        });

        try {
            await post.save();
            return res.status(201).json({error: 0, message: "Post created successfully", post: post});
        } catch (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating post',
                    error: 1
                });
            }
        }
    },

    /**
     * postController.update()
     */
    update: async function (req, res) {

        let id = req.body.id;
        let vote = req.body.vote;
        const post = await PostModel.findOne({_id: id});

        if (!post.up_votes.includes(req.session.userId) && !post.down_votes.includes(req.session.userId)) {
            await PostModel.findOneAndUpdate({_id: id}, (vote ? {$push: {up_votes: req.session.userId}} : {$push: {down_votes: req.session.userId}}));
            return res.json({message: "Success", error: 0, change: 0});
        }

        if (post.up_votes.includes(req.session.userId)) {
            if (vote) {
                return res.json({message: "Already voted", error: 1});
            }
            await PostModel.findOneAndUpdate({_id: id}, {
                $pull: {up_votes: req.session.userId},
                $push: {down_votes: req.session.userId}
            });
            return res.json({message: "Success", error: 0, change: 1});
        }

        if (!vote) {
            return res.json({message: "Already voted", error: 1});
        }
        await PostModel.findOneAndUpdate({_id: id}, {
            $pull: {down_votes: req.session.userId},
            $push: {up_votes: req.session.userId}
        });
        return res.json({message: "Success", error: 0, change: 1});
    },

    report: async function (req, res) {

        let id = req.body.id;

        await PostModel.findOneAndUpdate({_id: id}, {
            $inc: {
                reports: 1
            }
        });
        return res.json({message: "Success", error: 0});


    },

    comment: async function (req, res) {

        let id = req.body.id;
        let comment = req.body.comment;

        await PostModel.findOneAndUpdate({_id: id}, {$push: {comments: comment}});
        return res.json({message: "Success", error: 0});


    },

    /**
     * postController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PostModel.findByIdAndRemove(id, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the post.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
