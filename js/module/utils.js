
export const random = (max, min = 0) => {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}

export function makeCounter() {
    let count = 0;
    return function() {
      return count++;
    };
}
