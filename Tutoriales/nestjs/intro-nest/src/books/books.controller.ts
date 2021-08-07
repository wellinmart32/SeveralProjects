import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateDtoBook } from './dto/create-book';
import { BooksService } from './books.service';
import { IBook } from './interfaces/book.interface';

@Controller('book')
export class BooksController {
    /*
    @Post()         // C
    @Get()          // R
    @Put()          // U
    @Delete()       // D
    */
    constructor(private readonly booksService: BooksService) {}

    @Get()
    getAllBooks(): Promise<IBook[]> {
        return this.booksService.getAllBooks();
    }

    @Get(':id')
    getBook(@Param('id') bookId: string): Promise<IBook> {
        return this.booksService.getBook(bookId);
    }

    @Post()
    createBook(@Body() dtoBook: CreateDtoBook): Promise<IBook> {
        return this.booksService.createBook(dtoBook);
    }

    @Put(':id')
    updateBook(@Param('id') bookId: string, @Body() dtoBook: CreateDtoBook): Promise<IBook> {
        return this.booksService.updateBook(bookId, dtoBook);
    }

    @Delete(':id')
    deleteBook(@Param('id') bookId: string): Promise<IBook> {
        return this.booksService.deleteBook(bookId);
    }
}
