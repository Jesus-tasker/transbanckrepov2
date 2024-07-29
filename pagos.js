const { render } = require('ejs'); //render es para cargar algun html predefinido 
const { json } = require('express');
const exprees=require('express');  //const http=require('http'); //el qeu esta pendiente de las peticiones
const { token } = require('morgan');
const morgan=require('morgan');//
const path =require('path');
const admin = require("firebase-admin");
const axios = require("axios");
const app1=exprees();
//const port=process.env.port|| 5000;
const serviceacount=require('./beauty-home-8193b-firebase-adminsdk-1dntl-33624dd838.json');
//const path_views = require('./public_folder/view');



const { Console } = require('console');
const { url } = require('inspector');
const exhbs=require('express-handlebars');

var router = exprees.Router(); //cripto api coinnbase


const hbs=require('express-hbs');
const cors=require('cors');

//--15/12/22 agregado  CORS
//app1.use(cors()); //es para permitir recibir paginas info
 // Cors anterior parecia funcionar asi que no lo elimiens
 /*
 const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}*/

//probamos especificas
 // origin: ['http://localhost:51576','eloquent-halva-f6f5f1.netlify.app','newlove.cl', 'https://newlove.cl','https://newlove.cl/#/','https://casinoscripto.netlify.app/#/','https://portalcapital.netlify.app/#/','https://casinoscripto.co/#/','https://portalcapital.cl/#/'], // Lista de URLs permitidas
  //
  //
const corsOptions = {
 origin :['https://newlove.cl','https://newlove.cl/#/','http://localhost:51576','http://newlove.cl','https://newlove.cl/'],
 methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  credentials: true, // Habilita el intercambio de cookies o credenciales
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  optionsSuccessStatus: 204, // Respuesta exitosa para las solicitudes OPTIONS
};
app1.use(cors(corsOptions))


//,cors(corsOptions)
/*
var corsOptions_inmobiliaria = {
  origin: 'https://portalpropiedades.netlify.app/#/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app1.options('*', cors());

//provando cors
app1.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
//tampoco funciono 
/*
var whitelist = ['https://portalpropiedades.netlify.app', 'https://portalpropiedades.netlify.app/#/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app1.options('*', cors());

//provando cors
app1.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app1.handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://portalpropiedades.netlify.app",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

//app1.use('Access-Control-Allow-Origin''*');
 
app1.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})
 
app1.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
*/

//_--------


  //mensiona que aquui podemos configurar el motor
app1.engine('.hbs',hbs.express4({            //ESTO ES UN MOTOR DE PLANTILLA (otra opcion mas especifica  )

layoutDir: './public_folder/view/layout',                        //basicamente crea un archivo .bms como si parsara un ejs que 
//extname: 'hbs'
}));
app1.set("./public_folder/view/layout")
app1.set('view engine','.hbs');


app1.set('views',path.join("./public_folder/view",'layout')) 
// Set view engine as EJS
app1.engine('html', require('ejs').renderFile);
app1.set('view engine', 'html');
////

/*

const bodyparser=require();
const mislayouts=require('view/layou');


app1.engine('handlebars', hbs);
app1.set('view engine', 'handlebars');
// 

//settings: renderizamos el archivo javascrip y html5
app1.set('view engine', 'handlebars')
app1.engine('hbs',exprees({ layoutDir:`./public_folder/view/layout`}))  //verificaqr que sean invertidas o normales `Views/layouts`

//app1.set('view','view/layout') //°°carpetas locles hbs
app1.set('view engine','.hbs')
//app1.set('view engine', 'pug');

app1.set('view engine','ejs'); //ESTO ES UN MOTOR DE PLANTILLA
///
*/

// Require static assets from public folder
//app1.use(express.static(path.join("/public_folder", 'public')));








//1.SETTINGS /(nombre variable, valor variable)
app1.set('app_name','Fazt express tutorial '); //este se muestra en consola al iniciar la conexcion con el host
app1.set('port',process.env.port|| 5000);
 //error : ESTO ES UN MOTOR DE PLANTILLA (otra opcion mas especifica  )





//imprime un textohtml
app1.get('/hola',function(req,res) {
  console.log ('entro a hola');
// res.render("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>")
   res.render('hola.hbs');
    //  res.sendFile('hola.html');
  });

/////////////////////--postman ejemplo---////////////////////////

//comando para load : npx nodemon pagos.js

//npx nodemon pagos.js

//cuando entren a mi app pinte en pantalla (ejemplo postman )
app1.get('/',(req,res)=>{
  
    const data= [{name:'jhon'},{name:'juan'},{name:'viqui'}];

   res.render('pagos.js', {people: data});//View/index.ejs /pasamos la lsita de datos y que los muestre  
});





/////////////////////--2. MIDDLEWARES---////////////////////////
//2. MIDDLEWARES
app1.use(exprees.json()); //para que reciba objetos json traida de express
//app1.use(logger); //funcion creda aqui
app1.use(morgan('dev')); // EVALUA ENTRADAS EN TIEMPOS DE CONEXION y mensiona que esta en desarrollo

app1.use(exprees.urlencoded({extended: false //permite usar json opscion 2  como:  app1.use(exprees.json());
})) //aceptar datos en formularios html



//app1.use(exprees.static()) //



//--------------------------------------FIREBASE--------------------------------------

//---intentemos firebase  ...//
//--- ...//
//const admin = require("firebase-admin"); //1.

//json de conexion con firebase -2 maneras de llamarlo diferente est ae s mas directa
//var serviceacount=require('../../Desktop/express-curse/beauty-home-8193b-firebase-adminsdk-1dntl-33624dd838.json');
//var serviceacount="./beauty-home-8193b-firebase-adminsdk-1dntl-33624dd838.json";

var url_bbdd_firebase='https://beauty-home-8193b.firebaseio.com/';

admin.initializeApp({ 
  // 2. iniciamos la app y ponemos las credenciasles para conectar

 credential:admin.credential.cert(serviceacount),
 // credential:admin.credential.applicationDefault(), //es para obtener una autenticacion por defecto
  databaseURL:url_bbdd_firebase //url firebase nube 

})

const db=admin.database(); //constante algo similar a Database db=furebase.database.getstance( url de la database)

/////-configuraciones database listas--//

//Guardar  informacion firebase //FUNCIONA CON POSTMAN 
//http://localhost:4000/new-contact
app1.post('/new-orden/:id',async (req,res)=>{

  console.log(req.body); //recibe los datos que estane nviandonos todo el tiempo
  console.log(req.params); //los parametros que recibe  //http://localhost:4000/user/456

  var  newcontact=res.json({
    amount:req.body.amount,
    order:req.body.order,
    os:req.body.os
    })

    //
    var nodo='alalala'//req.params; //funciona 

   //forma correcta de recibir un json y pasarlo a firebase 
    db.ref('orders').child(nodo).set({
       amount:req.body.amount,
      order:req.body.order,
      os:req.body.os});
    //db.ref('order').set({nombre:'gaston',mensaje:'jodete'}); //si gurarda en firebase

 res.send('RECIBED');


 //

})



////////////////////////////intento con transbank1
 //json

 app1.get('/pagos1',(req,res)=>{
    //amount, buyOrder, sessionId, returnUrl, finalUr
  var respuesta= res.json({
      
        buyOrder:'buy_order',
         sessionId:'sesion_id',
         amount:'amount',
          returnUrl: 'url',
          finalUr:'final_url'
      // username: 'jesus',
      // lastiname: 'montoya'
   });

  

  res.send('PETICION GET RECIBIDA');
});

//probado en postman ...
 //http://localhost:4000/pagos1/numerodepago
app1.post('/pagos1/:id',async(req,res)=>{ //pagina para nosotros POST enviado desde mi app para retornar el ur del pago
  console.log(req.body); //recibe los datos que estane nviandonos todo el tiempo
  console.log(req.params); //los parametros que recibe  //http://localhost:5000/user/456

  //res.json({ username: 'Flavio' });
    //AHORA TRATEMOS DE INICIAR WEBPAY
    var url_return='https://webpay3gint.transbank.cl';

  //asi retornamos un json tal cual lo necesitamos
   var respuestacompleta=res.json({
    amount:'amount 22',
   buyOrder:'buy_order_return22',
   sessionId:'sesion_id_re22',
   returnUrl: 'url_re22',
   finalUr:url_return});
   //res.send(req.body);//retorna el mismo json que me traen
  // res.send(amount);
 // res.send('PETICION POST RECIBIDA  O POST REQUEST RECIBED');




 db.ref('pagos1').push(respuestacompleta);
 res.send('Recibed');
});


////////////////
app1.use(exprees.static('public_folder')); //asignamos el nombre de la carpeta con el archivo html que queremos retornar

//asdfasdf

//----------------------------------------------------------------------------

//probando renderizar el html no funciono
//app1.set('views', __dirname + '/views');
//app1.set("view engine", "ejs");//
//app1.engine('html', require('ejs').renderFile);

//---intentemos transbanck ...//
//--- ...//
//--- ...//
//--- ...//
//---intentemos transbanck ...//

//aqui completamos correctamente el pago 
//verificamos el estado con el numero de ordene n mi bbdd
app1.post("/confirmarpago/:id",async(req,res)=>{

  console.log("ENTRO A confirmar pago")
 // console.log("PARAMETROS UID: "+req.params); //toma el id del final pero no quiso asi que enviemoslo aparte ene  json
 var uid_c=req.body['uid'];
  var buy_orderv_C=req.body['buyOrder']; //orders.numero1111.uid
  var amount_c=req.body['amount'];
  var sessionId_c=req.body['sessionId'];
  console.log("buscando orden "+buy_orderv_C);
  //await admi.database()

  //.ref(`orders/${buy_orderv_C}`) //token de referencia 


 console.log("buscando");
   var process_confirmar= db.ref(`orders`).child(`numero1111`).once("value").then(function(snapshot) {
   //get().then((snapsshot)=>{
    var status = snapshot.val();
   // var name = snapshot.child("name").val();

   // console.log(status); //ESTE MR MUESTRA EL DATA
   console.log(status.status);
   var response=status.status;//regresemos el json 
   res.send(response); //regreso al apk del movil la respuesta
    })
    .catch(function (error) {
      console.log('error catch'+ error)
    });
  
 
})
//---inmobiliaria
app1.post("/servicio_completo/:id",async(req,res)=>{

  console.log("envio los datos del servicio terminado ");
  //uid cliente, uid worker, buyorder, total,servicios
 // console.log("PARAMETROS UID: "+req.params); //toma el id del final pero no quiso asi que enviemoslo aparte ene  json
 var uid_c=req.body['uid_cliente'];
 var uid_w=req.body['uid_worker'];
  var buy_orderv_C=req.body['buyOrder']; //orders.numero1111.uid
  var amount_c=req.body['amount'];
 // var sessionId_c=req.body['sessionId'];
  console.log("buscando orden "+buy_orderv_C);
  //await admi.database()

  //.ref(`orders/${buy_orderv_C}`) //token de referencia 

  var process= db//await admi.database()
        .ref(`worker_complete/${uid_w}/${buy_orderv_C}`) //token de referencia 
        .update(req.body);
   
   res.send("complete"); 
 
   //regreso al apk del movil la respuesta
 
   
  
 
})
  //version para inmobiliaria autenticar 1 obtener pago y response inmobiliaria
app1.post("/pagarv5inmobiliaria/:id",async(req,res)=>{
    //versiona app
    console.log("ENTRO A PAGAR V5")
  
    var uid=req.body['uid'];
    var buy_orderv5=req.body['buyOrder']; //orders.numero1111.uid
    var amount_v5=req.body['amount'];
    var sessionId_v5=req.body['sessionId'];
    //const uid_2= JSON.stringify(req.body['uid']);
    //var secionidv4=req.body['sessionId']
    console.log("uid: "+uid);
    console.log("orden: "+buy_orderv5);
    console.log("amount : "+amount_v5); //espero imprimir el id asi puedo obtener el uid
    console.log("sesionid: "+sessionId_v5);
  
    //no cambiar este json es la estructura exacta que acepta transbanck
      var data5 = JSON.stringify({
       // "uid": uid,
        "buy_order": buy_orderv5,//
        "session_id":"01112",// este valor creo que viene de transbanck 
        "amount": amount_v5,
        "return_url":"http://3.221.115.165:5000/response2inmobiliaria" //"https://webpay3gint.transbank.cl" // "http://salonhousev2.herokuapp.com"
      })
      console.log(data5);
  
      var config5 = {
        method: 'post',
        url: 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions',
        headers: { 
          'Tbk-Api-Key-Id': '597055555532', 
          'tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', 
          'Content-Type': 'application/json', 
          'Cookie': 'cookie_webpay3g_certificacion=!TfwR4fipLIfm0dE5vBDnuDUP0c6hNncS3keI4Yc5jToSHwtZpst83E103o/zyDg/tW0udauaJr0GyOw='
        },
        data : data5
      };
  
    var axiosresponse5=axios(config5).then(function (response) {
      //funciona
      console.log(JSON.stringify(response.data)); //obtengo el url y token exitosamente 
    // console.log(JSON.stringify(response.data['token'])); //"01ab0236d7b002ede9377673782dea3fe417e0f323b6ac7ab801ba18ac98d36c
    // console.log(JSON.stringify(response.data['url'])); //https://webpay3gint.transbank.cl/webpayserver/initTransaction
    var tokenobtenido1=  response.data['token'];
    var url_obtenido1=  response.data['url'];
    console.log("iniciar transanccion  ");
    console.log("token "+tokenobtenido1);
    console.log("url "+url_obtenido1);
    
  
    if(response.data!=null&&tokenobtenido1!=null&&url_obtenido1!=null){
      //
      var jsontocell={"token": tokenobtenido1,"url":url_obtenido1}
  
        res.send(jsontocell);
  
    }else{
      var jsontocell={"no obtenido": tokenobtenido1,"no obtenido":url_obtenido1}
        res.send(jsontocell);
    }
  
    })
    .catch(function (error) {
      console.log('error catch'+ error)
    });
  
  
  })

app1.post("/pagarv5/:id",async(req,res)=>{
  //versiona app
  console.log("ENTRO A PAGAR V5")

  var uid=req.body['uid'];
  var buy_orderv5=req.body['buyOrder']; //orders.numero1111.uid
  var amount_v5=req.body['amount'];
  var sessionId_v5=req.body['sessionId'];
  //const uid_2= JSON.stringify(req.body['uid']);
  //var secionidv4=req.body['sessionId']
  console.log("uid: "+uid);
  console.log("orden: "+buy_orderv5);
  console.log("amount : "+amount_v5); //espero imprimir el id asi puedo obtener el uid
  console.log("sesionid: "+sessionId_v5);

  //no cambiar este json es la estructura exacta que acepta transbanck
    var data5 = JSON.stringify({
     // "uid": uid,
      "buy_order": buy_orderv5,//
      "session_id":"01112",// este valor creo que viene de transbanck 
      "amount": amount_v5,
      "return_url":"http://salonhousev2.herokuapp.com/response2" //"https://webpay3gint.transbank.cl" // "http://salonhousev2.herokuapp.com"
    })
    console.log(data5);

    var config5 = {
      method: 'post',
      url: 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions',
      headers: { 
        'Tbk-Api-Key-Id': '597055555532', 
        'tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', 
        'Content-Type': 'application/json', 
        'Cookie': 'cookie_webpay3g_certificacion=!TfwR4fipLIfm0dE5vBDnuDUP0c6hNncS3keI4Yc5jToSHwtZpst83E103o/zyDg/tW0udauaJr0GyOw='
      },
      data : data5
    };

  var axiosresponse5=axios(config5).then(function (response) {
    //funciona
    console.log(JSON.stringify(response.data)); //obtengo el url y token exitosamente 
  // console.log(JSON.stringify(response.data['token'])); //"01ab0236d7b002ede9377673782dea3fe417e0f323b6ac7ab801ba18ac98d36c
  // console.log(JSON.stringify(response.data['url'])); //https://webpay3gint.transbank.cl/webpayserver/initTransaction
  var tokenobtenido1=  response.data['token'];
  var url_obtenido1=  response.data['url'];
  console.log("iniciar transanccion  ");
  console.log("token "+tokenobtenido1);
  console.log("url "+url_obtenido1);
  

  if(response.data!=null&&tokenobtenido1!=null&&url_obtenido1!=null){
    //
    var jsontocell={"token": tokenobtenido1,"url":url_obtenido1}

      res.send(jsontocell);

  }else{
    var jsontocell={"no obtenido": tokenobtenido1,"no obtenido":url_obtenido1}
      res.send(jsontocell);
  }

  })
  .catch(function (error) {
    console.log('error catch'+ error)
  });


})
app1.post("/pagarv4/:id",async(req,res)=>{
    //recibe numero de orden y monto de dinero 
    //pagos para web
    var tokken=req.query.tokken
    //console.log("BODY "+req.body);
    //console.log("PARAMETROS UID: "+req.params); //espero imprimir el id asi puedo obtener el uid

    /*var textoUtf8 = utf8_decode(req.body);
    console.log("enconde");
    console.log(textoUtf8);*/
    
    
    var buy_orderv4=req.body['buyOrder'];
    var amount_v4=req.body['amount'];
    var sessionId_v4=req.body['sessionId'];
    //var secionidv4=req.body['sessionId']
    console.log("BODY "+buy_orderv4);
    console.log("amount : "+amount_v4); //espero imprimir el id asi puedo obtener el uid
    console.log("sesionid "+sessionId_v4);

    var data4 = JSON.stringify({
      "buy_order": buy_orderv4,
      "session_id": "01112",
      "amount": amount_v4,
      "return_url":"http://salonhousev2.herokuapp.com/response2" //"https://webpay3gint.transbank.cl" // "http://salonhousev2.herokuapp.com"
    })
    var config = {
      method: 'post',
      url: 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions',
      headers: { 
        'Tbk-Api-Key-Id': '597055555532', 
        'tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', 
        'Content-Type': 'application/json', 
        'Cookie': 'cookie_webpay3g_certificacion=!TfwR4fipLIfm0dE5vBDnuDUP0c6hNncS3keI4Yc5jToSHwtZpst83E103o/zyDg/tW0udauaJr0GyOw='
      },
      data : data4
    };

  var axiosresponse4=axios(config)
  .then(function (response) {
    //funciona
    console.log(JSON.stringify(response.data)); //obtengo el url y token exitosamente 
   // console.log(JSON.stringify(response.data['token'])); //"01ab0236d7b002ede9377673782dea3fe417e0f323b6ac7ab801ba18ac98d36c
   // console.log(JSON.stringify(response.data['url'])); //https://webpay3gint.transbank.cl/webpayserver/initTransaction
   var tokenobtenido1=  response.data['token'];
   var url_obtenido1=  response.data['url'];
   console.log("iniciar transanccion ");
   console.log("token "+tokenobtenido1);
   console.log("url "+url_obtenido1);

   if(response.data!=null&&tokenobtenido1!=null&&url_obtenido1){
     //

      res.render('webpay_request.hbs',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
          urlwebpay: url_obtenido1,//axiosresponse2.data['token'],//axiosresponse2.url,//JSON.stringify(response.data['url']), //este es el methodo de ariiba envia un hidden oculto y el tokken 
          token_ws: tokenobtenido1//axiosresponse2.data['url'],//axiosresponse2.token_ws//JSON.stringify(response.data['token'])
            })

   }else{

   }

  })
  .catch(function (error) {
    console.log('error catch'+ error)
  })

  //  res.send(data4);
});


//////77-----------------

//http://localhost:5000/pagarv2
//https://salonhousev2.herokuapp.com/pagarv2/asdfdd
app1.get("/pagarv2/:id",async(req,res)=>{


  var tokken=req.query.tokken

  

  //recibe numero de orden y monto de dinero 

  var data = JSON.stringify({
    "buy_order": "orden_001224",
    "session_id": "01112",
    "amount": "70000",
    "return_url":"http://salonhousev2.herokuapp.com/response2" //"https://webpay3gint.transbank.cl" // "http://salonhousev2.herokuapp.com"
  })


  var config = {
    method: 'post',
    url: 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions',
    headers: { 
      'Tbk-Api-Key-Id': '597055555532', 
      'tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', 
      'Content-Type': 'application/json', 
      'Cookie': 'cookie_webpay3g_certificacion=!TfwR4fipLIfm0dE5vBDnuDUP0c6hNncS3keI4Yc5jToSHwtZpst83E103o/zyDg/tW0udauaJr0GyOw='
    },
    data : data
  };

  var axiosresponse3=axios(config)
  .then(function (response) {
    //funciona
    console.log(JSON.stringify(response.data)); //obtengo el url y token exitosamente 
   // console.log(JSON.stringify(response.data['token'])); //"01ab0236d7b002ede9377673782dea3fe417e0f323b6ac7ab801ba18ac98d36c
   // console.log(JSON.stringify(response.data['url'])); //https://webpay3gint.transbank.cl/webpayserver/initTransaction
   var tokenobtenido1=  response.data['token'];//.data['token'];
   var url_obtenido1=  response.data['url'];
   console.log("iniciar transanccion ");
   console.log("token "+tokenobtenido1);
   console.log("url "+url_obtenido1);

   if(response.data!=null&&tokenobtenido1!=null&&url_obtenido1){

   res.render('webpay_request.hbs',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
      urlwebpay: url_obtenido1,//axiosresponse2.data['token'],//axiosresponse2.url,//JSON.stringify(response.data['url']), //este es el methodo de ariiba envia un hidden oculto y el tokken 
      token_ws: tokenobtenido1//axiosresponse2.data['url'],//axiosresponse2.token_ws//JSON.stringify(response.data['token'])
         })
   }
   // var  url_paginaweb = "http://salonhousev2.herokuapp.com"    

       //  res.send('/prueba3/');    
     //  res.send('Birds home page');
  })
  .catch(function (error) {
    console.log('error catch'+ error)
  })
})

//aqui hago pruebas con el url y tokken obtenido para visualizar la pagina de pago ..
//aqui funciona la direccion para pagar si paso los tokken y url correctamente 
//http://localhost:5000/prueba3
//     https://salonhousev1.herokuapp.com/prueba3
//ESTA ES LA DEMOSTRACION DE QUE FUNCIONA PERO QUE ALOG ESTA AML ARRIBA PARA RENDERIZAR
app1.get("/prueba3",async(req,res)=>{
  console.log("pruebas 3");

  var tokenobtenido_p=  "01abe700a194b40c13900b0d6e1bbeed47614012feaaf5dffb5cae08dbefac83"
  var url_obtenido_p=  "https://webpay3gint.transbank.cl/webpayserver/initTransaction";

  res.render('webpay_request.hbs',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
    urlwebpay: url_obtenido_p,//axiosresponse2.data['token'],//axiosresponse2.url,//JSON.stringify(response.data['url']), //este es el methodo de ariiba envia un hidden oculto y el tokken 
    token_ws: tokenobtenido_p//axiosresponse2.data['url'],//axiosresponse2.token_ws//JSON.stringify(response.data['token'])
       })

  //res.render('login1.hbs'); //muestra 2 edittex
 // res.render('resweb2.hbs');


})



//http://salonhousev2.herokuapp.com/response2

//Perfecto este es el que usamos 
app1.post('/response2',async(req,res)=>{ //originalmente post probamos con get

  var transbancktokken2=req.body.token_ws //
 // var token_r1=req.query.token_ws //error 401 , //no usar body d error 

  console.log('ENTRAMOS A RESPONSE2');
 // console.log('tokken1 : '+token_r1);
  console.log('tokken2 : '+transbancktokken2);

 /* var token_tarjeta_rechazada=req.body.TBK_TOKEN
  var token_tarjeta_rechazada_orden_compra=req.body.TBK_ORDEN_COMPRA
  var token_tarjeta_rechazada_cesionid=req.body.TBK_ID_SESION
  console.log('tarjeta rechazada : '+token_tarjeta_rechazada);
  console.log('tokken orden de compra rechazado : '+token_tarjeta_rechazada_orden_compra);
  console.log('tokken cesion id rechazada : '+token_tarjeta_rechazada_cesionid);*/
  /*
  var process=await // db        //admi.database()
  db.ref(`orders/${tokken}`)
  .once('value').then(doc=>{
      if (doc!=null) {
        //...
      }

    return{...doc.val()
    } //lo retorna como un mapa
  });*/

 // var url_return='https://webpay3gint.transbank.cl';

  var url_test='https://webpay3gint.transbank.cl'; //integracion
  var url_production='https://webpay3g.transbank.cl';
 
   var config1 = {
    method: 'put',
    url:`${url_test}/rswebpaytransaction/api/webpay/v1.0/transactions/${transbancktokken2}`,
    headers: { 
      'Tbk-Api-Key-Id': '597055555532', 
      'tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', 
      'Content-Type': 'application/json', 
      'Cookie': 'cookie_webpay3g_certificacion=!TfwR4fipLIfm0dE5vBDnuDUP0c6hNncS3keI4Yc5jToSHwtZpst83E103o/zyDg/tW0udauaJr0GyOw='
    },

  };
  //var so=process['so'] //si el web view es en android  //sistema operativo 
  var so='android';//process[''];
    var axionresponse= axios(config1)
    .then(function (responsev4) {
        //funciona
        //{"vci":"TSY","amount":70000,"status":"AUTHORIZED","buy_order":"orden_001224","session_id":"01112","card_detail":{"card_number":"6623"},"accounting_date":"0705","transaction_date":"2021-07-05T05:12:48.359Z","authorization_code":"1213","payment_type_code":"VN","response_code":0,"installments_number":0}
        console.log(JSON.stringify(responsev4.data));
      
        var status=responsev4.data['response_code']
        var order_number=responsev4.data['buy_order']

        if(status=="0" || status==0 ){
          
        console.log('stado de compra: '+status)
          //se proceso bien
          //aqui si esta bien lo qeu recibimos en el navegador como respuesta lo guardamos en enuestra firebase

          var process= db//await admi.database()
        .ref(`orders/${order_number}`) //token de referencia 
        .update(responsev4.data) //aqui le digo como guardarlo 
        /*.once('value').then(
          Console.log('actualizado')
          //doc=>{return{...doc.val()}}
          )*/
           //pasmos al html5 utilizando url y tokken obtenido mediante el post interno  a transbanck
           var completado='Pago completadp';
        res.render('webpay_response.hbs',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
          
          so: so, //este es el methodo de ariiba envia un hidden oculto y el tokken 
          respuesta: completado,
         // token:axionresponse.tokken
        })
        }else{ //no}
          console.log(' pago rechazado')

          res.send("pago rechazado, error del proveedor de tarjeta ");
        }

      }) .catch(function (error) {
        console.log('Error catch: '+ error)
      }); //agregado despues de crear el webpay_request.hbs tipo html5
      //
      //final CreateWebpayPlusTransactionResponse response = WebpayPlus.Transaction.commit(token);
   /*  try {
      const responsev6 = await WebpayPlus.Transaction.status(transbancktokken2);
      var status=responsev6['/response_code']
      console.log("responsev6: git add -A"+JSON.stringify(responsev6.data));
     } catch (error) {
      console.log('error 2:'+error)
     }*/
  
      

      

 // res.json({success: true})
})

//copya para responder ultima pagina de  inmobiliaria identidad autenticada
app1.post('/response2inmobiliaria',async(req,res)=>{ //originalmente post probamos con get

  var transbancktokken2=req.body.token_ws //
 // var token_r1=req.query.token_ws //error 401 , //no usar body d error 

  console.log('ENTRAMOS A RESPONSE2');
 // console.log('tokken1 : '+token_r1);
  console.log('tokken2 : '+transbancktokken2);



  var url_test='https://webpay3gint.transbank.cl'; //integracion
  var url_production='https://webpay3g.transbank.cl';
 
   var config1 = {
    method: 'put',
    url:`${url_test}/rswebpaytransaction/api/webpay/v1.0/transactions/${transbancktokken2}`,
    headers: { 
      'Tbk-Api-Key-Id': '597055555532', 
      'tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', 
      'Content-Type': 'application/json', 
      'Cookie': 'cookie_webpay3g_certificacion=!TfwR4fipLIfm0dE5vBDnuDUP0c6hNncS3keI4Yc5jToSHwtZpst83E103o/zyDg/tW0udauaJr0GyOw='
    },

  };
  //var so=process['so'] //si el web view es en android  //sistema operativo 
  var so='android';//process[''];
    var axionresponse= axios(config1)
    .then(function (responsev4) {
        //funciona
        //{"vci":"TSY","amount":70000,"status":"AUTHORIZED","buy_order":"orden_001224","session_id":"01112","card_detail":{"card_number":"6623"},"accounting_date":"0705","transaction_date":"2021-07-05T05:12:48.359Z","authorization_code":"1213","payment_type_code":"VN","response_code":0,"installments_number":0}
        console.log(JSON.stringify(responsev4.data));
      
        var status=responsev4.data['response_code']
        var order_number=responsev4.data['buy_order']

        if(status=="0" || status==0 ){
          
        console.log('stado de compra: '+status)
          //se proceso bien
          //aqui si esta bien lo qeu recibimos en el navegador como respuesta lo guardamos en enuestra firebase

          var process= db//await admi.database()
        .ref(`orders/${order_number}`) //token de referencia 
        .update(responsev4.data) //aqui le digo como guardarlo 
        /*.once('value').then(
          Console.log('actualizado')
          //doc=>{return{...doc.val()}}
          )*/
           //pasmos al html5 utilizando url y tokken obtenido mediante el post interno  a transbanck
           var completado='Pago completadp';
        res.render('webpay_responseinmobiliaria.hbs',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
          
          so: so, //este es el methodo de ariiba envia un hidden oculto y el tokken 
          respuesta: completado,
         // token:axionresponse.tokken
        })
        }else{ //no}
          console.log(' pago rechazado')

          res.send("pago rechazado, error del proveedor de tarjeta ");
        }

      }) .catch(function (error) {
        console.log('Error catch: '+ error)
      }); //agregado despues de crear el webpay_request.hbs tipo html5
      //
      //final CreateWebpayPlusTransactionResponse response = WebpayPlus.Transaction.commit(token);
   /*  try {
      const responsev6 = await WebpayPlus.Transaction.status(transbancktokken2);
      var status=responsev6['/response_code']
      console.log("responsev6: git add -A"+JSON.stringify(responsev6.data));
     } catch (error) {
      console.log('error 2:'+error)
     }*/
  
      

      

 // res.json({success: true})
})

//http://salonhousev2.herokuapp.com/response

//qui es par aretornar la vista una vez que esta completa la transaccion 
app1.post('/response',async(req,res)=>{ //originalmente post probamos con get
  var transbancktokken=req.body.token_ws
  var token=req.query.token
  //

  var process=await // db        //admi.database()
  db.ref(`orders/${tokken}`)
  .once('value').then(doc=>{
      if (doc!=null) {
        
      }

    return{...doc.val()
    } //lo retorna como un mapa
  });

 // var url_return='https://webpay3gint.transbank.cl';

  var url_test='https://webpay3gint.transbank.cl'; //integracion
  var url_production='https://webpay3g.transbank.cl';
 
   //http://localhost:4000/request/webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions
   //
   var axionresponse= await axios(`${url_test}/rswebpaytransaction/api/webpay/v1.0/transactions`,{
    method:'put', //put
    Headers:{ //enviamos la solicitud con lso datos de peticion http
      'Tbk-Api-Key-Id': '597055555532',
    'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
    'Content-Type': 'application/json',
      },}).then(result=>result.data); //agregado despues de crear el webpay_request.hbs tipo html5
      //

      var status=axionresponse['/response_code']

      if(status==0){
        //se proceso bien
        //aqui si esta bien lo qeu recibimos en el navegador como respuesta lo guardamos en enuestra firebase
          var process=await admi.database()
      .ref(`orders/${tokken}`)
      .update({'status':payed})
      .once('value').then(doc=>{
        return{...doc.val()}
    
      })
      }else{ //no}
        console.log('error al obtener respuesta o pago rechazado')
      }

      var so=process['so'] //si el web view es en android  //sistema operativo 

      Console.log("STATus--------------" +status)
      const response4 = await WebpayPlus.Transaction.commit(token);
      console.log("sdk node: "+response4);
      //pasmos al html5 utilizando url y tokken obtenido mediante el post interno  a transbanck
      res,render('webpay_response.hbs',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
        so: so, //este es el methodo de ariiba envia un hidden oculto y el tokken 
       // token:axionresponse.tokken
      })

 // res.json({success: true})
})


app1.post("/notifi/:id",async(req,res)=>{
  console.log("ENTRO A notifi")
  //versiona app


  var uid_notifi1=req.body['uid_notifi'];
  var titulo1=req.body['titulo']; //orders.numero1111.uid
  var mensaje1=req.body['mensaje'];
 // var sessionId_v5=req.body['sessionId'];
  //const uid_2= JSON.stringify(req.body['uid']);
  //var secionidv4=req.body['sessionId']
  console.log("uid: "+uid_notifi1);
  console.log("titulo: "+titulo1);
  console.log("mensaje  : "+mensaje1); //espero imprimir el id asi puedo obtener el uid
  //console.log("sesionid: "+sessionId_v5);

 var axios = require('axios');
var data = JSON.stringify({
  "notification": {
    "body": mensaje1,//"texto notificaion",
    "title":titulo1,// "Titulo"
  },
  "priority": "high",
  "data": {
    "product": "agua "
  },
  "to": uid_notifi1// "e2iM6V_qSjWuc4s3sAgyfM:APA91bE0CwsTrS-tgKpoqIGNHXa2HhGjy4kobaX2CmBLawEQkvJOallFARwprX-rrzMKeOMZgTF3l1QDccB5SAZVE2fw9NyH9vM7SQph-pO5ImMsCW1RRudI58tp8i4BYzZeJ-iEyuAz"
});

var config = {
  method: 'post',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: { 
    //drinks up auth
    'Authorization': 'key=AAAAW4bhwk0:APA91bEOrGCjumi8sqWBjAbf54j6TTSgKztGSdWcUTCK_HloxRalKUhB_D1CfKAMkA2Lyb_LkAWlrg3hJ27Re5JMK_fTVXqt_i0n4V7ZdsHB8UFBTYwgoTeAcLLsZVZQWAjWt4UdgMke', 
  //la de abajo es la original pero no recuerdo de que app
   // 'Authorization': 'key=AAAAV9kVxa8:APA91bH-bozcPoglN48PFhKYk9OqX1e0jiNpcteVfI-z-_ZK7_IEvaUXSvtXiCYS5JcAW6CyePPcCdTGh4K7GN-ROq_6ddchhu7L_8LaoJFbRbng4aKnodR65JV8fRMM7Geo4nNApXJh', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  res.status("complete");
})
.catch(function (error) {
  console.log(error);
  res.status("error");
});



})
app1.post("/notifidrinksup/:id",async(req,res)=>{
  console.log("ENTRO A notifi")
  //versiona app


  var uid_notifi1=req.body['uid_notifi'];
  var titulo1=req.body['titulo']; //orders.numero1111.uid
  var mensaje1=req.body['mensaje'];
 // var sessionId_v5=req.body['sessionId'];
  //const uid_2= JSON.stringify(req.body['uid']);
  //var secionidv4=req.body['sessionId']
  console.log("uid: "+uid_notifi1);
  console.log("titulo: "+titulo1);
  console.log("mensaje  : "+mensaje1); //espero imprimir el id asi puedo obtener el uid
  //console.log("sesionid: "+sessionId_v5);

 var axios = require('axios');
var data = JSON.stringify({
  "notification": {
    "body": mensaje1,//"texto notificaion",
    "title":titulo1,// "Titulo"
  },
  "priority": "high",
  "data": {
    "product": "agua "
  },
  "to": uid_notifi1// "e2iM6V_qSjWuc4s3sAgyfM:APA91bE0CwsTrS-tgKpoqIGNHXa2HhGjy4kobaX2CmBLawEQkvJOallFARwprX-rrzMKeOMZgTF3l1QDccB5SAZVE2fw9NyH9vM7SQph-pO5ImMsCW1RRudI58tp8i4BYzZeJ-iEyuAz"
});

var config = {
  method: 'post',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: { 
    'Authorization': 'key=AAAAW4bhwk0:APA91bEOrGCjumi8sqWBjAbf54j6TTSgKztGSdWcUTCK_HloxRalKUhB_D1CfKAMkA2Lyb_LkAWlrg3hJ27Re5JMK_fTVXqt_i0n4V7ZdsHB8UFBTYwgoTeAcLLsZVZQWAjWt4UdgMke', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  res.status("complete");
})
.catch(function (error) {
  console.log(error);
  res.status("error");
});



})

//notificacion solo para inmobiliaria a usuario  ene ste caso para chat 
app1.post("/notifiinmobiliaria/:id",async(req,res)=>{
  console.log("ENTRO A notifi inmobiliaria ")
  //versiona app


  var uid_notifi1=req.body['uid_notifi'];
  var titulo1=req.body['titulo']; //orders.numero1111.uid
  var mensaje1=req.body['mensaje'];
 // var sessionId_v5=req.body['sessionId'];
  //const uid_2= JSON.stringify(req.body['uid']);
  //var secionidv4=req.body['sessionId']
  console.log("uid: "+uid_notifi1);
  console.log("titulo: "+titulo1);
  console.log("mensaje  : "+mensaje1); //espero imprimir el id asi puedo obtener el uid
  //console.log("sesionid: "+sessionId_v5);

 var axios = require('axios');
var data = JSON.stringify({
  "notification": {
    "body": mensaje1,//"texto notificaion",
    "title":titulo1,// "Titulo"
  },
  "priority": "high",
  "data": {
    "product": "agua "
  },
  "to": uid_notifi1// "e2iM6V_qSjWuc4s3sAgyfM:APA91bE0CwsTrS-tgKpoqIGNHXa2HhGjy4kobaX2CmBLawEQkvJOallFARwprX-rrzMKeOMZgTF3l1QDccB5SAZVE2fw9NyH9vM7SQph-pO5ImMsCW1RRudI58tp8i4BYzZeJ-iEyuAz"
});
//ya puse la clave de firebase messanging de neuvo bien 11/11/2022
var config = {
  method: 'post',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: { 
    'Authorization': 'key=AAAAtRXa2T0:APA91bFk0vCemsz0ZvwvI7Ih4uXs2k_RzkYBiXcIpcn0Des0ygsN_of-DcRL0w74xex3RZ-oRb2xXn85NjQRHuGu5XJsk4NXdk-ZmAfOpmMvT7h6iuAsa5sJM6tW1aM6jNjSypnJ_iAx', 
    'Content-Type': 'application/json'
  },
  data : data
  
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  res.status("complete");
})
.catch(function (error) {
  console.log(error);
  res.status("error");
});



})



///----------------------coinbase- start--------------------------
//cipto init ---------------------------------------------------------------
var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;


Client.init('60b8f53b-aafb-45cc-ac0d-5922b38d7cc9'); //API KEY  coinbase PROTEJER 1/2 la otra es wedhooks con codigo qr parece ser 

//https://api.commerce.coinbase.com/checkouts 
var Checkout = coinbase.resources.Checkout;

app1.post('/pagarcripto',async(req,res)=>{
  console.log("pagar cripto");


  res.render('coinbase.hbs');
  

})
//res.render('coinbase.hbs'); //vista general
  
//aqui inicia el proceso desde presionar el boton 
//1. CARGOS -CHECKOUT
app1.post('/cripto2checkout/:id',async (req,res)=>{
  console.log("criptos enter cripto2checkout");

  /*
  Cargos- Checkouts
  Para solicitar un pago en criptomoneda,crea un cargo. Puede crear y ver cargos.
  Dado que los pagos con criptomonedas son pagos automáticos,un cargo vencerá después de un período
  de espera (ventana de pago) si no se ha detectado ningún pago. Los cargos se identifican con un código único. 
  */


  //console.log(req.body); //recibe los datos que estane nviandonos todo el tiempo
  console.log(req.params); //los parametros que recibe  //http://localhost:4000/user/456

 /* var  newcontact=res.json({
    amount:req.body.amount,
    order:req.body.order,
    os:req.body.os
    })*/

    //
    var nodo='alalala'//req.params; //funciona 

   //forma correcta de recibir un json y pasarlo a firebase 
   /* db.ref('orders').child(nodo).set({
       amount:req.body.amount,
      order:req.body.order,
      os:req.body.os});*/
      
    //db.ref('order').set({nombre:'gaston',mensaje:'jodete'}); //si gurarda en firebase

  
// Try to create checkout via Checkout resource create method
Checkout.create({
	'description': 'Mastering the Transition to the Information Age',
	'local_price': {
		'amount': '1.00',
		'currency': 'USD'
	},
	'name': 'test item 15 edited',
	'pricing_type': 'fixed_price',
  'requested_info': ['email'],
  'metadata':[{'name':'jesus'}],///
  


}, function (error, response) {
	console.log('Created checkout via create method');
	console.log(response);
	console.log(error);

	if (response && response.id) {
		// Try to update created checkout
		Checkout.updateById(response.id, {'name': 'new name'}, function (error, response) {

			console.log('Updated checkout with id ' + response.id);
			console.log(error);
			console.log(response);
      res.send(response)
          //respuesta en pantalla 
          /*{
      brand_color: '#A973A9',
      description: 'Mastering the Transition to the Information Age',
      id: '46e02c8b-0107-49e3-a622-819f67dc1e0f',
      local_price: { amount: '1.00', currency: 'USD' },
      name: 'new name',
      organization_name: 'IndustriasTasker',
      pricing_type: 'fixed_price',
      requested_info: [ 'email' ],
      resource: 'checkout'
    } */

		});
	}
});

// Try to create checkout via Checkout object save method


 //res.send('RECIBED');


 //

})
//2PAGOS -CHaRGUE (ESTE funciono perfectamente )
app1.post('/chargue3cargos/:id',async(req,res)=>{
//blabla 
  console.log("chargue crear un cargo  de pago ");
  var uid_c0=req.body['uid'];
  var buy_orderv_C0=req.body['buyOrder'];
  var nombre0=req.body['name'];
  var unid_fichas0=req.body['unidfichas'];
  var criptomoneda_seleccionada0=req.body['criptomonedaseleccionada'];
  var total0=req.body['total'];

  

  if(uid_c0!=null){
    console.log(uid_c0);
    console.log(nombre0);
    console.log(buy_orderv_C0);
    console.log(unid_fichas0);
    console.log(criptomoneda_seleccionada0);
    console.log(total0);

    if(uid_c0!=null && nombre0!=null&&buy_orderv_C0!=null &&unid_fichas0!=null &&criptomoneda_seleccionada0!=null && total0!=null){

    /*Pagos - Charges
  Las cajas permiten vender un artículo de precio fijo único o aceptar cantidades arbitrarias 
  de criptomonedas con mucha facilidad. Los pagos pueden tener muchos cargos y cada cargo se 
  genera automáticamente por cliente. Los pagos también se pueden integrar rápidamente en un 
  sitio web incorporando botones de pago. 
  Cada pago tiene una página alojada de acceso público que se puede compartir con cualquier persona. */
  var Charge = coinbase.resources.Charge;

  // cd transbanckrepov2
    // cd salonhousev2
  //git remote add origin https://github.com/Jesus-tasker/transbanckrepov2.git
  //git remote show origin

  // git pull https://github.com/Jesus-tasker/transbanckrepov2.git
 // git push https://github.com/Jesus-tasker/transbanckrepov2.git

 //error 
 /*

 ----------------git for heroku----
 heroku git:clone -a salonhousev2 
$ cd salonhousev2
$ git init
heroku git:remote -a salonhousev2
$ git add . //guardar los cambios 
$ git commit -am "cambiamos a 3000" //agregar un mensaje 
$ git push heroku master //enviamos al server y nos da el url de neustro servidor
git pull https://git.heroku.com/salonhousev2.git 
git push heroku HEAD:master


 --------------------git for github---------------------- 16/06/22
 git init
git add ..
git commit -m "first commit"
git branch  main
git remote add origin https://github.com/Jesus-tasker/transbanckrepov2.git
git pull https://github.com/Jesus-tasker/transbanckrepov2.git
//git pull origin master --allow-unrelated-histories
git push -f origin main ||
git push -f 
git push -u origin master //este funciono pero crea otro repositorio en github uno main y otro master 
git push --force

//npm install --save-dev tslint@^5.0.0 
// npm install --save-dev @firebase/util@1.x     npm install --save-dev @firebase/util@0.x
 */

  var firstChargeObj = new Charge({
    "name": "Test Name",
    "description": "Mastering the Transition to the Information Age",
    "local_price": {
      "amount": total0,
      "currency": "USD"
    },
    "pricing_type": "fixed_price",
    "metadata": {
      "customer_id": "id_1005",
      "customer_name": "Satoshi Nakamoto"
    },
    
    "payments": [],

    "redirect_url": "https://charge/completed/page",
    "cancel_url": "https://charge/canceled/page"
    
  });
  
var secondChargeObj = new Charge({
	"description": "Mastering the Transition to the Information Age",
	"metadata": {
		"customer_id": "id_1005",
		"customer_name": "Satoshi Nakamoto"
	},
	"name": "Test Name",
	"payments": [],
	"pricing_type": "no_price"
});


//PRIMERA FORMA DE HACERLO
firstChargeObj.save(function (error, response) {
	console.log('Created charge(callback)');
	console.log(response);
	console.log(error);

  if(error!=null){
    console.log("ERROR");
    console.log(error); }

	if (response && response.id) {
		Charge.retrieve(response.id, function (error, response) {
			console.log('Retrived charge(callback)');
		//	console.log(response);
    if(error!=null){
			console.log(error);
          }   
     // res.render('coinbase.hbs');
    // res.send({"code":responseresponse.code});
    // var Charge = coinbase.resources.Charge; //RZLTCE65
      console.log(response.code); //codigo de key 
      var code_cripto_order=response.code;

          if(response!=null){
            console.log("creando log");


            var jesison1={
              "Status":"pendiente",
              "uid":uid_c0,
              "buyOrder": buy_orderv_C0,
              "name":nombre0,
              "unid_fichas":unid_fichas0,
              "criptomoneda_seleccionada":criptomoneda_seleccionada0,
              "total":total0
            }
            
          // var process2=await admi.database()
          db .ref(`ordersCriptos/${uid_c0}/${buy_orderv_C0}/${code_cripto_order}`)
           .update(jesison1);
           // .once('value').then(doc=>{return{...doc.val()}}

           var json_return={"code":response.code,"direcciones":response.addresses,"precios":response.pricing};

          // res.send(response.addresses);
          res.send(json_return);
          }

      //console.log(response.data["addresses"]);

            //BBDDD
        //uid //solicitud//codigo // pendiente
         //uid //comprasterminadas //codigo // pagado
        // RZLTCE65

		});
	}
});



    }



  }


//---
})
//3. aqui validamos el id del pago si esta pagado o no 
app1.post('/validarchargue/:id',async(req,res)=>{
  //VALIDAMOS CON EL COIGO DEL  pago
  //podemos saber el estado mediante un get a la url de coinbase y el codigo del chargue para el cliente 
  //https://commerce.coinbase.com/docs/api/
 // https://api.commerce.coinbase.com/charges/EVX5M3WE
 //recibe el codigo nada mas con eso ya el mismo sistema confirma la transaccion
 
 console.log("chargue crear un cargo  de pago ");
 var uid_c0=req.body['uid'];
 var buy_orderv_C0=req.body['buyOrder'];
 var nombre0=req.body['name'];
 var unid_fichas0=req.body['unidfichas'];
 var criptomoneda_seleccionada0=req.body['criptomonedaseleccionada'];
 var total0=req.body['total'];
 var hash_pago=req.body['hash'];
 

 if(uid_c0!=null){
   console.log(uid_c0);
   console.log(nombre0);
   console.log(buy_orderv_C0);
   console.log(unid_fichas0);
   console.log(criptomoneda_seleccionada0);
   console.log(total0);

   if(uid_c0!=null && nombre0!=null&&buy_orderv_C0!=null
    &&unid_fichas0!=null &&criptomoneda_seleccionada0!=null && total0!=null){


 //es mas chevre usando postman
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://api.commerce.coinbase.com/charges/'+hash_pago,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
   // res.send(response.data)
    //res.send(response.data["data"]["timeline"]); //funciona me trae el estado si ha sido completado  NEW ,RESOLVED
   res.send(response.data["data"]["payments"]);  //[] funciona abajo esta el json que usaria  pero regresa vacia si no se completa
   //res.send(response.data["data"]["payments"]["status"]);  //no regreso nada 
  /*  if(response.data["data"]["payments"]===[]){

      res.send("Pago no realizado");
    }*/
    /*"payments": [
      {
        "network": "ethereum",
        "transaction_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "status": "CONFIRMED",
        "detected_at": "2017-01-31T22:00:00Z",
        "value": {
          "local": { "amount": "100.0", "currency": "USD" },
          "crypto": { "amount": "10.00", "currency": "ETH" }
        },
        "block": {
          "height": 100,
          "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
          "confirmations_accumulated": 8,
          "confirmations_required": 2
        }
      }
    ], */
    //nuevo y expirado
    //hasta aqui correcto me retorna el estado de ese pago 
   const json={ "timeline": [
      {
          "status": "NEW",
          "time": "2021-09-16T16:13:26Z"
      }
  ]};


  const json3=response.data["timeline"]["status"];

   // res.send(json2); //return 1
    //EW2CGJFZ
    
   // obj.life; 
    //res 0=nuevo, 0=expirado
    /*{
    "data": {
        "addresses": {
            "ethereum": "0x10b673318091a74e43e22aaa70bf62ab5cd19f9e",
            "usdc": "0x10b673318091a74e43e22aaa70bf62ab5cd19f9e",
            "dai": "0x10b673318091a74e43e22aaa70bf62ab5cd19f9e",
            "bitcoincash": "qzmqfa2e3n46l359l2q3lqsmd9yyn8mrsc2m7xgylx",
            "dogecoin": "DBP7K5KaoTBz3MMkVuC8TKvv8v3N698pEz",
            "litecoin": "MEEuGVsmtXgwPqo4gY6jwbANYxWDiRVcro",
            "bitcoin": "3AsGAabPTAemrQpdA9EcGqBP43k5rg9TJL"
        },
        "brand_color": "#A973A9",
        "cancel_url": "https://charge/canceled/page",
        "code": "EW2CGJFZ",
        "created_at": "2021-09-16T16:13:26Z",
        "description": "Mastering the Transition to the Information Age",
        "exchange_rates": {
            "BCH-USD": "636.79",
            "BTC-USD": "48094.495",
            "DAI-USD": "1.000064",
            "ETH-USD": "3617.895",
            "LTC-USD": "188.835",
            "DOGE-USD": "0.2412",
            "USDC-USD": "1.0"
        },
        "expires_at": "2021-09-16T17:13:26Z",
        "hosted_url": "https://commerce.coinbase.com/charges/EW2CGJFZ",
        "id": "28bcece0-aedd-4311-913d-b72eabf3de9e",
        "name": "Test Name",
        "organization_name": "IndustriasTasker",
        "payments": [],
        "pricing": {
            "local": {
                "amount": "80.00",
                "currency": "USD"
            },
            "ethereum": {
                "amount": "0.022112000",
                "currency": "ETH"
            },
            "usdc": {
                "amount": "80.000000",
                "currency": "USDC"
            },
            "dai": {
                "amount": "79.994880327659029822",
                "currency": "DAI"
            },
            "bitcoincash": {
                "amount": "0.12563011",
                "currency": "BCH"
            },
            "dogecoin": {
                "amount": "331.67495856",
                "currency": "DOGE"
            },
            "litecoin": {
                "amount": "0.42365028",
                "currency": "LTC"
            },
            "bitcoin": {
                "amount": "0.00166339",
                "currency": "BTC"
            }
        },
        "pricing_type": "fixed_price",
        "pwcb_only": false,
        "redirect_url": "https://charge/completed/page",
        "resource": "charge",
        "support_email": "industriastasker@gmail.com",
        "timeline": [
            {
                "status": "NEW",
                "time": "2021-09-16T16:13:26Z"
            }
        ]
    },
    "warnings": [
        "Missing X-CC-Version header; serving latest API version (2018-03-22)"
    ]
} */
  })
  .catch(function (error) {
    console.log(error);
  });


 }}else{
  res.send("info failed")
 }


})
//--------------------->arrriba
//suscripciones 
var Webhook = require('coinbase-commerce-node').Webhook;
var webhookSecret = 'ee1b72d6-a284-4c41-90b0-df1882a55035'; //GUARDAR en firebase

//-cripto 2 whoocomerce
app1.post('/createchargue3/:id',function(req,res){ //webhook
  console.log("createcargue3");


  req.setEncoding('utf8');
    
      var data = '';
    
      req.on('data', function (chunk) {
        data += chunk;
      });
    
      req.on('end', function () {
        
        req.rawBody = data;
        console.log("createcargue3");
    
        next();
      });

    function rawBody(req, res, next) {
     
    }
    
   //signature=request.headers['x-cc-webhook-signature'],

  })


router.post('/coins', function  (request, response ){
  var event;

	console.log(request.headers);

	try {
		event = Webhook.verifyEventBody(
			request.rawBody,
			request.headers['x-cc-webhook-signature'],
			webhookSecret
		);
	} catch (error) {
		console.log('Error occured', error.message);

		return response.status(400).send('Webhook Error:' + error.message);
	}

	console.log('Success', event.id);

	response.status(200).send('Signed Webhook Received: ' + event.id);
})



//-----------------coinbase over---------------



//agregado 
//app1.listen((process.env.PORT || app1...
app1.listen(process.env.PORT ||app1.get('port'),()=>{ //app1.listen(5000,()=>{  //puerto local de escucha de nuestro servidor  "http://localhost:3000/"
   console.log(app1.get('app_name')); ///nombre del puerto
   console.log('puerto:' ,app1.get('port')); //puerto N°

   });

