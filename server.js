const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const PORT = process.env.PORT || 3000;

let mongoServer; // Store reference to in-memory MongoDB server

const connectDatabaseAndStartServer = async () => {
    try {
        // If using local development, start in-memory MongoDB
        if (process.env.MONGODB_URI.includes('localhost') || process.env.USE_MEMORY_DB === 'true') {
            console.log('🚀 Starting local MongoDB (in-memory)...');
            const { MongoMemoryServer } = require('mongodb-memory-server');
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            console.log('✓ Local MongoDB started');
            
            await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
        } else {
            // Use Atlas connection
            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
        }
        
        console.log('✓ MongoDB Connected Successfully');

        // Import Routes after DB is ready
        const packageRoutes = require('./routes/packages');
        const bookingRoutes = require('./routes/bookings');
        const contactRoutes = require('./routes/contact');

        app.use('/api/packages', packageRoutes);
        app.use('/api/bookings', bookingRoutes);
        app.use('/api/contact', contactRoutes);

        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
            console.log('Press Ctrl+C to stop the server');
        });
    } catch (err) {
        console.error('✗ MongoDB Connection Error:', err.message);
        if (mongoServer) {
            await mongoServer.stop();
        }
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down...');
    if (mongoServer) {
        await mongoServer.stop();
    }
    process.exit(0);
});

// Home Route (always available once connected)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

connectDatabaseAndStartServer();
