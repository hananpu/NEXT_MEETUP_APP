import MeetupDetail from "../../components/meetups/MeetupDetail";

const DetailPage = (props) => {
  return (
    <MeetupDetail
      id={props.id}
      image={props.image}
      title={props.title}
      address={props.address}
      description={props.description}
    />
  );
};

// sayfayı prerender yaparken elinde id olmadığı için hata alır.
// bu yüzden getStaticProps kullanırken getStaticPaths yardımı ile sayfaya sunulacak path bilgileri sunuyoruz.
export const getStaticPaths = async () => {
  return {
    // listede olayan paramslar için de çalışsın isteniyorsa true ayarlanır. Aksi halde 404 hatası döner.
    fallback: false,
    paths: [
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
    ],
  };
};

// context in paramsına erişip id yi alıyoruz
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  //dummy fetch
  const DUMMY_DETAIL = {
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Istanbul_asv2020-02_img47_Galata_Tower.jpg/600px-Istanbul_asv2020-02_img47_Galata_Tower.jpg",
    address: "Galata Tower, Galata, Istanbul, Turkey",
    description: "This is a first meetup",
  };

  return {
    props: {
      id: meetupId,
      image: DUMMY_DETAIL.image,
      title: DUMMY_DETAIL.title,
      address: DUMMY_DETAIL.address,
      description: DUMMY_DETAIL.description,
    },
  };
};


export default DetailPage;
