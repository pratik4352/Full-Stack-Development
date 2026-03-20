// Mock weather data generator
const generateMockWeatherData = (city) => {
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Windy'];
    const icons = ['sunny', 'cloud', 'cloud_queue', 'wb_cloudy', 'air'];
    
    return {
        city: city || 'New York',
        current: {
            temp: Math.floor(Math.random() * 30 + 50),
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            icon: icons[Math.floor(Math.random() * icons.length)],
            humidity: Math.floor(Math.random() * 40 + 40),
            windSpeed: Math.floor(Math.random() * 20 + 5),
            pressure: Math.floor(Math.random() * 30 + 1000),
            uvIndex: Math.floor(Math.random() * 11),
            visibility: (Math.random() * 5 + 5).toFixed(1)
        },
        forecast: Array.from({length: 7}, (_, i) => ({
            day: getDayName(i),
            date: getDate(i),
            high: Math.floor(Math.random() * 20 + 65),
            low: Math.floor(Math.random() * 20 + 45),
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            icon: icons[Math.floor(Math.random() * icons.length)],
            humidity: Math.floor(Math.random() * 40 + 40),
            windSpeed: Math.floor(Math.random() * 20 + 5),
            precipitation: Math.floor(Math.random() * 100)
        }))
    };
};

// Helper functions
const getDayName = (offset) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return days[date.getDay()];
};

const getDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
};

// Temperature conversion
let tempUnit = 'F';

const convertTemp = (temp) => {
    if (tempUnit === 'F') return Math.round(temp);
    return Math.round((temp - 32) * 5/9);
};

const toggleUnit = (unit) => {
    tempUnit = unit;
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    updateCurrentWeather();
    generateForecast();
    updateCharts();
};

const updateCharts = () => {
    if (temperatureChart) {
        temperatureChart.data.datasets[0].data = currentWeatherData.forecast.map(d => convertTemp(d.high));
        temperatureChart.data.datasets[1].data = currentWeatherData.forecast.map(d => convertTemp(d.low));
        temperatureChart.update();
    }
};

// Global variables
let temperatureChart, humidityChart, windChart, conditionChart;
let currentWeatherData = generateMockWeatherData('New York');

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCurrentWeather();
    generateForecast();
    initCharts();
    setupEventListeners();
});

// Setup event listeners
const setupEventListeners = () => {
    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchCity();
        });
    }

    // Forecast card click handlers
    setTimeout(() => {
        document.querySelectorAll('.forecast-item').forEach((card, index) => {
            card.addEventListener('click', () => showForecastDetail(index));
            card.style.cursor = 'pointer';
        });
    }, 100);
};

// Show detailed forecast
const showForecastDetail = (index) => {
    const day = currentWeatherData.forecast[index];
    alert(`📋 ${day.day} Forecast\n\n🌤️ Condition: ${day.condition}\n🔥 High: ${convertTemp(day.high)}°${tempUnit}\n❄️ Low: ${convertTemp(day.low)}°${tempUnit}\n💧 Humidity: ${day.humidity}%\n💨 Wind: ${day.windSpeed} km/h\n🌧️ Precipitation: ${day.precipitation}%`);
};

// Update current weather display
const updateCurrentWeather = () => {
    const weather = currentWeatherData.current;
    
    document.getElementById('cityName').textContent = currentWeatherData.city;
    document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const tempDisplay = convertTemp(weather.temp);
    document.getElementById('temperature').textContent = tempDisplay;
    document.getElementById('weatherCondition').textContent = weather.condition;
    document.getElementById('humidity').textContent = weather.humidity + '%';
    document.getElementById('windSpeed').textContent = weather.windSpeed + ' km/h';
    document.getElementById('pressure').textContent = weather.pressure + ' mb';
    
    // Update weather icon
    const icon = document.querySelector('.weather-icon');
    if (icon) icon.textContent = weather.icon;
};

// Generate forecast cards
const generateForecast = () => {
    const container = document.getElementById('forecastContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    currentWeatherData.forecast.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = 'forecast-item';
        const highTemp = convertTemp(day.high);
        const lowTemp = convertTemp(day.low);
        
        card.innerHTML = `
            <div class="forecast-day">${day.day}</div>
            <div class="forecast-date" style="font-size: 11px; opacity: 0.9;">${day.date}</div>
            <div class="forecast-icon">
                <span class="material-symbols-outlined" style="font-size: 35px;">${day.icon}</span>
            </div>
            <div class="forecast-temp">${highTemp}°</div>
            <div class="forecast-temp-range">${lowTemp}° / ${highTemp}°</div>
            <div style="font-size: 11px; margin-top: 5px; opacity: 0.9;">💧 ${day.humidity}%</div>
        `;
        
        card.addEventListener('click', () => showForecastDetail(index));
        container.appendChild(card);
    });
};

// Initialize all charts
const initCharts = () => {
    const ctx1 = document.getElementById('temperatureChart');
    const ctx2 = document.getElementById('humidityChart');
    const ctx3 = document.getElementById('windChart');
    const ctx4 = document.getElementById('conditionChart');
    
    if (!ctx1 || !ctx2 || !ctx3 || !ctx4) return;

    const tempData = currentWeatherData.forecast.map(d => convertTemp(d.high));
    const tempDataLow = currentWeatherData.forecast.map(d => convertTemp(d.low));
    
    // Temperature Trend Chart (Line Chart)
    temperatureChart = new Chart(ctx1.getContext('2d'), {
        type: 'line',
        data: {
            labels: currentWeatherData.forecast.map(d => d.day),
            datasets: [{
                label: `High Temp (°${tempUnit})`,
                data: tempData,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#ff4444'
            }, {
                label: `Low Temp (°${tempUnit})`,
                data: tempDataLow,
                borderColor: '#4ecdc4',
                backgroundColor: 'rgba(78, 205, 196, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#4ecdc4',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#2ba899'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        font: {size: 13, weight: 'bold'},
                        padding: 20,
                        color: 'rgba(255, 255, 255, 0.8)'
                    },
                    display: true
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {size: 14, weight: 'bold'},
                    bodyFont: {size: 13}
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                }
            }
        }
    });

    // Humidity & Pressure Chart (Bar Chart)
    humidityChart = new Chart(ctx2.getContext('2d'), {
        type: 'bar',
        data: {
            labels: currentWeatherData.forecast.map(d => d.day),
            datasets: [{
                label: 'Humidity (%)',
                data: currentWeatherData.forecast.map(d => d.humidity),
                backgroundColor: 'rgba(100, 200, 255, 0.7)',
                borderColor: '#64c8ff',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(100, 200, 255, 0.95)'
            }, {
                label: 'Pressure (mb)',
                data: currentWeatherData.forecast.map(d => d.humidity + 900),
                backgroundColor: 'rgba(255, 200, 100, 0.7)',
                borderColor: '#ffc864',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(255, 200, 100, 0.95)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        font: {size: 13, weight: 'bold'},
                        padding: 20,
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                }
            }
        }
    });

    // Wind Speed Distribution (Radar Chart)
    windChart = new Chart(ctx3.getContext('2d'), {
        type: 'radar',
        data: {
            labels: currentWeatherData.forecast.map(d => d.day),
            datasets: [{
                label: 'Wind Speed (km/h)',
                data: currentWeatherData.forecast.map(d => d.windSpeed),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.25)',
                borderWidth: 3,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#f093fb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        font: {size: 13, weight: 'bold'},
                        color: 'rgba(255, 255, 255, 0.8)',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 30,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.15)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {size: 11}
                    }
                }
            }
        }
    });

    // Weather Condition Distribution (Doughnut Chart)
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Windy'];
    const conditionData = [35, 25, 20, 15, 5];
    const colors = ['#ffc107', '#95a5a6', '#3498db', '#e74c3c', '#1abc9c'];

    conditionChart = new Chart(ctx4.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: conditions,
            datasets: [{
                data: conditionData,
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2,
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        font: {size: 12, weight: 'bold'},
                        padding: 15,
                        color: 'rgba(255, 255, 255, 0.8)'
                    },
                    position: 'bottom'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
};

// Search functionality
const searchCity = () => {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    
    if (cityName === '') {
        alert('Please enter a city name');
        return;
    }
    
    // Add loading state
    const searchBtn = event.target;
    const originalText = searchBtn.textContent;
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        currentWeatherData = generateMockWeatherData(cityName);
        
        updateCurrentWeather();
        generateForecast();
        
        // Destroy and recreate charts
        if (temperatureChart) temperatureChart.destroy();
        if (humidityChart) humidityChart.destroy();
        if (windChart) windChart.destroy();
        if (conditionChart) conditionChart.destroy();
        
        initCharts();
        
        // Reset button
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
        cityInput.value = '';
        
        // Show success feedback
        searchBtn.textContent = '✓ Done';
        setTimeout(() => {
            searchBtn.textContent = originalText;
        }, 1500);
    }, 800);
};

// Auto-update with smooth transitions every 60 seconds
setInterval(() => {
    if (document.hidden) return;
    
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Windy'];
    const icons = ['sunny', 'cloud', 'cloud_queue', 'wb_cloudy', 'air'];
    
    currentWeatherData.forecast = Array.from({length: 7}, (_, i) => ({
        day: getDayName(i),
        date: getDate(i),
        high: Math.floor(Math.random() * 20 + 65),
        low: Math.floor(Math.random() * 20 + 45),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: icons[Math.floor(Math.random() * icons.length)],
        humidity: Math.floor(Math.random() * 40 + 40),
        windSpeed: Math.floor(Math.random() * 20 + 5),
        precipitation: Math.floor(Math.random() * 100)
    }));

    currentWeatherData.current = {
        ...currentWeatherData.current,
        temp: Math.floor(Math.random() * 30 + 50),
        humidity: Math.floor(Math.random() * 40 + 40),
        windSpeed: Math.floor(Math.random() * 20 + 5),
        pressure: Math.floor(Math.random() * 30 + 1000)
    };

    updateCurrentWeather();
    generateForecast();
    updateCharts();
    setupEventListeners();
}, 60000);
