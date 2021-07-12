const express=require('express');
const https = require('https');
const bodyParser =require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
  });


app.post("/",function(req,res){
  console.log(req.body.cityname);
  const city=req.body.cityname;
  console.log("Post Request recieved");
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=1f8d7f9e84c1e17256a219a3b044fda2&units=metric";

  //api use
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      console.log(data);
      const weatherData=JSON.parse(data);
      console.log(weatherData);
      const temp=weatherData.main.temp;
      const feels_like=weatherData.main.feels_like;
      const description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const icon_url="https://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log("the temp is "+temp+" but it feels like "+feels_like);

      res.write("<h1>The weather is currently "+description+"</h1>")
      res.write("<h1>The Temp is "+temp+" but feels like  "+feels_like+"</h1>");
      res.write("<img src="+ icon_url+" >");
      res.write("The weather description of " +city +" is = "+description);
      res.send();
});
});
});


  //only one send method in each get function
  // res.send("Server is up and running");

app.listen(3000,function(){
  console.log("server 3000 is running");
})
