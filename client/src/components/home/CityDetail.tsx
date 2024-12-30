import { City } from "../../types";
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import FlightIcon from "../../assets/icons/airplanemode_active.svg?react";
import VisaIcon from "../../assets/icons/airplane_ticket.svg?react";
import VoltageIcon from "../../assets/icons/power.svg?react";
import ClockIcon from "../../assets/icons/schedule.svg?react";
import Button from "../common/Button";

interface Props {
  city: City;
}

export default function CityDetail({ city }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex mb-18">
        <div className="flex flex-col flex-1 mr-17">
          <div className="mb-18">
            <h3 className="mb-10 text-20 text-gray300">{city.nameEn}</h3>
            <h2 className="font-bold text-30">
              {city.country.name} {city.name}
            </h2>
          </div>

          <p className="text-14 leading-[160%] -tracking-[0.08px] mb-18">
            {city.description}
          </p>

          {/* 항공 */}
          <div className="flex mb-16 gap-x-26">
            <div className="flex flex-col">
              <div className="text-15 tracking-[0.15px] font-semibold  mb-16">
                <FlightIcon className="mr-8" />
                <span>항공</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                직항
              </p>
              <p>약 {city.flightHour} 시간</p>
            </div>

            {/* 비자 */}
            <div className="flex flex-col">
              <div className="text-15 tracking-[0.15px] font-semibold  mb-16">
                <VisaIcon className="mr-8" />
                <span>비자</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                {city.country.visa.required ? "필요" : "무비자자"}
              </p>
              <p>{city.country.visa.duration}일</p>
            </div>

            {/* 전압 */}
            <div className="flex flex-col">
              <div className="text-15 tracking-[0.15px] font-semibold  mb-16">
                <VoltageIcon className="mr-8" />
                <span>전압</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                콘센트
              </p>
              <p>{city.country.voltage}V</p>
            </div>

            {/* 시차 */}
            <div className="flex flex-col">
              <div className="text-15 tracking-[0.15px] font-semibold  mb-16">
                <ClockIcon className="mr-8" />
                <span>시차</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                한국대비
              </p>
              <p>
                {city.timezoneOffset === 0
                  ? "없음"
                  : `${city.timezoneOffset}시간`}
              </p>
            </div>
          </div>
        </div>
        <img
          src={city.thumbnail}
          alt={city.name}
          className="w-[261px] rounded-10 "
        />
      </div>
      <div>
        <Button className="flex items-center justify-center w-185 ">
          <span className="ml-8">일정 만들기</span>
          <ArrowIcon className="ml-5" />
        </Button>
      </div>
    </div>
  );
}
