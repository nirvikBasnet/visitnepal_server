const router = require('express').Router();
let Meds = require('../models/meds.model');

router.route('/').get((req, res) => {
  Meds.find()
    .then(meds => res.json(meds))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
  const username = req.body.username;
  const medsname = req.body.medsname;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  

  const newMeds = new Meds({
    username,
    medsname,
    description,
    duration,
    
  });

  newMeds.save()
  .then(() => res.json('Meds added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Meds.findById(req.params.id)
    .then(meds => res.json(meds))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  Meds.findByIdAndDelete(req.params.id)
    .then(() => res.json('Med deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Meds.findById(req.params.id)
    .then(meds => {
      meds.username = req.body.username;
      meds.medsname = req.body.medsname;
      meds.description = req.body.description;
      meds.duration = Number(req.body.duration);
    

      meds.save()
        .then(() => res.json('Meds updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;