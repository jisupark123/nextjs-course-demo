import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetUpPage() {
  const router = useRouter();
  async function addMeetUpHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredMeetupData),
    });
    const data = await response.json();

    router.push('/');
  }
  return <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
}

export default NewMeetUpPage;
