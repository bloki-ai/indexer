export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const encodeBase26 = (num: number) => {
    if (num === 0) return "A";
    let result = "";
    while (num > 0) {
        const remainder = num % 26;
        result = alphabet[remainder] + result;
        num = Math.floor(num / 26);
    }
    return result;
};
