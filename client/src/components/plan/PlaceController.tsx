import PlaceContainer from "./PlaceContainer";

export default function PlaceController() {
  return (
    <div className="h-full">
      <div className="p-14 border-b-3 border-b-main mb-18">
        <h4 className="font-semibold text-18 text-main">장소 선택</h4>
      </div>
      <PlaceContainer />
    </div>
  );
}
