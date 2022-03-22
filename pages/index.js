import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Istanbul_asv2020-02_img47_Galata_Tower.jpg/600px-Istanbul_asv2020-02_img47_Galata_Tower.jpg",
    address: "Galata Tower, Galata, Istanbul, Turkey",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Istanbul_asv2020-02_img47_Galata_Tower.jpg/600px-Istanbul_asv2020-02_img47_Galata_Tower.jpg",
    address: "Galata Tower, Galata, Istanbul, Turkey",
    description: "This is a second meetup",
  },
];

const HompePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};
// Static Site Generation (SSG)
// bu yerleşik bir fonksiyon. Önce bu çalışır, gerekli datalar ayarlanır ve static bir sayfa oluşur.
// context parametresi params erişilebilir.
export const getStaticProps = async () => {
  // fetch data example fetch DUMMY_MEETUPS
  return {
    props: { // Componente giden props
      meetups: DUMMY_MEETUPS
    },
    //revalidate: 5 // Eğer sonradan yenilenmesi gereken datalar varsa her x saniyede bir işlem yapar.
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
