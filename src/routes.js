import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { validateTaskInput } from "./utils/validate-input.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res
        .setHeader("Content-Type", "application/json")
        .writeHead(200)
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.selectOne("tasks", id);

      if (!task) {
        return res
          .setHeader("Content-Type", "application/json")
          .writeHead(404)
          .end(JSON.stringify({ message: "registro não existe" }));
      }

      return res
        .setHeader("Content-Type", "application/json")
        .writeHead(200)
        .end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const errors = validateTaskInput(title, description);
      if (errors.length > 0) {
        return res
          .setHeader("Content-Type", "application/json")
          .writeHead(400)
          .end(JSON.stringify({ errors }));
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: null,
        completed_at: null,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.selectOne("tasks", id);

      if (!task) {
        return res
          .setHeader("Content-Type", "application/json")
          .writeHead(404)
          .end(JSON.stringify({ message: "registro não existe" }));
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const { title, description } = req.body;

      const errors = validateTaskInput(title, description);
      if (errors.length > 0) {
        return res
          .setHeader("Content-Type", "application/json")
          .writeHead(400)
          .end(JSON.stringify({ errors }));
      }

         const task = database.selectOne("tasks", id);

      if (!task) {
        return res
          .setHeader("Content-Type", "application/json")
          .writeHead(404)
          .end(JSON.stringify({ message: "registro não existe" }));
      }

      task.title = title ? title : task.title;
      task.description = description ? description : task.description;

      database.update("tasks", id, task);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.selectOne("tasks", id);

      if (!task) {
        return res
          .setHeader("Content-Type", "application/json")
          .writeHead(404)
          .end(JSON.stringify({ message: "registro não existe" }));
      }

      const completed_at = task?.completed_at ? null : new Date();
      database.update("tasks", id, { ...task, completed_at });

      return res.writeHead(204).end();
    },
  },
];
