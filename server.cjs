const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/Book.cjs');
const User = require('./models/User.cjs');
const userRouter = require('./routes/users.cjs'); 
const borrowRouter = require('./routes/borrow.cjs');

const app = express();


app.use(bodyParser.json());


const mongoURI = 'mongodb://127.0.0.1:27017/library-management';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        
      
        seedDatabase();
    })
    .catch((err) => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Library Management System Backend');
});


const authRoutes = require('./routes/auth.cjs');
const bookRoutes = require('./routes/books.cjs');
const borrowRoutes = require('./routes/borrow.cjs');


app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);
app.use('/api', userRouter); 
app.use('/api', borrowRouter);


async function seedDatabase() {
    try {
      
        const userExists = await User.countDocuments();
        if (userExists === 0) {
            const user1 = new User({
                name: 'Admin User',
                username: 'admin',
                password: 'admin123',
                email: 'admin@library.com',
                mobile: 1234567890,
                admin: true
            });
            await user1.save();

            const user2 = new User({
                name: 'Shirish Hirapure',
                username: 'Siri',
                password: 'siri2003',
                email: 'siri@gmail.com',
                mobile: 1234567890,
                admin: false
            });
            await user2.save();
        }

        
        const bookExists = await Book.countDocuments();
        if (bookExists === 0) {
            const book1 = new Book({
                name: 'wings of fire',
                author: 'APJ Abdul kalam',
                genre: 'Motivation',
                type: 'Book',
                available: true
            });
            await book1.save();

            const book2 = new Book({
                name: '1984',
                author: 'George Orwell',
                genre: 'Dystopian',
                type: 'Novel',
                available: true
            });
            await book2.save();

            const book3 = new Book({
                name: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                genre: 'Fiction',
                type: 'Novel',
                available: true
            });
            await book3.save();

            const book4 = new Book({
                name: 'The Catcher in the Rye',
                author: 'J.D. Salinger',
                genre: 'Fiction',
                type: 'Novel',
                available: true
            });
            await book4.save();

            const book5 = new Book({
                name: 'Book5',
                author: 'Author5',
                genre: 'Genere5',
                type: 'Type5',
                available: true
            });
            await book5.save();
        }

    } catch (err) {
        console.log('Error seeding database:', err);
    }
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
