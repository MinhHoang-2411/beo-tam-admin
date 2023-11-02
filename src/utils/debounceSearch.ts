import _ from "lodash";

export const debounceSearch = _.debounce(
  (
    value: string,
    setParams: React.Dispatch<
      React.SetStateAction<{
        page_size: number;
        page: number;
        search?: string;
      }>
    >
  ) => {
    setParams((prevParams) => {
      return { ...prevParams, page: 1, search: value };
    });
  },
  500
);
