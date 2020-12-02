// named export
function foo() {
    console.log('foo');
}

function bar() {
    console.log('bar');
}

export {
    foo,
    bar
};


// Export luôn khi tạo ra
/*
export function foo() { return 'foo'; }
export function bar() { return 'bar'; }
*/


// default export
/*
export default function foo() {
    return 'default foo';
}

export function bar() { return 'bar'; };
*/