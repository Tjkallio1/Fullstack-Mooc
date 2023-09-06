import axios, { AxiosError } from 'axios'
import { Diary, NewDiary } from './types'

interface ValidationError {
    message: string; 
    errors: Record<string, string[]>
  }

const baseurl = 'http://localhost:3001/api/diaries'

export const getAllDiaries = () => {
    return axios
        .get<Diary[]>(baseurl)
        .then(response => response.data)
}

export const createDiary = async (newDiary: NewDiary): Promise<Diary | string> => {

    try {
      const response = await axios.post<Diary>(baseurl, newDiary);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        const axiosError: AxiosError<ValidationError, Record<string, unknown>> = error;
        const status = axiosError.response?.status;
        console.log(axiosError);
        const responseData = axiosError.response?.data;
  
        if (status === 400) {
          if (responseData && responseData.message) {
            return responseData.message;
          } else {
            return 'Error: Incorrect data';
          }
        } else if (status === 401) {
          if (responseData && responseData.message) {
            return `Unauthorized: ${responseData.message}`;
          } else {
            return 'Unauthorized';
          }
        }
      }
      console.error(error);
      return 'An unknown error occurred'; 
    }
  };