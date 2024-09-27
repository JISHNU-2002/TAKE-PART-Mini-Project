const bcrypt = require('bcrypt')
const Admin = require('../Models/adminModel')

// admin registration
const adminReg = (req, res) => {
    res.set({
        'Allow-access-Allow-Origin' : '*'
    })
    return res.redirect('public/adminReg.html')
}

const adminRegistration = async(req, res) => {
    const {username, email, phone, password} = req.body

    try{
        const hashPassword = await bcrypt.hash(password, 10)
        const admin = new Admin({
            username,
            email,
            phone,
            password : hashPassword
        })

        await admin.save()
        console.log('Admin Record Inserted Successfully - Collection(admin)')
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

//admin login
const adminLog = (re, res)=>{
    res.set({
        'Allow-access-Allow-Origin' : '*'
    })
    return res.redirect('/public/adminLog.html')
}

const adminLogin = async(req, res)=>{
    const {username, password} = req.body

    try{
        const admin = await Admin.findOne({username})
        if(!admin){
            console.log('Admin not found')
            return res.status(404).redirect('/public/adminLog.html')
        }

        const match = await bcrypt.compare(password, admin.password)
        if(!match){
            console.log('Invalid Password')
            return res.status(404).redirect('/public/adminLog.html')
        }
        console.log('Admin Login Successful')
        return res.status(201).redirect('/public/success.html')
    }catch(error){
        console.error(error)
        return res.status(501).send('Internal Server Error')
    }
}

const viewUsers = async(req, res) => {
    try{
        const users = await User.find({})
        const htmlContent = generateUsersHTML(users)
        res.status(200).send(htmlContent)
    }catch(err){
        console.error(err)
        res.status(500).json({
            error : 'An internal server error occured'
        })
    }
}

function generateUsersHTML(users){
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
    adminReg,
    adminRegistration,
    adminLog,
    adminLogin,
    viewUsers
}