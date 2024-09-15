import { Request, Response } from "express";
import { RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { CustomError } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";


export class AuthController {

    constructor(
        public readonly authService: AuthService
    ){}

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
    } 

    registerUser(request: Request, response: Response) {
        
        const [error, registerUserDto] = RegisterUserDTO.create(request.body);

        if(error) response.status(400).json({error});
        
        this.authService.registerUser(registerUserDto!)
            .then( user => response.json(user) )
            .catch( error => this.handleError(error, response) );

    }
    
    loginUser(request: Request, response: Response) {
        const [error, loginUserDto] = LoginUserDTO.create(request.body)

        if(error) response.status(400).json({error});

        this.authService.loginUser(loginUserDto!)
            .then( (user ) => response.status(200).json(user) )
            .catch( error => this.handleError(error, response) )

    }

    validateEmail(request: Request, response: Response) {
         
    }
}
