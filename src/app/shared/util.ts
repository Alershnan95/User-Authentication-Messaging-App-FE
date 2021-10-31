
export function camelToNormalCase(text: string) {
    return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
}

export function cloneObject(object: any) {
    return JSON.parse(JSON.stringify(object));
}

export function doNothing() {
    return null;
}

export function errorHandler(err: any) {
    (err && err.error && err.error.message) ? alert(err.error.message) : alert('Please, try again later');
}
