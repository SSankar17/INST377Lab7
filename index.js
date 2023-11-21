const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const supabaseClient = require('@supabase/supabase-js')
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://joczumhohrowousbuqjv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvY3p1bWhvaHJvd291c2J1cWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1NDIzNDcsImV4cCI6MjAxNjExODM0N30.2HAeXPo6UmxWHKdhtZiWfKKRpghul5M7scyC_ExMpA8'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);
app.get('/', (req, res) => {
    res.sendFile('public/INST377-Week10-PPT.html', { root: __dirname})
})


app.get('/customer', async (req, res)=> {
    console.log("Getting Customer")

    const{data, error} = await supabase
        .from('Customer')
        .select();

    if (error){
        console.log(error)
    } else if(data){
        res.send(data)
    }
 
})

app.post('/customer', async (req, res) => {
    console.log('Adding Customer')

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const {data, error} = await supabase
        .from('Customer') //from supabase website
        .insert([
            {'cust_firstname': firstName, 'cust_lastname': lastName, 'cust_state': state}
        ])
        .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE')
})