const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const app = express();

mongoose.connect('mongodb+srv://andrzej:dZB2mWrfYH7muMNF@cluster0.d5tqqnd.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log('Połączono z MongoDB');
})
.catch((error) =>{
    console.log('Błąd połączenia z MongoDB', error);
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/users', async (req, res) => {
    try{
        const {username, password} = req.body;
        const newUser = new User({username, password});
        await newUser.save();
        res.status(201).json({message: 'Użytkownik został dodany.'})
    } 
    catch(error){
        res.status(500).json({message: 'Wystąpił błąd podczas dodawania użytkownika.'})
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Serwer działa na porcie ${port}`);
})

