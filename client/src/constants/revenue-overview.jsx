import dollarIcon from "../assets/owner-dashboard/stat-dollar.svg";
import checkIcon from "../assets/owner-dashboard/stat-check.svg";
import alertIcon from "../assets/owner-dashboard/stat-alert.svg";
import pawIcon from "../assets/owner-dashboard/stat-paw.svg";

function formatMoney(amount) {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function formatChange(current, previous, previousPeriodName) {
  const percent = Math.round(((current - previous) / previous) * 100);
  return `${percent >= 0 ? "up" : "down"} ${Math.abs(percent)}% from ${previousPeriodName}`;
}

export function getRevenueOverviewCards(currentEarnings, previousEarnings, overview, unitDate) {
  return [
    {
      icon: dollarIcon,
      number: formatMoney(currentEarnings),
      title: "Total earnings",
      subtitle: `${overview.periodName} · ${formatChange(currentEarnings, previousEarnings, overview.previousPeriodName)}`,
    },
    {
      icon: checkIcon,
      number: formatMoney(overview.depositsCollected),
      title: "Deposits collected",
      subtitle: `${overview.depositBookingCount} bookings`,
    },
    {
      icon: alertIcon,
      number: formatMoney(overview.stillOwed),
      title: "Still owed",
      subtitle: `${overview.unpaidVisitCount} visits unpaid`,
    },
    {
      icon: pawIcon,
      number: overview.visitsCompleted,
      title: "Visits completed",
      subtitle: `This ${unitDate}`,
    },
  ];
}