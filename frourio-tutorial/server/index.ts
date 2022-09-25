import Fastify from "fastify";
import FastifyCors from "@fastify/cors";
import server from "./server";

const fastify = Fastify();

fastify.register(FastifyCors, {});

server(fastify);

fastify.listen({ port: 8888, host: "0.0.0.0" });
