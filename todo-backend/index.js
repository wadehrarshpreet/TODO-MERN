const mongoose = require('mongoose');
const CONFIG = require('./config');
const PORT = CONFIG.PORT;
const MONGO_URL = CONFIG.MONGO_URL;
const app = require('./App.js');
mongoose.connect(MONGO_URL)
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server Started...PORT ${PORT}`)
  })
})
.catch((err)=>{
  console.log(err);
})
