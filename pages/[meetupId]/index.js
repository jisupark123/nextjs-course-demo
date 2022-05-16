import { MongoClient, ObjectId } from 'mongodb';
import Seo from '../../components/layout/Seo';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <>
      <Seo
        title={props.meetupData.title}
        metaContent={props.meetupData.description}
      />
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://jisu:ZiOxiIRQFPTbGAJv@cluster0.dor0l.mongodb.net/meetupApp?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    'mongodb+srv://jisu:ZiOxiIRQFPTbGAJv@cluster0.dor0l.mongodb.net/meetupApp?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const seletedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(seletedMeetup);
  client.close();
  return {
    props: {
      meetupData: {
        id: seletedMeetup._id.toString(),
        title: seletedMeetup.title,
        address: seletedMeetup.address,
        image: seletedMeetup.image,
        description: seletedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
