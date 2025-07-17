import { createReadStream } from "node:fs";
import { parse } from "csv-parse";
import { join } from "node:path";

const filePath = join(import.meta.dirname, "tasks.csv");

async function lerLinhaDoCsv(csvPath) {
  let count = 0;
  let path = csvPath;

  const parser = createReadStream(path).pipe(
    parse({
      delimiter: ",", 
      columns: true, 
      trim: true, 
    })
  );

  process.stdout.write(`Começando importação... \n`);
  for await (const record of parser) {
    count++;
    process.stdout.write(`Linha ${count}: ${JSON.stringify(record)} \n`);
    try {
      const response = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if(!response.ok) {
        console.error(
          `Erro na linha ${count}: ${response.status} ${response.statusText}`
        );
        continue;
      }

      console.log(`Linha ${count} enviada com sucesso!`);
    } catch (error) {
      console.error(`Erro na linha ${count}: ${error.message}`);
      continue; // Continua com a próxima linha em caso de erro
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  process.stdout.write("Terminado...\n");
}

await lerLinhaDoCsv(filePath);
