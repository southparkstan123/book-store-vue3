import axios from 'axios';
type ModuleType = 'book' | 'author' | 'publisher';

export async function fetchRecords(module: ModuleType, page: number = 1, perPage: number = 10): Promise<any> {
  const result = await axios.get(`/api/v1/${module}/list?page=${page}&per=${perPage}`);
  return result;
}

export async function fetchRecordById(id: number, module: ModuleType): Promise<any> {
  const result = await axios.get(`/api/v1/${module}/${id}`);
  return result;
}

export async function updateRecordById(id: number, payload: any, module: ModuleType): Promise<any> {
  const token: string | null = localStorage.getItem('token');

  const result = await axios.patch(`/api/v1/${module}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
}

export async function createRecord(payload: any, module: ModuleType): Promise<any> {
  const token: string | null = localStorage.getItem('token');

  const result = await axios.post(`/api/v1/${module}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
}

export async function deleteRecordById(id: number, module: ModuleType): Promise<any> {
  const token: string | null = localStorage.getItem('token');

  const result = await axios.delete(`/api/v1/${module}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
}

export async function getNameOfAuthors() {
  const result = await axios.get('/api/v1/author/list/names')
  return result;
}

export async function getNameOfPublishers() {
  const result = await axios.get('/api/v1/publisher/list/names')
  return result
}