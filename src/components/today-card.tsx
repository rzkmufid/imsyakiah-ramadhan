import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImsakiyahDay } from '@/services/api';
import { formatDate } from '@/lib/utils';
import { Moon, Sunrise, Sunset, Sun } from 'lucide-react';

interface TodayCardProps {
  todayData: ImsakiyahDay;
  location: string;
  date: string;
}

export function TodayCard({ todayData, location, date }: TodayCardProps) {
  if (!todayData) return null;

  return (
    <Card className="mb-8 islamic-pattern overflow-hidden">
      <CardHeader className="pb-2 pt-6">
        <CardTitle className="text-xl flex items-center">
          <Moon className="h-5 w-5 text-primary mr-2" />
          Jadwal Imsak Hari Ini
        </CardTitle>
        <CardDescription>
          {location} - {formatDate(new Date())}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 md:col-span-1">
            <div className="prayer-card bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground flex items-center justify-center">
                <Moon className="h-3 w-3 mr-1" /> Imsak
              </p>
              <p className="text-2xl font-bold text-primary">{todayData.imsak}</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="prayer-card bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground flex items-center justify-center">
                <Sunset className="h-3 w-3 mr-1" /> Maghrib
              </p>
              <p className="text-2xl font-bold text-primary">{todayData.maghrib}</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="prayer-card bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground flex items-center justify-center">
                <Sunrise className="h-3 w-3 mr-1" /> Subuh
              </p>
              <p className="text-2xl font-bold">{todayData.subuh}</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="prayer-card bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground flex items-center justify-center">
                <Sun className="h-3 w-3 mr-1" /> Isya
              </p>
              <p className="text-2xl font-bold">{todayData.isya}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}