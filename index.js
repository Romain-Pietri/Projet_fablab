//cree un projet node classic
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const connect_client = require('./connection_mongodb_Clients.js');
const connect_stock = require('./connection_mongodb_Stocks.js');



//cree la route / qui renvoie main.html

app.use(bodyParser.json());
//on fait une API 
app.get('/', (req, res) => {
    res.sendStatus(200);//renvoie le code 200 qui signifie que tout va bien
});

app.post('/login', (req, res) => {
    //console.log(req.body);
    connect_client.verifyPassword(req.body.username, req.body.mdp)
      .then((data) => {
        if (data) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      });
}
);

app.post('/createAccompt', (req, res) => {
  //console.log(req.body);
  connect_client.createClient(req.body)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/deleteAccompt', (req, res) => {
  //console.log(req.body);
  connect_client.deleteClient(req.body.username)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/modifAccompt', (req, res) => {
  //console.log(req.body);
  connect_client.modifClient(req.body.username, req.body)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);

app.post('/getAllClient', (req, res) => {
  //console.log(req.body);
  connect_client.getAllClient()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/getAllFromClient', (req, res) => {
  //console.log(req.body);
  connect_client.getAllFromClient(req.body.username)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);

app.post('/getAllStock', (req, res) => {
  //console.log(req.body);
  connect_stock.getAllStock()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error); 
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });

    });
}
);
app.post('/getOneStock', (req, res) => {
  //console.log(req.body);
  connect_stock.getOneStock(req.body.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/createStock', (req, res) => {
  //console.log(req.body);
  connect_stock.createStock(req.body)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/deleteStock', (req, res) => {
  //console.log(req.body);  
  connect_stock.deleteStock(req.body.id)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/modifStock', (req, res) => {
  //console.log(req.body);
  connect_stock.modifStock(req.body.id, req.body)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);

app.post('/getAllReservation', (req, res) => {
  //console.log(req.body);  
  connect_reservation.getAllReservation()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.log("Erreur :", error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/getOneReservation', (req, res) => {
  //console.log(req.body);
  connect_reservation.getOneReservation(req.body.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.log("Erreur :", error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/createReservation', (req, res) => {
  //console.log(req.body);
  connect_reservation.createReservation(req.body)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.log("Erreur :", error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/deleteReservation', (req, res) => {
  //console.log(req.body);
  connect_reservation.deleteReservation(req.body.id)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.log("Erreur :", error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);
app.post('/modifReservation', (req, res) => {
  //console.log(req.body);
  connect_reservation.modifReservation(req.body.id, req.body)
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(401);
      }
    }
    )
    .catch((error) => {
      console.log("Erreur :", error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    });
}
);








http.listen(8080, "127.0.0.1",() => {
    console.log("\x1b[34m%s\x1b[0m",'Serveur lancé sur le port 4300 \u{1F525}');
    //recupere les donnée de admin via getallClient
    //recupere la promise d'admin



    
    connect_client.verifyPassword("admin", "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb");  
    connect_client.verifyPassword("admin", "mdp");

    connect_client.modifClient("JED", { "nom": "Dufort",
    "prenom": "Jean-Eude",
    "username": "JED",
    "mdp": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    "email": " Jean-eude@oui.com",
    "id": 2,
    "is_admin": false});

    connect_client.createClient({
      "nom": "Dufort",
      "prenom": "Jean-Eude",
      "username": "JED2",
      "mdp": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
      "email": " Jean-eude@oui.com",
      "id": 3,
      "is_admin": false
    });

    connect_client.getAllClient()
      .then((data) => {
        console.log(data,"test get all client");
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      });
    connect_client.deleteClient("JED2");
    connect_client.getAllFromClient("JED2").then((data) => {
      console.log(data,"test get all client");
    })
    connect_client.getAllFromClient("admin");
    
    connect_client.getAllClient()
      .then((data) => {
        console.log(data,"test get all client");
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      });






});

