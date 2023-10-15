import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMYY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://media.istockphoto.com/id/1127500841/photo/beautiful-view-of-bahadurabad-chorangi-karachi-pakistan.jpg?s=612x612&w=0&k=20&c=HzRA0Vbqa1zTSL88RNnUgebJZaZwDb6tZfmkXWwu89M=",
//     address: "Some address 5, 12345 Karachi",
//     description: "A First Meetup in Karachi",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Royal_mosque_Lahore.jpg/1280px-Royal_mosque_Lahore.jpg",
//     address: "Some address 5, 12345 Lahore",
//     description: "A Second Meetup in Lahore",
//   },
//   {
//     id: "m3",
//     title: "A Third Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Faisal_Masjid_From_Damn_e_koh.jpg/1280px-Faisal_Masjid_From_Damn_e_koh.jpg",
//     address: "Some address 5, 12345 Islamabad",
//     description: "A Third Meetup in Islamabad",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://root:root123@cluster0.yzq8wll.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;

//     return{
//         props:{
//             meetups: DUMMYY_MEETUPS,
//         },
//     };
// }

export default HomePage;
