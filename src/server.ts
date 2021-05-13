import { http } from './http';
import "./websocket/client";
import "./websocket/admin"

// INICIALIZAÇÃO DO SERVIDOR (PORTA, CALLBACK)
http.listen(3333, () => console.log("Server is running on port 3333"));
