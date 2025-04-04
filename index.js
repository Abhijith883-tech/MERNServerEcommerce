

// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const router = require("./routes/router")
// require('./database/dbConnection')

// const pfServer = express()

// pfServer.use(cors())
// pfServer.use(express.json()) 
// pfServer.use(router)


// const PORT = 3000 || process.env.PORT

// pfServer.listen(PORT, () => {
//     console.log(`Myyyy pfServer is running in port: ${PORT} and waiting for client request!!!`)
// })

// pfServer.get('/', (req, res) => {
//     res.status(200).send(`<h1 style="color:indigo;">Mmmmmmmmmmmmmmmmyy pfSerover iiiiiiiiiiiiiis running in port:${PORT} and waiting for client request!!!</h1>`)
// })

// pfServer.post('/',(req,res)=>{
//     res.status(200).send("POST REQUESTTTTT")
// })


// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const router = require("./routes/router");
// // const paymentRoutes = require("./controllers/paymentController"); // ✅ Import payment routes
// require("./database/dbConnection");

// const pfServer = express();

// pfServer.use(cors());
// pfServer.use(express.json());
// pfServer.use(router);
// // pfServer.use("/api", paymentRoutes); // ✅ Register payment routes

// const PORT = process.env.PORT || 3000;

// pfServer.listen(PORT, () => {
//   console.log(`Myyyy pfServer is running in port: ${PORT} and waiting for client request!!!`);
// });

// app.get("/success", (req, res) => {
//   res.send("Payment successful! Thank you for your purchase.");
// });


// pfServer.get("/", (req, res) => {
//   res.status(200).send(
//     `<h1 style="color:indigo;">Mmmmmmmmmmmmmmmmyy pfSerover iiiiiiiiiiiiiis running in port:${PORT} and waiting for client request!!!</h1>`
//   );
// });

// pfServer.post("/", (req, res) => {
//   res.status(200).send("POST REQUESTTTTT");
// });


// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const router = require("./routes/router");
// // Uncomment this if you have payment routes
// // const paymentRoutes = require("./controllers/paymentController"); 
// require("./database/dbConnection");

// const pfServer = express();

// pfServer.use(cors());
// pfServer.use(express.json());
// pfServer.use(router);
// // Uncomment if you have payment routes
// // pfServer.use("/api", paymentRoutes); 

// const PORT = process.env.PORT || 3000;

// pfServer.listen(PORT, () => {
//   console.log(`Myyyy pfServer is running in port: ${PORT} and waiting for client request!!!`);
// });

// // Fix this line (use pfServer instead of app)
// pfServer.get("/success", (req, res) => {
//   res.send("Payment successful! Thank you for your purchase.");
// });

// pfServer.get("/", (req, res) => {
//   res.status(200).send(
//     `<h1 style="color:indigo;">Mmmmmmmmmmmmmmmmyy pfServer iiiiiiiiiiiiiis running in port:${PORT} and waiting for client request!!!</h1>`
//   );
// });

// pfServer.post("/", (req, res) => {
//   res.status(200).send("POST REQUESTTTTT");
// });


// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const router = require("./routes/router");
// // Uncomment this if you have payment routes
// // const paymentRoutes = require("./controllers/paymentController"); 
// require("./database/dbConnection");

// const pfServer = express();

// pfServer.use(cors());
// pfServer.use(express.json());
// pfServer.use(router);
// // Uncomment if you have payment routes
// // pfServer.use("/api", paymentRoutes); 

// const PORT = process.env.PORT || 3000;

// pfServer.listen(PORT, () => {
//   console.log(`Myyyy pfServer is running in port: ${PORT} and waiting for client request!!!`);
// });

// // ✅ FIXED: Use `pfServer` instead of `app`
// // pfServer.get("/success", (req, res) => {
// //   res.send("Payment successful! Thank you for your purchase.");
// // });

// // pfServer.get("/success", (req, res) => {
// //   res.send(`<script>
// //               alert('Payment successful!');
// //               window.location.href = 'http://localhost:5173/cart';
// //             </script>`);
// // });

// // pfServer.get("/success", (req, res) => {
// //   res.send(`
// //     <script>
// //       alert('Payment successful!');
// //       window.location.href = 'http://localhost:5173/cart';
// //     </script>
// //   `);
// // });



// // ✅ Your root endpoint
// pfServer.get("/", (req, res) => {
//   res.status(200).send(
//     `<h1 style="color:indigo;">Mmmmmmmmmmmmmmmmyy pfServer iiiiiiiiiiiiiis running in port:${PORT} and waiting for client request!!!</h1>`
//   );
// });

// pfServer.post("/", (req, res) => {
//   res.status(200).send("POST REQUESTTTTT");
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
// const paymentRoutes = require("./controllers/paymentController");
require("./database/dbConnection");

const pfServer = express();

// ✅ CORS configuration for Vercel frontend


pfServer.use(cors({
  origin: ["https://mern-iota-ecru.vercel.app", "http://localhost:5173"], // Add your Vercel frontend URL here
  credentials: true, // Required if you're using cookies or sessions
}));


pfServer.use(express.json());
pfServer.use(router);
// pfServer.use("/api", paymentRoutes);

const PORT = process.env.PORT || 3000;

pfServer.listen(PORT, () => {
  console.log(`Myyyy pfServer is running in port: ${PORT} and waiting for client request!!!`);
});

pfServer.get("/", (req, res) => {
  res.status(200).send(
    `<h1 style="color:indigo;">Mmmmmmmmmmmmmmmmyy pfServer iiiiiiiiiiiiiis running in port:${PORT} and waiting for client request!!!</h1>`
  );
});

pfServer.post("/", (req, res) => {
  res.status(200).send("POST REQUESTTTTT");
});
