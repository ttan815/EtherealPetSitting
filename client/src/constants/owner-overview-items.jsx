import { PawPrint, ClipboardList, CircleDollarSign } from "lucide-react";

/**
 * Calculates the number of completed and upcoming visits today.
 * @returns {{complete: number, upcoming: number}} The visit totals for today.
 */
function getTodayVisits(){
    const complete = 2;
    const upcoming = 4;
    return {complete: complete, upcoming: upcoming}
}

/**
 * Retrieves the current count of pending owner requests.
 * @returns {number} The pending request count.
 */
function getPendingRequestCount(){
    const pending = 3;
    return pending;
}

/**
 * Retrieves the weekly earnings summary and comparison value.
 * @returns {{earning: number, comparison: number}} The earnings and comparison metrics.
 */
function getWeeklyEarnings(){
    const earning = 1300.12;
    const comparison = 12.0;
    return {earning: earning, comparison: comparison};
}

/**
 * Calculates the unpaid balance information.
 * @returns {{balance: number, unpaidVisit: number}} The unpaid balance and visit count.
 */
function getUnpaidBalance(){
    const balance = 200.21;
    const unpaidVisit = 3;
    return {balance: balance, unpaidVisit: unpaidVisit};
}

const todayVisit = getTodayVisits();
const totalVisit = todayVisit.complete + todayVisit.upcoming;
const todayVisitDetail = `${todayVisit.complete} complete - ${todayVisit.upcoming} upcoming`;

const weeklyEarning = getWeeklyEarnings();
const weeklyEarningDetail = `${weeklyEarning.comparison}% vs last week`

const unpaid = getUnpaidBalance();
const unpaidDetail = `${unpaid.unpaidVisit} visits unpaid`

/**
 * Builds the overview cards shown on the owner dashboard.
 * @returns {Array<{icon: object, title: string, subtitle: string, number: string|number}>} The dashboard overview items.
 */
export const OWNER_OVERVIEW_ITEMS = [
  {
    icon: PawPrint,
    title: "Today's visits",
    subtitle: todayVisitDetail,
    number: totalVisit,
  },
  {
    icon: ClipboardList,
    title: "Pending requests",
    subtitle: "waiting for your reply",
    number: getPendingRequestCount(),
  },
  {
    icon: CircleDollarSign,
    title: "Earning this week",
    subtitle: weeklyEarningDetail,
    number: `$${weeklyEarning.earning}`,
  },
  {
    icon: ClipboardList,
    title: "unpaid balance",
    subtitle: unpaidDetail,
    number: `$${unpaid.balance}`,
  }
];