import { Controller, Get, Req, Post, HttpStatus, HttpCode, Header, Redirect, Query, Param } from '@nestjs/common';
import { CreateCatDto } from  './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './Interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    @Post()
    @HttpCode(204)
    create(): string {
        return 'This action adds a new cat';
    }

    // @Post()
    // @Header('Cache-control', 'none')
    // create() {
    //     return 'This action adds a new cat';
    // }

    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }

    // @Get('ab*cd')
    // findAll() {
    //     return 'This route uses a wildcard';
    // }

    @Get()
    @Redirect('https://nestjs.com', 301)

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return {url: 'https://docs/nestjs.com/v5/'}
        }
    }

    // @Get(':id')
    // findOne(@Param() params): string {
    // //   console.log(params.id);
    //   return `This action returns a #${params.id} cat`;
    // }

    @Get(':id')
    findOne(@Param('id') id): string {
        return `This action returns a #${id} cat`;
    }

    constructor(private readonly catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}
