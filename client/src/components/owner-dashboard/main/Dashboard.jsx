import PageHeader from "../../parent-component/PageHeader";

export default function Dashboard() {
    const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
    return (
        <section>
            {/*Add New Appointment*/}
            <PageHeader title={"Welcome, Owner"} subtitle={`${formattedDate} —  here's today at a glance`}/>
        </section>
    );
}