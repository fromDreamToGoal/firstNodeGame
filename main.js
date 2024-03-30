const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }

    get field() {
        return this._field;
    }

    print() {
        // соеденяю вложенные массивы
        const joinedArray = this._field.map(innerArray => innerArray.join(''));
        // выводим на консоль и соеденяем 2д массив
        console.log(joinedArray.join(''));
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░']
]);

myField.print();