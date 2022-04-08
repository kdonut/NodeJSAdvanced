const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views',path.join(__dirname,'views'));//to i ponizej by dzialaly templaty
app.set('view engine','ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));//setup body parser transform to js object, bez tego nie przechwycimy danych z forma

app.get('/',(req,res)=>{
    //const htmlFilePath = path.join(__dirname,'views','index.html');
    //res.sendFile(htmlFilePath);
    res.render('index');//parse template by engine template

});

app.get('/restaurants',(req,res)=>{

    const filePath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    const numberOfRest = storedRestaurants.length;

   

      res.render('restaurants', {
        numberOfRestaurants : numberOfRest,
        restaurants:storedRestaurants
      });
});

app.get('/recommend',(req,res)=>{
  res.render('recommend');
});

app.get('/about',(req,res)=>{
 
  res.render('about');
});

app.get('/confirm',(req,res)=>{
    res.render('confirm');
});

app.post('/recommend',(req,res)=>{
     //middleware to extract incoming data
    const restaurant = req.body;
    const filePath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData)

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath,JSON.stringify(storedRestaurants));

    res.redirect('/confirm');

});

app.listen(3000);