const Seance = require('../models/Seance');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Review = require('../models/Review');

// create seance

exports.create = (data, ownerId) =>
	Seance.create({ ...data, postedBy: ownerId }).then(async (seance) => {
		const newUser = await User.findByIdAndUpdate(ownerId, {
			$push: { seances: seance._id },
		});
		console.log(newUser);
		console.log(seance);
		return seance;
	});

// get all seances

exports.getAll = async (type) => {
	let seances = await Seance.find()
		.populate('postedBy', { password: 0, __v: 0 })
		.lean();

	if (type) {
		seances = seances.filter((s) => s.type == type);
	}

	return seances;
};

// get one seance

exports.getOne = async (id) =>
	await Seance.findById(id)
		.populate('postedBy', { password: 0, __v: 0 })
        .populate('appointments')
		.lean();

// get someone's seances

exports.getMySeances = async (id) =>
	await Seance.find({ postedBy: { _id: id } });

// edit seance

exports.edit = async (id, data) => await Seance.findByIdAndUpdate(id, data);

// delete seance

exports.del = async (id) => await Seance.findByIdAndDelete(id);

// make appointment

exports.appoint = (data) =>
	Appointment.create(data).then(async (appointment) => {
		const newUser = await User.findByIdAndUpdate(appointment.userId, {
			$push: { appointments: appointment._id },
		});
		const newSeance = await Seance.findByIdAndUpdate(appointment.seanceId, {
			$push: { appointments: appointment._id },
		});
        const newProvider = await User.findByIdAndUpdate(appointment.providerId, {
            $push: { appointments: appointment._id}
        })

		return appointment;
	});

// get my appointments

exports.getMyAppointments = async (id) =>
	await Appointment.find({ userId: id }).populate('providerId', {password: 0, __v: 0}).lean();

// cancel appointment

exports.cancelApp = (id) =>
	Appointment.findByIdAndDelete(id).then(async (app) => {
		const newUser = await User.findByIdAndUpdate(app.userId, {
			$pull: { appointments: app._id },
		});
        const newOwner = await User.findByIdAndUpdate(app.providerId, {
            $pull: { appointments: app._id }
        });
        const newSeance = await Seance.findByIdAndUpdate(app.seanceId, {
            $pull: { appointments: app._id}
        })

        return app
	});

// leave review

exports.createReview = (data) =>
	Review.create(data).then(async (review) => {
		const newSeance = await Seance.findByIdAndUpdate(appointment.seanceId, {
			$push: { reviews: review._id },
		});
	});

// get review

exports.getReview = async (id) =>
	await Review.findById(id).populate('postedBy', { password: 0, __v: 0 });

// edit review

exports.editReview = async (id, data) =>
	await Review.findByIdAndUpdate(id, data);

// delete review

exports.delReview = (id) =>
	Review.findByIdAndDelete(id).then(async (review) => {
		const newSeance = await Seance.findByIdAndUpdate(review.seance, {
			$pull: { reviews: review._id },
		});
		const newUser = await User.findByIdAndUpdate(review.postedBy._id, {
			$pull: { reviews: review._id },
		});

		return review;
	});
