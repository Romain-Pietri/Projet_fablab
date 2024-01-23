//cree un projet node classic
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const connect = require('./connection_mongodb_client.js');



//cree la route / qui renvoie main.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/main.html');
});

app.use(bodyParser.json());

//recupere la requete /getAllFromClient et renvoie la requete en fonction de l'argument du fetch
app.post('/getAllFromClient', (req, res) => {
    console.log(req.body); // Assurez-vous que req.body est correct ici
    const username = req.body && req.body.username;
    if (!username) {
      return res.status(400).json({ error: 'Le champ username est requis.' });
    }
    connect.getAllFromClient(username)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      });
  });





http.listen(8080, "127.0.0.1",() => {
    console.log("\x1b[34m%s\x1b[0m",'Serveur lancé sur le port 4300 \u{1F525}');
    //recupere les donnée de admin via getallClient
    //recupere la promise d'admin



    
    connect.verifyPassword("admin", "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb");  
    connect.verifyPassword("admin", "mdp");

    connect.modifClient("JED", { "nom": "Dufort",
    "prenom": "Jean-Eude",
    "username": "JED",
    "mdp": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    "email": " Jean-eude@oui.com",
    "id": 2,
    "is_admin": false});

    connect.createClient({
      "nom": "Dufort",
      "prenom": "Jean-Eude",
      "username": "JED2",
      "mdp": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
      "email": " Jean-eude@oui.com",
      "id": 3,
      "is_admin": false
    });

    connect.getAllClient()
      .then((data) => {
        console.log(data,"test get all client");
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      });
    connect.deleteClient("JED2");
    connect.getAllFromClient("JED2").then((data) => {
      console.log(data,"test get all client");
    })
    connect.getAllFromClient("admin");
    
    connect.getAllClient()
      .then((data) => {
        console.log(data,"test get all client");
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      });






});

