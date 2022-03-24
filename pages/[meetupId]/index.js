import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const DetailPage = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        id={props.id}
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </>
  );
};

// sayfayı prerender yaparken elinde id olmadığı için hata alır.
// bu yüzden getStaticProps kullanırken getStaticPaths yardımı ile sayfaya sunulacak path bilgileri sunuyoruz.
export const getStaticPaths = async () => {
  // DB Bağlantısını Api Routes olarak api klasörü yerine buradan da yapabiliriz.
  const client = await MongoClient.connect(
    "mongodb+srv://caner:0kPMZ52pufwuCsJr@cluster0.h3ezl.mongodb.net/meetupsApp?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // find içinde boş süslü hepsini getir, ikinci süslüde değeri 1 ise sadece onu 0 ise o hariç diğerlerini getir
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // listede olmayan paramslar için de çalışsın isteniyorsa true veya "blocking" ayarlanır. Aksi halde 404 hatası döner.
    // true öncesinde boş sayfa gösterir sonra dinamik oluşturulan sayfayı çizer.
    // 'blocking' sayfayı dinamik data ile çizdikten sonra gösterir.
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    /* paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ], */
  };
};

// context in paramsına erişip id yi alıyoruz
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  // DB Bağlantısını Api Routes olarak api klasörü yerine buradan da yapabiliriz.
  const client = await MongoClient.connect(
    "mongodb+srv://caner:0kPMZ52pufwuCsJr@cluster0.h3ezl.mongodb.net/meetupsApp?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // find içinde boş süslü hepsini getir, ikinci süslüde değeri 1 ise sadece onu 0 ise o hariç diğerlerini getir
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  //dummy fetch
  /* const DUMMY_DETAIL = {
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Istanbul_asv2020-02_img47_Galata_Tower.jpg/600px-Istanbul_asv2020-02_img47_Galata_Tower.jpg",
    address: "Galata Tower, Galata, Istanbul, Turkey",
    description: "This is a first meetup",
  }; */

  return {
    props: {
      id: selectedMeetup._id.toString(),
      image: selectedMeetup.image,
      title: selectedMeetup.title,
      address: selectedMeetup.address,
      description: selectedMeetup.description,
    },
  };
};

export default DetailPage;
