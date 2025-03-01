import { toast } from '@/hooks/use-toast';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ImsakiyahData {
  provinsi: string;
  kabkota: string;
  hijriah: string;
  masehi: string;
  imsakiyah: ImsakiyahDay[];
}

export interface ImsakiyahDay {
  tanggal: number;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

const API_BASE_URL = 'https://equran.id/api/v2/imsakiyah';

export async function fetchProvinces(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/provinsi`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<string[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    toast({
      title: 'Error',
      description: 'Gagal mengambil data provinsi. Silakan coba lagi.',
      variant: 'destructive',
    });
    return [];
  }
}

export async function fetchCities(province: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/kabkota`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provinsi: province }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<string[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    toast({
      title: 'Error',
      description: 'Gagal mengambil data kota. Silakan coba lagi.',
      variant: 'destructive',
    });
    return [];
  }
}

export async function fetchImsakiyahSchedule(province: string, city: string): Promise<ImsakiyahData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provinsi: province, kabkota: city }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<ImsakiyahData[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching imsakiyah schedule:', error);
    toast({
      title: 'Error',
      description: 'Gagal mengambil jadwal imsakiyah. Silakan coba lagi.',
      variant: 'destructive',
    });
    return [];
  }
}