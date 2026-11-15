
import { useEffect, useState } from "react";
import {
  formatRevenue,
  getRevenuePeriodLabel,
  getServiceRevenue
} from "../../../services/owner-dashboard/revenue-service";
import { TEMP_SERVICE_REVENUE } from "../../../constants/owner/revenue";

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
  const [loadedServiceData, setLoadedServiceData] = useState(TEMP_SERVICE_REVENUE);
  const serviceData = services ?? loadedServiceData;

  useEffect(() => {
    if (services) {
      return;
    }

    let active = true;

    getServiceRevenue(unitDate).then((result) => {
      if (active) {
        setLoadedServiceData(result);
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
          <p>{getRevenuePeriodLabel(unitDate)}</p>
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