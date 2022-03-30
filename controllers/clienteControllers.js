let controller = {};
let format = require("../format").format;
const jwt = require("jsonwebtoken");
const db = require("../database").config;

controller.getLogin = (req, res) => {
  const clientes = {
    id: req.body.id,
    time: new Date().getTime(),
  };
  const token = jwt.sign({ clientes }, db.secret_key, { expiresIn: "10m" });
  res.status(200);
  format.success = true;
  format.code = 200;
  format.message = "token";
  format.data = token;
  res.json(format);
};

controller.getClientes = (req, res)=>{
    const sql = "SELECT * FROM clientes";
    req.getConnection((error, conn)=>{
        if(error){
            format.success = false;
            format.code = 500;
            format.message = error.sqlMessage;
            res.status(500);
            res.json(format);
        } else{
            conn.query(sql, (err, results)=>{
                if(err){
                    format.success = false;
                    format.code = 400;
                    format.message = "Error";
                    res.status(400);
                    res.json(format);
                }else{
                    format.success = true;
                    format.code = 200;
                    format.message = "Correcto";
                    format.data = results;
                    res.status(200);
                    res.json(format);
                }
            });
        }
    });
};
controller.getCliente = (req, res)=>{

    let id = req.query.id;
    const sql = "SELECT * FROM clientes WHERE id = ?";
    req.getConnection((error, conn)=>{
        if(error){
            format.success = false;
            format.code = 500;
            format.message = error.sqlMessage;
            res.status(500);
            res.json(format);
        } else{
            conn.query(sql, [id], (err, results)=>{
                if(err){
                    format.success = false;
                    format.code = 400;
                    format.message = "Error";
                    res.status(400);
                    res.json(format);
                }else{
                    format.success = true;
                    format.code = 200;
                    format.message = "Correcto";
                    format.data = results;
                    res.status(200);
                    res.json(format);
                }
            });
        }
    });
};
controller.postCliente = (req, res)=>{
    if((req.body.nombre == null || req.body.nombre == "")&&(req.body.apellido_paterno == null || req.body.apellido_paterno == "")){
        format.success = false;
        format.code = 400;
        format.message = "Te falta el nombre y apellido paterno";
        res.status(400);
        res.json(format);
      }
    else if (req.body.nombre == null || req.body.nombre == "") {
        format.success = false;
        format.code = 400;
        format.message = "Te falta el nombre";
        res.status(400);
        res.json(format);
      }else if(req.body.apellido_paterno == null || req.body.apellido_paterno == ""){
        format.success = false;
        format.code = 400;
        format.message = "Te falta el apellido paterno";
        res.status(400);
        res.json(format);
      }else {
    const sql = "INSERT INTO clientes SET ?";
    req.getConnection((error, conn)=>{
        if(error){
            format.success = false;
            format.code = 500;
            format.message = error.sqlMessage;
            res.status(500);
            res.json(format);
        } else{
            conn.query(sql, [req.body], (err, results)=>{
                if(err){
                    format.success = false;
                    format.code = 400;
                    format.message = "Error";
                    res.status(400);
                    res.json(format);
                }else{
                    format.success = true;
                    format.code = 201;
                    format.message = "Agregado Correctamente";
                    format.data = results;
                    res.status(201);
                    res.json(format);
                }
            });
        }
    });
}
};
controller.putCliente = (req, res)=>{
    const sql = "UPDATE clientes SET ? WHERE id = ?";
    req.getConnection((error, conn) =>{
        if(error){
            format.success = false;
            format.code = 500;
            format.message = error.sqlMessage;
            res.status(500);
            res.json(format);
        }else{
            conn.query(sql, [req.body, req.body.id], (err, results)=>{
                if(err){
                    format.success = false;
                    format.code = 400;
                    format.message = "Error";
                    res.status(400);
                    res.json(format);
                }else{
                    format.success = true;
                    format.code = 201;
                    format.message = "Actualizado Correctamente";
                    format.data = results;
                    res.status(201);
                    res.json(format);
                }
          });
        }
    });
};
controller.deleteCliente = (req, res)=>{
    const sql = "DELETE FROM clientes WHERE id = ?";
    req.getConnection((error, conn) =>{
        if(error){
            format.success = false;
            format.code = 500;
            format.message = error.sqlMessage;
            res.status(500);
            res.json(format);
        }else{
            conn.query(sql, [req.body.id], (err, results)=>{
                if(err){
                    format.success = false;
                    format.code = 400;
                    format.message = "Error";
                    res.status(400);
                    res.json(format);
                }else{
                    format.success = true;
                    format.code = 204;
                    format.message = "Eliminado Correctamente";
                    res.status(204);
                    res.json(format);
                }
            });
        }
    });
};
module.exports = controller;