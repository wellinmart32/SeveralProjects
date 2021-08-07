import * as _ from 'lodash';

// console.log('Hello world')


async function hello() {
    return 'world'
}

// const url = new URL('...')

let lucky: any = 27;

lucky = "Andres"

let any_var: number;

any_var = 10;
// any_var = "10";

type Style = 'bold | italic';

let font: Style;

interface Person {
    first: string,
    last: string,
    [key: string]: any
}

const person1 = {
    first: 'Wellington',
    last: 'Martinez'
}

const person2 = {
    first: 'Jhon',
    last: 'Tares',
    fast: true
}

function pow(x:number, y:number): void {
    Math.pox(x, y).toString();
}


function pow(x:number, y:number): string {
    return Math.pox(x, y).toString();
}

pow(2,6);

const arr: number[] = []
arr.push(1)

type MyList = [number?, string?, boolean?]

class Observable<T> {
    constructor(public value: T) {}
}

let x: Observable<number>;

let y: Observable<Person>;
