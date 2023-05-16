var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController.js');
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page!");
        err.status = 401;
        return next(err);
    }
}


/*
 * GET
 */
router.get('/', postController.list);

/*
 * GET
 */
router.get('/:id', postController.show);

/*
 * POST
 */
router.post('/', requiresLogin, upload.single('file'), postController.create);

/*
 * PUT
 */
router.put('/:id', requiresLogin, postController.update);
router.put('/:id/report', requiresLogin, postController.report);
router.put('/:id/comment', requiresLogin, postController.comment);

/*
 * DELETE
 */
router.delete('/:id', postController.remove);

module.exports = router;
