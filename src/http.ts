import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

// O NODE PRECISA TS-NODE-DEV PARA INTEPRETAR O IMPORT/FROM
import express, { request, response } from "express";

//IMPORTAR O BANCO DE DADOS, NÃO PRECISA COLOCAR O INDEX (ELE ASSUME AUTOMATICAMENTE)
import "./database";
import { routes } from "./routes";

//INICIALIZAÇÃO DO EXPRESS - Definir o Express usar json
const app = express();

// renderização do html
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
	return response.render("html/client.html");
})

app.get("/pages/admin", (request, response) => {
	return response.render("html/admin.html");
})

const http = createServer(app); // CRIANDO PROTOCOLO HTTP
const io = new Server(http); // CRIANDO PROTOCOLO WS

io.on('connection', (socket: Socket) => {
	console.log('Se conectou', socket.id);
})

app.use(express.json());

// REQUISIÇÕES
// GET = BUSCAS
// POST = CRIAÇÃO
// PUT = ALTERAÇÃO
// DELETE = DELETAR
// PATCH = ALTERAR UMA INFORMAÇÃO ESPECIFÍCA

// //ROTAS GET (Rota, requisição/resposta do Express)
// app.get("/", (request, response) => {
	
// 	// Response devolve uma resposta - Devolver com JSON
// 	return response.json({
// 		message:	"Olá Mundo"
// 	});
// })

// // ROTAS POST (Rota, requisição/resposta do Express)
// app.post("/", (request, response) => {
// 	return response.json({ message: "Usuário salvo" })
// });

app.use(routes);

export { http, io }
