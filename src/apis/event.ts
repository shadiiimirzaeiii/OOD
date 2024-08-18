import { ApiManager } from '@/libs/http/axios.config';
import { Event } from './routes';
import { ApiData } from './utils';

export type CreateEvent = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type EventInfo = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  startTime: string | null;
  endTime: string | null;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
};

export const createEvent = async (data: CreateEvent) => {
  const res = await ApiManager.post<ApiData<any>>(Event, data);

  return res.data.data;
};

export const editEvent = async (id: string, data: Partial<CreateEvent>) => {
  const res = await ApiManager.patch<ApiData<any>>(`${Event}/${id}`, data);

  return res.data.data;
};

export const getAllEvents = async (data: { startDate: string; endDate: string }) => {
  const res = await ApiManager.post<ApiData<EventInfo[]>>(`${Event}/list`, data);

  return res.data.data;
};

export const getEvent = async (id: string) => {
  const res = await ApiManager(`${Event}/${id}`);

  return res.data.data;
};

export const deleteEvent = async (id: string) => {
  const res = await ApiManager.delete<ApiData<any>>(`${Event}/${id}`);

  return res.data.data;
};
