type T = string | number | {[key: string]: string | number}
interface IDice<T> {
    name: string
    sides: number
    values: T[]
}

class Dice<T> {
    name: string = ""
    sides: number = 0
    values: T[] = []
    // constructor(sides: number, ...maxValues?: number[]);
    private constructor(data: IDice<T>) {
        this.name = data.name;
        this.sides = data.sides;
        this.values = data.values;
    }
    roll() {
        const idx = Math.floor(Math.random()*this.sides)
        if (!this.values || this.values.length === 0) {
            return idx + 1;
        } else {
            return this.values[idx];
        }
    }
    static from<T>(data: Partial<IDice<T>> & {name: string}): Dice<T> {
        if (!data) {
             throw new Error('dice creation error: options are required');
        }
        switch (true) {
            case (!data.name || data.name === ''):
                throw new Error('dice creation error: name is required');
            case (!data.sides || data.sides < 2) && (!data.values || data.values.length < 2):
                throw new Error('dice creation error: a dice requires at least 2 posibles values');
        }
        
        return new Dice<T>({
             name: data.name,
             sides: data.sides || data.values?.length as number,
             values: data.values || []
        });
    }
}