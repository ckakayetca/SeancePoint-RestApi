const router = require('express').Router();
const manager = require('../managers/seanceManager');
const { isAuth } = require('../middlewares/auth');

// get all seances
router.get('/', async (req, res) => {
	try {
		let seances = await manager.getAll();

		res.status(200).json(seances);
	} catch (error) {
		res.send(error);
	}
});

// get my seances
router.get('/my-seances', isAuth, async (req, res) => {
	try {
		let id = req.user._id;

		const seances = await manager.getMySeances(id);

		res.status(200).json(seances);
	} catch (error) {
		res.send(error);
	}
});

// get one seance
router.get('/:id', async (req, res) => {
	const seanceId = req.params.id;

	try {
		const seance = await manager.getOne(seanceId);

		res.status(200).json(seance);
	} catch (error) {
		res.send({ message: error.message });
	}
});

// edit seance
router.put('/:id', isAuth, async (req, res) => {
	console.log(`PUT /SEANCES/ID/`);
	const seanceId = req.params.id;
	const { title, type, price, duration, description } = req.body;

	try {
		const seance = await manager.getOne(seanceId);
		console.log(req.user._id, seance.postedBy._id);
		if (req.user._id.toString() !== seance.postedBy._id.toString()) {
			throw new Error('You are not allowed to edit this seance!');
		}

		const updatedSeance = await manager.edit(seanceId, {
			title,
			type,
			price,
			duration,
			description,
		});
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
});

// delete seance
router.delete('/:id', isAuth, async (req, res) => {
	try {
		const resp = await manager.del(req.params.id);
		console.log(resp);
		res.status(200).json(resp);
	} catch (error) {
		console.log(error);
		res.status(401).send({ message: error.message });
	}
});

// create seance
router.post('/create', isAuth, async (req, res) => {
	console.log('POST /SEANCES/CREATE');
	const { title, type, price, duration, description } = req.body;
	let id = req.user._id;

	try {
		const post = await manager.create(
			{
				title,
				type,
				price,
				duration,
				description,
			},
			id
		);

		res.status(200).json(post);
	} catch (error) {
		res.send(error);
	}
});

// make an appointment

router.post('/:id/appointments', isAuth, async (req, res) => {
	const seanceId = req.params.id;
	const userId = req.user._id;
	const { date } = req.body;

	try {
		const providerId = await manager
			.getOne(seanceId)
			.then((s) => s.postedBy._id);

		if (userId.toString() == providerId.toString()) {
			throw new Error('You cannot make an appointment for your own seance!');
		}

		const appointment = await manager.appoint({
			providerId,
			userId,
			seanceId,
			date,
		});

		res.status(200).json(appointment);
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
});

// leave review
router.post('/:id/reviews', isAuth, async (req, res) => {
	const seanceId = req.params.id;
	const { rating, text } = req.body;

	try {
		const seance = await manager.getOne(seanceId);
		if (req.user._id === seance.postedBy._id) {
			res
				.status(401)
				.json({
					message: 'You are not allowed to post reviews on your own seance!',
				});
		}
		const review = await manager.createReview({
			rating,
			text,
			seance: seanceId,
			postedBy: req.user._id,
		});

		res.status(200).json(review);
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
});

// get reviews

router.get('/:id/reviews', async (req, res) => {
	const seanceId = req.params.id;
    console.log(`GET ${seanceId}/reviews`)
	try {
		let reviews = await manager.getReviews(seanceId);
		res.status(200).json(reviews);
	} catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
});

// edit review
router.put('/:id/reviews/:reviewId', isAuth, async (req, res) => {
	const seanceId = req.params.id;
	const reviewId = req.params.reviewId;
	const userId = req.user._id;

	const { rating, text } = req.body;

	try {
		const review = await manager.getReview(reviewId);
		console.log(review)

		if (review.postedBy._id.toString() !== userId.toString()) {
			throw new Error('You cannot edit this review!');
		}
		const seance = manager.editReview(reviewId, { rating, text });

		res.status(200).json(seance);
	} catch (error) {
		console.log(error)
		res.status(401).json({ message: error.message });
	}
});

// delete review
router.delete('/:id/reviews/:reviewId', async (req, res) => {
	const seanceId = req.params.id;
	const reviewId = req.params.reviewId;
	const userId = req.user._id;

	try {
		const review = await manager.getReview(reviewId);

		if (userId.toString() !== review.postedBy._id.toString()) {
			throw new Error('You cannot delete this review!');
		}

		const resp = manager.delReview(reviewId);

		res.status(200).json({ message: 'Successfully deleted review! ' });
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
});
module.exports = router;
