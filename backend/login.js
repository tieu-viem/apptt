

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Kết nối đến cơ sở dữ liệu MongoDB
// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// // Định nghĩa schema cho người dùng
// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String
// });

// // Tạo model cho người dùng
// const User = mongoose.model('User', userSchema);

// app.use(express.json());

// // Đăng ký người dùng
// app.post('/register', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = new User({
//             username: req.body.username,
//             password: hashedPassword
//         });
//         await user.save();
//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         res.status(500).send('Error registering user');
//     }
// });

// // Đăng nhập
// app.post('/login', async (req, res) => {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) {
//         return res.status(404).send('User not found');
//     }

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) {
//         return res.status(401).send('Invalid password');
//     }

//     res.status(200).send('Login successful');
// });
// app.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'register.html'));
// });
// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.use(express.static(path.join(__dirname, 'public')));

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}/register`);
// });
