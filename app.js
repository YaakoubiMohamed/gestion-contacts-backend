const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initModels = require("./models"); // Import the initModels function
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

(async () => {
  try {
    // Initialize models and sync database
    await initModels(); // Call the function to initialize models

    // Pass the Contact model to the routes
    app.use("/api/contacts", contactRoutes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors du démarrage de l'application :", error.message);
    process.exit(1);
  }
})();
