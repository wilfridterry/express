
function Component(id: number) {
    console.log('component init');
    
    return (target: Function) => {
        console.log('component run');
        target.prototype.id = id;

    }    
}

function Logger() {

    console.log('logger init');
    
    return (target: Function) => {
        console.log('run logger');
    }
}

function Method(target: object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {

    console.log(propertyKey);
    propertyDescriptor.value = (...args: any[]) => {
        return args[0] * 10;
    }
}

function Prop(target: object, propertyKey: string) {
    let value: number;

    const getter = () => {
        console.log('GET');
        
        return value;
    };

    const seter = (newValue: number) => {
        console.log('SET');
        
        value = newValue;
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: seter
    })
}

function Param(target: Object, propertyKey: string, index: number) {
    console.log(propertyKey, index);
}

@Logger()
@Component(1)
export class User 
{
    @Prop
    id: number;

    @Method
    updateId(@Param id: number) {
        this.id = id;
        return this.id;
    }
}

console.log(new User().id);
console.log(new User().updateId(2));
