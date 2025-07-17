import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select("tasks", search ? {
        title: search,
        description: search
      } : null);
      
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
      const { id } = req.params

      const task = database.selectOne("tasks", id);

      const response = res.setHeader("Content-Type", "application/json");

      if(!task) {
        return response.writeHead(404).end();
      }

      return response.writeHead(200).end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      
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
      const { id } = req.params

      const task = database.selectOne("tasks", id);

      const response = res.setHeader("Content-Type", "application/json");

      if(!task) {
        return response.writeHead(404).end();
      }

      database.delete('tasks', id)
    
      return response.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      
      const { title, description } = req.body

      const task = database.selectOne("tasks", id);

      if(title) {
        task.title = title
      }

      if(description) {
        task.title = description
      }

      const response = res.setHeader("Content-Type", "application/json");

      if(!task) {
        return response.writeHead(404).end();
      }

      database.update('tasks', id, task)

      return response.writeHead(204).end();
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.selectOne("tasks", id);
      const response = res.setHeader("Content-Type", "application/json");

      if (!task) {
        return response.writeHead(404).end();
      }

      const completed_at = task?.completed_at ? null : new Date();
      database.update('tasks', id, { ...task, completed_at });

      return response.writeHead(204).end();
    }
  }
];
