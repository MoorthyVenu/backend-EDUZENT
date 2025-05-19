import asyncHandler from "express-async-handler";
import Student from "../modals/studentModal.js";
import Broadcast from "../modals/broadcastModal.js";

const createBroadcast = asyncHandler(async (req, res) => {
    const {message, messageTopic, sender} = req.body;
    const instituteId = req.params.instituteId
    const broadcast = await Broadcast.create({
        instituteId, message, messageTopic, sender
    })
    if (broadcast) {
        res.status(201).json(broadcast)
    } else {
        res.status(400);
        throw new Error("Invalid user Data")
    }
})

const studentNotification = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.studentId);
    let broadcast
    if (student) {
        broadcast = await Broadcast.find({sender: {$in: student.subjects}});
    } else {
        res.status(404);
        throw new Error('Students not found')
    }
    if (student) {
        res.json(broadcast);
    } else {
        res.status(404);
        throw new Error('Student not found')
    }

})

export {createBroadcast, studentNotification}
