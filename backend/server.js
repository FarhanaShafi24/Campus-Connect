require("dotenv").config();

const express = require("express");
const cors=require("cors");
const mongoose = require("mongoose");
const app = express();
const dns = require("dns");
app.use(cors());
app.use(express.json());
dns.setServers(['8.8.8.8']);
const Event = require("./models/Event");

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB Connected Successfully");
}).catch((error)=>{
console.log("MongoDB connection Error" , error);
});

app.get("/",(req,res)=>{
    res.send("Backend is working!");
})

app.get("/api/events", async (req,res)=>{
    const events = await Event.find();
    res.json(events);
})

app.delete("/api/events/:id", async (req,res)=>{
    const deleteEvent = await Event.findByIdAndDelete(
        req.params.id
    )
    if(!deleteEvent){
        return res.status(101).json({
            message:"Event not Found"
        });
    }
    
    res.json({
        message:"Event Deleted Successfully"
    })
})
    app.post("/api/events", async (req,res)=>{
       const newEvent = await Event.create(req.body);
        res.json({
            message:"Event Added Successfully",
            event:newEvent
        });
    });
    app.put("/api/events/:id", async (req,res)=>{
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        )
        if (!updatedEvent){
            return res.status(101).json({
                message:"Event not Found"
            });
        }

        res.json({
            message:"Event Updated Successfully",
            event:updatedEvent
        });
    });


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
}) //alwyas in the last