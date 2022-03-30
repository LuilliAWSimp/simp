let controller = {};

let format = {
    "success" : null,
    "code" : null,
    "message" : null,
    "data" : []
}

controller.getRentas = (req, res)=>{
    const sql = "SELECT * FROM rentas";
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
controller.getRenta = (req, res)=>{

    let id = req.body.id;
    const sql = "SELECT * FROM rentas WHERE id = ?";
    req.getConnection((error, conn)=>{
        if(error){
            format.success = false;
            format.code = 500;
            format.message = error.sqlMessage;
            res.status(500);
            res.json(format);
        } else{
            conn.query(sql,[id], (err, results)=>{
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
controller.getRentus = (req, res)=>{
    
    const sql = "SELECT CAST(now() as DATE) AS fecha_rentas, re.fecha_entrega, cl.nombre, cl.apellido_paterno, au.marca, au.serie FROM rentas AS re JOIN clientes AS cl ON re.id_cliente = cl.id JOIN autos AS au ON re.id_auto = au.id WHERE id_cliente = ?";
    req.getConnection((error, conn)=>{
        if(error){
            format.success = false;
            format.code = 500;
            format.message = error.sqlMessage;
            res.status(500);
            res.json(format);
        } else{
            conn.query(sql,[req.query.id_cliente], (err, results)=>{
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
controller.postRenta = (req, res)=>{
    if((req.body.fecha_renta == null || req.body.fecha_renta == "")&&(req.body.fecha_entrega == null || req.body.fecha_entrega == "")){
        format.success = false;
        format.code = 400;
        format.message = "Te falta la fecha de renta y fecha de entrega";
        res.status(400);
        res.json(format);
      }
    else if (req.body.fecha_renta == null || req.body.fecha_renta == "") {
        format.success = false;
        format.code = 400;
        format.message = "Te falta la fecha de renta";
        res.status(400);
        res.json(format);
      }else if(req.body.fecha_entrega == null || req.body.fecha_entrega == ""){
        format.success = false;
        format.code = 400;
        format.message = "Te falta la fecha de entrega";
        res.status(400);
        res.json(format);
      }else {
    const sql = "INSERT INTO rentas SET ?";
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
controller.putRenta = (req, res)=>{
    const sql = "UPDATE rentas SET ? WHERE id = ?";
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
controller.deleteRenta = (req, res)=>{
    const sql = "DELETE FROM rentas WHERE id = ?";
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