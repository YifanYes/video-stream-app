import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://yifan:root@cluster0.8pojb.mongodb.net/?retryWrites=true&w=majority'
        )
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
