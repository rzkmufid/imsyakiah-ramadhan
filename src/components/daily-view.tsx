import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImsakiyahDay } from '@/services/api';
import { Moon, Sunrise, Sunset, Sun, Clock } from 'lucide-react';

interface DailyViewProps {
  data: ImsakiyahDay;
  currentDate: string;
}

export function DailyView({ data, currentDate }: DailyViewProps) {
  if (!data) return null;

  const prayerTimes = [
    { name: 'Imsak', time: data.imsak, icon: <Moon className="h-4 w-4" /> },
    { name: 'Subuh', time: data.subuh, icon: <Sunrise className="h-4 w-4" /> },
    { name: 'Terbit', time: data.terbit, icon: <Sunrise className="h-4 w-4" /> },
    { name: 'Dhuha', time: data.dhuha, icon: <Sun className="h-4 w-4" /> },
    { name: 'Dzuhur', time: data.dzuhur, icon: <Sun className="h-4 w-4" /> },
    { name: 'Ashar', time: data.ashar, icon: <Sun className="h-4 w-4" /> },
    { name: 'Maghrib', time: data.maghrib, icon: <Sunset className="h-4 w-4" /> },
    { name: 'Isya', time: data.isya, icon: <Moon className="h-4 w-4" /> },
  ];

  return (
    <Card className="islamic-pattern overflow-hidden">
      <CardHeader className="pt-6">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-primary mr-2" />
          <CardTitle>Jadwal Hari Ini</CardTitle>
        </div>
        <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {prayerTimes.map((prayer, index) => (
            <Card key={index} className="prayer-card bg-muted/50">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg flex items-center justify-center">
                  <span className="mr-2">{prayer.icon}</span>
                  {prayer.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-center">{prayer.time}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}