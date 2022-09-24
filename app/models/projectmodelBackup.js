const mongoose = require('mongoose')
const ProjectBackup = mongoose.model(
    "Project",
    new mongoose.Schema({
        project_name: String,
        project_detail: String,
        company_name: String,
        duration_development: String,
        tech_stack: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "TechStack"
            }
        ],
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            }
        ]

    }).method("toJson", () => {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id;
        return object
    })
)



module.exports = ProjectBackup