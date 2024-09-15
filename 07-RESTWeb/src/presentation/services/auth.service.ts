import { JWTAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDTO } from "../../domain";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService {
    
    private LOGIN_ERROR_MESSAGE = "email or password incorrect";
    
    // DI
    constructor(){}

    public async registerUser( registerUserDto: RegisterUserDTO) {
        const emailAlreadyRegistered = await UserModel.findOne({email: registerUserDto.email})

        try {
            const user = new UserModel(registerUserDto);
            
            user.password = bcryptAdapter.hash( registerUserDto.password );
            
            await user.save();
      
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
}