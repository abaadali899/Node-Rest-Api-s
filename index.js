const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middle ware
app.use(express.urlencoded({extended:false}))


//to get data in htm document
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html);
});

// Routes API

app.get("/api/users", (req, res) => {
    return res.json(users);
});

/// Now we willl get user data dynamically
app
.route("/api/users/:id")
.get((req,res)=>{
const id=Number(req.params.id);
const user=users.find((user)=>user.id===id );
return res.json(user);
})
.patch((req,res)=>{
    //Edit user by id
    return res.json({status:pending})
})
.delete((req,res)=>{
    // Delete user by id
    return res.json({status:pending})
})
app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOKE_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"sucess", id:users.length})

    })
})
// app.post("/api/users",(req,res)=>{
//     //todo : create new user
//     return res.json({status:"pending"})
// })
 
// app.patch("/api/users/:id",(req,res)=>{
//     //todo : Edit user  by id
//     return res.json({status:"pending"})
// })

// app.delete("/api/users/:id",(req,res)=>{
//     //todo : Delete user  by id
//     return res.json({status:"pending"})
// })
 
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
