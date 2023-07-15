import { ISearchRequest } from "../../models/tourListModels/ISearchRequest";

export enum ChipLabelType {
  tourDuration = "Длительность тура",
  price = "Цена",
  recommendedAge = "Рекомендуемый возраст",
  tourDate = "Дата",
  maxPersonNumber = "Колличество человек",
}

const getChipLabels = (searchData: ISearchRequest): string[] => {
  const nonEmptySearchValues: string[] = [];
  Object.keys(searchData).forEach((key, index) => {
    switch (key as keyof ISearchRequest) {
      case "category":
        searchData["category"].map((item) => {
          if (item !== "") {
            nonEmptySearchValues.push(item);
          }
        });
        break;
      case "tourDuration":
        if (
          !searchData["tourDuration"] ||
          !searchData?.tourDuration?.from ||
          !searchData?.tourDuration?.to
        ) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.tourDuration);
        break;
      case "complexity":
        searchData["complexity"].map((item) => {
          if (item !== "") {
            nonEmptySearchValues.push(item);
          }
        });
        break;
      case "price":
        if (
          !searchData["price"] ||
          !searchData?.price?.from ||
          !searchData?.price?.to
        ) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.price);
        break;
      case "recommendedAge":
        if (
          !searchData["recommendedAge"] ||
          !searchData?.recommendedAge?.from ||
          !searchData?.recommendedAge?.to
        ) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.recommendedAge);
        break;
      case "region":
        if (!searchData["region"] || searchData["region"] === "") {
          break;
        }
        nonEmptySearchValues.push(searchData["region"]);
        break;
      case "tourDate":
        if (
          !searchData["tourDate"] ||
          !searchData?.tourDate?.from ||
          searchData?.tourDate?.from === "" ||
          !searchData?.tourDate?.to ||
          searchData?.tourDate?.to === ""
        ) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.tourDate);
        break;
      case "maxPersonNumber":
        if (!searchData["maxPersonNumber"]) {
          break;
        }
        nonEmptySearchValues.push(ChipLabelType.maxPersonNumber);
    }
  });
  return nonEmptySearchValues;
};

export default getChipLabels;
