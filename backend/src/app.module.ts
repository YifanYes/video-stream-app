import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { JwtModule } from '@nestjs/jwt'
import { secret } from './utils/constants'
import { join } from 'path/posix'

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://yifan:root@cluster0.8pojb.mongodb.net/?retryWrites=true&w=majority'
        ),
        JwtModule.register({
            secret,
            signOptions: { expiresIn: '2h' }
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public')
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
