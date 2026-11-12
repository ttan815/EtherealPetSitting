import PageHeader from "../../parent-component/PageHeader";
import OverviewHeader from "./OverviewHeader";

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
            <OverviewHeader/>
        </section>
    );
}