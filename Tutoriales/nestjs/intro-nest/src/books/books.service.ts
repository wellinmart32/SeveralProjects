import { Injectable } from '@nestjs/common';
import { IBook } from './interfaces/book.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
    constructor(@InjectModel('Book') private readonly modelBook: Model<IBook>) {}

    async getBook(id: string): Promise<IBook> {
        return await this.modelBook.findOne({ _id: id });
    }

    async getAllBooks(): Promise<IBook[]>  {
        return await this.modelBook.find();
    }

    async createBook(book: IBook): Promise<IBook> {
        const newBook = new this.modelBook(book);
        return await newBook.save();
    }

    async updateBook(id: string, book: IBook): Promise<IBook> {
        return await this.modelBook.findByIdAndUpdate(id, book, { new: true });
    }

    async deleteBook(id: string): Promise<IBook> {
        return await this.modelBook.findByIdAndRemove(id);
    }

}
