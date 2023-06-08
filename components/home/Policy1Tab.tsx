import * as React from "react";
import { Box } from "@mui/system";
import { List, ListItem, Typography } from "@mui/material";

// export interface IAppProps {
// }

export default function Policy() {
    return (
        <Box role="tabpanel" aria-hidden="false" id="POLICY">
            <Box>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                    Chính sách nhà xe
                </Typography>
                <Box
                    mt={2}
                    sx={{
                        padding: "12px 0px",
                        borderBottom: "1px dashed rgb(159 69 69)",
                    }}
                >
                    <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                        Yêu cầu khi lên xe
                    </Typography>
                    <List>
                        <ListItem>
                            <Typography>
                                Có mặt tại văn phòng/quầy vé/bến xe trước 30
                                phút để làm thủ tục lên xe
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Đổi vé giấy trước khi lên xe
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Xuất trình SMS/Email đặt vé trước khi lên xe
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Không mang đồ ăn, thức ăn có mùi lên xe
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Không hút thuốc, uống rượu, sử dụng chất kích
                                thích trên xe
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Không mang các vật dễ cháy nổ lên xe
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Không vứt rác trên xe</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Không làm ồn, gây mất trật tự trên xe
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Không mang giày, dép trên xe
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    sx={{
                        padding: "12px 0px",
                        borderBottom: "1px dashed rgb(159 69 69)",
                    }}
                >
                    <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                        Hành lý xách tay
                    </Typography>
                    <List>
                        <ListItem>
                            <Typography>
                                Tổng trọng lượng hành lý không vượt quá 25 kg
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Không vận chuyển hàng hóa cồng kềnh
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Không hoàn tiền trong trường hợp hủy vé do vi
                                phạm các quy định về hành lý
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    sx={{
                        padding: "12px 0px",
                        borderBottom: "1px dashed rgb(159 69 69)",
                    }}
                >
                    <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                        Trẻ em và phụ nữ có thai
                    </Typography>
                    <List>
                        <ListItem>
                            <Typography>
                                Trẻ em dưới 5 tuổi hoặc dưới 100 cm được miễn
                                phí vé nếu ngồi cùng ghế/giường với bố mẹ
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Trẻ em từ 5 tuổi hoặc cao từ 100 cm trở lên mua
                                vé như người lớn
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Phụ nữ có thai cần đảm bảo sức khỏe trong suốt
                                quá trình di chuyển
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Nhà xe có quyền từ chối phục vụ nếu hành khách
                                không tuân thủ quy định về trẻ em và phụ nữ có
                                thai
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    sx={{
                        padding: "12px 0px",
                        borderBottom: "1px dashed rgb(159 69 69)",
                    }}
                >
                    <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                        Động vật cảnh/Thú cưng
                    </Typography>
                    <List>
                        <ListItem>
                            <Typography>
                                Hành khách có động vật đi cùng vui lòng báo
                                trước khi khởi hành và có mặt trước giờ khởi
                                hành ít nhất 280 phút
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Động vật cảnh phải đảm bảo có sức khỏe tốt, thân
                                thiện với con người, đã được tiêm phòng đầy đủ,
                                không có mùi khó chịu, không gây ảnh hưởng đến
                                hành khách và tài sản của họ
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Thú cưng cần phải được đeo rọ mõm, nhốt trong
                                lồng, túi, balo phi hành gia để đảm bảo cho việc
                                vận chuyển an toàn, phòng tránh việc thú cưng
                                chạy ra ngoài
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Hãng xe chỉ chấp nhận vận chuyển động vật như là
                                một hành lý ký gửi; không cho phép mang lên xe
                                cùng hành khách
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Nhiệt độ thời tiết trong quá trình vận chuyển
                                đôi khi ảnh hưởng đến sức khỏe của động vật
                                cảnh, nhà xe không chịu trách nhiệm về sức khỏe
                                động vật trong suốt chuyến đi
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    sx={{
                        padding: "12px 0px",
                        borderBottom: "1px dashed rgb(159 69 69)",
                    }}
                >
                    <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                        Xuất hóa đơn GTGT
                    </Typography>
                    <List>
                        <ListItem>
                            <Typography>
                                Nhà xe có cung cấp hóa đơn GTGT cho vé, phí xuất
                                hóa đơn là 10 % trên giá vé quý khách đã mua
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    );
}
