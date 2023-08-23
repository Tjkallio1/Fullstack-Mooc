import diagnoseData from "../data/diagnoses";
import { DiagnoseForm } from "../types";

const diagnoses: DiagnoseForm[] = diagnoseData;

const getDiagnoses = (): DiagnoseForm[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};