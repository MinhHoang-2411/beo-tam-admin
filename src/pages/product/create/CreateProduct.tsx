import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DropzoneCustom from "../../../components/share/dropzone/DropzoneCustom";
import { countTotalElements } from "../../../utils/share";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { productActions } from "../../../store/product/productSlice";
import ImageUpload from "../../../components/share/ImageUpload";
import { CustomTabPanel, a11yProps } from "../../../utils/tab";

interface FieldValues {
  name: string;
  description: string;
  short_description: string;
  keyword: string;
  category: string;
  general: {
    price: string;
    saleOffPrice: string;
    startSaleOff: any;
    endSaleOff: any;
  };
  inventoryCheck: {
    sku: string;
    stockManagement: boolean;
    inventoryStatus: string;
    limited: boolean;
  };
  shipping: { weight: string; length: string; width: string; height: string };
  relatedProducts: {
    upsells: any[];
    cross: any[];
  };
  property: any;
  variant: any;
}

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const [fakeListCategory] = useState([
    { label: "Danh mục 1", value: 1 },
    { label: "Danh mục 2", value: 2 },
    { label: "Danh mục 3", value: 3 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);
  const [prodtype, setProdType] = useState("prod1");
  const [valueTab, setValueTab] = useState(0);
  const listImage = useAppSelector(
    (state) => state.product.temporarylistImgUrl
  );
  //tab
  const handleChangeValueTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueTab(newValue);
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      short_description: "",
      keyword: "",
      category: "",
    },
  });

  const uploadTemporaryImages = (listImg: any) => {
    // setValue("images", listImg);
    dispatch(productActions.settemporarylistImgUrl(listImg));
  };

  const plusTemporaryImages = (listImg: any) => {
    dispatch(productActions.plusTemporaryListImgUrl(listImg));
  };

  const deleteImageUpload = (file: any) => {
    dispatch(productActions.deleteATemporaryImgUrl(file));
  };
  return (
    <Stack spacing={2} p={2}>
      <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Tạo mới sản phẩm
      </Typography>
      <TextField
        id="name"
        label="Tên sản phẩm"
        inputProps={{ ...register("name") }}
        fullWidth
        // error={!!errors.email?.message}
        // required
        // helperText={errors.email?.message}
      />
      <TextField
        id="description"
        label="Mô tả sản phẩm"
        inputProps={{ ...register("description") }}
        fullWidth
        multiline
        rows={12}
        // error={!!errors.email?.message}
        // required
        // helperText={errors.email?.message}
      />
      <Stack
        gap={1}
        sx={{
          border: `1px solid #ccc `,
          p: 2,
          borderRadius: 1,
        }}
      >
        <b>{`Thêm ảnh cho sản phẩm (Tối đa: 8)`}</b>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {listImage.length
            ? listImage.map((img: any, i: number) => (
                <ImageUpload
                  width="24%"
                  src={img.preview}
                  onDelete={() => {
                    deleteImageUpload(img);
                  }}
                />
              ))
            : null}
          {!!listImage.length && countTotalElements(listImage) < 8 ? (
            <DropzoneCustom
              Icon={AddCircleOutlineIcon}
              maxFile={
                8 - countTotalElements(listImage) > 1
                  ? 8 - countTotalElements(listImage)
                  : 1
              }
              onUploadTemporaryImage={plusTemporaryImages}
              width="24%"
              height="200px"
            />
          ) : !listImage.length ? (
            <DropzoneCustom
              maxFile={8}
              onUploadTemporaryImage={uploadTemporaryImages}
            />
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
      <Stack
        sx={{
          border: `1px solid #ccc `,
          borderRadius: 1,
        }}
      >
        <Stack
          sx={{ px: 2, py: 1 }}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600 }}
          >{`Dữ liệu sản phẩm`}</Typography>
          <b>-</b>
          <FormControl sx={{ width: "185px" }}>
            <Select
              size="small"
              defaultValue={prodtype}
              onChange={(e) => {
                setProdType(e.target.value as string);
              }}
            >
              <MenuItem value={"prod1"}>Sản phẩm đơn giản</MenuItem>
              <MenuItem value={"prod2"}>Sản phẩm có biến thể</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Divider />
        <Stack direction="row">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={valueTab}
            onChange={handleChangeValueTab}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                borderBottom: "1px solid #ccc",
              }}
              label="Chung"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                borderBottom: "1px solid #ccc",
              }}
              label="Kiểm kê kho hàng"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                borderBottom: "1px solid #ccc",
              }}
              label="Giao hàng"
              {...a11yProps(2)}
            />
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                borderBottom: "1px solid #ccc",
              }}
              label="Các sản phẩm được liên kết"
              {...a11yProps(3)}
            />
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                borderBottom: "1px solid #ccc",
              }}
              label="Các thuộc tính"
              {...a11yProps(4)}
            />
            <Tab
              sx={{ fontWeight: 800, fontSize: "12px" }}
              label="Các biến thể"
              {...a11yProps(5)}
            />
          </Tabs>
          <CustomTabPanel value={valueTab} index={0}>
            <Stack spacing={1}>
              <TextField
                id="generalPrice"
                label="Giá sản phẩm"
                inputProps={{ ...register("general.price") }}
                sx={{ width: "400px" }}
                size="small"
              />
              <TextField
                id="generalPrice"
                label="Giá khuyến mãi"
                inputProps={{ ...register("general.saleOffPrice") }}
                sx={{ width: "400px" }}
                size="small"
              />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={1}>
            1
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={2}>
            2
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={3}>
            3
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={4}>
            4
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={5}>
            5
          </CustomTabPanel>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Box sx={{ flex: 2 }}>
          <TextField
            id="short_description"
            label="Mô tả ngắn"
            inputProps={{ ...register("short_description") }}
            fullWidth
            multiline
            rows={8}
            // error={!!errors.email?.message}
            // required
            // helperText={errors.email?.message}
          />
        </Box>
        <Box sx={{ flex: 1, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
          <b>Danh mục sản phẩm</b>
          <Stack>
            {fakeListCategory.map((cate) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategory.includes(cate.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        console.log("yolo");
                        setSelectedCategory([...selectedCategory, cate.value]);
                      } else {
                        console.log("loyo");
                        setSelectedCategory(
                          selectedCategory.filter(
                            (slcate) => slcate !== cate.value
                          )
                        );
                      }
                    }}
                  />
                }
                key={cate.value}
                label={cate.label}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CreateProduct;
