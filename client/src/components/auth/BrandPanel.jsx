import { BUSINESS_NAME, BUSINESS_SUBTITLE } from "../../constants/siteInfo";
import topoLinesTopRight from "../../assets/brand/topo-lines-top-right.svg";
import topoLinesBottomLeft from "../../assets/brand/topo-lines-bottom-left.svg";
import medallionGlow from "../../assets/brand/medallion-glow.svg";
import medallionRing from "../../assets/brand/medallion-ring.svg";
import medallionInnerCircle from "../../assets/brand/medallion-inner-circle.svg";
import logoScriptDog from "../../assets/brand/logo-script-dog.svg";
import "../../styles/BrandPanel.css";

// Brown left half of every auth screen: logo medallion and tagline.
function BrandPanel() {
  return (
    <aside className="brand-panel">
      <img className="brand-panel-topo brand-panel-topo-top" src={topoLinesTopRight} alt="" />
      <img className="brand-panel-topo brand-panel-topo-bottom" src={topoLinesBottomLeft} alt="" />

      <div className="brand-panel-medallion">
        <img className="brand-panel-glow" src={medallionGlow} alt="" />
        <img className="brand-panel-ring" src={medallionRing} alt="" />
        <img className="brand-panel-inner-circle" src={medallionInnerCircle} alt="" />

        <div className="brand-panel-medallion-content">
          <img src={logoScriptDog} alt="Angelena's Ethereal Pet Sitting & Care logo" />
          <p className="brand-panel-name">{BUSINESS_NAME}</p>
          <p className="brand-panel-subtitle">{BUSINESS_SUBTITLE}</p>
        </div>
      </div>

      <p className="brand-panel-tagline">
        Peace of mind
        <em>for your pets.</em>
      </p>
    </aside>
  );
}

export default BrandPanel;
