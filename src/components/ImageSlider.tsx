import { Box, Grid, Stack } from "@mui/material";
import noImg from "../assets/emptyData/no-picture.png";
import { Image } from "../types/product";

function ImageSlider({
  imagesUrl,
  setSelected,
  urlSelected,
}: {
  imagesUrl: Image[] | [];
  setSelected: (url: any) => void;
  urlSelected: any;
}) {
  return (
    <Stack gap={1}>
      <Box
        sx={{
          border: "1px solid #eaeaea",
          borderRadius: "8px",
          height: "400px",
          bgcolor: "#fff",
          backgroundImage: urlSelected
            ? `url(${urlSelected})`
            : `url(${noImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      ></Box>
      <Grid container>
        {imagesUrl.length ? (
          imagesUrl.map((image, i) => (
            <Grid key={image.src} item xs={3} sx={{ px: "4px" }}>
              <Box
                onClick={() => setSelected(image.src)}
                sx={{
                  cursor: "pointer",
                  border:
                    urlSelected == image.src
                      ? "4px solid #0077ff"
                      : "1px solid #ccc",
                  borderRadius: "8px",
                  width: "100%",
                  height: "80px",
                  bgcolor: "#f6f6f6",
                  backgroundImage: urlSelected
                    ? `url(${image.src})`
                    : `url(${noImg})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  overflow: "hidden",
                }}
              ></Box>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </Stack>
  );
}
export default ImageSlider;
