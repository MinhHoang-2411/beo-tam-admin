import jwt_decode from "jwt-decode";

export default function isTokenExpired(token: string | undefined): boolean {
  try {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp && currentTime > decodedToken.exp;
    }
    return true;
  } catch (error) {
    return true; // Xảy ra lỗi khi giải mã token, cho rằng token đã hết hạn
  }
}
