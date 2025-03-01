import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Table as TableIcon, Calendar as CalendarIcon, ListChecks, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchForm } from '@/components/search-form';
import { TodayCard } from '@/components/today-card';
import { ScheduleTable } from '@/components/schedule-table';
import { DailyView } from '@/components/daily-view';
import { FastingTracker } from '@/components/fasting-tracker';
import { useToast } from '@/hooks/use-toast';
import { fetchImsakiyahSchedule, ImsakiyahData } from '@/services/api';
import { formatDate, formatTime } from '@/lib/utils';

export function HomePage() {
  const [imsakiyahData, setImsakiyahData] = useState<ImsakiyahData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [activeView, setActiveView] = useState<'schedule-table' | 'daily-view' | 'fasting-tracker'>('schedule-table');
  const { toast } = useToast();

  // Update current date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(formatDate(now));
      setCurrentTime(formatTime(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (province: string, city: string) => {
    setLoading(true);
    setSelectedProvince(province);
    setSelectedCity(city);
    
    try {
      const data = await fetchImsakiyahSchedule(province, city);
      if (data && data.length > 0) {
        setImsakiyahData(data[0]);
        toast({
          title: "Berhasil",
          description: `Menampilkan jadwal imsakiyah untuk ${city}, ${province}`,
        });
      } else {
        toast({
          title: "Data Tidak Ditemukan",
          description: "Tidak dapat menemukan jadwal imsakiyah untuk lokasi yang dipilih",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching imsakiyah data:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil jadwal imsakiyah. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center justify-center mb-12 text-center islamic-pattern pt-8 pb-8">
        <div className="flex items-center justify-center mb-4">
          <Moon className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-4xl font-bold tracking-tight">Jadwal Imsakiyah Ramadhan</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
        <p className="text-muted-foreground max-w-2xl mt-2">
          Temukan jadwal imsakiyah Ramadhan untuk kota Anda. Pilih provinsi dan kota untuk melihat jadwal lengkap.
        </p>
      </div>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {/* Today's Imsak Card - Only show if we have data */}
      {imsakiyahData && imsakiyahData.imsakiyah && imsakiyahData.imsakiyah.length > 0 && (
        <TodayCard 
          todayData={imsakiyahData.imsakiyah[0]} 
          location={`${selectedCity}, ${selectedProvince}`}
          date={currentDate}
        />
      )}

      {imsakiyahData && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">
                {selectedCity}, {selectedProvince}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={activeView === 'schedule-table' ? 'default' : 'outline'} 
              onClick={() => setActiveView('schedule-table')}
              className="flex items-center gap-2"
            >
              <TableIcon className="h-4 w-4" />
              Tabel Jadwal
            </Button>
            <Button 
              variant={activeView === 'daily-view' ? 'default' : 'outline'} 
              onClick={() => setActiveView('daily-view')}
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Jadwal Hari Ini
            </Button>
            <Button 
              variant={activeView === 'fasting-tracker' ? 'default' : 'outline'} 
              onClick={() => setActiveView('fasting-tracker')}
              className="flex items-center gap-2"
            >
              <ListChecks className="h-4 w-4" />
              Puasa Tracker
            </Button>
          </div>

          {activeView === 'schedule-table' && (
            <ScheduleTable data={imsakiyahData} />
          )}
          
          {activeView === 'daily-view' && (
            <DailyView data={imsakiyahData.imsakiyah[0]} currentDate={currentDate} />
          )}
          
          {activeView === 'fasting-tracker' && (
            <FastingTracker scheduleData={imsakiyahData.imsakiyah} />
          )}
        </>
      )}

      {!imsakiyahData && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-primary/10 p-6 mb-4">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Jadwal Belum Dipilih</h2>
          <p className="text-muted-foreground max-w-md">
            Silakan pilih provinsi dan kota untuk melihat jadwal imsakiyah Ramadhan.
          </p>
        </div>
      )}
    </div>
  );
}