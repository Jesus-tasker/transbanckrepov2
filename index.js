const { json } = require('express');
const exprees=require('express');  //const http=require('http');
const morgan=require('morgan');
const app1=exprees();


///inteto transbank 1
//const Transbank = require('transbank-sdk');

//const transaction = new  Transbank.Webpay(
//// Transbank.Configuration.forTestingWebpayPlusNormal()
//).getNormalTransaction();


//SETTINGS /(nombre variable, valor variable)
app1.set('app_name','Fazt express tutorial '); //este se muestra en consola al iniciar la conexcion con el host
app1.set('port',5000)
app1.set('view engine','ejs'); //ESTO ES UN MOTOR DE PLANTILLA
//app1.set('views',path.join("./public_folder/view",'view'))
//comando para load : npx nodemon index.js
function logger(req,res,next){ //esta funcion registrara las peticiones que recibe el servidor
   
    console.log (`ruta recibida: ${req.protocol}:// ${req.get('host')}${req.get(req.originalUrl)}`); //comillas invertidas
    next();

}
//cuando entren a mi app pinte en pantalla
app1.get('/',(req,res)=>{
   //const data= [{name:'jhon',lastiname:'torres'},{name:'juan',lastiname:'torres'},{name:'viqui',lastiname:'melano'}];
   const data= [{name:'jhon'},{name:'juan'},{name:'viqui'}];

   res.render('index.ejs', {people: data});//View/index.ejs /pasamos la lsita de datos y que los muestre  
});


//MIDDLEWARES
app1.use(exprees.json()); //para que reciba objetos json traida de express
//app1.use(logger); //funcion creda aqui
app1.use(morgan('dev')); // EVALUA ENTRADAS EN TIEMPOS DE CONEXION


//RROUTES
app1.all('/user',(res,req,netxt)=>{ //antes de netrar pasa primero por esta entrada
console.log('por aqui paso');
//res.send('terminado');
netxt();

});
///

 //json
 app1.get('/user',(req,res)=>{
     res.json({
         username: 'jesus',
         lastiname: 'montoya'
     });

   // res.send('PETICION GET RECIBIDA');
});


app1.post('/user/:id',(req,res)=>{ //pagina para nosotros POST
    console.log(req.body); //recibe los datos que estane nviandonos todo el tiempo
    console.log(req.params); //los parametros que recibe  //http://localhost:5000/user/456
    res.send('PETICION POST RECIBIDA  O POST REQUEST RECIBED')
});

app1.put('/user/:id_update',(req,res)=>{ //put actualizar
    console.log(req.body);

    res.send('User ${req.params.id_update} actualizadp' );
    //res.send('UPDATE REQUEST /ACTUALIZACION RECIBIDA ')
});

app1.delete('/user/:id_delent',(req,res)=>{ //elimina el id desdepostman

    res.send('respuesta: User ${req.params.id_delent} delete');
   // res.send('aqui seria la informacion de contacto ')
});



/////////////////////////////intento con transbank1
 //json
 app1.get('/pagos1',(req,res)=>{
     //amount, buyOrder, sessionId, returnUrl, finalUr
    res.json({
        amount:'amount',
         buyOrder:'buy_order',
          sessionId:'sesion_id',
           returnUrl: 'url',
           finalUr:'final_url'
       // username: 'jesus',
       // lastiname: 'montoya'
    });

  // res.send('PETICION GET RECIBIDA');
});


app1.post('/pagos1/:id',(req,res)=>{ //pagina para nosotros POST
   console.log(req.body); //recibe los datos que estane nviandonos todo el tiempo
   console.log(req.params); //los parametros que recibe  //http://localhost:5000/user/456
//
   //res.json({ username: 'Flavio' });
//
   //asi retornamos un json tal cual lo necesitamos 
    res.json({amount:'amount 22',
  buyOrder:'buy_order_return22',
   sessionId:'sesion_id_re22',
    returnUrl: 'url_re22',
    finalUr:'final_url_re22'});
    //res.send(req.body);//retorna el mismo json que me traen
   // res.send(amount);
   res.send('PETICION POST RECIBIDA  O POST REQUEST RECIBED');
});



//------------Conectar  webppay con firebase mediante js y obtener la compra , luego envair a pasarela de pagos 
//-importar librerias con firebase function para que funcione 
//-tener firebase en modo completo /database/upgrade..
//-obtenemos la solicitud de un url parasando por defecto 
////////////////
app1.use(exprees.static('public_folder')); //asignamos el nombre de la carpeta con el archivo html que queremos retornar


app1.listen(app1.get('port'),()=>{ //app1.listen(5000,()=>{  //puerto local de escucha de nuestro servidor  "http://localhost:3000/"
    console.log(app1.get('app_name')); ///nombre del puerto
    console.log('puerto' ,app1.get('port')); //puerto N°

    });




