const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Post = require('../../models/Posts')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const {
    check,
    validationResult
} = require('express-validator')

router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({
            errors: erros.array()
        })

    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }

})

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        }) //newest
        res.json(posts)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }
})


router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) //newest
        if (!post) {
            return res.status(404).json({
                msg: "post not found"
            })
        }
        res.json(post)

    } catch (error) {
        console.log(error.message)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "post not found"
            })
        }
        res.status(500).send('Server field')
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) //newest
        if (!post) {
            return res.status(404).json({
                msg: "post not found"
            })
        }


        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "User not auth"
            })
        }
        await post.remove()
        res.json({
            msg: "post removed"
        })

    } catch (error) {
        console.log(error.message)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "post not found"
            })
        }
        res.status(500).send('Server field')
    }
})
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) //newest
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                msg: "post already liked"
            })
        }
        post.likes.unshift({
            user: req.user.id
        })
        await post.save()
        res.json(post.likes)

    } catch (error) {
        console.log(error.message)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "post not found"
            })
        }
        res.status(500).send('Server field')
    }
})

router.delete('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) //newest
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
                msg: "post has not yet been liked"
            })
        }
        const removeIndex = post.likes.map(like => {
            like.user.toString()
        }).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)


        await post.save()
        res.json(post.likes)

    } catch (error) {
        console.log(error.message)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "post not found"
            })
        }
        res.status(500).send('Server field')
    }
})
router.post('/comment/:id', [auth,check('text','text is requied').not().isEmpty()], async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({
            errors: erros.array()
        })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post =await Post.findById(req.params.id)
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComment)
       await post.save()
       res.json(post.comments)
    } catch (error) {
        console.log(error.message)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "post not found"
            })
        }
        res.status(500).send('Server field')
    }
})

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) //newest
        console.log(post.comments)
        const comment=post.comments.find(comment=>comment.id===req.params.comment_id)

        if(!comment){
            console.log(comment)
            return res.status(404).json({
                msg: "comment  not exists"
            })
         
        }
        if(comment.user.toString()!== req.user.id){
            return res.status(401).json({
                msg: "User not auth"
            })
        }

const removeIndex = post.comments.map(comment => {
            comment.user.toString()
        }).indexOf(req.user.id)
        post.comments.splice(removeIndex, 1)


        await post.save()


        res.json(post.comments)

    } catch (error) {
        console.log(error.message)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "post not found"
            })
        }
        res.status(500).send('Server field')
    }
})


module.exports = router