import express from 'express';
import cors from "cors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from './entity/data-source';
import { User } from './entity/User';

const app = express();
app.use(cors()); 
app.use(express.json());

const PORT = 4000;
const JWT_SECRET = 'your_jwt_secret_here';  


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');

    app.get('/', (req, res) => {
      res.send('API is running ');
    });

    app.listen(PORT, () => {
      console.log(`User service running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOneBy({ email });

  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User();
  user.email = email;
  user.password = passwordHash;

  await userRepository.save(user);

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

const token = jwt.sign({ email: user.email, uuid: user.uuid }, JWT_SECRET, { expiresIn: '1h' });


  res.json({ token });
});
