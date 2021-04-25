const express = require('express')
const path = require('path')
const convert = require('./lib/convert')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (re, res) => {
  res.render('home')
})

app.get('/cotacao', (req, res) => {

  const { cotacao, quantidade } = req.query
  if (cotacao && quantidade) {
    const conversao = convert.convert(cotacao, quantidade)
    res.render('cotacao', {
      error: false,
      cotacao: convert.toMoney(cotacao),
      quantidade: convert.toMoney(quantidade),
      conversao: convert.toMoney(conversao)
    })
  } else {
    res.render('cotacao', {
      error: 'Dados inválidos'
    })

  }
})

app.listen(3001, err => {
  if (err) {
    console.log('Erro ao ocnectar servidor')
  } else {
    console.log('ConvertMoney está Online')

  }
})