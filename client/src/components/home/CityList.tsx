import { useModalStore } from "../../store";
import { City } from "../../types";
import Modal, { ModalBackdrop, ModalPanel } from "../common/Modal";
import Card from "./Card";
import CloseIcon from "../../assets/icons/close.svg?react";
import CityDetail from "./CityDetail";

interface Props {
  cities: City[];
}

export default function CityList({ cities }: Props) {
  const { openModal } = useModalStore();
  const openDetailModal = (city: City) => {
    openModal(({ onClose }) => (
      <Modal>
        <ModalBackdrop />
        <ModalPanel>
          <div className="relative bg-white border rounded-20 border-gray100 px-28 pt-58 pb-37 w-[655px] min-h-[300px]">
            <button onClick={onClose} className="absolute right-28 top-22">
              <CloseIcon />
            </button>
            <CityDetail city={city} />
          </div>
        </ModalPanel>
      </Modal>
    ));
  };
  return (
    <div className="flex flex-wrap items-start justify-between w-full gap-y-28">
      {cities.map((city: City) => (
        <button onClick={() => openDetailModal(city)} key={city.code}>
          <Card
            title={city.nameEn.toUpperCase()}
            description={`${city.country.name} ${city.name}`}
            image={city.thumbnail}
          />
        </button>
      ))}
    </div>
  );
}
