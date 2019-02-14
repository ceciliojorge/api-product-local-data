import { express } from ('express');
import { bodyParser } from ('body-parser');
import { _ } from ('lodash');
import { expressValidator } from ("express-validator");
//const appStorage = require('localStorage');
const app = express();
const appStorage = require('./appStorage');


app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/', (req, res) => {
    res.send('Api is runing!');
});
require('./controllers/index')(app);


app.listen(3000);

module.exports = app;

