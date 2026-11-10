import PetCareAlerts from "./PetCareAlerts";

export default function Dashboard({ onNavigate }) {
    return (
        <>
            <p>Dashboard</p>
            <PetCareAlerts onNavigate={onNavigate} />
        </>
    );
}
