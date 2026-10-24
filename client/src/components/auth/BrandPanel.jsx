import BrandMedallion from "../homepage/BrandMedallion";
import topoLinesTopRight from "../../assets/brand/topo-lines-top-right.svg";
import topoLinesBottomLeft from "../../assets/brand/topo-lines-bottom-left.svg";
import "../../styles/homepage/BrandPanel.css";

// Brown left half of every auth screen: logo medallion and tagline.
// tagline / taglineEmphasis: the two lines under the logo (second is italic)
function BrandPanel({ tagline = "Peace of mind", taglineEmphasis = "for your pets." }) {
  return (
    <aside className="brand-panel">
      <img className="brand-panel-topo brand-panel-topo-top" src={topoLinesTopRight} alt="" />
      <img className="brand-panel-topo brand-panel-topo-bottom" src={topoLinesBottomLeft} alt="" />

      <BrandMedallion variant="panel" />

      <p className="brand-panel-tagline">
        {tagline}
        <em>{taglineEmphasis}</em>
      </p>
    </aside>
  );
}

export default BrandPanel;
