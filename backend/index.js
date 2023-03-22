const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bonjour, monde!')
})

const port = 4000
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`)
})
