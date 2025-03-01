import { useState, useEffect } from 'react';
import { Search, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { fetchProvinces, fetchCities } from '@/services/api';

interface SearchFormProps {
  onSearch: (province: string, city: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [autoDetectLocation, setAutoDetectLocation] = useState<boolean>(true);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>('');
  const [isLoadingProvinces, setIsLoadingProvinces] = useState<boolean>(false);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
  const { toast } = useToast();

  // Load provinces on component mount
  useEffect(() => {
    loadProvinces();
    
    // Load auto-detect location preference
    const savedAutoDetect = localStorage.getItem('imsakiyah_auto_detect_location');
    if (savedAutoDetect !== null) {
      setAutoDetectLocation(JSON.parse(savedAutoDetect));
    }
    
    // Load last search
    const lastSearch = localStorage.getItem('imsakiyah_last_search');
    if (lastSearch) {
      const { province, city } = JSON.parse(lastSearch);
      setSelectedProvince(province);
      
      // We need to wait for cities to be loaded before setting selectedCity
      loadCities(province).then(() => {
        setSelectedCity(city);
      });
    }
  }, []);

  // Save auto-detect preference when changed
  useEffect(() => {
    localStorage.setItem('imsakiyah_auto_detect_location', JSON.stringify(autoDetectLocation));
  }, [autoDetectLocation]);

  const loadProvinces = async () => {
    setIsLoadingProvinces(true);
    const data = await fetchProvinces();
    setProvinces(data);
    setIsLoadingProvinces(false);
  };

  const loadCities = async (province: string) => {
    if (!province) return;
    
    setIsLoadingCities(true);
    setCities([]);
    const data = await fetchCities(province);
    setCities(data);
    setIsLoadingCities(false);
    return data;
  };

  const handleProvinceChange = async (value: string) => {
    setSelectedProvince(value);
    setSelectedCity('');
    await loadCities(value);
  };

  const handleSearch = () => {
    if (!selectedProvince || !selectedCity) {
      toast({
        title: "Error",
        description: "Silakan pilih provinsi dan kota terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    // Save last search
    localStorage.setItem('imsakiyah_last_search', JSON.stringify({
      province: selectedProvince,
      city: selectedCity
    }));

    onSearch(selectedProvince, selectedCity);
  };

  const detectLocation = () => {
    setLocationLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation tidak didukung oleh browser Anda');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // For now, we'll just show a toast since we don't have a real geolocation API
        // In a real app, we would call an API to get the nearest city
        toast({
          title: "Lokasi Terdeteksi",
          description: "Fitur ini masih dalam pengembangan. Silakan pilih lokasi secara manual.",
        });
        setLocationLoading(false);
      },
      (error) => {
        setLocationError(`Error mendeteksi lokasi: ${error.message}`);
        setLocationLoading(false);
        toast({
          title: "Error Lokasi",
          description: `Tidak dapat mendeteksi lokasi Anda: ${error.message}`,
          variant: "destructive",
        });
      }
    );
  };

  return (
    <Card className="mb-8 islamic-pattern overflow-hidden">
      <CardHeader className="pt-6">
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          <span>Cari Jadwal Imsakiyah</span>
        </CardTitle>
        <CardDescription>
          Pilih provinsi dan kota untuk melihat jadwal imsakiyah Ramadhan
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-location" 
              checked={autoDetectLocation}
              onCheckedChange={setAutoDetectLocation}
              disabled={true}
            />
            <Label htmlFor="auto-location">Deteksi lokasi otomatis</Label>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={detectLocation}
            disabled={locationLoading}
            className="border-primary/50 hover:bg-primary/10"
          >
            <MapPin className="h-4 w-4 mr-2" />
            {locationLoading ? "Mendeteksi..." : "Deteksi Lokasi"}
          </Button>
        </div>
        
        {locationError && (
          <div className="bg-destructive/10 p-3 rounded-md flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
            <p className="text-sm text-destructive">{locationError}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="province" className="text-sm font-medium">
              Provinsi
            </label>
            <Select value={selectedProvince} onValueChange={handleProvinceChange} disabled={isLoadingProvinces}>
              <SelectTrigger id="province">
                <SelectValue placeholder={isLoadingProvinces ? "Memuat provinsi..." : "Pilih Provinsi"} />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              Kota/Kabupaten
            </label>
            <Select 
              value={selectedCity} 
              onValueChange={setSelectedCity}
              disabled={!selectedProvince || isLoadingCities}
            >
              <SelectTrigger id="city">
                <SelectValue placeholder={
                  !selectedProvince 
                    ? "Pilih Provinsi Terlebih Dahulu" 
                    : isLoadingCities 
                      ? "Memuat kota..." 
                      : "Pilih Kota/Kabupaten"
                } />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button 
              className="w-full" 
              onClick={handleSearch}
              disabled={!selectedProvince || !selectedCity || isLoading}
            >
              {isLoading ? "Mencari..." : "Cari Jadwal"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}