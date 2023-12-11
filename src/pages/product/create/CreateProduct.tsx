import { useCallback, useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DropzoneCustom from "../../../components/share/dropzone/DropzoneCustom";
import { countTotalElements } from "../../../utils/share";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { productActions } from "../../../store/product/productSlice";
import ImageUpload from "../../../components/share/ImageUpload";
import { CustomTabPanel, a11yProps } from "../../../utils/tab";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomButton from "../../../components/share/CustomButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ProductApi from "../../../api/product";
import ErrorIcon from "@mui/icons-material/Error";
interface FieldValues {
  name: string;
  description?: string;
  short_description?: string;
  regular_price: string;
  sale_price?: string;
  date_on_sale_from?: string;
  date_on_sale_to?: string;
  sku: string;
  manage_stock?: boolean;
  stock_quantity?: number;
  backorders?: "no" | "notify" | "yes";
  stock_status?: "instock" | "outofstock" | "onbackorder";
  sold_individually?: boolean;
  weight: string;
  dimensions: { length: string; width: string; height: string };
  upsell_ids?: any[];
  cross_sell_ids?: any[];
  tags?: any[];
  categories: any[];
}

const CreateProduct = () => {
  //test
  const listImageWillBeDeleteWhenCancel = useAppSelector(
    (state) => state.product.listImageWillBeDeleteWhenCancel
  );
  const [activeCheckValid, setActiveCheckValid] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const quillRef2 = useRef<ReactQuill>(null);
  const toolbarOptions = [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ direction: "rtl" }], // text direction
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["clean"],
  ];
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const formdata: any = new FormData();
        formdata.append("files", file);
        const url: any = await ProductApi.uploadImages(formdata);
        // console.log({ url: url.data.data[0] });
        dispatch(
          productActions.addUrlIntoListImageWillBeDeleteWhenCancel(
            url.data.data[0]
          )
        );
        const quill = quillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range &&
            quill
              .getEditor()
              .insertEmbed(range.index, "image", url.data.data[0]);
        }
      }
    };
  }, []);
  const imageHandler2 = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const formdata: any = new FormData();
        formdata.append("files", file);
        const url: any = await ProductApi.uploadImages(formdata);
        // console.log({ url: url.data.data[0] });
        const quill = quillRef2.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range &&
            quill
              .getEditor()
              .insertEmbed(range.index, "image", url.data.data[0]);
        }
      }
    };
  }, []);

  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [isOpenDateSaleOff, setIsOpenDateSaleOff] = useState<boolean>(false);
  const [checkedStockManagement, setCheckedStockManagement] =
    useState<boolean>(false);
  const [checkedLimited, setCheckedLimited] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const listCategories = useAppSelector((state) => state.product.listCategory);
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
      regular_price: "",
      sale_price: "",
      date_on_sale_from: "",
      date_on_sale_to: "",
      sku: "",
      manage_stock: false,
      stock_quantity: 0,
      backorders: "no",
      stock_status: "instock",
      sold_individually: false,
      weight: "",
      dimensions: { length: "", width: "", height: "" },
      upsell_ids: [],
      cross_sell_ids: [],
      tags: [],
      categories: [],
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Vui lòng nhập trường này"),
        sku: yup.string().required("Vui lòng nhập trường này"),
        regular_price: yup.string().required("Vui lòng nhập trường này"),
        weight: yup.string().required("Vui lòng nhập trường này"),
        dimensions: yup.object().shape({
          length: yup.string().required("Vui lòng nhập trường này"),
          width: yup.string().required("Vui lòng nhập trường này"),
          height: yup.string().required("Vui lòng nhập trường này"),
        }),
        categories: yup.array().required("Vui lòng nhập trường này"),
      })
    ),
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

  const onSubmit: SubmitHandler<FieldValues> = (payloadForm) => {
    const payload: any = {
      ...payloadForm,
      stock_quantity: Number(payloadForm.stock_quantity),
      description: description,
      short_description: shortDescription,
      categories: selectedCategory.map((cate) => {
        return { id: cate };
      }),
    };
    if (payloadForm.manage_stock) {
      delete payload.stock_status;
    } else {
      delete payload.backorders;
      delete payload.stock_quantity;
    }
    // console.log({ payload });
    const payloadRequest = {
      formData: listImage,
      params: payload,
      onNext() {
        reset();
        setDescription("");
        setShortDescription("");
        setSelectedCategory([]);
        setIsOpenDateSaleOff(false);
        setCheckedLimited(false);
        setCheckedStockManagement(false);
        setValueTab(0);
        setActiveCheckValid(false);
      },
    };
    dispatch(productActions.createProduct(payloadRequest));
  };

  useEffect(() => {
    dispatch(productActions.getListCategory({}));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      // console.log({ listImageWillBeDeleteWhenCancel });
      if (listImageWillBeDeleteWhenCancel.length) {
        dispatch(
          productActions.deleteListImageWillBeDeleteWhenCancel({
            links: listImageWillBeDeleteWhenCancel,
          })
        );
      }
    };
  }, [dispatch, listImageWillBeDeleteWhenCancel]);
  return (
    <Stack spacing={2} p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
          Tạo mới sản phẩm
        </Typography>
        <CustomButton
          color="primary"
          label="Tạo sản phẩm"
          onClick={() => {
            setActiveCheckValid(true);
            handleSubmit(onSubmit)();
          }}
        />
      </Stack>

      <TextField
        id="name"
        label="Tên sản phẩm"
        inputProps={{ ...register("name") }}
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        required
      />
      <Stack
        gap={1}
        sx={{
          border: `1px solid #ccc `,
          p: 2,
          borderRadius: 1,
        }}
      >
        <b>Mô tả sản phẩm</b>
        <ReactQuill
          modules={{
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: imageHandler,
              },
            },
            clipboard: {
              matchVisual: false,
            },
          }}
          ref={quillRef}
          theme="snow"
          value={description}
          onChange={setDescription}
        />
      </Stack>

      <Stack
        gap={1}
        sx={{
          border:
            !listImage.length && activeCheckValid
              ? `1px solid #d32f2f`
              : `1px solid #ccc`,
          p: 2,
          borderRadius: 1,
        }}
      >
        <b
          style={
            !listImage.length && activeCheckValid ? { color: "#d32f2f" } : {}
          }
        >{`*Thêm ảnh cho sản phẩm (Tối đa: 8) ${
          !listImage.length && activeCheckValid ? "- Vui lòng chọn ảnh" : ""
        }`}</b>
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
                height: "70px",
                color: errors.regular_price ? "#d32f2f !important" : "unset",
              }}
              label="Chung"
              icon={errors.regular_price ? <ErrorIcon /> : <></>}
              iconPosition="bottom"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                borderBottom: "1px solid #ccc",
                height: "70px",
                color: errors.sku ? "#d32f2f !important" : "unset",
              }}
              label="Kiểm kê kho hàng"
              icon={errors.sku ? <ErrorIcon /> : <></>}
              iconPosition="bottom"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                borderBottom: "1px solid #ccc",
                height: "70px",
                color:
                  errors.dimensions || errors.weight
                    ? "#d32f2f !important"
                    : "unset",
              }}
              label="Giao hàng"
              icon={errors.dimensions || errors.weight ? <ErrorIcon /> : <></>}
              iconPosition="bottom"
              {...a11yProps(2)}
            />
            <Tab
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                height: "70px",
              }}
              label="Các sản phẩm được liên kết"
              {...a11yProps(3)}
            />
            {/* <Tab
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
            /> */}
          </Tabs>
          <CustomTabPanel value={valueTab} index={0}>
            <Stack spacing={1}>
              <TextField
                id="generalPrice"
                label="Giá sản phẩm"
                inputProps={{ ...register("regular_price") }}
                sx={{ width: "400px" }}
                size="small"
                type="number"
                error={!!errors.regular_price}
                helperText={errors.regular_price?.message}
                required
              />
              <TextField
                id="generalPrice"
                label="Giá khuyến mãi"
                inputProps={{ ...register("sale_price") }}
                sx={{ width: "400px" }}
                size="small"
                type="number"
              />
              {isOpenDateSaleOff ? (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày bắt đầu"
                      format="DD/MM/YYYY"
                      onChange={(newDate: any) => {
                        // console.log(dayjs(newDate).format("DD/MM/YYYY"));
                        setValue(
                          "date_on_sale_from",
                          dayjs(newDate).format("DD/MM/YYYY")
                        );
                      }}
                      slotProps={{ textField: { size: "small" } }}
                    />
                    <DatePicker
                      label="Ngày kết thúc"
                      format="DD/MM/YYYY"
                      onChange={(newDate: any) => {
                        // console.log(dayjs(newDate).format("DD/MM/YYYY"));
                        setValue(
                          "date_on_sale_to",
                          dayjs(newDate).format("DD/MM/YYYY")
                        );
                      }}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </LocalizationProvider>
                  <CustomButton
                    color="error"
                    label="Hủy"
                    width="100px"
                    onClick={() => setIsOpenDateSaleOff(false)}
                  />
                </>
              ) : (
                <CustomButton
                  label="Lên lịch"
                  color="info"
                  width="100px"
                  onClick={() => setIsOpenDateSaleOff(true)}
                />
              )}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={1}>
            <Stack spacing={1}>
              <TextField
                id="sku"
                label="Mã sản phẩm"
                inputProps={{ ...register("sku") }}
                sx={{ width: "400px" }}
                size="small"
                error={!!errors.sku}
                helperText={errors.sku?.message}
                required
              />
              <FormControlLabel
                label="Theo dõi số lượng tồn kho cho sản phẩm này"
                control={
                  <Checkbox
                    checked={checkedStockManagement}
                    onChange={(e) => {
                      setCheckedStockManagement(e.target.checked);
                      setValue("manage_stock", e.target.checked);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
              {checkedStockManagement ? (
                <>
                  <TextField
                    id="stock_quantity"
                    label="số lượng"
                    inputProps={{ ...register("stock_quantity") }}
                    sx={{ width: "400px" }}
                    size="small"
                    type="number"
                  />
                  <FormControl sx={{ px: 1 }}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Cho phép đặt hàng trước?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="no"
                      name="radio-buttons-group"
                      onChange={(e) =>
                        setValue(
                          "backorders",
                          e.target.value as "no" | "notify" | "yes"
                        )
                      }
                    >
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="Không cho phép"
                      />
                      <FormControlLabel
                        value="notify"
                        control={<Radio />}
                        label="Cho phép, nhưng phải thông báo cho khách hàng"
                      />
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Cho phép"
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              ) : (
                <FormControl sx={{ px: 1 }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Trạng thái kho hàng
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="instock"
                    name="radio-buttons-group"
                    onChange={(e) =>
                      setValue(
                        "stock_status",
                        e.target.value as
                          | "instock"
                          | "outofstock"
                          | "onbackorder"
                      )
                    }
                  >
                    <FormControlLabel
                      value="instock"
                      control={<Radio />}
                      label="Còn hàng"
                    />
                    <FormControlLabel
                      value="outofstock"
                      control={<Radio />}
                      label="Hết hàng"
                    />
                    <FormControlLabel
                      value="onbackorder"
                      control={<Radio />}
                      label="Chờ hàng"
                    />
                  </RadioGroup>
                </FormControl>
              )}

              <FormControlLabel
                label="Giới hạn một sản phẩm trên mỗi đơn hàng"
                control={
                  <Checkbox
                    checked={checkedLimited}
                    onChange={(e) => {
                      setCheckedLimited(e.target.checked);
                      setValue("sold_individually", e.target.checked);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={2}>
            <Stack spacing={1}>
              <TextField
                id="weight"
                label="Cân nặng(g)"
                inputProps={{ ...register("weight") }}
                sx={{ width: "400px" }}
                size="small"
                type="number"
                error={!!errors.weight}
                helperText={errors.weight?.message}
                required
              />
              <Stack direction="row" spacing={1} sx={{ width: "400px" }}>
                <TextField
                  id="lenght"
                  label="Dài(cm)"
                  inputProps={{ ...register("dimensions.length") }}
                  size="small"
                  type="number"
                  error={!!errors.dimensions?.length}
                  helperText={errors.dimensions?.length?.message}
                  required
                />{" "}
                <TextField
                  id="width"
                  label="Rộng(cm)"
                  inputProps={{ ...register("dimensions.width") }}
                  size="small"
                  error={!!errors.dimensions?.width}
                  helperText={errors.dimensions?.width?.message}
                  required
                />{" "}
                <TextField
                  id="height"
                  label="cao(cm)"
                  inputProps={{ ...register("dimensions.height") }}
                  size="small"
                  type="number"
                  error={!!errors.dimensions?.height}
                  helperText={errors.dimensions?.height?.message}
                  required
                />
              </Stack>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={3}>
            We will be right back
          </CustomTabPanel>
          {/* <CustomTabPanel value={valueTab} index={4}>
            4
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={5}>
            5
          </CustomTabPanel> */}
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Stack
          gap={1}
          sx={{
            border: `1px solid #ccc `,
            p: 2,
            borderRadius: 1,
            overflow: "auto",
          }}
        >
          <b>Mô tả ngắn</b>
          <ReactQuill
            modules={{
              toolbar: {
                container: toolbarOptions,
                handlers: {
                  image: imageHandler2,
                },
              },
              clipboard: {
                matchVisual: false,
              },
            }}
            ref={quillRef2}
            theme="snow"
            value={shortDescription}
            onChange={setShortDescription}
          />
        </Stack>
        <Box
          sx={{
            flex: 1,
            p: 2,
            border:
              !selectedCategory.length && activeCheckValid
                ? "1px solid #d32f2f"
                : "1px solid #ccc",
            borderRadius: 1,
          }}
        >
          <b
            style={
              !selectedCategory.length && activeCheckValid
                ? { color: "#d32f2f" }
                : {}
            }
          >
            {`*Danh mục sản phẩm ${
              !selectedCategory.length && activeCheckValid
                ? "- Vui lòng chọn danh mục"
                : ""
            }`}
          </b>
          <Stack sx={{ maxHeight: "600px", overflow: "auto" }}>
            {listCategories.map((cate) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategory.includes(cate.woo_category_id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // console.log("yolo");
                        setSelectedCategory([
                          ...selectedCategory,
                          cate.woo_category_id,
                        ]);
                      } else {
                        // console.log("loyo");
                        setSelectedCategory(
                          selectedCategory.filter(
                            (slcate) => slcate !== cate.woo_category_id
                          )
                        );
                      }
                    }}
                  />
                }
                key={cate._id}
                label={cate.name}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CreateProduct;
