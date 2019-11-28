const Publication = require('../models/publication');
const User = require('../models/user');
const mongoose = require('mongoose');

const createPublication = async (req, res) => {
    const { title, description, price, ubication, imageUrl, userId } = req.body;
    const id = mongoose.Types.ObjectId(userId);
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(404).send({ message: `El usuario con id ${id} no existe` });
    }
    const publication = new Publication({
        title,
        description,
        price,
        ubication,
        imageUrl,
        user
    });
    const publicationSave = await publication.save();
    return res.status(200).send(publicationSave);
};

const findAllPublications = async (req, res) => {
    const publications = await Publication.find({}).sort({ created: -1 }).populate('user');
    const publicationsClone = publications.map(publication => {
        return {
            description: publication.description,
            imageUrl: publication.imageUrl,
            price: publication.price,
            title: publication.title,
            ubication: publication.ubication,
            user: {
                email: publication.user.email,
                name: publication.user.name,
                last_name: publication.user.last_name,
            }
        }
    });
    return res.status(200).send(publicationsClone);
};

const findPublicationById = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const publication = await Publication.findOne({ _id: id });

    if (!publication) {
        return res.status(404).send({ message: `La publicación con id ${id} no existe` });
    }
    return res.status(200).send(publication);
};

const findPublicationsByUser = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.userId);
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(404).send({ message: `El usuario con id ${id} no existe` });
    }
    const publications = await Publication.find({ user }).sort({ created: -1 }).populate('user');
    const publicationsClone = publications.map(publication => {
        return {
            description: publication.description,
            imageUrl: publication.imageUrl,
            price: publication.price,
            title: publication.title,
            ubication: publication.ubication,
            user: {
                email: publication.user.email,
                name: publication.user.name,
                last_name: publication.user.last_name,
            }
        }
    });
    return res.status(200).send(publicationsClone);
};

module.exports = {
    createPublication,
    findAllPublications,
    findPublicationById,
    findPublicationsByUser
}