async function sequentialAsync() {
    let { name: name1 } = await fetch('./long-request.php?name=' + 1).then(resp => resp.json());
    let { name: name2 } = await fetch('./long-request.php?name=' + 2).then(resp => resp.json());
    console.log('Done parallel', name1, name2);
}

async function parallelAsync() {
    let promise1 = fetch('./long-request.php?name=' + 1).then(resp => resp.json());
    let promise2 = fetch('./long-request.php?name=' + 2).then(resp => resp.json());
    let { name: name1 } = await promise1;
    let { name: name2 } = await promise2;
    console.log('Done parallel', name1, name2);
}

sequentialAsync();
//parallelAsync();
