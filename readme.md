# 📅 Imsakiyah Ramadhan

![Imsakiyah Ramadhan](https://github.com/rzkmufid/imsyakiah-ramadhan/blob/main/src/img/SS.png?raw=true)

A modern web application for tracking Ramadan prayer times and fasting schedules for Muslims in Indonesia. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🕌 **Accurate Prayer Times**: Get precise prayer times for all cities in Indonesia
- 🌙 **Ramadan Schedule**: Complete Ramadan calendar with Imsak, Iftar, and prayer times
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🌓 **Dark/Light Mode**: Choose your preferred theme for comfortable viewing
- 📍 **Location-based**: Find prayer times for your specific city and province
- ✅ **Fasting Tracker**: Track your fasting days with notes and progress visualization
- 📊 **Daily View**: Focused view of today's prayer times
- 🔍 **Search Functionality**: Easily find your location from all provinces and cities

## 🚀 Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Routing**: React Router
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: equran.id API for prayer times data

## 📸 Screenshots

### Home Page
![Home Page](https://i.ibb.co/Jt9WBLT/imsakiyah-preview.png)

### Prayer Schedule
![Prayer Schedule](https://i.ibb.co/Jt9WBLT/imsakiyah-preview.png)

### Fasting Tracker
![Fasting Tracker](https://i.ibb.co/Jt9WBLT/imsakiyah-preview.png)

## 🛠️ Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/rzkmufid/imsakiyah-ramadhan.git
   cd imsakiyah-ramadhan
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## 📚 API Reference

This application uses the [equran.id API](https://equran.id/apidev/imsakiyah) for prayer times data.

API Endpoints:
- `/provinsi` - Get list of provinces
- `/kabkota` - Get list of cities for a province
- `/` - Get prayer times for a specific city and province

## 🧩 Project Structure

```
src/
├── components/       # UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── services/         # API services
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── routes.tsx        # Application routes
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [equran.id](https://equran.id) for providing the prayer times API
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Lucide Icons](https://lucide.dev) for the icon set
- All contributors who have helped improve this project

---

<p align="center">Made by Mufid for the Muslim community • رمضان كريم</p>