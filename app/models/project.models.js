const mongoose = require('mongoose')
module.exports = () => {
    var schema = mongoose.Schema(
        {
            project_name: String,
            project_description: String,
            company_name: String,
            // image: [
            //     {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: "Image"
            //     }
            // ],
            // tech_stack: [
            //     {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: "TechStack"
            //     }
            // ],
            // category: [
            //     {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: "Category"
            //     }
            // ]
        }
    );
    schema.method('toJson', () => {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Project = mongoose.model("project", schema)
    return Project
}