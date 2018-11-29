import {createServer, Server} from 'http';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import Socket from 'socket.io';
import AppRouter from './router';
import dotenv from 'dotenv';

export default class App {

    private readonly app: express.Application;
    private readonly io: Socket.Server;
    private readonly http: Server;

    constructor(NODE_ENV: string = 'development', PORT: string = '2368') {
        dotenv.config();
        process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV;
        process.env.PORT = process.env.PORT || PORT;

        this.app = express();
        this.http = createServer(this.app);
        this.io = Socket(this.http);

        this.config();
        this.listen();
    }

    private config(): void {
        this.app.use(helmet());
        this.app.use(express.static(path.join(__dirname, '../../vue_channels/dist')));
        new AppRouter(this.app);
    }

    private listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('The server is running in port: ', process.env.PORT);
        });

        this.io.on('connection', (socket: any) => {

            console.log('Connected client on port %s.', process.env.PORT);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });

        });
    }

}
