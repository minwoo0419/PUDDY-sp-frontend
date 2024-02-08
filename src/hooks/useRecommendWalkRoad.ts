import { UserAddress, UserLocation, WalkRoadType } from "../types/walkRoad";
import { GetRecommendWalkRoad } from "../apis/RecommendWalkRoadApi";
import { useState } from "react";
import { useReissueToken } from "./useCommon";

export const useRecommendWalkRoad = () => {
  const { getReissueToken } = useReissueToken();
  const [walkRoadTypeList, setWalkRoadTypeList] = useState<WalkRoadType[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 0,
    long: 0,
  });
  const [userAddress, setUserAddress] = useState<UserAddress>({
    mainAddress: "",
  });

  const handleWalkRoad = async () => {
    try {
      const response = await GetRecommendWalkRoad();
      console.log(response.data);
      setWalkRoadTypeList(response.data["trails"]);
      const temp_location: UserLocation = {
        lat: response.data["myLat"],
        long: response.data["myLong"],
      };
      const temp_mainAddress: UserAddress = {
        mainAddress: response.data["myMainAddress"],
      };
      setUserLocation(temp_location);
      setUserAddress(temp_mainAddress);
    } catch (e) {
      if (e.response.status === 403) {
        getReissueToken("/mypage");
      } else if (e.response.status === 404) {
        alert("산책로가 존재하지 않습니다.");
      }
    }
  };

  return { walkRoadTypeList, userLocation, userAddress, handleWalkRoad };
};