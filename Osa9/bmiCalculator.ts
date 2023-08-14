const calculateBmi = (height: number, mass: number) => {
    const bmi = mass / ((height / 100)**2);

    if (bmi <= 18.4) {
        return 'Underweight (eat more)';
    }

    else if (bmi > 18.4 && bmi <= 24.9) {
        return 'Normal (healthy weight)';
    }

    else if (bmi > 24.9 ) {
        return 'Overweight (eat less)';
    }
}

console.log(calculateBmi(180, 74));