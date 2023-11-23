import { useEffect, useState } from "react";
import { Typography, Grid, Box, Stack, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import LoadingPage from "../../../components/LoadingPage";
import TextDetail from "../../../components/TextDetail";
import { productActions } from "../../../store/product/productSlice";
import { convertNumberFormat } from "../../../utils/numberFormat";
import { removeHTMLTags } from "../../../utils/removeHtmlTag";
import { CustomTabPanel, a11yProps } from "../../../utils/tab";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.productDetail);
  const loadingProductDetail = useAppSelector(
    (state) => state.product.loadingGetDetailProduct
  );
  const [urlSelected, setUrlSelected] = useState(product?.images[0]?.src);
  const [valueTab, setValueTab] = useState(0);

  //tab
  const handleChangeValueTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(productActions.resetProductDetail());
    };
  }, []);

  useEffect(() => {
    setUrlSelected(product?.images[0]?.src);
  }, [product]);

  return loadingProductDetail ? (
    <LoadingPage />
  ) : (
    <Grid sx={{ width: "100%" }} p={2} container columnSpacing={4}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Thông tin sản phẩm
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <ImageSlider
          imagesUrl={product?.images ? product?.images : []}
          urlSelected={urlSelected}
          setSelected={setUrlSelected}
        />
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {product?.name}
            </Typography>
          </Stack>
          <Divider sx={{ width: "35px", borderBottomWidth: "3px", my: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {`${convertNumberFormat(product?.price)} đ`}
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextDetail
              label="Mô tả"
              value={removeHTMLTags(`${product?.short_description}`)}
            />
            {/* <div
              dangerouslySetInnerHTML={{
                __html: product?.description as string,
              }}
            /> */}

            <Divider />
            <Stack spacing={1}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 500, color: "#4b4b4b" }}
              >
                Chi tiết
              </Typography>
              <Typography variant="h6" sx={{ color: "#767676" }}>
                <b>Danh mục:</b>{" "}
                {product?.categories.map((prod) => prod.name).join(", ")}
              </Typography>
              <Typography variant="h6" sx={{ color: "#767676" }}>
                <b>Mã sản phẩm:</b> {product?.sku}
              </Typography>
              <Typography variant="h6" sx={{ color: "#767676" }}>
                <b>Từ khóa:</b>{" "}
                {product?.tags.map((prod) => prod.name).join(", ")}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={valueTab} onChange={handleChangeValueTab}>
              <Tab
                sx={{ fontWeight: 800, fontSize: "14px" }}
                label="Mô tả"
                {...a11yProps(0)}
              />
              <Tab
                label="Thông tin bổ sung"
                sx={{ fontWeight: 800, fontSize: "14px" }}
                {...a11yProps(1)}
              />
              <Tab
                label="Đánh giá(0)"
                sx={{ fontWeight: 800, fontSize: "14px" }}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={valueTab} index={0}>
            <div
              style={{ fontSize: "16px", fontWeight: 500, color: "#656565" }}
              dangerouslySetInnerHTML={{
                __html: product?.description as string,
              }}
            />
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={1}>
            <Stack direction="row" alignItems="center" sx={{ height: "40px" }}>
              <Typography sx={{ flex: 1, color: "#656565" }} variant="h5">
                <b>TRỌNG LƯỢNG</b>
              </Typography>
              <Typography sx={{ flex: 1, color: "#656565" }} variant="h5">
                {product?.detail?.weight ? `${product?.detail?.weight}g` : ""}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" alignItems="center" sx={{ height: "40px" }}>
              <Typography sx={{ flex: 1, color: "#656565" }} variant="h5">
                <b>KÍCH THƯỚC</b>
              </Typography>
              <Typography sx={{ flex: 1, color: "#656565" }} variant="h5">
                {product?.detail?.dimensions?.height
                  ? `${product?.detail?.dimensions?.width} x ${product?.detail?.dimensions?.width} x ${product?.detail?.dimensions?.height} cm`
                  : ""}
              </Typography>
            </Stack>
            <Divider />
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={2}>
            <p style={{ fontSize: "16px", fontWeight: 500, color: "#656565" }}>
              Hiện chưa có đánh giá nào
            </p>
          </CustomTabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
