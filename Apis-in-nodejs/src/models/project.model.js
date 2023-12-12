var dbConn = require('./../../config/db.config');

//Employee object create
var Project = function (project) {
//     this.employee_id = project.employee_id;
    this.Code = project.Code;
    this.Name = project.Name;
    this.Address = project.Address;
    this.Country = project.Country;
    this.State = project.State;
    this.City = project.City;
    this.Pincode = project.Pincode;
    this.MobileNo = project.MobileNo;
    this.Email = project.Email;
    this.GSTNo = project.GSTNo;
    this.PANNo = project.PANNo;
    this.Latitude = project.Latitude;
    this.Longitude = project.Longitude;
    this.Currency = project.Currency;
    this.created_at = new Date();
    this.modified_at = new Date();
};


Project.create = function (newProject, repository, result) {
    let repositoryValues = [];


    for (let i = 0; i < repository.length; i++) {
        repositoryValues.push([
           newProject.Code,
            repository[i].Name,
            repository[i].MobileNo,
            repository[i].Email1,
            repository[i].Department,
            repository[i].Designation,
          
        ])
    }

    console.log(repositoryValues);

    dbConn.query("INSERT INTO emp_data set ?", newProject,
        function (err, res) {
            if (err)
                throw err;
            console.log("Project of records inserted: " + res.affectedRows);

            dbConn.query("INSERT INTO emp_contact(Code,Name,MobileNo,Email1,Department,Designation) VALUES ?", [repositoryValues],
                function (err, res) {
                    if (err) throw err;
                    console.log("repository of records inserted: " + res.affectedRows);

                });
            result(null, res.insertId);
        });

};



Project.delete = function (Code, result) {

    dbConn.query("DELETE FROM emp_data WHERE Code = ?", [Code],
        function (err, res) {
            if (err)
                throw err;

            dbConn.query("DELETE FROM emp_contact WHERE Code = ?", [Code],
                function (err, res) {
                    if (err) throw err;
                    console.log("repository of records deleted: " + res.affectedRows);

                });

            result(null, res);
        });

};



// Project.update = function (id, project, result) {
//     dbConn.query
//         ("UPDATE projects SET project_name=?,project_owner=?,project_owner_email=?,status=?,client_name=?,client_poc1=?,client_poc2=?, cliente_email_id=? WHERE id= ?",
//             [project.project_name, project.project_owner, project.project_owner_email, project.status, project.client_name, project.client_poc1, project.client_poc2, project.cliente_email_id,id],
//             function (err, res) {
//                 if (err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 } else {
//                     result(null, res);
//                 }
//             });
// };



Project.update = function (Code, project, repository, result) {
    let repositoryValues = [];

    for (let i = 0; i < repository.length; i++) {
        repositoryValues.push([
            // newProject.employee_id,
            repository[i].Name,
            repository[i].MobileNo,
            repository[i].Email1,
            repository[i].Department,
            repository[i].Designation,
        ])
    }

    dbConn.query("UPDATE emp_data SET Code=?,Name=?, Address=?,Country=?,State=?,City=?,Pincode=?,MobileNo=?, Email=?,GSTNo=?,PANNo=?,Latitude=?, Longitude=?,Currency=?  WHERE Code= ?", [project.Code, project.Name, project.Address, project.Country, project.State, project.City, project.Pincode, project.MobileNo,project.Email, project.GSTNo,project.PANNo, project.Latitude,project.Longitude, project.Currency, Code],
        function (err, res) {
            if (err)
                throw err;
            console.log("project of records updated: " + res.affectedRows);

            for (let i = 0; i < repository.length; i++) {
                dbConn.query("UPDATE emp_contact SET Name=?, MobileNo=?, Email1=?, Department=?, Designation=? where Code=?", [repository[i].Name, repository[i].MobileNo, repository[i].Email,repository[i].Department, repository[i].Designation, Code],
                    function (err, res) {
                        if (err) throw err;
                        console.log("repository of records inserted: " + res.affectedRows);
                    });
            }

            // console.log("check")
            result(null, res.insertId);
        });

};


Project.findAll = function (result) {
    dbConn.query("Select * from emp_data", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('project : ', res);
            result(null, res);
        }
    });
};




Project.findById = function (Code, result) {
    var sql = `call hrms.hrms_sp_get_test_details(?);`;
    dbConn.query(sql, Code, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0][0]);
      }
    });
  };


// Project.findAll = function (result) {
//     dbConn.query("Select * from projects",
//         function (err, res) {
//             if (err)
//                 throw err;
//             dbConn.query("Select * from repository",
//                 function (err, res) {
//                     if (err) throw err;
//                     // console.log("repository of records deleted: " + res.affectedRows);
//                 });
//             result(null, res);
//         });
// };


module.exports = Project;
