const express = require('express')
const auth = require('../../middleware/auth')
const request = require('request')
const config = require('config')
const router = express.Router()
const {
    check,
    validationResult
} = require('express-validator')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Posts')

router.get('/me', auth, async (req, res) => {
    try {
        //populate traverse into anthor model
        //name of model and what you need from it 
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ["name", "avatar"])
        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this user'
            })
        }
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('server error')
    }
})

router.post('/', [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
], auth, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githupusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagaram,
        linkedin
    } = req.body
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githupusername) profileFields.githupusername = githupusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook
    if (twitter) profileFields.social.twitter = twitter
    if (instagaram) profileFields.social.instagaram = instagaram
    if (linkedin) profileFields.social.linkedin = linkedin

    try {

        let profile = await Profile.findOne({
            user: req.user.id
        })
        if (profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            })
            return res.json(profile)

        }
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('server error')
    }


})

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }

})
router.get('/user/:user_id', async (req, res) => {
    try {
        const pro = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar'])

        if (!pro) {
            return res.status(400).json({
                msg: " profile not found"
            })

        }
        res.json(pro)

    } catch (error) {
        console.log(error.message)
        if (error.kind == 'ObjectId') return res.status(400).json({
            msg: " profile not found"
        })


        res.status(500).send('Server field')
    }

})

router.delete('/', auth, async (req, res) => {
    try {
        await Post.deleteMany({
            user:req.user.id
        })
        await Profile.findOneAndDelete({
            user: req.user.id
        })
        await User.findOneAndDelete({
            _id: req.user.id
        })
        res.json({
            msg: 'user removed'
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }

})


router.put('/experience', [auth, [check('title', 'Title is required').not().isEmpty(), check('company', 'Company is required').not().isEmpty(), check('from', 'Title is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }



})
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })

        profile.experience = profile.experience.filter(
            (exp) => exp._id.toString() !== req.params.exp_id
        );
        await profile.save()

        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }

})

router.put('/education', [auth, [check('school', 'School is required').not().isEmpty(), check('degree', 'Degree is required').not().isEmpty(), check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(), check('from', 'Title is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description
    } = req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description
    }
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }



})
router.delete('/education/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })

        profile.education = profile.education.filter(
            (exp) => exp._id.toString() !== req.params.exp_id
        );
        await profile.save()

        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server field')
    }

})
router.get('/github/:username', (req, res) => {
    try {
        const options = {
           
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get("githubSecret")}`
        ,method:'GET'
        ,headers:{'user-agent':'nodejs'}
        }
        request(options,(error,response,body)=>{
            if(error)console.log(error)
            if(response.statusCode!==200)return res.status(404).json({msg:"no githup profile found"})

            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server Error")
    }
})

module.exports = router