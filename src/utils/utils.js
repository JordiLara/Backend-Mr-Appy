function esPar(n) {
    return n % 2 === 0;
}

function contraseniasCoinciden(password, confirmPassword) {
    return password === confirmPassword;
}

export { esPar, contraseniasCoinciden };
