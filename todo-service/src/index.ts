import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "./data-source";
import { Todo } from "./entity/Todo";
import cors from 'cors'

const app = express();
app.use(cors()); 

const PORT = 4001;
const JWT_SECRET = "your_jwt_secret_here";

app.use(express.json());

interface AuthenticatedRequest extends Request {
  user?: any;
}

function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

AppDataSource.initialize().then(() => {
  console.log("Data Source initialized");

  app.listen(PORT, () => {
    console.log(`Todo service running on http://localhost:${PORT}`);
  });
});


app.post("/todos", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { title } = req.body;
  const todo = new Todo();
  todo.title = title;
  todo.completed = false;
  todo.userUuid = req.user.uuid;


  const repo = AppDataSource.getRepository(Todo);
  await repo.save(todo);

  res.status(201).json(todo);
});


app.get("/todos", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const repo = AppDataSource.getRepository(Todo);
  const todos = await repo.find({ where: { userUuid: req.user.uuid  } });
  res.json(todos);
});


app.put("/todos/:id", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const repo = AppDataSource.getRepository(Todo);
  const todo = await repo.findOneBy({ id: parseInt(id), userUuid: req.user.uuid });

  if (!todo) return res.sendStatus(404);

  todo.title = title ?? todo.title;
  todo.completed = completed ?? todo.completed;

  await repo.save(todo);
  res.json(todo);
});


app.delete("/todos/:id", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  const repo = AppDataSource.getRepository(Todo);
  const result = await repo.delete({ id: parseInt(id), userUuid: req.user.uuid });

  if (result.affected === 0) return res.sendStatus(404);

  res.json({ message: "Todo deleted successfully" });
});
