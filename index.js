const { UCS2_GENERAL_MYSQL500_CI } = require("mysql/lib/protocol/constants/charsets");

const express = require("express"),
app = express(),
puerto = process.env.PORT || 3000, 
bodyParser = require("body-parser"),
mysql = require("mysql"),
myConnection = require("express-myconnection");
db = require("./database").config;
clientesRoutes = require("./routes/clientes");
rentasRoutes = require("./routes/rentas");
autosRoutes = require("./routes/autos")

app.use(bodyParser.urlencoded({extended:true}));
app.use(myConnection(mysql, db));
app.use("/clientes", clientesRoutes);
app.use("/rentas", rentasRoutes);
app.use("/autos", autosRoutes);

app.listen(puerto,err => {
    if(err)
    {
        console.log(`Error en el puerto ${puerto}`);
    }
    else{
        console.log(`Todo funciona bien en el puerto ${puerto}`);
    }
});