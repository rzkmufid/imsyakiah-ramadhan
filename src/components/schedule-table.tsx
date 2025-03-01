import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImsakiyahData } from '@/services/api';
import { formatDate } from '@/lib/utils';
import { Moon, Sunrise, Sunset, Sun, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScheduleTableProps {
  data: ImsakiyahData;
}

export function ScheduleTable({ data }: ScheduleTableProps) {
  if (!data || !data.imsakiyah || data.imsakiyah.length === 0) {
    return null;
  }

  // Get the current Hijri month and year from the data
  const hijriInfo = data.hijriah ? data.hijriah.split(' ') : [];
  const hijriMonth = hijriInfo.length > 0 ? hijriInfo[0] : 'Ramadhan';
  const hijriYear = hijriInfo.length > 1 ? hijriInfo[1] : '';

  return (
    <Card className="islamic-pattern overflow-hidden">
      <CardHeader className="pt-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-primary mr-2" />
          <CardTitle>Jadwal Lengkap {hijriMonth} {hijriYear}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Hari Ke</TableHead>
                <TableHead className="whitespace-nowrap">Tanggal</TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Moon className="h-3 w-3 mr-1" /> Imsak
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Sunrise className="h-3 w-3 mr-1" /> Subuh
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Sunrise className="h-3 w-3 mr-1" /> Terbit
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Sun className="h-3 w-3 mr-1" /> Dhuha
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Sun className="h-3 w-3 mr-1" /> Dzuhur
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Sun className="h-3 w-3 mr-1" /> Ashar
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Sunset className="h-3 w-3 mr-1" /> Maghrib
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <Moon className="h-3 w-3 mr-1" /> Isya
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.imsakiyah.map((day, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const isToday = index === 0;
                
                return (
                  <TableRow 
                    key={index} 
                    className={isToday 
                      ? "bg-primary/10 font-medium" 
                      : index % 2 === 0 
                        ? "bg-primary/5" 
                        : ""
                    }
                  >
                    <TableCell className="font-medium text-center">
                      {day.tanggal || index + 1}
                      {isToday && (
                        <Badge variant="outline" className="ml-2 bg-primary text-primary-foreground border-primary">
                          Hari Ini
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
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
  );
}