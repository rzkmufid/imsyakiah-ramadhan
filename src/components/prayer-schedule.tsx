import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImsakiyahData } from '@/services/api';
import { formatDate } from '@/lib/utils';

interface PrayerScheduleProps {
  data: ImsakiyahData;
  currentDate: string;
}

export function PrayerSchedule({ data, currentDate }: PrayerScheduleProps) {
  if (!data || !data.imsakiyah || data.imsakiyah.length === 0) {
    return null;
  }

  // Get today's data (first day in the array)
  const todayData = data.imsakiyah[0];

  return (
    <Tabs defaultValue="table" className="mb-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="table">Tabel Jadwal</TabsTrigger>
        <TabsTrigger value="today">Hari Ini</TabsTrigger>
      </TabsList>
      
      <TabsContent value="table" className="mt-4">
        <Card>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Imsak</TableHead>
                    <TableHead>Subuh</TableHead>
                    <TableHead>Terbit</TableHead>
                    <TableHead>Dhuha</TableHead>
                    <TableHead>Dzuhur</TableHead>
                    <TableHead>Ashar</TableHead>
                    <TableHead>Maghrib</TableHead>
                    <TableHead>Isya</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.imsakiyah.slice(0, 10).map((day, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() + index);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })}
                        </TableCell>
                        <TableCell>{day.imsak}</TableCell>
                        <TableCell>{day.subuh}</TableCell>
                        <TableCell>{day.terbit}</TableCell>
                        <TableCell>{day.dhuha}</TableCell>
                        <TableCell>{day.dzuhur}</TableCell>
                        <TableCell>{day.ashar}</TableCell>
                        <TableCell>{day.maghrib}</TableCell>
                        <TableCell>{day.isya}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="today" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Hari Ini</CardTitle>
            <CardDescription>{currentDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Imsak', time: todayData.imsak },
                { name: 'Subuh', time: todayData.subuh },
                { name: 'Terbit', time: todayData.terbit },
                { name: 'Dhuha', time: todayData.dhuha },
                { name: 'Dzuhur', time: todayData.dzuhur },
                { name: 'Ashar', time: todayData.ashar },
                { name: 'Maghrib', time: todayData.maghrib },
                { name: 'Isya', time: todayData.isya },
              ].map((prayer, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{prayer.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{prayer.time}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}