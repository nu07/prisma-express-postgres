const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
dotenv.config();
const PORT = process.env.PORT || 3033;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.status(200).send("masok");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  const count = await prisma.product.count();
  try{
      res.status(200).send({
          data: products,
          count: count,
        });
    }catch(err){
        console.error(err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

app.post("/products", async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
      },
    });

    res.status(200).send({
      message: "Data Berhasil DiTambahkan.",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Gagal di post",
      err,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  const ProductId = req.params.id;

  try {
    const deleteProductsById = await prisma.product.delete({
      where: {
        id: ProductId,
      },
    });

    res.status(200).send({
      message: "Berhasil Melakukan Delete",
      data: deleteProductsById,
    });
  } catch (err) {
    console.error(err);
    res.send({
      message: `gagal melakukan delete id: ${ProductId}`,
      err,
    });
  }
});

app.put('/products/:id', async (req,res)=>{
    const productId = req.params.id
    try{
        const product = await prisma.product.update({
            where: {
                id: productId,
        },
        data : {
            name : req.body.name,
            price : req.body.price,
            description : req.body.description,
            image : req.body.image
        }
    })
    res.status(200).send({
        message: "Data Berhasil DiUbah",
        data: product
    })
} catch(err){
    console.error(e)
    res.status(500).send({
        message: "Gagal Edit Data",
        err
    })
}
})

app.listen(PORT, () => {
  console.log("express run at port: ", PORT);
});
