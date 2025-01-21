// Importe l'objet `sequelize` (instance de Sequelize) et la fonction `initDatabase` depuis le fichier de configuration de la base de données
const { sequelize, initDatabase } = require("../config/database");

// Importe la fonction qui définit le modèle `Contact`
const Contact = require("./Contact");

// Fonction asynchrone pour initialiser les modèles
const initModels = async () => {
  try {
    // Assure que la base de données existe (créée si elle n'existe pas)
    await initDatabase();

    // Définit le modèle `Contact` en utilisant l'instance Sequelize
    // const Contact = defineContactModel(sequelize);

    // Synchronise les modèles avec la base de données
    // `force: true` recrée les tables à chaque exécution (attention : cela efface les données existantes)
    // Utilisez `force: false` en production pour éviter la perte de données
    await sequelize.sync({ force: false });
    console.log("Base de données et modèles synchronisés avec succès.");

    // Retourne les modèles définis pour les utiliser ailleurs dans l'application
    return { Contact };
  } catch (error) {
    // Affiche un message d'erreur en cas de problème lors de l'initialisation des modèles
    console.error("Erreur lors de l'initialisation des modèles :", error.message);
    
    // Termine le processus en cas d'erreur critique
    process.exit(1);
  }
};

// Exporte la fonction `initModels` pour qu'elle puisse être utilisée dans d'autres fichiers
module.exports = initModels;

