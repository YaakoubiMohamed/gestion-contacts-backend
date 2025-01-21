const { Sequelize, Op } = require("sequelize");
const  Contact  = require("../models/Contact");

// Log the imported Contact model
    /**
     * Récupérer tous les contacts
     */
    const getAllContacts = async (req, res) => {
      try {
        console.log(Contact);

        const contacts = await Contact.findAll();
        res.status(200).json(contacts);
      } catch (error) {
        res.status(500).json({
          error: "Une erreur est survenue lors de la récupération des contacts.",
          details: error.message,
        });
      }
    }
  
    /**
     * Récupérer un contact par ID
     */
    const getContactById = async (req, res) => {
      try {
        const { id } = req.params;
        const contact = await Contact.findByPk(id);
  
        if (!contact) {
          return res.status(404).json({ error: "Contact introuvable." });
        }
  
        res.status(200).json(contact);
      } catch (error) {
        res.status(500).json({
          error: "Une erreur est survenue lors de la récupération du contact.",
          details: error.message,
        });
      }
    }
  
    /**
     * Créer un nouveau contact
     */
    const createContact = async (req, res) => {
      try {
        const { nom, prenom, email, telephone, adresse } = req.body;
  
        const newContact = await Contact.create({
          nom,
          prenom,
          email,
          telephone,
          adresse,
        });
  
        res.status(201).json(newContact);
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          return res.status(400).json({
            error: "Validation des champs échouée.",
            details: error.errors.map((err) => err.message),
          });
        }
  
        res.status(500).json({
          error: "Une erreur est survenue lors de la création du contact.",
          details: error.message,
        });
      }
    }
  
    /**
     * Mettre à jour un contact existant par ID
     */
    const updateContact = async (req, res) => {
      try {
        const { id } = req.params;
        const { nom, prenom, email, telephone, adresse } = req.body;
  
        const contact = await Contact.findByPk(id);
  
        if (!contact) {
          return res.status(404).json({ error: "Contact introuvable." });
        }
  
        await contact.update({ nom, prenom, email, telephone, adresse });
        res.status(200).json(contact);
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          return res.status(400).json({
            error: "Validation des champs échouée.",
            details: error.errors.map((err) => err.message),
          });
        }
  
        res.status(500).json({
          error: "Une erreur est survenue lors de la mise à jour du contact.",
          details: error.message,
        });
      }
    }
  
    /**
     * Supprimer un contact par ID
     */
    const deleteContact = async (req, res) => {
      try {
        const { id } = req.params;
  
        const contact = await Contact.findByPk(id);
  
        if (!contact) {
          return res.status(404).json({ error: "Contact introuvable." });
        }
  
        await contact.destroy();
        res.status(200).json({ message: "Contact supprimé avec succès." });
      } catch (error) {
        res.status(500).json({
          error: "Une erreur est survenue lors de la suppression du contact.",
          details: error.message,
        });
      }
    }
  
    /**
     * Rechercher des contacts par nom, prenom, e-mail ou téléphone
     */
    const searchContacts = async (req, res) => {
      try {
        const { query } = req.query;
        console.log("query",query);
  
        if (!query) {
          return res.status(400).json({
            error: "Veuillez fournir un terme de recherche.",
          });
        }
  
        const contacts = await Contact.findAll({
          where: {
            [Op.or]: [
              { nom: { [Op.like]: `%${query}%` } },
              { prenom: { [Op.like]: `%${query}%` } },
              { email: { [Op.like]: `%${query}%` } },
              { telephone: { [Op.like]: `%${query}%` } },
            ],
          },
        });
  
        res.status(200).json(contacts);
      } catch (error) {
        res.status(500).json({
          error: "Une erreur est survenue lors de la recherche des contacts.",
          details: error.message,
        });
      }
    };
  
  
    module.exports = {
      getAllContacts,
      getContactById,
      createContact,
      updateContact,
      deleteContact,
      searchContacts,
    };