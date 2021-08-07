import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaBook } from './books/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/crud_nest'),
    MongooseModule.forFeature([{name: 'Book', schema: SchemaBook}])
  ],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
