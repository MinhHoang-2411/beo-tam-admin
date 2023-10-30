import { Breadcrumbs, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { toCamelCase } from "../utils/string/toCamelCase";
import { useAppSelector } from "../hooks/store";
const switchLanguages: any = {
  orders: "Đơn hàng",
  products: "Sản phẩm",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const detailOrder = useAppSelector((state) => state?.order?.OrderDetail?._id);
  return (
    <Breadcrumbs sx={{ fontSize: 14 }}>
      <Link to="/">
        {" "}
        <HomeIcon sx={{ mr: 0.5, mt: "-3px" }} fontSize="inherit" />
        Trang chủ
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span style={{ color: "#000" }} key={name}>
            {switchLanguages[`${name}`]
              ? switchLanguages[`${name}`]
              : detailOrder}
          </span>
        ) : (
          <Link key={name} to={routeTo}>
            {switchLanguages[`${name}`]
              ? switchLanguages[`${name}`]
              : detailOrder}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
