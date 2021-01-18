const obj = {
    name: 'Lily',
    age : 20,
    height: '160cm'
}
function dance() {
    console.log('hobby dance');
}

export let name =  obj.name;
export let danceFn =  dance;

export default obj;