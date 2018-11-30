import {Router, Request, Response} from 'express';
import path from 'path';
import express from 'express'

export default class AppRouter {

    private readonly router: Router;
    private readonly pathToView: string;

    constructor (app: express.Application, pathToView: string = '../../vue_channels/dist') {
        this.router = Router();
        this.pathToView = pathToView;
        this.setRoutes(app);
    }

    private setRoutes(app: express.Application): void {
        app.use(express.static(path.join(__dirname, this.pathToView)));
        app.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, this.pathToView, '/index.html'));
        });
    }

}