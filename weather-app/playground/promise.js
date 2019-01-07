// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve('Hey!, It worked !!!')
//         reject('Unable to filfull the promise')
//     }, 2500)
// });

// somePromise.then((message) => {
//     console.log('Sucess : ', message)
// },
//     (errorMessage) => {
//         console.log(errorMessage)
//     });


var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                console.log(`a is ${a} & b is ${b}`)
                resolve(a + b);
            } else {
                reject('Arguments must be number to resolve.')
            }
        }, 500)
    });
}

asyncAdd(2, 3)
    .then((res) => { console.log(res); asyncAdd(res, '33'); })
    .then((result) => { console.log(`Should be 41 & the result is ${result}`) })
    .catch((errorMessage) => { console.log(errorMessage) })