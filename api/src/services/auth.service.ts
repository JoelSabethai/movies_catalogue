// Libs
import { isBoom, badRequest, internal, notFound, badData } from '@hapi/boom';
// Middleware
import { clerkClient, Token, Session, AuthObject } from '@clerk/express'
import { log } from '../middlewares/logger';

export class AuthService {
    /**
     * Log in with email and password using Clerk
     * @param {string} email - Email to log in
     * @param {string} password - password to login
     * @throws notFound if the user is not finding
     * @throws badData if the user exist but password is wrong or session can't be created
     * @throws internal if exist other error getting token of session
     * @returns An authentication token
     */
    async logIn(email: string, password: string): Promise<Token> {
        try {
            const { data: user, totalCount } = await clerkClient.users.getUserList({ emailAddress: [email], limit: 1 });
            if(totalCount === 0) throw notFound('Usuario no encontrado');

            const verifyPassword = await clerkClient.users.verifyPassword({ userId: user[0].id, password: password });
            if(!verifyPassword.verified) throw badData('Contraseña incorrecta');

            const session: Session = await clerkClient.sessions.createSession({ userId: user[0].id });
            if(session.status !== 'active') throw badData('Error al inicias sesión');
            
            const token: Token = await clerkClient.sessions.getToken(session.id, 'test');

            return token;
        } catch (error) {
            log.error(`Error to logging user: ${error}`);

            if(isBoom(error)) throw error;
            throw internal(`Error al intentar iniciar sesión: ${error}`);
        }
    }

    /**
     * Register a new user using email and password
     * @param {string} email - Email to register a new user
     * @param {string} password - password to register a new user
     * @throws Internal if can't create a new user
     * @returns An authentication token
     */
    async register(email: string, password: string): Promise<any> {
        try {
            const { totalCount } = await clerkClient.users.getUserList({ emailAddress: [email], limit: 1 });
            if(totalCount !== 0) throw badRequest('Usuario ya registradoUsuario no encontrado');

            const user = await clerkClient.users.createUser({ emailAddress: [email], password });

            const session: Session = await clerkClient.sessions.createSession({ userId: user.id });
            const token: Token = await clerkClient.sessions.getToken(session.id, 'test');

            return token;
        } catch (error) {
            log.error(`Error to registering a new user: ${error}`);

            if(isBoom(error)) throw error;
            throw internal(`Error al registrar usuario: ${error}`);
        }
    }

    /**
     * Log out user
     * @param {AuthObject} authTokenDecrypt - Clerk auth object
     * @throws Internal / badRequest if can't log out
     */
    async logout(authTokenDecrypt: AuthObject): Promise<void> {
        try {
            if(authTokenDecrypt && authTokenDecrypt.userId) {
                const sessions = await clerkClient.sessions.getSessionList({ userId: authTokenDecrypt.userId });
                if(sessions.totalCount > 0) {
                    sessions.data.forEach(async (session) => {
                        await clerkClient.sessions.revokeSession(session.id);
                    })
                }
            }
        } catch (error) {
            log.error(`Error to log out: ${error}`);

            if(isBoom(error)) throw error;
            throw internal(`Error al cerrar sesión: ${error}`);
        }
    }
}