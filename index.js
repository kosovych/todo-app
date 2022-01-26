import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function init() {
  try {
    const promise = await readFile('data.json');
  
  } catch (err) {
    console.error("No file");
    const file = writeFile('data.json', '[]');
    await file;
  }
};

init();

app.get('/tasks', async (req, res) => {
  const file = await readFile('data.json');
  const fileData = JSON.parse(file);
  res.send(fileData);
});

app.post('/tasks/new', async (req, res) => {
  const file = await readFile('data.json');
  const fileData = JSON.parse(file);
  console.log('/tasks/new');
  console.log(req.body);
  const newData = [...fileData, { ...req.body, id: uuidv4(), status: 'NOT_COMPLETED' }];
  await writeFile('data.json', JSON.stringify(newData));
  res.status(200).json(newData);
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const file = await readFile('data.json');
  const fileData = JSON.parse(file);
  const data = fileData.find(task => task.id === id);
  res.send(data);
});

app.post('/tasks/:id', async (req, res) => {
  // TODO
  res.end();
});

app.listen(3333, () => {
  console.log('Application listening on port 3333!');
});
