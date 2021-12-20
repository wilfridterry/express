
let a: string = "HELLO";

if (typeof a == 'string') {

}

let b: typeof a;

type Coord = {
    lat: number,
    long: number
}

type P = keyof Coord;

let t: P = 'lat';

function log(a: string| null): string | null {
    return a === null ? a : a.toUpperCase();
}

const aa: bigint = BigInt(100);

const bb: symbol = Symbol('iii');

//###################################

// class Coord
// {
//     message: string = '1';
//     lat: number;
//     long: number;

//     constructor(lat: number, long: number) {
//         this.lat = lat;
//         this.long = long;
//     }

//     computeDistance(coord: Coord): number {
//         return coord.lat - this.lat;
//     }

//     protected test() {
//         if (this.lat > 0) {

//         }
//     }
// }

// const point = new Coord(54, 87);

// class MapLocation extends Coord {
//     message: string = '2'
//     private _name: string;

//     constructor(lat: number, long: number, name: string) {
//         super(lat, long);
//         this.name = 'name';
//     }

//     override computeDistance(coord: Coord): number {
//         console.log(this.message, this.name);
//         this.test();

//         return 1;
//     }

//     get name(): string {
//         return this._name;
//     }

//     set name(value: string) {
//         this._name = value;
//     }
// }

// const MapLocation = new MapLocation(0, 0, "Hello");

// interface LoggerService {
//     log: (s: string) => void;
// }

// class Logger implements LoggerService {

//     private a = '';
    
//     public log(s: string) {
//         console.log(s);
//     }

//     private error() {

//     }
// }

// const l = new Logger();

// l.log('d');

// class MyClass<T> {
//     a:T;
// }

// const m = new MyClass<string>();

// abstract class Base {
//     print(s: string) {
//         console.log(s);
//     }

//     abstract printAll(): void;
// }

// class BaseExtended extends Base {
//     printAll(): void {
//         console.log('count: %d', 55)
//     }
// }

// class Animal {
//     name: string
// }

// class Dog {
//     name: string;
//     tail: boolean
// }

// const puppy: Animal = new Dog();

// new Map<number, Animal>();


// GENERICS ########################
// class Slack
// {

// }

// class Email
// {
    
// }

// interface Notifier
// {
//     notifications: Array<Notificationn<Slack| Email>>;
//     notify(): void;
// }

// interface Notificationn<T>
// {
//     driver: T;

//     constructor(driver: T): void;

//     notify(): void;
// }

// class Notificationn<T> implements Notificationn<T> 
// {
//     driver: T;

//     constructor(driver: T) {
//         this.driver = driver;
//     }

//     notify(): void {
        
//     }
// }

// interface HasLength
// {
//     length: number
// }

// function log<T extends HasLength, K>(obj: T, arr: K[]): K[] {
//     console.log(obj);
//     console.log(obj.length);
    
//     return arr;
// }

// log<string, number>('sd', [1]);

// interface IUser
// {
//     name: string;
//     age?: number;

//     bid: <T>(sum: T) => boolean;
// }

// function bid<T>(sum: T): boolean {
//     return true;
// }

// class User
// {
//     name: string;
    
//     constructor(name: string) {
//         this.name = name;
//     }
// }

// class MyMap<T> extends Map 
// {
//     setItem(key: any, value: T) {
//         this.set(key, value);
//     }
// }

// const map = new MyMap<User>();
// map.setItem('first', new User('Mark'));

// const array = new Array<User>();
// array.push(new User('Maria'));

// console.log(map, array);

// log<string>('asd');
// log<number>(4)
// Enum ########################
// type direction = 'left' | 'right';

// enum Direction {
//     Left = 'left',
//     Rigth = 'right'
// }

// Direction.Rigth

//Литералы #####################

// const a = 'CONSTANT';

// let b: 'hi' = "hi";

// type direction = 'left' | 'right';

// function moveDog(direction: direction): 1| -1| 0 {
//     switch(direction) {
//         case 'left':
//             return -1;
//         case 'right':
//             return 1;
//         default:
//             return 0;
//     }
// }

// interface IConnection 
// {
//     host: string;
//     port: number;
// }

// function connect(connection: IConnection | "default") {

// }
// connect('default');

// const connection = {
//     host: 'localhost',
//     protocol: 'https' as 'https'
// }

// function connect(host: string, protocol: 'http' | 'https') {

// }

// connect(connection.host, connection.protocol);


// const a: any = 5;

// let c: number = a as number;
// let d: number = <number>a; // кастовать


//###########################

// type Coord = {lat: number, long: number};

// interface ICoord 
// {
//     lat: number;
//     long: number;
// }

// type ID = number | string;

// function compute(coord: ICoord) {

// }


// interface Dog
// {
//     name: string| number
// }

// interface Dog
// {
//     tail: boolean
// }

// const dog: Dog = {
//     name: 'VALERA',
//     tail: true
// }