const Seance = require('../models/Seance');

// create seance

exports.create = (data) => Seance.create(data);

// get all seances

exports.getAll = async (type) => {
    let seances = await Seance.find().populate('postedBy').lean();

    if(type) {
        seances = seances.filter(s => s.type == type)
    }

    return seances;
}

// get one seance

exports.getOne = async (id) => await Seance.findById(id).lean();

// edit seance

exports.edit = async (id, data) => await Seance.findByIdAndUpdate(id, data)

// delete seance

exports.del = async (id) => await Seance.findByIdAndDelete(id)