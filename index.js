const express=require("express");
const users=require("./MOCK_DATA.json")

const app=express();

app.use(express.urlencoded({extended:false}))

app.get("/api/users",(req,res)=>{
   res.send(users)
})

app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.filter(user=>{
        return user.id===id;
    });
    return res.json(user);
})

app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1 })
    return res.json(users)
})

app.delete("/api/users/:first_name",(req,res)=>{
    const name=req.params.first_name;
    const user=users.filter(user=>{
        return user.first_name!== name;
    });
    res.json(user);
})
app.patch("/api/users/:id",(req,res)=>{
    const userId = Number(req.params.id);
    const updateData = req.body;
    const userIndex = users.findIndex((user) => user.id === userId);
    users[userIndex] = { ...users[userIndex], ...updateData };
    res.json(users);
})
app.listen(3000,()=>{
    console.log("Listening to port 3000")
})