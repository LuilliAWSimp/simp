let controller = {};

let format = {
  code: null,
  data: [],
  success: null,
  message: null,
};

controller.getAuto = (req, res) => {
    let id = req.query.id;
    const sql = "SELECT * FROM autos WHERE id = ?";
    req.getConnection((error, conn) => {
      if (error) {
        format.success = false;
        format.code = 500;
        format.message = arr.sqlMessage;
        format.data = err;
        res.status(500);
        res.json(format);
      } else {
        conn.query(sql, [id], (err, results) => {
          if (err) {
            format.success = false;
            format.code = 400;
            format.message = arr.sqlMessage;
            format.data = err;
            res.status(400);
            res.json(format);
          } else {
            format.success = true;
            format.code = 200;
            format.message = "Correct";
            format.data = results;
            res.status(200);
            res.json(format);
          }
        });
      }
    });
};
controller.getAutos = (req, res) => {
    const sql = "SELECT * FROM autos";
    req.getConnection((error, conn) => {
      if (error) {
        format.success = false;
        format.code = 500;
        format.message = arr.sqlMessage;
        format.data = err;
        res.status(500);
        res.json(format);
      } else {
        conn.query(sql,(err, results) => {
          if (err) {
            format.success = false;
            format.code = 400;
            format.message = arr.sqlMessage;
            format.data = err;
            res.status(400);
            res.json(format);
          } else {
            format.success = true;
            format.code = 200;
            format.message = "Correct";
            format.data = results;
            res.status(200);
            res.json(format);
          }
        });
      }
    });
};
controller.postAutos = (req, res) => {
  if((req.body.serie == null || req.body.serie == "")&&(req.body.marca == null || req.body.marca == "")){
    format.success = false;
    format.code = 400;
    format.message = "Te falta la marca y la serie del auto";
    res.status(400);
    res.json(format);
  }
  else if (req.body.serie == null || req.body.serie == "") {
    format.success = false;
    format.code = 400;
    format.message = "Te falta la serie del auto";
    res.status(400);
    res.json(format);
  } else if(req.body.marca == null || req.body.marca == ""){
    format.success = false;
    format.code = 400;
    format.message = "Te falta la marca del auto";
    res.status(400);
    res.json(format);
  }else {
    const sql =
      "INSERT INTO autos SET ?";
    req.getConnection((error, conn) => {
      if (error) {
        format.success = false;
        format.code = 500;
        format.message = error.sqlMessage;
        res.status(500);
        res.json(format);
      } else {
        conn.query(
          sql,[req.body],
          (err, results) => {
            if (err) {
              format.success = false;
              format.code = 400;
              format.message = err.sqlMessage;
              format.data = err;
              res.status(400);
              res.send(format);
            } else {
              format.success = true;
              format.code = 201;
              format.message = "El auto se agregó correctamente";
              format.data = results;
              res.status(201);
              res.json(format);
            }
          }
        );
      }
    });
  }  
};
controller.PutAutos = (req, res) => {
  const sql = "Update autos SET ? WHERE id = ?";
  req.getConnection((error, conn) => {
    if (error) {
      format.success = false;
      format.code = 500;
      format.message = error.sqlMessage;
      res.status(500);
      res.json(format);
    } else {
      conn.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) {
          format.success = false;
          format.code = 400;
          format.message = err.sqlMessage;
          format.data = err;
          res.status(400);
          res.send(format);
        } else {
          format.success = true;
          format.code = 201;
          format.message = "Correct";
          format.data = results;
          res.status(201);
          res.json(format);
        }
      });
    }
  });  
};
controller.deleteAutos = (req, res) => {
    
  const sql = "DELETE FROM autos WHERE id = ?";
  req.getConnection((error, conn) => {
    if (error) {
      format.success = false;
      format.code = 500;
      format.message = error.sqlMessage;
      res.status(500);
      res.json(format);
    } else {
      conn.query(sql, [req.body.id], (err, results) => {
        if (err) {
          format.success = false;
          format.code = 400;
          format.message = err.sqlMessage;
          format.data = err;
          res.status(400);
          res.send(format);
        } else {
          format.success = true;
          format.code = 204;
          format.message = "El auto se eliminó correctamente";
          format.data = results;
          res.status(204);
          res.json(format);
        }
      });
    }
  })  
};
module.exports = controller;