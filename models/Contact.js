const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/database');
const Contact = 
  sequelize.define("Contact", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le champ 'nom' est obligatoire." },
        notEmpty: { msg: "Le champ 'nom' ne peut pas être vide." },
        len: {
          args: [3, 255],
          msg: "Le champ 'nom' doit comporter au moins 3 caractères.",
        },
      },
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le champ 'prenom' est obligatoire." },
        notEmpty: { msg: "Le champ 'prenom' ne peut pas être vide." },
        len: {
          args: [3, 255],
          msg: "Le champ 'prenom' doit comporter au moins 3 caractères.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "L'email existe déjà dans le système." },
      validate: {
        notNull: { msg: "Le champ 'email' est obligatoire." },
        notEmpty: { msg: "Le champ 'email' ne peut pas être vide." },
        isEmail: { msg: "Veuillez fournir une adresse email valide." },
      },
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le champ 'téléphone' est obligatoire." },
        notEmpty: { msg: "Le champ 'téléphone' ne peut pas être vide." },
        len: {
          args: [8, 8],
          msg: "Le champ 'téléphone' doit comporter exactement 8 caractères.",
        },
      },
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
  });

module.exports = Contact;
