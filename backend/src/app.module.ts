import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { JwtModule } from '@nestjs/jwt'
import { secret } from './utils/constants'
import { join } from 'path/posix'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://yifan:root@cluster0.8pojb.mongodb.net/?retryWrites=true&w=majority'
        ),
        MulterModule.register({
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    const ext = file.mimetype.split('/')[1]
                    cb(null, `${uuidv4()}-${Date.now()}.${ext}`)
                }
            })
        }),
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
