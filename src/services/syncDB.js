export async function syncAll(data) {
    return await testAwait();
}

function testAwait() {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Inside test await');
        }, 1000);
    });
    return promise;
}