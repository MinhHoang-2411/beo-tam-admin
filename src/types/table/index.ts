import { SortDirection } from "@mui/material";

export interface HeadCell {
  id: string;
  align: "center" | "left" | "right" | "justify" | "inherit" | undefined;
  disablePadding: boolean;
  label: string;
  width?: string;
  fontSize?: any;
  paddingLeft?: any;
}
export interface IOrderTableHead {
  headCells: HeadCell[];
  order?: SortDirection;
  orderBy?: string;
  checked?: any;
  handleCheckAll?: any;
}
