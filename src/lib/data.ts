import { axiosInstance } from "./axios";

export async function fetchExpense(id: string) {
  try{
  const response = axiosInstance.get("/em/expense");
  return (await response).data;
  }
  catch(error){
    return (error);
  }
}
