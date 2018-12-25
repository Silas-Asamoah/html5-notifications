require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '679175',
    key: '01f2688e8f2f6878d336',
    secret: '069b66da9cdf9b7f31ff',
    cluster: 'eu',
    encrypted: true
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

//Route that will receive webhooks from Github
app.post('/events', (req, res) =>{
    pusher.trigger('github', 'push', {
        payload: req.body,
    });

    res.status(200).end();
});
