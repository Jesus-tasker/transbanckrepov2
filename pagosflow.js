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
//-----------------flow---------------

const crypto = require("crypto");
require("dotenv").config();


const { Console } = require('console');
const { url } = require('inspector');
const exhbs=require('express-handlebars');

var router = exprees.Router(); //cripto api coinnbase


const hbs=require('express-hbs');
const cors=require('cors');

const corsOptions = {
  origin: ['https://newlove.cl', 'http://localhost:8080'
    ,"https://www.flow.cl","https://sandbox.flow.cl", "https://hydraacademy.netlify.app/", "https://hydraschool.lat/","https://hydraschool.lat", "https://montoyapeluqueria.netlify.app/",],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Habilita el intercambio de cookies o credenciales
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  optionsSuccessStatus: 200, // Respuesta exitosa para las solicitudes OPTIONS
};
app1.use(cors(corsOptions))




  //mensiona que aquui podemos configurar el motor
app1.engine('.hbs',hbs.express4({            //ESTO ES UN MOTOR DE PLANTILLA (otra opcion mas especifica  )

layoutDir: './public_folder/view/layout',                        //basicamente crea un archivo .bms como si parsara un ejs que 
//extname: 'hbs'
}));
app1.set("./public_folder/view/layout")
app1.set('view engine','.hbs');

app1.set('app_name','Fazt express tutorial '); 
app1.set('port',process.env.port|| 5000);
/////////////////////--2. MIDDLEWARES---////////////////////////
//2. MIDDLEWARES
app1.use(exprees.json()); //para que reciba objetos json traida de express
//app1.use(logger); //funcion creda aqui
app1.use(morgan('dev')); // EVALUA ENTRADAS EN TIEMPOS DE CONEXION y mensiona que esta en desarrollo

app1.use(exprees.urlencoded({extended: false //permite usar json opscion 2  como:  app1.use(exprees.json());
})) //aceptar datos en formularios html
//---


app1.set('views',path.join("./public_folder/view",'layout')) 
// Set view engine as EJS
app1.engine('html', require('ejs').renderFile);
app1.set('view engine', 'html');
////


//1.SETTINGS /(nombre variable, valor variable)

 //error : ESTO ES UN MOTOR DE PLANTILLA (otra opcion mas especifica  )





//imprime un textohtml
app1.get('/hola',function(req,res) {
  console.log ('entro a hola');
// res.render("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>")
   res.render('hola.hbs');
    //  res.sendFile('hola.html');
  });

app1.post('/hola2',function(req,res) {
    console.log ('entro a hola2');
  
  res.render('hola.hbs'); 
      

    });

    


  
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
//app1.post('/response2inmobiliaria',async(req,res)=>{


////////////////////////////intento con transbank1
 //json


////////////////
app1.use(exprees.static('public_folder')); //asignamos el nombre de la carpeta con el archivo html que queremos retornar



const config = require('./config');

//1. perfecto crea el pago bien , quizas pueda dejar solo webpay y listo 
app1.post("/create-payment/:id",async(req,res)=>{
    //versiona app
    console.log("ENTRO A PAGAR  y crear url de pago")
    const id = req.params.id; // Aquí obtienes el valor de 'id' de la ruta
    console.log("ID recibido:", id);
  
    var uid=req.body['uid'];
    var buy_orderv5=req.body['buyOrder']; //orders.numero1111.uid
    var amount_v5=req.body['amount'];
    var sessionId_v5=req.body['sessionId'];
    var correo=req.body['correo'];
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
        "return_url":"https://newloverbacked.lat/response2inmobiliaria" //"https://webpay3gint.transbank.cl" // "http://salonhousev2.herokuapp.com"
      })
     // console.log(data5);
      
      
      async function createPayment() {
        try {
          if (!process.env.FLOW_API_KEY || !process.env.FLOW_SECRET_KEY) {
            throw new Error("API Key o Secret Key no definidas. Verifica tu archivo .env.");
          }
      
          const apiKey =process.env.FLOW_API_KEY;
          const secretKey = process.env.FLOW_SECRET_KEY;
          const apiUrl=process.env.FLOW_API_URL;
      
          //ORIGINAL :
            const optional = {
            rut: "9999999-9",
            otroDato: "otroDato"
          };
          const payload = {
            apiKey: apiKey,
            commerceOrder: buy_orderv5,
            subject: "compra online",
            currency: "CLP",
            amount: amount_v5,
            email: correo,//"cliente@correo.com",
            // https://2467-190-21-234-140.ngrok-free.app  generado con  ngrok para que  reciba url de flow en local host 
            urlConfirmation: "https://newloverbacked.lat/payment-callback-flow2",//url donde envia el token de confirmacion de pago
            urlReturn: "https://newloverbacked.lat/hola2" //post? //"http://localhost:8080//verificar-orden-newlove/:id" //url donde te envia al terminar el pago
          };
      
      
          
          const orderedParams = Object.keys(payload).sort().map(key => `${key}=${payload[key]}`).join('&');
            console.log("parametros: "+orderedParams);
            
            // Genera la firma HMAC-SHA256 y la convierte a Base64
            const signature = crypto.createHmac('sha256', secretKey)
                                    .update(orderedParams)
                                    .digest('hex');
                                  // .digest('base64');
      
                              //      var sign = CryptoJS.HmacSHA256(stringToSign, secretKey);//solo js
            // Añade la firma a los parámetros
            payload.s = signature;
            
          
        
            // Realiza la solicitud usando fetch o tu método preferido (en este caso usando `fetch`)
            //ORIGINAL FUNCIONA PERO NO RETORNA EL JSON
            //1.ONTENER URL 
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                // headers
              'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams(payload)
            });

              //original funciona pero no retorna bien 
          /* .then(response => response.json())
          <
            .then(data => console.log('data 1:',data),)
          
          
            .catch(error => console.error('Error:', error));*/

            //2.REENVIARLO
            const data = await response.json();
            /* data 1: {
                token: '3AF6D77AB22D4C0A26F2F1FC683F15D393D9E2AT',
                url: 'https://www.flow.cl/app/web/pay.php',
                flowOrder: 2304789
              } */
          console.log('data 2:',data);
          const redirectUrl = `${data.url}?token=${data.token}`; //funciona 
          //var tokenobtenido1=  response.data['token'];
          //var url_obtenido1=  response.data['url'];
          // Envía la respuesta directamente como JSON al cliente
          // res.send(data);
              res.send({ redirectUrl, flowOrder: data.flowOrder }); //rerorna el url de pago y el numero de orden

      //HASTA AQUI TODO FUNCIONA PERFECTI

            //----intento 1
           /*   var nodo='ordenescompra'//req.params; //funciona 

              //forma correcta de recibir un json y pasarlo a firebase 
               db.ref('orders').child(nodo).set({
                  amount:req.body.amount,
                 order:req.body.order,
                 os:req.body.os});*/
               //db.ref('order').set({nombre:'gaston',mensaje:'jodete'}); //si gurarda en firebase
           
            res.send('RECIBED');


        
            
      
      
        } catch (error) {
          if (error.response) {
            console.error("Error en la respuesta:", error.response.data); // Detalles de error
          } else {
            console.error("Error al crear el pago:", error.message);
          }
        }
      }
  
      createPayment().then((url) => {
        if (url) {
          console.log("Redireccionar al usuario a:", url);
        }
      });

});

//2. funciona perfectamente para validar el pago el url que retrona a mi back
app1.post("/payment-callback-flow2", async (req, res) => {
  //si no entra el pago nunca se completo 
   //const id = req.params.id; // Aquí obtienes el valor de 'id' de la ruta
   // console.log("ID recibido:", id);
  
  try {
      const token = req.body.token; // Recibe el token del pago enviado por Flow
      console.log("Token recibido 2 :", token);

      if (!token) {
          return res.status(400).json({ status: "error", message: "No se recibió el token." });
      }

      // Paso 2: Llamar al servicio de Flow para obtener el estado del pago
      const apiKey =process.env.FLOW_API_KEY;
      const secretKey =  process.env.FLOW_SECRET_KEY;
      const apiUrl=process.env.FLOW_API_URL;

      const params = `apiKey=${apiKey}&token=${token}`;
   
      const signature = crypto
          .createHmac('sha256', secretKey)
          .update(params)
          .digest('hex'); // Calcula la firma para la solicitud a Flow
 
         // const url = `https://sandbox.flow.cl/payment/getStatus?${params}&s=${signature}`; //    data: { code: 105, message: 'No services available' }
          const url = `https://www.flow.cl/payment/getStatus?${params}&s=${signature}`; 

      //--hasta a qui vamos bien creo luego hae el get
      console.log("parametros:", params);
      console.log("s:", signature);

      console.log("");
  
  
     const response = await axios.get(url); // Llama al servicio de Flow
      const data = response.data; // La respuesta incluye datos como el estado y otros detalles del pago

      //console.log("Datos de la orden recibidos:", data); //el pago se hizo 

      //al ser el envio desde la api de flow no tiene mucho sentido retornar nada ya que no lo vera la app 
     /* res.status(200).json({
        status: "pagocompletado",
        details: data,  
    });*/

    console.log("pago tertminado!!!");
    

  } catch (error) {
      console.error("Error al obtener el estado del pago:", error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

//3. extra pero funciona , consultar orden de compra cuando ya la realizo  el pago desde flutter 
app1.post("/consultar_orden_pagada/:id", async (req, res) => {

    const id = req.params.id; 
  console.log("consultando orden de pago:"+id);

    

  const apiKey =process.env.FLOW_API_KEY;
  const secretKey =  process.env.FLOW_SECRET_KEY;
  const apiUrl=process.env.FLOW_API_URL;

  async function consultarEstadoOrden(orderNumber) {
    // Parámetros requeridos por el endpoint de consulta de ordenes en Flow
    const params = {
      apiKey: apiKey,
     // s: 'order.getStatus',
     flowOrder: orderNumber
    };

    // Generación de la firma SHA256
    const queryString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');

    const signature = crypto.createHmac('sha256', secretKey)
      .update(queryString)
      .digest('hex');

    // Agrega la firma a los parámetros
   // params['s'] = 'order.getStatus';
    //params['sSignature'] = signature;
    params['s'] = signature;


    try {  
      // Realiza la solicitud GET a la API de Flow revisar aveces se actualia   https://sandbox.flow.cl/api/payment/getStatusByFlowOrder usado anteriormente me funciono 1 vez  en pruebas locales 
     // const response = await axios.get(`https://sandbox.flow.cl/api/payment/getStatusByFlowOrderExtended`, { params });
      const response = await axios.get(`https://www.flow.cl/api/payment/getStatusByFlowOrderExtended`, { params });
     
      // response.data;//muestra todo el json 
     //  print(response.data.json);

                  /*Estado de la orden: {
              flowOrder: 2315622,
              commerceOrder: '1731455083709',
              requestDate: '2024-11-12 20:44:46',
              status: 3,
              subject: 'Pago de prueba',
              currency: 'CLP',
              amount: '2000',
              payer: 'cliente@correo.com',
              optional: null,
              pending_info: { media: null, date: null },
              paymentData: {
                date: null,
                media: null,
                conversionDate: null,
                conversionRate: null,
                amount: null,
                currency: null,
                fee: null,
                balance: null,
                transferDate: null
              },
              merchantId: null
            } */
      const m= response.data['paymentData']['amount'];
      //return response.data;
       if(m==null){
        return  "pago incompleto";
       }else{
        return "pago completado";
       }


    } catch (error) {
      console.error('Error consultando estado de orden:', error.response?.data || error.message);
    }
  }

  
  consultarEstadoOrden(id).then(estado => {
    console.log('Estado de la orden:', estado);
 
    res.send(estado);
  });




});


//agregado 
//app1.listen((process.env.PORT || app1...
app1.listen(process.env.PORT ||app1.get('port'),()=>{ //app1.listen(5000,()=>{  //puerto local de escucha de nuestro servidor  "http://localhost:3000/"
   console.log(app1.get('app_name')); ///nombre del puerto
   console.log('puerto:' ,app1.get('port')); //puerto N°

   });

