import app from './app.js'

app.listen(app.get('port'));
console.log('Servidor en puerto',app.get('port'));