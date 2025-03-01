import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Moon, Sunset, Calendar, ListChecks, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImsakiyahDay } from '@/services/api';

interface FastingDay {
  date: string;
  completed: boolean;
  notes: string;
}

interface FastingTrackerProps {
  scheduleData: ImsakiyahDay[];
}

export function FastingTracker({ scheduleData }: FastingTrackerProps) {
  const [fastingDays, setFastingDays] = useState<FastingDay[]>([]);
  const [fastingProgress, setFastingProgress] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [daysPerPage, setDaysPerPage] = useState<number>(10);
  const { toast } = useToast();

  // Initialize fasting tracker when prayer times are loaded
  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      initializeFastingTracker();
    }
  }, [scheduleData]);

  // Calculate fasting progress
  useEffect(() => {
    if (fastingDays.length > 0) {
      const completedDays = fastingDays.filter(day => day.completed).length;
      const progress = (completedDays / fastingDays.length) * 100;
      setFastingProgress(progress);
    }
  }, [fastingDays]);

  const initializeFastingTracker = () => {
    // Create fasting tracker data based on prayer times
    const trackerData: FastingDay[] = scheduleData.map((day, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const dateStr = date.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      // Check if we already have data for this date in localStorage
      const dateKey = `fasting_${dateStr}`;
      const savedData = localStorage.getItem(dateKey);
      
      if (savedData) {
        return JSON.parse(savedData);
      }
      
      // Otherwise create new entry
      const newDay = {
        date: dateStr,
        completed: false,
        notes: '',
      };
      
      // Save to localStorage
      localStorage.setItem(dateKey, JSON.stringify(newDay));
      
      return newDay;
    });
    
    setFastingDays(trackerData);
  };

  const toggleFastingDay = (index: number) => {
    const updatedDays = [...fastingDays];
    updatedDays[index].completed = !updatedDays[index].completed;
    
    // Save to localStorage
    const dateKey = `fasting_${updatedDays[index].date}`;
    localStorage.setItem(dateKey, JSON.stringify(updatedDays[index]));
    
    setFastingDays(updatedDays);
    
    toast({
      title: updatedDays[index].completed ? "Puasa Selesai" : "Puasa Belum Selesai",
      description: `${updatedDays[index].date} telah diperbarui`,
    });
  };

  const updateFastingNote = (index: number, note: string) => {
    const updatedDays = [...fastingDays];
    updatedDays[index].notes = note;
    
    // Save to localStorage
    const dateKey = `fasting_${updatedDays[index].date}`;
    localStorage.setItem(dateKey, JSON.stringify(updatedDays[index]));
    
    setFastingDays(updatedDays);
  };

  // Pagination logic
  const totalPages = Math.ceil(fastingDays.length / daysPerPage);
  const indexOfLastDay = currentPage * daysPerPage;
  const indexOfFirstDay = indexOfLastDay - daysPerPage;
  const currentDays = fastingDays.slice(indexOfFirstDay, indexOfLastDay);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDaysPerPageChange = (value: number) => {
    setDaysPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (!scheduleData || scheduleData.length === 0) {
    return null;
  }

  return (
    <Card className="islamic-pattern overflow-hidden">
      <CardHeader className="pt-6">
        <div className="flex items-center">
          <ListChecks className="h-5 w-5 text-primary mr-2" />
          <CardTitle>Puasa Tracker</CardTitle>
        </div>
        <CardDescription>Pantau ibadah puasa Ramadhan Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            Progress Puasa Ramadhan
          </h3>
          <div className="space-y-2">
            <Progress value={fastingProgress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 hari</span>
              <span>{Math.round(fastingProgress)}% selesai</span>
              <span>30 hari</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center">
              <ListChecks className="h-4 w-4 mr-2 text-primary" />
              Catatan Harian Puasa
            </h3>
            <div className="flex items-center space-x-2">
              <Label htmlFor="days-per-page" className="text-sm">Tampilkan:</Label>
              <select 
                id="days-per-page"
                value={daysPerPage}
                onChange={(e) => handleDaysPerPageChange(Number(e.target.value))}
                className="text-sm border rounded px-2 py-1 bg-background"
              >
                <option value={10}>10 hari</option>
                <option value={15}>15 hari</option>
                <option value={30}>30 hari</option>
              </select>
            </div>
          </div>
          
          {currentDays.map((day, index) => {
            const actualIndex = indexOfFirstDay + index;
            return (
              <Card key={index} className={`border ${day.completed ? 'border-primary/30' : ''}`}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{day.date}</CardTitle>
                    <Badge variant={day.completed ? "default" : "outline"}>
                      {day.completed ? "Selesai" : "Belum Selesai"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`day-${actualIndex}`} 
                        checked={day.completed}
                        onCheckedChange={() => toggleFastingDay(actualIndex)}
                      />
                      <Label htmlFor={`day-${actualIndex}`}>
                        {day.completed ? "Puasa selesai" : "Tandai puasa selesai"}
                      </Label>
                    </div>
                    
                    <div className="mt-2">
                      <Label htmlFor={`notes-${actualIndex}`} className="text-sm mb-1 block">
                        Catatan:
                      </Label>
                      <Input
                        id={`notes-${actualIndex}`}
                        placeholder="Tambahkan catatan untuk hari ini..."
                        value={day.notes}
                        onChange={(e) => updateFastingNote(actualIndex, e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Moon className="h-3 w-3 mr-1" /> {scheduleData[actualIndex]?.imsak || '-'} • 
                    <Sunset className="h-3 w-3 mx-1" /> {scheduleData[actualIndex]?.maghrib || '-'}
                  </div>
                  {day.completed && (
                    <div className="flex items-center text-primary">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      <span className="text-sm">Alhamdulillah</span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Menampilkan {indexOfFirstDay + 1}-{Math.min(indexOfLastDay, fastingDays.length)} dari {fastingDays.length} hari
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  // Logic to show pages around current page
                  let pageToShow;
                  if (totalPages <= 10) {
                    pageToShow = i + 1;
                  } else if (currentPage <= 3) {
                    pageToShow = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i;
                  } else {
                    pageToShow = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={i}
                      variant={currentPage === pageToShow ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(pageToShow)}
                      className="h-8 w-8 p-0"
                    >
                      {pageToShow}
                    </Button>
                  );
                })}
                
                {totalPages > 10 && currentPage < totalPages - 2 && (
                  <>
                    <span className="mx-1">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(totalPages)}
                      className="h-8 w-8 p-0"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}