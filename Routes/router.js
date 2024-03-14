const express = require("express");
const router = express.Router();
const conn = require("../db/conn");

// Add a new contact
router.post("/create", (req, res) => {
    const { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(422).json({ error: "Please fill all required fields (First Name, Last Name, Email)." });
    }

    try {
        conn.query("SELECT * FROM contacts WHERE email = ?", email, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error." });
            }
            if (result.length > 0) {
                return res.status(409).json({ error: "Contact with this email already exists." });
            }
            conn.query("INSERT INTO contacts SET ?", { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address }, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Internal server error." });
                }
                return res.status(201).json({ message: "Contact added successfully." });
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

// Get all contacts
router.get("/getContacts", (req, res) => {
    conn.query("SELECT * FROM contacts", (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error." });
        }
        return res.status(200).json(result);
    });
});

// Delete a contact by ID
router.delete("/deleteContact/:id", (req, res) => {
    const { id } = req.params;
    conn.query("DELETE FROM contacts WHERE id = ?", id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error." });
        }
        return res.status(200).json({ message: "Contact deleted successfully." });
    });
});

// Get a single contact by ID
router.get("/getContact/:id", (req, res) => {
    const { id } = req.params;
    conn.query("SELECT * FROM contacts WHERE id = ?", id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error." });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Contact not found." });
        }
        return res.status(200).json(result[0]);
    });
});

// Update a contact by ID
router.put("/updateContact/:id", (req, res) => {
    const { id } = req.params;
    const { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address } = req.body;
    const updatedContact = { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address };

    conn.query("UPDATE contacts SET ? WHERE id = ?", [updatedContact, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error." });
        }
        return res.status(200).json({ message: "Contact updated successfully." });
    });
});

module.exports = router;
