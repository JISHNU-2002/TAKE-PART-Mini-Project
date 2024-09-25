const bcrypt = require('bcrypt');
const User = require('../Models/userModel');


// User registration
const userReg = (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('/public/userReg.html');
};

const userRegistration = async (req, res) => {
    const { username, email, phone, password } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            email,
            phone,
            password: hashedPassword
        });

        await user.save();
        console.log("User Record Inserted Successfully");
        return res.redirect('/public/success.html');
    } catch (error) {
        console.error(error);
        return res.status(400).redirect('/public/userReg.html');
    }
};

// User login
const userLog = (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('/public/03_user_login.html');
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.send('<script>alert("User not found. Please check your credentials."); window.location.href="/public/03_user_login.html";</script>');
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Invalid password");
            return res.status(404).redirect('/public/03_user_login.html');
        }

        console.log("User Login Successful");
        return res.status(201).redirect('/public/05_user_profile.html');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

// View users
const viewUsers = async (req, res) => {
    try {
        const users = await User.find({});
        const htmlContent = generateUsersHTML(users);
        res.status(200).send(htmlContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};

function generateUsersHTML(users) {
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>User List</title>
        </head>
        <body>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>`;

    users.forEach(user => {
        html += `
            <tr>
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
            </tr>`;
    });

    html += `
                </tbody>
            </table>
        </body>
        </html>`;

    return html;
}


module.exports = {
    userReg,
    userRegistration,
    userLog,
    userLogin,
    viewUsers
};
