const express = require("express");
const mysqldb = require('../config/mysqldb');

//need to add auth and validation

const router = express.Router();

router.post('/', async(req, res, next) => {
    const response = {};

    const result = {
        fname: req.body.fname,
        lname: req.body.lname,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        taddress: req.body.taddress,
        paddress: req.body.paddress,
        plan: "D",
        amount: 0.0,
        user_status: 'ACTIVE'
    };

    const columns = Object.keys(result).join(',');

    if (Object.keys(result).length === 9) {
        const values = Object.values(result).map(val => (typeof val === 'string' ? `'${val}'` : val)).join(', ');
        const table = "ss_userdetails";
        const insertSql = `INSERT INTO ${table} (${columns}) VALUES (${values});`;

        try {

            await mysqldb.insertOne(insertSql);
            response["status"] = "success";
            res.status(200).json(response);
        } catch (error) {
            console.error('Database error:', error);
            response["status"] = "fail";
            response["message"] = "Invalid user data";
            res.status(500).json(response);
        }

    } else {
        response["status"] = "fail";
        response["message"] = "Invalid user data";
        res.status(401).json(response);
    }
});

module.exports = router;