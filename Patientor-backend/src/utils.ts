import { DiagnoseForm, NewPatientForm, Gender, Entry, NewEntryForm, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

/*
const isEntry = (list: unknown): list is Entry[] => {
    return Array.isArray(list);
};
*/

const parseName = (name: unknown):string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseBD = (dateOfBirth: unknown):string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dateOfBirth;
};

const parseSSN = (ssn: unknown):string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown):string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isGender = (param: string): param is Gender =>{
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

/*
const parseEntry = (entries: unknown): Entry[] => {
    if (!entries || !isEntry(entries)) {
        throw new Error('Incorrect or missing occupation');
    }
    return entries;
};
*/

export const toNewPatientForm = (object: unknown): NewPatientForm => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

      if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    console.log(object);
    const newPatient: NewPatientForm= {
        name: parseName(object.name),
        dateOfBirth: parseBD(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };

    return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

// parsers for new entries

const parseDescription = (description: unknown):string => {
    if(!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseDate = (date: unknown):string => {
    if(!date || !isString(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist: unknown):string => {
    if(!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseForm['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<DiagnoseForm['code']>;
    }
  
    return object.diagnosisCodes as Array<DiagnoseForm['code']>;
  };

interface Discharge {
  date: string;
  criteria: string;
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge object');
  }

  const dischargeObj = discharge as Discharge;

  if (!dischargeObj.date || !isString(dischargeObj.date) || !dischargeObj.criteria || !isString(dischargeObj.criteria)) {
    throw new Error('Incorrect or missing discharge properties');
  }

  return dischargeObj;
};

const parseEmployerName = (employerName: unknown):string => {
  if(!employerName || !isString(employerName)) {
      throw new Error('Incorrect or missing employer');
  }
  return employerName;
};

interface SickLeave {
  startDate: string;
  endDate: string;
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing discharge object');
  }

  const sickLeaveObj = sickLeave as SickLeave;

  if (!sickLeaveObj.startDate || !isString(sickLeaveObj.startDate) || !sickLeaveObj.endDate || !isString(sickLeaveObj.endDate)) {
    throw new Error('Incorrect or missing discharge properties');
  }

  return sickLeaveObj;
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (typeof value === 'string' && value in HealthCheckRating) {
    return HealthCheckRating[value as keyof typeof HealthCheckRating];
  }
  throw new Error(`Invalid or missing health check rating: ${value}`);
};

export const toNewEntryForm = (object: unknown): NewEntryForm => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing entry data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'type' in object
  ) {
    const commonFields: Omit<NewEntryForm, 'type'> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    switch (object.type) {
      case 'Hospital':
        return {
          ...commonFields,
          type: 'Hospital',
          discharge: parseDischarge((object as HospitalEntry).discharge)
        };

      case 'OccupationalHealthcare':
        return {
          ...commonFields,
          type: 'OccupationalHealthcare',
          employerName: parseEmployerName((object as OccupationalHealthcareEntry).employerName),
          sickLeave: parseSickLeave((object as OccupationalHealthcareEntry).sickLeave)
        };

      case 'HealthCheck':
        return {
          ...commonFields,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating((object as HealthCheckEntry).healthCheckRating)
        };

      default:
        throw new Error(`Invalid entry type: ${(object as Entry).type}`);
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};


