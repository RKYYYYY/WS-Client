import SectionTitle from "../components/Common/SectionsTitle";
import Bookmarks from "../assets/svgs/bookmark";
import Icon from "../components/Common/Icon";
import InputText from "../components/Common/InputText";
import InputList from "../components/Common/InputList";

export default function Saved() {
  return (
    <>
      <div className="bg-secondary-900">
        <h1 className="font-schibsted-grotesk text-secondary-100 font-black">
          Homepage
          <SectionTitle icon="eye" placeholder="Mouse Settings" />
        </h1>
      </div>
      <Bookmarks className="text-primary-400" size={32} />
      <Icon name="eye" className="text-primary-400" />
      <InputText title="DPI" placeholder="Enter option" />
      <InputList
        title="Crosshair Style"
        options={["Classic", "Classic Static", "Legacy"]}
      />
    </>
  );
}
