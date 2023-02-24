import express from 'express'
import { create } from 'express-handlebars'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const hbs = create({ defaultLayout: 'index', extname: '.hbs' })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('datos', {
    nombre: 'Juan',
    apellido: 'Romano',
    edad: 29,
    email: 'profe@jpromano.net',
    fyh: new Date().toLocaleString()
  })
})

io.on('connection', (socket) => {
  console.log('Usuario conectado')

  socket.on('mensaje', (mensaje) => {
    io.emit('mensaje', mensaje)
  })

  socket.on('disconnect', () => {
    console.log('Usuario desconectado')
  })
})

const PORT = 8080
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
