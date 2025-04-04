// const jwt = require("jsonwebtoken")
// const { coneccion } = require("../config/conexion")
// const cn = coneccion()
// require("dotenv").config()
// const { promisify } = require('util');

// const query = promisify(cn.query).bind(cn);

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token
//     if (!token) return res.status(401).send({ succes: false, msg: "Authorizacion Denegada" })
//     jwt.verify(token, process.env.SECRECT_TOKEN, (err, user) => {
//         if (err) return res.status(400).send({ succes: false, msg: "Token no Valido" })
//         req.user = user
//     })
// }
// // const verifyTokenFrontendLogin2 = (req, res) => {
// //     const token = req.cookies.token
// //     if (!token) return res.status(401).send({ succes: false, msg: "Authorizacion Denegada" })

// //     jwt.verify(token, process.env.SECRECT_TOKEN, (err, user) => {
// //         if (err) return res.status(400).send({ succes: false, msg: "Token no Valido" })
// //         cn.query("SELECT * FROM ADMINISTRADOR WHERE idADMINISTRADOR =? ", user.id, (err, result) => {
// //             if (err) {
// //                 return res.status(400).send({ succes: false, err })
// //             } else {
// //                 if (result.length > 0) {
// //                     return res.status(200).send({ succes: true, result })
// //                 }
// //             }
// //         })
// //     })
// // }
// const verifyTokenFrontendLogin = (req, res) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).send({ success: false, msg: "Autorización Denegada" });
//     }

//     jwt.verify(token, process.env.SECRECT_TOKEN, async (err, user) => {
//         if (err) {
//             return res.status(400).send({ success: false, msg: "Token no válido" });
//         }
//         try {
//             // Primera consulta: ADMINISTRADOR
//             const [adminResult] = await query("SELECT * FROM ADMINISTRADOR WHERE idADMINISTRADOR = ?", [user.id]);
//             if (adminResult) {
//                 return res.status(200).send({ success: true, result: adminResult, ROL: "ADMINISTRADOR" });
//             }
//             // Segunda consulta: TECNICO (si no encontró administrador)
//             cn.query("SELECT * FROM TECNICO WHERE idTecnico = ?", [user.id], (err, tecnicoResult) => {
//                 if (err) {
//                     return res.status(400).send({ success: false, err });
//                 }
//                 if (tecnicoResult.length > 0) {
//                     return res.status(200).send({ success: true, result: tecnicoResult[0], ROL: "TECNICO" });
//                 }
//                 // Si no se encuentra en ninguna tabla
//                 return res.status(400).send({ success: false, msg: "Usuario no encontrado" });
//             });
//         } catch (error) {
//             return res.status(500).send({ success: false, msg: "Error en el servidor", error });
//         }
//     });
// };

// module.exports = {
//     verifyToken,
//     verifyTokenFrontendLogin,
// }