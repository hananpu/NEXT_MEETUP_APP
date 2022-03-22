import NewMeetupForm from "../../components/meetups/NewMeetupForm"

const NewMeetup = (props) => {

    const addMeetupHandler = (enteredMeetupData) => {
        console.log(enteredMeetupData)
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
};

export default NewMeetup;