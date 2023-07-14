import { ISearchRequest } from "../../models/tourListModels/ISearchRequest";

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
          searchData["tourDuration"] === undefined ||
          null ||
          searchData?.tourDuration?.from === undefined ||
          null ||
          "" ||
          searchData?.tourDuration?.to === undefined ||
          null ||
          ""
        ) {
          break;
        }
        nonEmptySearchValues.push("Длительность тура");
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
          searchData["price"] === undefined ||
          null ||
          searchData?.price?.from === undefined ||
          null ||
          "" ||
          searchData?.price?.to === undefined ||
          null ||
          ""
        ) {
          break;
        }
        nonEmptySearchValues.push("Цена");
        break;
      case "recommendedAge":
        if (
          searchData["recommendedAge"] === undefined ||
          null ||
          searchData?.recommendedAge?.from === undefined ||
          null ||
          "" ||
          searchData?.recommendedAge?.to === undefined ||
          null ||
          ""
        ) {
          break;
        }
        nonEmptySearchValues.push("Рекомендуемый возраст");
        break;
      case "region":
        if (searchData["region"] === undefined || null || "") {
          break;
        }
        nonEmptySearchValues.push(searchData["region"]);
        break;
      case "tourDate":
        if (
          searchData["tourDate"] === undefined ||
          null ||
          searchData?.tourDate?.from === undefined ||
          null ||
          "" ||
          searchData?.tourDate?.to === undefined ||
          null ||
          ""
        ) {
          break;
        }
        nonEmptySearchValues.push("Дата");
        break;
      case "maxPersonNumber":
        if (searchData["maxPersonNumber"] === 0 || undefined || null) {
          break;
        }
        nonEmptySearchValues.push("Колличество человек");
    }
  });
  return nonEmptySearchValues;
};

export default getChipLabels;
