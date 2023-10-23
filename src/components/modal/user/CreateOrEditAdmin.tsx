import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Heading from "../../Heading";
import { TextField } from "@mui/material";
import BaseModal from "../BaseModal";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { userActions } from "../../../store/user/userSlice";
import { useEffect } from "react";

interface FieldValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const CreateOrEditAdminModal = () => {
  const dispatch = useAppDispatch();
  const loadingCRUDAdmin = useAppSelector(
    (state) => state.user.loadingCRUDAdmin
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenAddOrEditAdminModal
  );
  const selectedAdmin = useAppSelector((state) => state.user.selectedAdmin);
  const typeModal = selectedAdmin?._id ? "edit" : "create";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Email không hợp lệ")
          .required("Vui lòng nhập trường này"),
        first_name: yup.string().required("Vui lòng nhập trường này"),
        last_name: yup.string().required("Vui lòng nhập trường này"),
        password: yup.string().required("Vui lòng nhập trường này"),
      })
    ),
  });
  const onCloseModal = () => {
    reset();
    dispatch(layoutActions.closeModalAdmin());
    dispatch(userActions.unSelectAdmin());
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (typeModal == "create") {
      dispatch(
        userActions.createAdmin({
          data,
          onClose() {
            onCloseModal();
          },
        })
      );
    } else {
      const payload = {
        user_id: selectedAdmin?._id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      };
      dispatch(
        userActions.updateAdmin({
          data: payload,
          onClose() {
            onCloseModal();
          },
        })
      );
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={
          typeModal == "create"
            ? "Tạo quản trị viên mới"
            : "Chỉnh sửa quản trị viên"
        }
      />
      <TextField
        id="email"
        label="Email"
        inputProps={{ ...register("email") }}
        error={!!errors.email?.message}
        required
        helperText={errors.email?.message}
      />
      <TextField
        id="first_name"
        label="Tên"
        inputProps={{ ...register("first_name") }}
        error={!!errors.first_name?.message}
        required
        helperText={errors.first_name?.message}
      />
      <TextField
        id="last_name"
        label="Họ"
        inputProps={{ ...register("last_name") }}
        error={!!errors.last_name?.message}
        required
        helperText={errors.last_name?.message}
      />
      {typeModal == "create" && (
        <TextField
          id="password"
          label="Mật khẩu"
          inputProps={{ ...register("password") }}
          error={!!errors.password?.message}
          required
          helperText={errors.password?.message}
        />
      )}
    </div>
  );

  useEffect(() => {
    if (selectedAdmin?._id) {
      setValue("email", selectedAdmin.email);
      setValue("first_name", selectedAdmin.first_name);
      setValue("last_name", selectedAdmin.last_name);
      setValue("password", "123");
    }
  }, [selectedAdmin]);

  return (
    <BaseModal
      disabled={loadingCRUDAdmin}
      isOpen={isOpenModal}
      title={
        typeModal == "create"
          ? "Tạo quản trị viên mới"
          : "Chỉnh sửa quản trị viên"
      }
      actionLabel={typeModal == "create" ? "Tạo" : "Sửa"}
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      bgColor="#fff"
    />
  );
};

export default CreateOrEditAdminModal;
