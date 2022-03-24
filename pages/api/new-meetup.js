import {MongoClient} from "mongodb"

// API ROUTES
// HTML kodunu döndürmeyen, bunun yerine gelen http isteklerini kabul eder.
// yalnızca sunucuda çalışır. request ve response paramatreleri alır.
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // Mongo client a mongodaki application connect altındaki url ile bağlanıyoruz.
    const client = await MongoClient.connect("mongodb+srv://caner:0kPMZ52pufwuCsJr@cluster0.h3ezl.mongodb.net/meetupsApp?retryWrites=true&w=majority")
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    // client connectionı kapatıyoruz.
    client.close();

    res.status(201).json({message: "Meetup inserted"})
  }
};

export default handler;
