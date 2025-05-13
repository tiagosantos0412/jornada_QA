
const fs = require('fs')

let data = 'Este arquivo foi criado com nodejs.'

fs.writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!')
})