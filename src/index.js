function getPromise(i) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(i), Math.random() * 5000);
  });
}

const arr = [];

for (let i = 1; i < 11; i++) {
  arr.push(getPromise(i));
}
class MyPromise {
  static all(promiseArr) {
    let results = []; // to be resolved array of values
    let resolveCount = 0;
    // return a promise
    return new Promise((resolve, reject) => {
      if (promiseArr.lenght === 0) {
        resolve([]);
      } else {
        promiseArr.forEach((promise, index) => {
          if (promise instanceof Promise) {
            promise
              .then((value) => {
                results[index] = value;
                resolveCount++;
                if (resolveCount === promiseArr.length) {
                  resolve(results);
                }
              })
              .catch(function (error) {
                reject(error);
              });
          } else {
            results[index] = promise;
            resolveCount++;
            if (resolveCount === promiseArr.length) {
              resolve(results);
            }
          }
        });
      }
    });
  }
}

function printInorder(arr) {
  MyPromise.all(arr).then((value) => {
    console.log(value);
  });
}

printInorder(arr);
