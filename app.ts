import express from 'express';
import * as path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, `public`)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `./index.html`));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http listening on port: ${PORT}\n`);
});
