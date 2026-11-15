
import React from "react";
import { formatRevenue } from "./RevenueChart";

/**
 * Temporary service revenue data.
 * Replace with backend response when available.
 */
const TEMP_SERVICE_REVENUE = [
  { id: 1, name: "Dog Walking", revenue: 1850 },
  { id: 2, name: "Overnight Stays", revenue: 1310 },
  { id: 3, name: "Drop-in Care", revenue: 875 },
  { id: 4, name: "Whole Day Care", revenue: 485 },
  { id: 5, name: "Medication", revenue: 240 },
  { id: 6, name: "Nail Trims", revenue: 100 }
];

/**
 * Retrieves revenue grouped by service.
 * @param {string} unitDate Selected reporting period
 * @returns {Promise<Array>} Service revenue records
 */
async function getServiceRevenue(unitDate) {
  // TODO: Replace with backend API fetch.
  const temp = TEMP_SERVICE_REVENUE;

  return temp;
}

/**
 * Revenue by service component.
 * @param {Object} props Component properties
 * @param {Array} props.services Optional service revenue records
 * @param {string} props.unitDate Selected reporting period
 * @returns {JSX.Element} Revenue by service card
 */
export default function RevenueByService({
  services,
  unitDate = "month"
}) {
  const [serviceData, setServiceData] = React.useState(
    services || TEMP_SERVICE_REVENUE
  );

  React.useEffect(() => {
    if (services) {
      setServiceData(services);
      return;
    }

    let active = true;

    getServiceRevenue(unitDate).then((result) => {
      if (active) {
        setServiceData(result);
      }
    });

    return () => {
      active = false;
    };
  }, [services, unitDate]);

  const maxRevenue = Math.max(
    ...serviceData.map((service) => Number(service.revenue) || 0),
    0
  );

  return (
    <section className="revenue-card revenue-service-card">

      <div className="revenue-section-heading">
        <div>
          <h2>By service</h2>
          <p>September</p>
        </div>
      </div>

      <div className="revenue-service-list">

        {serviceData.length === 0 ? (
          <div className="revenue-chart-message">
            No service revenue available.
          </div>
        ) : (
          serviceData.map((service) => {
            const width =
              maxRevenue > 0
                ? (service.revenue / maxRevenue) * 100
                : 0;

            return (
              <div
                className="revenue-service-item"
                key={service.id || service.name}
              >

                <div className="revenue-service-info">
                  <span>{service.name}</span>

                  <span>
                    {formatRevenue(service.revenue)}
                  </span>
                </div>

                <div className="revenue-service-track">
                  <div
                    className="revenue-service-fill"
                    style={{
                      width: `${width}%`
                    }}
                  />
                </div>

              </div>
            );
          })
        )}

      </div>

    </section>
  );
}