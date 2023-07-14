const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const LotModel = require('./sheme/lot.js');
const CommentModel = require('./sheme/comment.js');

const app = express();

const mongoDB = "mongodb+srv://tymkomaryana:juzm0NgK3lfu1LsL@cluster0.jgign8v.mongodb.net/TreeTrove?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Підключено до MongoDB');
  })
  .catch((err) => {
    console.error('Помилка підключення до MongoDB:', err);
  });

const frontEndPath = path.join(__dirname, '..', 'front-end', 'dist', 'front-end');

app.use(express.static(frontEndPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(frontEndPath, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(frontEndPath, 'index.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(frontEndPath, 'index.html'));
});

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(frontEndPath, 'index.html'));
});

app.get('/404', (req, res) => {
  res.sendFile(path.join(frontEndPath, 'index.html'));
});



// API routes
//Витягування всіх лотів
app.get('/api/lots', (req, res) => {
  LotModel.find()
    .then((lots) => {
      res.json(lots);
    })
    .catch((error) => {
      console.error('Помилка отримання лотів:', error);
      res.status(500).json({ error: 'Помилка отримання лотів' });
    });
});

//Збереження лоту
app.post('/api/lots', (req, res) => {
  const newLot = new LotModel(req.body);
  newLot.save()
    .then((savedLot) => {
      res.json(savedLot);
    })
    .catch((error) => {
      console.error('Помилка додавання лота:', error);
      res.status(500).json({ error: 'Помилка додавання лота' });
    });
});

// Видалення лоту
app.delete('/api/lots/:slug', (req, res) => {
  const slug = req.params.slug;

  // Видалення лоту
  LotModel.findOneAndDelete({ slug })
    .then((deletedLot) => {
      if (!deletedLot) {
        return res.status(404).json({ error: 'Лот не знайдено' });
      }

      // Видалення коментарів, пов'язаних з видаленим лотом
      CommentModel.deleteMany({ slug })
        .then(() => {
          res.sendStatus(204);
        })
        .catch((error) => {
          console.error('Помилка видалення коментарів:', error);
          res.status(500).json({ error: 'Помилка видалення коментарів' });
        });
    })
    .catch((error) => {
      console.error('Помилка видалення лота:', error);
      res.status(500).json({ error: 'Помилка видалення лота' });
    });
});

// Отримання коментарів
app.get('/api/lots/:slug/comments', (req, res) => {
  const slug = req.params.slug;
  CommentModel.find({ slug }, 'text')
    .then((comments) => {
      const commentsTexts = comments.map((comment) => comment.text);
      res.json(commentsTexts);
    })
    .catch((error) => {
      console.error('Помилка отримання коментарів за слагом:', error);
      res.status(500).json({ error: 'Помилка отримання коментарів за слагом' });
    });
});
  
  // Додавання коментаря
  app.post('/api/lots/:slug/comments', (req, res) => {
    const slug = req.params.slug;
    const commentText = req.body.comment;
    const newComment = new CommentModel({ slug, text: commentText });
    newComment.save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error('Помилка додавання коментаря до лота за слагом:', error);
        res.status(500).json({ error: 'Помилка додавання коментаря до лота за слагом' });
      });
  });

app.use((req, res) => {
    res.status(404).sendFile(path.join(frontEndPath, 'index.html'));
  });

const port = 3000;

app.listen(port, () => {
  console.log('Застосунок запускається');
  console.log(`Сервер запущено на порті ${port} або за посиланням http://localhost:${port}/`);
}).on('error', (err) => {
  console.error('Помилка запуску сервера', err.message);
});