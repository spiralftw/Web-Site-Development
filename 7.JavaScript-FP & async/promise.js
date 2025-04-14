function myFirstPromise(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject("Fail");
            } else {
                resolve("Success");
            }
        });
    });
}