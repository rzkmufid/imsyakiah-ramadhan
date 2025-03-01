import { Github, Mail, User, Code, Moon, BookOpen, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function AboutPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center justify-center mb-12 text-center islamic-pattern pt-8 pb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-4xl font-bold tracking-tight">Tentang Aplikasi</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
        <p className="text-muted-foreground max-w-2xl mt-2">
          Aplikasi Jadwal Imsakiyah Ramadhan untuk Umat Muslim di Indonesia
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="col-span-1 islamic-pattern overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 p-2">
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
              Developer
            </Badge>
          </div>
          <CardHeader className="flex flex-col items-center text-center pt-8">
            <Avatar className="h-28 w-28 mb-4 ring-4 ring-primary/20">
              <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQHEs8SUJoIDuw/profile-displayphoto-shrink_800_800/B56ZOdvfCxGwAc-/0/1733518292083?e=1746057600&v=beta&t=xmNFgpPHcAhdJcHQYUvAWdYYMlTFRZsPYjxY4DsSN6o" alt="Rizki Mufid" />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">Rizki Mufid</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1 mt-1">
              <span>Frontend Developer</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pb-6">
            <div className="flex gap-4">
              <a href="https://github.com/rzkmufid" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
              <a href="mailto:rizkimufid.rm@gmail.com">
                <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://linkedin.com/in/rzkmufid" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://instagram.com/rzkmufid" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10">
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                rizkimufid.rm@gmail.com
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 islamic-pattern overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="pt-8">
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-primary mr-2" />
              <CardTitle>Tentang Aplikasi</CardTitle>
            </div>
            <CardDescription>
              Jadwal Imsakiyah Ramadhan - Membantu umat Muslim di Indonesia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <p className="italic text-center text-sm">
                "Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang sebelum kamu agar kamu bertakwa."
                <br />
                <span className="text-primary font-medium">(QS. Al-Baqarah: 183)</span>
              </p>
            </div>
            
            <p>
              Aplikasi ini menyediakan jadwal waktu sholat untuk berbagai kota di Indonesia, dengan data yang akurat dan mudah diakses.
            </p>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">API</h3>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm">
                  Data jadwal imsakiyah disediakan oleh <a href="https://equran.id/apidev/imsakiyah" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">equran.id/apidev/imsakiyah</a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="islamic-pattern overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader className="pt-8">
          <div className="flex items-center">
            <Code className="h-5 w-5 text-primary mr-2" />
            <CardTitle>Teknologi yang Digunakan</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="flex flex-col items-center p-4 rounded-lg prayer-card bg-primary/5 border border-primary/20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">React</span>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg prayer-card bg-primary/5 border border-primary/20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">TypeScript</span>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg prayer-card bg-primary/5 border border-primary/20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">Tailwind CSS</span>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg prayer-card bg-primary/5 border border-primary/20">
              <img src="https://vitejs.dev/logo.svg" alt="Vite" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">Vite</span>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg prayer-card bg-primary/5 border border-primary/20">
              <img src="https://ui.shadcn.com/favicon.ico" alt="shadcn/ui" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">shadcn/ui</span>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg prayer-card bg-primary/5 border border-primary/20">
              <img src="https://lucide.dev/logo.svg" alt="Lucide Icons" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">Lucide Icons</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}