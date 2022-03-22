import classes from "./MeetupDetail.module.css"

const MeetupDetail = (props) => {
  return (
    <section id={props.id} className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
