import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const styleDropzone = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#d8d8d8",
  borderStyle: "dashed",
  backgroundColor: "#efefef",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

interface IDropzone {
  maxFile: number;
  onUploadImage?: any;
  onUploadTemporaryImage?: any;
  typeAppend: string;
  Icon?: any;
  width?: any;
  id?: number;
}

const DropzoneCustom = ({
  maxFile,
  typeAppend,
  onUploadImage,
  onUploadTemporaryImage,
  Icon,
  width,
  id,
}: IDropzone) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    try {
      const newFiles = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      console.log({ newFiles });
      const formdata: any = new FormData();
      newFiles.forEach((file: File) => formdata.append(typeAppend, file));

      //id = 0 cx false nha may, dcm hay quen qua
      if (id) {
        onUploadTemporaryImage(newFiles, id);
        console.log(id);
      } else {
        onUploadTemporaryImage(newFiles);
      }
      onUploadImage(formdata);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: maxFile,
    onDrop,
    onDropRejected: (files) => {
      if (files?.length > maxFile) {
        toast.error(`The maximum amount allowed is ${maxFile}`);
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{ ...styleDropzone, width: width ? width : "100%" }}
    >
      <input {...getInputProps()} />
      {Icon ? (
        <Icon sx={{ fontSize: "3rem" }} />
      ) : (
        <DriveFolderUploadIcon sx={{ fontSize: "3rem" }} />
      )}
    </Box>
  );
};

export default DropzoneCustom;
