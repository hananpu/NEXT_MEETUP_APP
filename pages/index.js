import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HompePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="React meetups example just for fun" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};
// Static Site Generation (SSG)
// bu yerleşik bir fonksiyon. Önce bu çalışır, gerekli datalar ayarlanır ve static bir sayfa oluşur.
// context parametresi params erişilebilir.
export const getStaticProps = async () => {
  // DB Bağlantısını Api Routes olarak api klasörü yerine buradan da yapabiliriz.
  const client = await MongoClient.connect(
    "mongodb+srv://caner:0kPMZ52pufwuCsJr@cluster0.h3ezl.mongodb.net/meetupsApp?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  console.log(meetups); // id yi object olarak verdiğiiçin aşağıda mapledik
  client.close();
  return {
    props: {
      // Componente giden props
      meetups: meetups.map((meetup) => ({
        image: meetup.image,
        address: meetup.address,
        title: meetup.title,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1 // Eğer sonradan yenilenmesi gereken datalar varsa her x saniyede bir işlem yapar.
  };
};

// Server Side Rendering (SSR)
// bu yerleişk bir fonksiyon. Önce çalışır gerekli dataları ayarlar. Herhangi bir istek
// gelmesi durumda sayfayı tekrar çizer. context parametresi ile isteği ve cevabı alıp işlem yapabiliriz.
/* export const getServerSideProps = async (context) => {
    const req = context.req;
    const res = context.res;
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  };
}; */

export default HompePage;
