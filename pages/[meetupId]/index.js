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
    // false - 지정된 경로만 반환 - 프로젝트가 빌드될 때 기준이므로 배포 이후에 오류가 생김
    // true - 일단 빈 페이지를 반환한 다음 동적으로 생성된 페이지를 띄움 (중간 처리 필요)
    // blocking - 페이지를 다 생성한 다음 반환
    fallback: 'blocking',
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
