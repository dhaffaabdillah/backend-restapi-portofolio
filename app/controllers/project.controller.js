const db = require('../models/index.models')
const Project = db.project

// created and save a project
exports.create = (req, res) => {
    const project_name = req.body.project_name;
    const project_detail = req.body.project_detail;
    const duration_development = req.body.duration_development;
    const company_name = req.body.company_name;
    if (!project_name) {
        return res.status(400).send({message: "Project name can't be empty"})
    }
    if (!project_detail) {
        return res.status(400).send({message: "Project detail can't be empty"})
    }
    if (!duration_development) {
        return res.status(400).send({message: "Duration development can't be empty"})
    }
    if (!company_name) {
        return res.status(400).send({message: "Company name can't be empty"})
    }

    const project = new Project({
        project_name: project_name,
        project_detail: project_detail,
        duration_development: duration_development,
        company_name: company_name ? company_name : ""
    });

    project
        .save(project)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send({ 
                message: err.message || "Something went wrong"
            })
        })
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    // Project.find(condition)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving tutorials."
    //     });
    //   });
};

exports.findOne = (req, res) => {
    var id  = req.params.id;
    Project.findByid(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "The project couldn't be find" + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Project with id="+id })
        })
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data cant be empty" })
    }
    const id = req.params.id
    Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data=> {
            if (!data) {
                res.status(404).send({ mesage: `Cant updated the porject with id ${id}` })
            } else {
                res.status(200).send({ message: "Project updated successfully" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error updated with id ${id}, with err: ${err}` })
        })
};

exports.delete = (req, res) => {
    const id = req.params.id
    Project.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Data cant be find" })
            } else {
                res.status(200).send({ message: "A project deleted successfully" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error delete ${id}, ${err}` })
        })
};

exports.deleteAll = (req, res) => {

};