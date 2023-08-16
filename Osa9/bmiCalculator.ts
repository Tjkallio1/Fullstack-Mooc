export const calculateBmi = (height: number, mass: number) => {
    const bmi = mass / ((height / 100)**2);

    if (bmi <= 18.4) {
        return 'Underweight (eat more)';
    }

    else if (bmi > 18.4 && bmi <= 24.9) {
        return 'Normal (healthy weight)';
    }

    else {
        return 'Overweight (eat less)';
    }
}

const height: number = Number(process.argv[2]);
const mass: number = Number(process.argv[3]);
const result= calculateBmi(height, mass);
console.log(result);

//console.log(calculateBmi(180, 74));