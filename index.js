
const express = require('express')
const app = express()
const cors =require('cors')
app.use(express.json())
app.use(cors())
// process.env.PORT ||
const port = 8800
const sql = require('mysql')

const connection = sql.createConnection({
    host: "ga477435.mysql.tools",
    user: "ga477435_46",
    database: "ga477435_46",
    password: "a*85F)iuU7"

})
connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('database ++');
    }
})


async function dbChange(set = false, keys, values,) {

    const query = set ? (`INSERT INTO revs (${keys.join(',')}) VALUES (${values.map(el => "'" + el + "'").join(',')});`) : ('SELECT * FROM revs')

    connection.query(query, (err, res, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(res);


    })
}







app.listen(port, () => {
    console.log("started");
})

app.get('/reviews', (req, res) => {
    const q = 'SELECT * FROM revs'

    connection.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
   
})



    app.post("/reviews", (req, res) => {
       
        const obj = { name: req.body.name, work: req.body.work, text: req.body.text, date:req.body.date }
        console.log(obj);
        const keys =Object.keys(obj)
        const values =Object.values(obj)
        
        const q =(`INSERT INTO revs (${keys.join(',')}) VALUES (${values.map(el=>"'"+el+"'").join(',')});`)
        connection.query(q,[values], (err, data) => {
            if (err) {
                return res.json(err)
            }
            return res.json("Review create successful")
        })

        
    })

    app.delete('/reviews/:id', (req, res) => {
        const q = `DELETE FROM revs WHERE ID=${req.params.id.slice(1)}`
        console.log(q);
        // console.log(req.params.id);
    
        connection.query(q, (err, data) => {
            if (err) {
                return res.json(err)
                
            }
            return res.json(`Delete column  successfuly`)
        })
       
    })
