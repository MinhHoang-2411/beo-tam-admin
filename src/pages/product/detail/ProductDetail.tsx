import { useEffect, useState } from "react";
import { Typography, Grid, Box, Stack, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
import CustomButton from "../../../components/share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import LoadingPage from "../../../components/LoadingPage";
import TextDetail from "../../../components/TextDetail";
import { productActions } from "../../../store/product/productSlice";
import { convertNumberFormat } from "../../../utils/numberFormat";
import { removeHTMLTags } from "../../../utils/removeHtmlTag";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.productDetail);
  const loadingProductDetail = useAppSelector(
    (state) => state.product.loadingGetDetailProduct
  );
  const [urlSelected, setUrlSelected] = useState(product?.images[0].src);

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(productActions.resetProductDetail());
    };
  }, []);

  useEffect(() => {
    setUrlSelected(product?.images[0].src);
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
              value={removeHTMLTags(`${product?.description}`)}
            />
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
                {product?.detail.categories.map((prod) => prod.name).join(", ")}
              </Typography>
              <Typography variant="h6" sx={{ color: "#767676" }}>
                <b>Mã sản phẩm:</b> {product?.sku}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
