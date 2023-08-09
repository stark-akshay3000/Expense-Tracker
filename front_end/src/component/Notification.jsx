import classes from "./Notification.module.css";

const Notification = (props) => {
    let specialClasses = "";

    if (props.status.status === "error") {
        specialClasses = classes.error;
    }
    if (props.status.status === "success") {
        specialClasses = classes.success;
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{props.status==="error"?"Error":"Success"}</h2>
            <p>{props.status.message}</p>
        </section>
    );
};

export default Notification;
