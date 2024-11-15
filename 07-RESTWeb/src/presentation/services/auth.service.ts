import { JWTAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDTO } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { EmailService } from "./email.service";


export type ValidateEmailPayload = { email: string }

export class AuthService {
    
    private LOGIN_ERROR_MESSAGE = "email or password incorrect";
    
    // DI
    constructor(
        private readonly emailService: EmailService,
    ){} 

    public async registerUser( registerUserDto: RegisterUserDTO) {
        const emailAlreadyRegistered = await UserModel.findOne({email: registerUserDto.email})

        try {
            const user = new UserModel(registerUserDto);
            
            user.password = bcryptAdapter.hash( registerUserDto.password );
            
            await user.save();
      
            await this.sendEmailValidationLink( user.email! );

            const { password, ...userEntity } = UserEntity.fromObject(user);
            
            const token = await  JWTAdapter.generateToken({id: user.id})
            if(!token) throw "Error while creating JWT";

            return {  
              user: userEntity, 
              token
            };
      
          } catch (error) {
            throw CustomError.internalServer(`${ error }`);
          }

    }

    private async sendEmailValidationLink(email: string){
        const token = await JWTAdapter.generateToken( { email } );
        if(!token) throw CustomError.internalServer(`Error getting token`);
         
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`  ;
        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${ link }">Validate your email: ${ email }</a>
        `;
        
        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }
      
        const isSent = await this.emailService.sendEmail(options);
        if ( !isSent ) throw CustomError.internalServer('Error sending email');
      
        return true;
    }

    public async loginUser( loginUserDto: LoginUserDTO ){
        try {
            const existingUser = await UserModel.findOne({email: loginUserDto.email})
            
            if(!existingUser) throw CustomError.badRequest(this.LOGIN_ERROR_MESSAGE);
            
            const correctPassword = bcryptAdapter.compare(loginUserDto.password, existingUser.password!);
            if(!correctPassword) throw CustomError.badRequest(this.LOGIN_ERROR_MESSAGE);

            const { password, ...userEntity } = UserEntity.fromObject(existingUser);

            return {user: userEntity , token: "ABC"};
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

    public async validateEmail(token: string) {

        const payload = await JWTAdapter.validateToken(token);
        if(!payload) throw CustomError.unauthorized("Token not valid");

        const { email } = payload as ValidateEmailPayload;
        if(!email) throw CustomError.internalServer("Email not in token");

        const user = await UserModel.findOne({ email });
        if(!user) throw CustomError.internalServer("Email not exists");

        user.emailValidated = true;
        await user.save();

        return true;
    }
}