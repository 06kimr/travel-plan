export interface City {
  code: string; //도시의 코드, 구분자 역할 ex) seoul
  name: string; //도시의 한글 이름 ex) seoul
  nameEn: string; //도시의 영문 이름 ex) Seoul
  thumbnail: string; //도시의 썸네일 이미지 URL
  description: string;
  timezone: string; //도시의 타임존 ex) Asia/Seoul
  flightHour: number; //서울로부터 비행시간 ex)2
  timezoneOffset: number; //서울로부터 시차 ex) 9
  coordinates: {
    lat: number;
    lng: number;
  };
  country: Country
}

export interface Country {
  code: string; //국가의 코드, 구분자 역할 ex) kr
  name: string; //국가의 한글 이름 ex) 한국
  nameEn: string; // 국가의 영문 이름 ex) Korea
  voltage: number; //국가의 전압 ex) 220
  visa: {
    required: boolean; // 비자 필요 여부
    duration: number; // 비자 유효 기간
  };
  continent:
    | "Asia"
    | "Europe"
    | "Africa"
    | "Oceania"
    | "North America"
    | "South America"
    | "Antarctica";
};

export interface Place {
  name: string;
  thumbnail: string;
  category: 'attraction' | 'restaurant' | 'cafe';
  address: string;
  coordinates: {
    lat: number;
    lng: number
  };
  likes: number;
  rating: number;
  city: City['code']
}
