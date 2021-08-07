console.log('Hello world');

// types

var myString: string = "Hello world";
myString = 22 + "";

var myNumber: number = 22;
var myBool:boolean = true || false;

var myVar: any = "hello";
myVar = false;

// Strings

document.write(myString);
document.write(myNumber.toString());

// Arrays
var stringArrays: any[] = ["", "", ""];
stringArrays = [true, 2, ''];

var numberArrary: number[] = [1, 2, 3, 4];

var booleanArray: boolean[] = [true, true, false];

var anyArray: any[] = [1, 2, '', [], {}];

// Tuples
var strNumTuple: [string, number];
strNumTuple = ['hello', 22];