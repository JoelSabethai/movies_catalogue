// Libs
import { Request, Response } from "express";
// Services
import { AuthService } from './../services/auth.service';

const authService = new AuthService();

export class AuthController {
    validateToken = async (req: Request, res: Response) => {
        res.status(200).json({ success: true });
    }

    logIn = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const data = await authService.logIn(email, password);
        res.status(200).json({ success: true, data: data });
    }

    register = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const data = await authService.register(email, password);
        res.status(200).json({ success: true, data: data });
    }

    logout = async (req: Request, res: Response) => {
        const authTokenDecrypt = req.auth;
        await authService.logout(authTokenDecrypt);
        res.status(200).json({ success: true });
    }
}