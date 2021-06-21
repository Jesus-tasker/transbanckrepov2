const { render } = require('ejs'); //render es para cargar algun html predefinido 
const { json } = require('express');
const exprees=require('express');  //const http=require('http'); //el qeu esta pendiente de las peticiones
const { token } = require('morgan');
const morgan=require('morgan');//
const path =require('path');
const admin = require("firebase-admin");
const axios = require("axios");
const app1=exprees();
const port=process.env.port|| 5000;

//
//1.SETTINGS /(nombre variable, valor variable)
app1.set('app_name','Fazt express tutorial '); //este se muestra en consola al iniciar la conexcion con el host
app1.set('port',process.env.port|| 5000);
app1.set('view engine','ejs'); //ESTO ES UN MOTOR DE PLANTILLA
//app1.set('views',path.join(_ruta,'view'))   //opcional //aqui podemos anidar carpetas enxas donde queramos guardar datos
/*app1.getenine('.hbs',exphbsñ({            //ESTO ES UN MOTOR DE PLANTILLA (otra opcion mas especifica  )
                                              //mensiona que aquui podemos configurar el motor
   defaullayout: 'main',                        //basicamente crea un archivo .bms como si parsara un ejs
   extname: 'hbs'
}))*/

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



//----------------------------------------------------------------------------

//---intentemos firebase  ...//
//--- ...//
//const admin = require("firebase-admin"); //1.

//json de conexion con firebase -2 maneras de llamarlo diferente est ae s mas directa 
var serviceacount=require('../../Desktop/express-curse/beauty-home-8193b-firebase-adminsdk-1dntl-33624dd838.json');
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

//---intentemos transbanck ...//
//--- ...//
//--- ...//
//--- ...//
//---intentemos transbanck ...//


//settings: renderizamos el archivo javascrip y html5
app1.engine('hbs',exprees({ layoutDir:`view/layout`}))  //verificaqr que sean invertidas o normales `Views/layouts`
app1.set('view','view/layout') //°°
app1.set('view engine','.hbs')



app1.get('/pagarwebpay',async(req,res)=>{
  print("webpay1")
  var tokken=req.query.tokken

  var nodo='alalala'//req.params;
  //ok
//claro qeu si 


 var url_return='https://webpay3gint.transbank.cl';

  var url_test='https://webpay3gint.transbank.cl'; //integracion
  var url_production='https://webpay3g.transbank.cl';

   //http://localhost:4000/request/webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions
 var axionresponse= await axios(`${url_test}/rswebpaytransaction/api/webpay/v1.0/transactions`,{
    method:'post', //POST
    Headers:{ //enviamos la solicitud con lso datos de peticion http
    "Tbk-Api-Key-Id":"597055555532",
    "tbk-Api-Key-Secret":"579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
    "Content-Type": "application/json",
      },
    data:{
    "buy_order": "orden_00122",
    "session_id": "0111",
    "amount": "50000",
    "return_url":"https://webpay3gint.transbank.cl" ,
      //devolver lo   que traer
  }}).then(result=>Print(result.data)); //agregado despues de crear el webpay_request.hbs tipo html5
// 77asdfasdfasdfasdfasd
//

   
  res,render('webpay_request',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
    urlwebpay: axionresponse.url, //este es el methodo de ariiba envia un hidden oculto y el tokken 
    token:axionresponse.tokken_ws
  })

})
//busqueda en bbdd y dar el tkken de navegacion webpay
app1.get('/request',async(req,res)=>{
    var tokken=req.query.tokken

    var nodo='alalala'//req.params;

  ///   http://localhost:4000/request/
  //obtenemos de firebase la solicitud de orden de compra
  var process=await // db        //admi.database()
  db.ref(`orders/${tokken}`)//.ref(`procces/${tokken}`)
  .once('value').then(doc=>{
//    print(doc.toJSON.toString);
      if (doc!=null) {
       // print(doc);
      }

    return{...doc.val()
    } //lo retorna como un mapa
  });

  await db.ref(`orders/${tokken}`).update({'status': 'in_process'})


  //treaemos  //nodo//amount =1000,so=android
  //res.json( {amount:'1000',so:'android'});

  //var tokken=ajajajajak//req.query.token//'ajajajajak' //seria el equivalente a la ruta de id tiene el nodo de firebase como dato unico
  var url_return='https://webpay3gint.transbank.cl';

  var url_test='https://webpay3gint.transbank.cl'; //integracion
  var url_production='https://webpay3g.transbank.cl';

   //http://localhost:4000/request/webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions
 var axionresponse= await axios(`${url_test}/rswebpaytransaction/api/webpay/v1.0/transactions`,{
    method:'post', //POST
    Headers:{ //enviamos la solicitud con lso datos de peticion http
    "Tbk-Api-Key-Id":"597055555532",
    "tbk-Api-Key-Secret":"579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
    "Content-Type": "application/json",
      }, 
    //creamos el objeto de pago
      /*  'buy_order':process['order'],
    'session_id':process['order'], //order
    'amount':process['amount'],
    'return_url':url_return,*/
    data:{
    "buy_order": "orden_00122",
    "session_id": "0111",
    "amount": "50000",
    "return_url":"https://webpay3gint.transbank.cl" ,
      //devolver lo   que traer
  }}).then(result=>result.data); //agregado despues de crear el webpay_request.hbs tipo html5

 // res.json({success: true,"conectado":"conexion exitosa request"}); //conexion exitosa ...


  //----
  //Cuando se confirnma la transacicon
  var status=axionresponse['/response_code']
  //
 /* if(status==0){
    //se proceso bien
    //aqui si esta bien lo qeu recibimos en el navegador como respuesta lo guardamos en enuestra firebase
      var process=await admi.database()
      .ref(`orders/${tokken}`)
      .update({'status':'payed'})
      .once('value').then(doc=>{
        return{...doc.val()}

  })
  }else{ //no}
  }

  //sitema operativo
  var so=process['so']
    res.render('webpay_response'),{
      so:so,
    }
*/
  //pasmos al html5 utilizando url y tokken obtenido mediante el post interno  a transbanck
  res,render('webpay_request',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
    urlwebpay: axionresponse.url, //este es el methodo de ariiba envia un hidden oculto y el tokken 
    token:axionresponse.tokken
  })

})


//qui es par aretornar la vista una vez que esta completa la transaccion 
app1.post('/response',async(req,res)=>{
  var transbancktokken=req.body.token_ws
  var token=req.query.token

  var process=await // db        //admi.database()
  db.ref(`orders/${tokken}`)
  .once('value').then(doc=>{
      if (doc!=null) {
        
      }

    return{...doc.val()
    } //lo retorna como un mapa
  });

  var url_return='https://webpay3gint.transbank.cl';

  var url_test='https://webpay3gint.transbank.cl'; //integracion
  var url_production='https://webpay3g.transbank.cl';
 
   //http://localhost:4000/request/webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions
   //
   var axionresponse= await axios(`${url_test}/rswebpaytransaction/api/webpay/v1.0/transactions`,{
    method:'put', //put
    Headers:{ //enviamos la solicitud con lso datos de peticion http
      'Tbk-Api-Key-Id':                                                                                              '597055555532',
    'Tbk-Api-Key-Secret':                                                                                      '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
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
      }

      var so=process['so'] //si el web view es en android  //sistema operativo 

      //pasmos al html5 utilizando url y tokken obtenido mediante el post interno  a transbanck
      res,render('webpay_request',{ //enteoria aqui esta reronnando lo que pide transbanck para obtenerl el url
        urlwebpay: axionresponse.url, //este es el methodo de ariiba envia un hidden oculto y el tokken 
        token:axionresponse.tokken
      })

  res.json({success: true})
})



app1.listen(app1.get('port'),()=>{ //app1.listen(5000,()=>{  //puerto local de escucha de nuestro servidor  "http://localhost:3000/"
   console.log(app1.get('app_name')); ///nombre del puerto
   console.log('puerto' ,app1.get('port')); //puerto N°

   });

