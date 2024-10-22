import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

let teaData = []
let nextid = 1
// add tea
app.post('/teas', (req, res) => {

   const {name, price} = req.body
   const newTea = {id: nextid++, name, price}
   teaData.push(newTea)
   res.status(201).send(newTea)
})

// get all tea

app.get('/teaview', (req, res) => {
    res.status(200).send(teaData)
})

// get tea by id
app.get('/teaview/:id', (req, res) => {
    const tea = teaData.find (t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('tea not found')
    }
    res.status(200).send(tea)
})

// update tea
app.put('/teaview/:id', (req, res) => {
const tea = teaData.find (t => t.id === parseInt(req.params.id))
if (!tea) {
    return res.status(404).send('Tea not found')
}
    const {name, price} = req.body
    tea.name = name
    tea.price = price
  res.send(200).send(tea)
})

// delete tea
app.delete('/teaview/:id', (req, res) => {
   const index = teaData.findIndex (t => t.id ===parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('Tea not found')
    }
    teaData.splice(index, 1) 
        return res.status(204).send('deleted')
    
})

app.listen(port, () => {
    console.log(`server is running at port: ${port}...`)
})