interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (dailyHours: number[], target: number) => {

    function countTrainingDays(arr: number[]): number {
        const nonZero = arr.filter(number => number !== 0);
        return nonZero.length;
    }

    function countAverage(arr: number[]): number  {
        const sum = arr.reduce((acc, current) => acc + current, 0)
        return sum / dailyHours.length
    }

    function evaluateSuccess(arr: number[], target: number): boolean {
        const average = countAverage(arr.filter(number => number !== 0));
        return average >= target;
      }

      function setRating(arr: number[]): number {
        const average = countAverage(arr.filter(number => number !== 0));
        if (average < 1) {
            return 1;
        } else if (average >= 1 && average <= 2) {
            return 2;
        } else {
            return 3;
        }
    }

    function setRatingMessage(arr: number[]): string {
        const average = countAverage(arr.filter(number => number !== 0));
        if (average < 1) {
            return 'next week try to exercise more';
        } else if (average >= 1 && average < 2) {
            return 'not too bad but could be better'
        } else {
            return 'good job!';
        }
    }

    const totalDays: number = dailyHours.length;
    const daysTrained: number = countTrainingDays(dailyHours);
    const trainingTarget: number = target;
    const dayAverage: number = countAverage(dailyHours.filter(number => number !==0))
    const isSuccess: boolean = evaluateSuccess(dailyHours, target)
    const exerciseRating: number = setRating(dailyHours)
    const description: string = setRatingMessage(dailyHours)
    
    return {
        periodLength: totalDays,
        trainingDays: daysTrained,
        success: isSuccess,
        rating: exerciseRating,
        ratingDescription: description,
        target: trainingTarget,
        average: dayAverage
    }
}

/*
function checkValidity(args: string[]): boolean {
    if(args.length < 4) {
        console.error('Too little arguments, please insert at least one training day');
        return false;
    }

    for (let i = 2; i <args.length; i++) {
        if(isNaN(parseFloat(args[i]))) {
            console.error('Arguments must be numerical');
            return false;
        }
    }
    return true;
}

if (!checkValidity(process.argv)) {
    process.exit(1)
}
*/

export function checkValidity(dailyHours: number[], target: number): boolean {
    return dailyHours.length > 0 && target > 0;
}

const target: number = parseFloat(process.argv[2]);
const dailyHours: number[] = process.argv.slice(3).map(arg => parseFloat(arg));

const getResult: Result = calculateExercises(dailyHours, target);
console.log(getResult);

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
