require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const port = process.env.PORT || 5000
// middleware
const corsOptions = {
  origin: ['http://localhost:5173',
    'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qiowubl.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



const userCollection = client.db('houseFinderDB').collection('user')
const houseCollection = client.db('houseFinderDB').collection('house')
const bookingCollection = client.db('houseFinderDB').collection('bookings')


const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token
  console.log(" checking token", token)
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.user = decoded
    next()
  })
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    app.post('/access-token', async (req, res) => {
      try {
        const user = req.body
        // console.log('user from post /access-token', user);
        const token = jwt.sign(user, process.env.SECRET, { expiresIn: 360000000 })
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        }).send({ success: true })
      } catch (error) {
        console.log('getting error from post /access-token', error);
      }
    })




    app.put('/new-user', async (req, res) => {
      const user = req.body
      const email = user.userEmail;
      const query = {
        userEmail: email
      }
      console.log('checking if email finding', user);
      const isExist = await userCollection.findOne(query)

      console.log('User found?----->', isExist)
      if (isExist) {
        res.send({ message: 'User Already Exits' })

      }
      else {


        const result = await userCollection.insertOne(
          user
        )
        res.send(result)
      }

    })

    app.get('/all-house', async (req, res) => {
      const result = await houseCollection.find().toArray()
      res.send(result)
    })

    app.get('/single-house/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await houseCollection.findOne(query)
      res.send(result)
    })

    app.post('/add-house', async (req, res) => {
      try {
        const addHouse = req.body;
        const result = await houseCollection.insertOne(addHouse)
        res.send(result)
      } catch (error) {
        console.log('/add-house error', addHouse);
      }
    })

    app.delete('/delete-house/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await houseCollection.deleteOne(query)
      res.send(result)

    })



    app.delete('/delete-booking/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await bookingCollection.deleteOne(query)
      console.log(result);
      res.send(result)

    })


    app.put('/update-house/:id', async (req, res) => {
      const id = req.params.id
      const body = req.body;
      const query = { _id: new ObjectId(id) }

      const updateHouse = {
        $set: {
          ...body
        }
      }
      const option = { upsert: true }
      const result = await houseCollection.updateOne(query, updateHouse, option)
      // console.log(result);
      res.send(result)
    })



    app.get('/all-bookings', async (req, res) => {
      const result = await bookingCollection.find().toArray()
      res.send(result)
    })

    app.post('/booking-house', async (req, res) => {
      const body = req.body;
      const result = await bookingCollection.insertOne(body)
      res.send(result)
    })







    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('home finder server..')
})

app.listen(port, () => {
  console.log(`Home finder is running on port ${port}`)
})