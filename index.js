//cree un projet node classic
const express = require('express');
const app = express();
http = require('http').createServer(app);
const bodyParser = require('body-parser');
const connect_client = require('./connection_mongodb_Clients.js');
const connect_stock = require('./connection_mongodb_Stocks.js');
//const connect_reservation = require('./connection_mongodb_Reservation.js');

const os = require('os');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
//on fait une API 
app.get('/', (req, res) => {
    res.sendStatus(200);//renvoie le code 200 qui signifie que tout va bien
});
app.post('/', (req, res) => {
  res.sendStatus(200);//renvoie le code 200 qui signifie que tout va bien
}
);


app.post('/login', (req, res) => {
    //console.log(req.body);
    connect_client.verifyPassword(req.body.username, req.body.mdp)
      .then((data) => {
        if (data) {
          connect_client.getAllFromClient(req.body.username).then((data2) => {
            if(data2){
              if(data2.is_admin){
                res.sendStatus(201);
              }
              else res.sendStatus(200);
            }
            else{
              res.sendStatus(401);
            }
          }
          )
          .catch((error) => {
            console.error('Erreur lors de la récupération des données dans le is_admin :', error);
            res.status(500);
          });
        } else {
          res.sendStatus(401);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données dans verify password:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      });
}
);

app.post('/createAccompt', (req, res) => {
  //console.log(req.body);
  connect_client.verifySolo(req.body.username).then((data) => {
    if(data){
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
    else{
      res.sendStatus(402);
    }
  })
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
  console.log("getAllFromClient")
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
  console.log("getAllStock")
  connect_stock.getAllStock()
    .then((data) => {
      console.log(data)
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
  console.log("createStock")
  var ob= req.body;

  connect_stock.createID(ob.type).then((data) => {
    if(data){
      ob.id=data;
      connect_stock.createStock(ob)
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
    else{
      res.sendStatus(402);
    }
  }
);
});
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
app.post('/reduceQuantity',(req,res) =>{
  console.log("reduceQuantity");
  if(req.body.quantite<=0){
    res.sendStatus(402);
    return;
  }

  connect_stock.reduceQuantity(req.body.id, req.body.quantite)
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

});
app.post('/augmenteQuantity',(req,res) =>{
  console.log(req.body);
  if(req.body.quantite<=0){
    res.sendStatus(402);
    return;
  }
  connect_stock.augmenteQuantity(req.body.id, req.body.quantite)
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
app.post('/getAllReservationFromClient', (req, res) => {
  //console.log(req.body);
  console.log('getAllReservationFromClient')
  connect_reservation.getAllReservationFromClient(req.body.username)
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
app.post('/verifyReservation', (req, res) => {
  //console.log(req.body);
  connect_reservation.verifyReservation(req.body.timestampdebut, req.body.timestampfin, req.body.idmachine)
    .then((data) => {
      if (data) {
        res.send(data);
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
});

// Function to retrieve the private IP address
const getPrivateIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];
    for (const address of interface) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return null;
};

// Get the private IP address
const privateIPAddress = getPrivateIPAddress();

console.log("\x1b[34m%s\x1b[0m",privateIPAddress )


http.listen(8080, privateIPAddress,() => {
    console.log("\x1b[34m%s\x1b[0m",'Serveur lancé sur le port 8080 \u{1F525}');
    //recupere les donnée de admin via getallClient
    //recupere la promise d'admin
    connect_client.pingToBDD();    
});

