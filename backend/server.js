const express=require('express');
const cors=require("cors");
const mysql=require("mysql2");


const app=express()
app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"crud"
})


app.get('/',(req,res)=>{
    const sql="SELECT * FROM students";
    console.log("inside the sql query")
    db.query(sql,(err,data)=>{
        if(err) {
            //console.log("error testing condition");
            return res.json("Error");
        }
        //console.log("out of if cond");
        return res.json(data);
    })
   // res.json("hello from backend");
})

app.post('/create',(req,res)=>{
    
    const sql="INSERT INTO students(Name,Email) VALUES (?)";
    //const sql="insert into students(Name,Email) values ('cust_new1','cust_new1@gmail.com')";
    const values =[
        req.body.name,
        req.body.email
    ]
    console.log(req.body.name);
    console.log(req.body.email);
    //db.query(sql,values)
    db.query(sql,[values],(err,data)=>{
        if(err) {
            console.log("error in sql 12......");
            //console.log("mysql error is");
            return res.json("error");
        }
        //console.log("Number of records inserted: " + data.affectedRows);
        return res.json(data);
    })
})

app.put('/update/:id',(req,res)=>{
    const sql="update students set Name=?,Email=? Where ID=?";
    const values=[
        req.body.name,
        req.body.email
    ]
    const id=req.params.id;
    db.query(sql,[...values,id],(err,data)=>{
        if(err){
            console.log("error in put");
            return res.json("Error");
        }
        return res.json(data);
    })
});

app.delete('/students/:id',(req,res)=>{
    const sql="DELETE FROM students WHERE ID=?";
    const id=req.params.id;

    db.query(sql,[id],(err,data)=>{
        if(err){ 
            console.log("error inside th delete query");
            return res.json("Error")
    };
        return res.json(data);
    })

})

app.listen(8081,()=>{
    console.log("working");
});