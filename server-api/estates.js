const { Router } = require('express')
const router = Router()

router.use('/estates', (req, res) => {
  res.json({
    estates: []
  })
})

module.exports = router
