const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = [
    {userId: 1, id: 1, title: "DLSS5", body: "Nvidia AI slop Nvidia AI slop Nvidia AI slop Nvidia AI slop Nvidia AI slop Nvidia AI slop"},
    {userId: 2, id: 2, title: "Half life 3", body: "Steam peak Steam peak Steam peak Steam peak Steam peak"}
]

const users = [
    {userId: 1, name: "John Pork"},
    {userId: 2, name: "Pork John"},
    {userId: 3, name: "Johnson"},
]

const comments = [
    {postId: 1, id: 1, name: "johnson", email: "Jogn@mail", body: "nice post mate"},
    {postId: 2, id: 2, name: "johnson", email: "Jogn@mail", body: "bad post mate"}
]

app.get('/posts', (req, res) => {
    res.json(posts);
})

app.get('/posts/:id', (req, res) => {
    const post = posts.find(post => post.id === Number(req.params.id));
    res.json(post);
})

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.userId === Number(req.params.id));
    res.json(user);
});

app.get('/posts/:id/comments', (req, res) => {
    const comment = comments.filter(comment => comment.postId === Number(req.params.id));
    res.json(comment);
})

app.post('/posts/:id/comments', (req, res) => {
    const comment = {
        postId: Number(req.params.id),
        id: (Math.random() * 100),
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
    }

    comments.push(comment);
    res.json(comment);
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})