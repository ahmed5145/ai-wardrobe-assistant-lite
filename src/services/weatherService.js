const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
              throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            const weatherInfo = { description: data.weather[0].description, condition: data.weather[0].main };
            resolve(weatherInfo);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation not supported'));
    }
  });
};
