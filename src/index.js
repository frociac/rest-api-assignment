const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/** @type {Map<string, { id: string, name: string, email: string }>} */
const users = new Map();


app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).json({ error: "Bad Request" });

    const newUser = { id: crypto.randomUUID(), name, email };
    users.set(newUser.id, newUser) ;

    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    let user = users.get(req.params.id);

    if (!user) return res.status(404).json({error: "Not Found"});

    return res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const {name, email} = req.body;

    if (!users.has(req.params.id)) return res.status(404).json({error: "Not Found"});
    if (!name || !email) return res.status(400).json({ error: "Bad Request" });

    users.set(req.params.id, { id: req.params.id, name: name, email: email });

    return res.status(200).json(users.get(req.params.id));
});

app.delete('/users/:id', (req, res) => {
    if (!users.has(req.params.id)) return res.status(404).json({error: "Not Found"});
    users.delete(req.params.id);
    return res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing