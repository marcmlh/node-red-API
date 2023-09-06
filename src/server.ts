import fastify from "fastify";
import crypto from "node:crypto";
import { knex } from "./database";
const app = fastify();

app.get("/character", async (request, response) => {
  try {
    let {character_name} = request.query as {character_name: string};

    const character = await knex("characters")
      .where("character_name", character_name)
      .first();

    if (!character) {
      return response.status(400).send();
    }

    return response.status(200).send(character);
  } catch (error) {
    return response.status(500).send(error);
  }
});

app.post("/character", async (request, response) => {
  try {
    const character = await knex("characters").insert(request.body);

    return response.status(200).send(character);
  } catch (error) {
    return response.status(500).send(error);
  }
});

app.put("/character", async (request, response) => {
  try {
    const {character_name} = request.body as {character_name : string};

    const character = await knex("characters").where("character_name",character_name).update(request.body);

    return response.status(200).send(character);
  } catch (error) {
    return response.status(500).send(error);
  }
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
