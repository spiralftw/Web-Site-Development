function readTemperature(value) {
    if (value <= 15) {
        return "Cold";
    } else if (value > 15 && value <= 25) {
        return "Moderate";
    } else {
        return "Hot";
    }
}
let number = 26;

console.log(readTemperature(number));
