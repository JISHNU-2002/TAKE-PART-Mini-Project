const User = require('../Models/userModel')

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
        console.log('Admin record inserted successfully - collection(admin)')
        return res.redirect('public/success.html')
    }catch(error){
        console.error(error)
        return res.redirect('public/adminReg.html')
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
    viewUsers
}