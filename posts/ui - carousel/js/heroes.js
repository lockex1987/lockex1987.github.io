const HEROES = [
    {
        rank: '1',
        nameVietnamese: 'Tống Giang',
        nicknameVietnamese: 'Hô Bảo Nghĩa (người kêu gọi bảo vệ chính nghĩa); Cập Thời Vũ (mưa đúng lúc)',
        nickname: '"Protector of Righteousness"',
        image: '001_thien khoi tinh_ho bao nghia_tong giang.jpg'
    },
    {
        rank: '2',
        nameVietnamese: 'Lư Tuấn Nghĩa',
        nicknameVietnamese: 'Ngọc Kỳ Lân (kỳ lân ngọc)',
        nickname: '"Jade Qilin"',
        image: '002_thien cuong tinh_ngoc ky lan_lu tuan nghia.jpg'
    },
    {
        rank: '3',
        nameVietnamese: 'Ngô Dụng',
        nicknameVietnamese: 'Trí Đa Tinh (mưu trí sáng tựa ngàn sao)',
        nickname: '"Resourceful Star"',
        image: '003_thien co tinh_tri da tinh_ngo dung.jpg'
    },
    {
        rank: '4',
        nameVietnamese: 'Công Tôn Thắng',
        nicknameVietnamese: 'Nhập Vân Long (rồng luồn mây)',
        nickname: '"Dragon in the Clouds"',
        image: '004_thien nhan tinh_nhap van long_cong ton thang.jpg'
    },
    {
        rank: '5',
        nameVietnamese: 'Quan Thắng',
        nicknameVietnamese: 'Đại Đao (đao lớn)',
        nickname: '"Great Blade"',
        image: '005_thien dung tinh_dai dao_quan thang.jpg'
    },
    {
        rank: '6',
        nameVietnamese: 'Lâm Xung',
        nicknameVietnamese: 'Báo Tử Đầu (báo chúa, báo đầu đàn)',
        nickname: '"Panther Head"',
        image: '006_thien hung tinh_bao tu dau_lam xung.jpg'
    },
    {
        rank: '7',
        nameVietnamese: 'Tần Minh',
        nicknameVietnamese: 'Tích Lịch Hỏa (lửa sấm sét)',
        nickname: '"Fiery Thunderbolt"',
        image: '007_thien manh tinh_tich lich hoa_tan minh.jpg'
    },
    {
        rank: '8',
        nameVietnamese: 'Hô Diên Chước',
        nicknameVietnamese: 'Song Tiên (hai roi)',
        nickname: '"Double Clubs"',
        image: '008_thien uy tinh_song tien_ho dien chuoc.jpg'
    },
    {
        rank: '9',
        nameVietnamese: 'Hoa Vinh',
        nicknameVietnamese: 'Tiểu Lý Quảng (Lý Quảng nhỏ)',
        nickname: '"Little Li Guang"',
        image: '009_thien anh tinh_tieu ly quang_hoa vinh.jpg'
    },
    {
        rank: '10',
        nameVietnamese: 'Sài Tiến',
        nicknameVietnamese: 'Tiểu Toàn Phong (cơn lốc nhỏ)',
        nickname: '"Little Whirlwind"',
        image: '010_thien quy tinh_tieu toan phong_sai tien.jpg'
    },
    {
        rank: '11',
        nameVietnamese: 'Lý Ứng',
        nicknameVietnamese: 'Phác Thiên Bằng (chim bằng / đại bàng vút trời)',
        nickname: '"Striking Hawk"',
        image: '011_thien phu tinh_phac thien bang_ly ung.jpg'
    },
    {
        rank: '12',
        nameVietnamese: 'Chu Đồng',
        nicknameVietnamese: 'Mỹ Nhiêm Công (ông tốt râu)',
        nickname: '"Lord of the Beautiful Beard"',
        image: '012_thien man tinh_my nhiem cong_chu dong.jpg'
    },
    {
        rank: '13',
        nameVietnamese: 'Lỗ Trí Thâm',
        nicknameVietnamese: 'Hoa Hòa Thượng (sư xăm hoa)',
        nickname: '"Flowery Monk"',
        image: '013_thien co tinh_hoa hoa thuong_lo tri tham.jpg'
    },
    {
        rank: '14',
        nameVietnamese: 'Võ Tòng',
        nicknameVietnamese: 'Hành Giả (sư đi khuyến thiện, khất thực)',
        nickname: '"Pilgrim"; "Tiger-fighting Hero"',
        image: '014_thien thuong tinh_hanh gia_vo tong.jpg'
    },
    {
        rank: '15',
        nameVietnamese: 'Đổng Bình',
        nicknameVietnamese: 'Song Thương Tướng (tướng hai thương)',
        nickname: '"General of Double Spears"',
        image: '015_thien lap tinh_song thuong tuong_dong binh.jpg'
    },
    {
        rank: '16',
        nameVietnamese: 'Trương Thanh',
        nicknameVietnamese: 'Một Vũ Tiễn (mũi tên không lông)',
        nickname: '"Featherless Arrow"',
        image: '016_thien tiep tinh_mot vu tien_truong thanh.jpg'
    },
    {
        rank: '17',
        nameVietnamese: 'Dương Chí',
        nicknameVietnamese: 'Thanh Diện Thú (thú mặt xanh)',
        nickname: '"Blue Faced Beast"',
        image: '017_thien am tinh_thanh dien thu_duong chi.jpg'
    },
    {
        rank: '18',
        nameVietnamese: 'Từ Ninh',
        nicknameVietnamese: 'Kim Sang Thủ (tay câu vàng)',
        nickname: '"Gold Lancer"',
        image: '018_thien huu tinh_kim sang thu_tu ninh.jpg'
    },
    {
        rank: '19',
        nameVietnamese: 'Sách Siêu',
        nicknameVietnamese: 'Cấp Tiên Phong (tiên phong nóng tính)',
        nickname: '"Impatient Vanguard"',
        image: '019_thien khong tinh_cap tien phong_sach sieu.jpg'
    },
    {
        rank: '20',
        nameVietnamese: 'Đới Tung',
        nicknameVietnamese: 'Thần Hành Thái Bảo (ông thủ từ đi nhanh)',
        nickname: '"Magic Traveller"',
        image: '022_thien toc tinh_than hanh thai bao_doi tung.jpg'
    },
    {
        rank: '21',
        nameVietnamese: 'Lưu Đường',
        nicknameVietnamese: 'Xích Phát Quỷ (quỷ tóc đỏ)',
        nickname: '"Red Haired Devil"',
        image: '020_thien di tinh_xich phat quy_luu duong.jpg'
    },
    {
        rank: '22',
        nameVietnamese: 'Lý Quỳ',
        nicknameVietnamese: 'Hắc Toàn Phong (cơn lốc đen); Thiết Ngưu (máy kéo)',
        nickname: '"Black Whirlwind"',
        image: '021_thien sat tinh_hac toan phong_ly quy.jpg'
    },
    {
        rank: '23',
        nameVietnamese: 'Sử Tiến',
        nicknameVietnamese: 'Cửu Văn Long (người xăm chín con rồng)',
        nickname: '"Nine Tattooed Dragons"',
        image: '023_thien vi tinh_cuu van long_su tien.jpg'
    },
    {
        rank: '24',
        nameVietnamese: 'Mục Hoằng',
        nicknameVietnamese: 'Một Già Lan (không che giấu)',
        nickname: '"Unrestrained"',
        image: '024_thien cuu tinh_moc gia lan_muc hoang.jpg'
    },
    {
        rank: '25',
        nameVietnamese: 'Lôi Hoành',
        nicknameVietnamese: 'Sáp Sí Hổ (hổ chắp cánh)',
        nickname: '"Winged Tiger"',
        image: '025_thien thoai tinh_sap si ho_loi hoanh.jpg'
    },
    {
        rank: '26',
        nameVietnamese: 'Lý Tuấn',
        nicknameVietnamese: 'Hỗn Giang Long (rồng quấy sông)',
        nickname: '"River Dragon"',
        image: '026_thien tho tinh_hon giang long_ly tuan.jpg'
    },
    {
        rank: '27',
        nameVietnamese: 'Nguyễn Tiểu Nhị',
        nicknameVietnamese: 'Lập Địa Thái Tuế (thái tuế mở đất)',
        nickname: '"Tai Sui Who Stands His Ground"',
        image: '027_thien kiem tinh_lap dia thai tue_nguyen tieu nhi.jpg'
    },
    {
        rank: '28',
        nameVietnamese: 'Trương Hoành',
        nicknameVietnamese: 'Thuyền Đầu Hoả (lửa đầu thuyền)',
        nickname: '"Boatman"',
        image: '028_thien binh tinh_thuyen dau hoa_truong hoanh.jpg'
    },
    {
        rank: '29',
        nameVietnamese: 'Nguyễn Tiểu Ngũ',
        nicknameVietnamese: 'Đoản Mệnh Nhị Lang (chàng hai xấu số)',
        nickname: '"Short-lived Second Brother"',
        image: '029_thien toi tinh_doan menh tam lang_nguyen tieu ngu.jpg'
    },
    {
        rank: '30',
        nameVietnamese: 'Trương Thuận',
        nicknameVietnamese: 'Lãng Lý Bạch Điều (lụa trắng trên sóng)',
        nickname: '"White Stripe in the Waves"',
        image: '030_thien ton tinh_lang ly bach dieu_truong hoanh.jpg'
    },
    {
        rank: '31',
        nameVietnamese: 'Nguyễn Tiểu Thất',
        nicknameVietnamese: 'Hoạt Diêm La (Diêm La sống)',
        nickname: '"Living King Yama"',
        image: '031_thien dai tinh_hoat diem la_nguyent tieu that.jpg'
    },
    {
        rank: '32',
        nameVietnamese: 'Dương Hùng',
        nicknameVietnamese: 'Bệnh Quan Sách (Quan Sách ốm)',
        nickname: '"Sick Guan Suo"',
        image: '032_thien lao tinh_benh quan sach_duong hung.jpg'
    },
    {
        rank: '33',
        nameVietnamese: 'Thạch Tú',
        nicknameVietnamese: 'Phanh Mệnh Tam Lang (chàng ba liều mạng)',
        nickname: '"Daredevil Third Brother"',
        image: '033_thien tue tinh_bien menh tam lang_thach tu.jpg'
    },
    {
        rank: '34',
        nameVietnamese: 'Giải Trân',
        nicknameVietnamese: 'Lưỡng Đầu Xà (rắn hai đầu)',
        nickname: '"Double-headed Serpent"',
        image: '034_thien bao tinh_luong dau xa_giai tran.jpg'
    },
    {
        rank: '35',
        nameVietnamese: 'Giải Bảo',
        nicknameVietnamese: 'Song Vĩ Hạt (bọ cạp hai đuôi)',
        nickname: '"Twin-tailed Scorpion"',
        image: '035_thien khoc tinh_song vi hat_giai bao.jpg'
    },
    {
        rank: '36',
        nameVietnamese: 'Yến Thanh',
        nicknameVietnamese: 'Lãng Tử (tay chơi)',
        nickname: '"Prodigal" / "Wanderer"',
        image: '036_thien xao tinh_lang tu_yen thanh.jpg'
    },
    {
        rank: '37',
        nameVietnamese: 'Chu Vũ',
        nicknameVietnamese: 'Thần Cơ Quân Sư (quân sư giỏi kế)',
        nickname: '"Resourceful Strategist"',
        image: '037_dia khoi tinh_than co quan su_chu vu.jpg'
    },
    {
        rank: '38',
        nameVietnamese: 'Hoàng Tín',
        nicknameVietnamese: 'Trấn Tam Sơn (trấn ba núi)',
        nickname: '"Guardian of Three Mountains"',
        image: '038_dia sat tinh_tran tam son_hoang tin.jpg'
    },
    {
        rank: '39',
        nameVietnamese: 'Tôn Lập',
        nicknameVietnamese: 'Bệnh Uý Trì (Uý Trì ốm) ',
        nickname: '"Sick Yuchi"',
        image: '039_dia dung tinh_benh uy tri_ton lap.jpg'
    },
    {
        rank: '40',
        nameVietnamese: 'Tuyên Tán',
        nicknameVietnamese: 'Xú Quận Mã',
        nickname: '"Ugly Prince Consort"',
        image: '040_dia kiet tinh_xu quan ma_tuyen tan.jpg'
    },
    {
        rank: '41',
        nameVietnamese: 'Hác Tư Văn',
        nicknameVietnamese: 'Tỉnh Mộc Hãn (chó ngao đen)',
        nickname: '"Wood Dog of Well"',
        image: '041_dia hung tinh_moc tinh can_hac tu van.jpg'
    },
    {
        rank: '42',
        nameVietnamese: 'Hàn Thao',
        nicknameVietnamese: 'Bách Thắng Tướng',
        nickname: '"General of a Hundred Victories"',
        image: '042_dia uy tinh_bach thang tuong_han thao.jpg'
    },
    {
        rank: '43',
        nameVietnamese: 'Bành Kỷ',
        nicknameVietnamese: 'Thiên Mục Tướng (tướng mắt trời)',
        nickname: '"General of Heavenly Vision"',
        image: '043_dia anh tinh_thien muc tuong_banh di.jpg'
    },
    {
        rank: '44',
        nameVietnamese: 'Đan Đình Khuê',
        nicknameVietnamese: 'Thánh Thủy Tướng Quân (tướng thánh nước)',
        nickname: '"General of Sacred Water"',
        image: '044_dia ky tinh_thanh thuy tuong quan_dan dinh khue.jpg'
    },
    {
        rank: '45',
        nameVietnamese: 'Ngụy Định Quốc',
        nicknameVietnamese: 'Thần Hoả Tướng Quân (tướng thần lửa)',
        nickname: '"General of Holy Fire"',
        image: '045_dia manh tinh_than hoa tuong quan_nguy dinh quoc.jpg'
    },
    {
        rank: '46',
        nameVietnamese: 'Tiêu Nhượng',
        nicknameVietnamese: 'Thánh Thủ Thư Sinh (học trò chữ đẹp)',
        nickname: '"Sacred Handed Scholar"',
        image: '046_dia van tinh_thanh thu thu sinh_tieu nhuong.jpg'
    },
    {
        rank: '47',
        nameVietnamese: 'Bùi Tuyên',
        nicknameVietnamese: 'Thiết Diện Khổng Mục (quan toà mặt sắt)',
        nickname: "\"Iron Faced Magistrate's Clerk\"",
        image: '047_dia chinh tinh_thiet dien khong muc_bui tuyen.jpg'
    },
    {
        rank: '48',
        nameVietnamese: 'Âu Bằng',
        nicknameVietnamese: 'Ma Vân Kim Sí (chim cắt luồn mây)',
        nickname: '"Golden Wings Brushing Against the Clouds"',
        image: '048_dia tich tinh_ma van kim si_au bang.jpg'
    },
    {
        rank: '49',
        nameVietnamese: 'Đặng Phi',
        nicknameVietnamese: 'Hoả Nhãn Toan Nghê (sư tử mắt lửa)',
        nickname: '"Fiery Eyed Suan-ni"',
        image: '049_dia hap tinh_hoa nhon toan nghe_dang phi.jpg'
    },
    {
        rank: '50',
        nameVietnamese: 'Yến Thuận',
        nicknameVietnamese: 'Cẩm Mao Hổ (hổ lông gấm)',
        nickname: '"Multicoloured Tiger"',
        image: '050_dia cuong tinh_cam mao ho_yen thuan.jpg'
    },
    {
        rank: '51',
        nameVietnamese: 'Dương Lâm',
        nicknameVietnamese: 'Cẩm Báo Tử (báo gấm)',
        nickname: '"Multicoloured Leopard"',
        image: '051_dia am tinh_cam bao tu_duong lam.jpg'
    },
    {
        rank: '52',
        nameVietnamese: 'Lăng Chấn',
        nicknameVietnamese: 'Oanh Thiên Lôi (tiếng sét vang trời)',
        nickname: '"Heaven Shaking Thunder"',
        image: '052_dia phu tinh_oanh thien loi_lang chan.jpg'
    },
    {
        rank: '53',
        nameVietnamese: 'Tưởng Kính',
        nicknameVietnamese: 'Thần Toán Tử (người giỏi tính kế)',
        nickname: '"Divine Mathematician"',
        image: '053_dia hoi tinh_than toan tu_tuong kinh.jpg'
    },
    {
        rank: '54',
        nameVietnamese: 'Lã Phương',
        nicknameVietnamese: 'Tiểu Ôn Hầu (Ôn hầu nhỏ)',
        nickname: '"Little Marquis of Wen"',
        image: '054_dia ta tinh_tieu on hau_la phuong.jpg'
    },
    {
        rank: '55',
        nameVietnamese: 'Quách Thịnh',
        nicknameVietnamese: 'Trại Nhân Quý (giống Nhân Quý)',
        nickname: '"Comparable to Rengui"',
        image: '055_dia huu tinh_kien nhan quy_quach thinh.jpg'
    },
    {
        rank: '56',
        nameVietnamese: 'An Đạo Toàn',
        nicknameVietnamese: 'Thần Y (thầy thuốc giỏi)',
        nickname: '"Divine Physician"',
        image: '056_dia linh tinh_than y_an dao toan.jpg'
    },
    {
        rank: '57',
        nameVietnamese: 'Hoàng Phủ Đoan',
        nicknameVietnamese: 'Tử Nhiêm Bá (ông râu tía)',
        nickname: '"Purple Bearded Count"',
        image: '057_dia thu tinh_tu nhiem ba_hoang phu dan.jpg'
    },
    {
        rank: '58',
        nameVietnamese: 'Vương Anh',
        nicknameVietnamese: 'Nuỵ Cước Hổ (hổ chân ngắn)',
        nickname: '"Stumpy Tiger"',
        image: '058_dia vi tinh_nuy cuoc ho_vuong anh.jpg'
    },
    {
        rank: '59',
        nameVietnamese: 'Hổ Tam Nương',
        nicknameVietnamese: 'Nhất Trượng Thanh (một trượng xanh)',
        nickname: '"Ten Feet of Blue"',
        image: '059_dia tue tinh_nhat truong thanh_ho tam nuong.jpg'
    },
    {
        rank: '60',
        nameVietnamese: 'Bào Húc',
        nicknameVietnamese: 'Tang Môn Thần (thần cửa nhà táng)',
        nickname: '"God of Death"',
        image: '060_dia hao tinh_tang mon than_dao huc.jpg'
    },
    {
        rank: '61',
        nameVietnamese: 'Phàn Thụy',
        nicknameVietnamese: 'Hỗn Thế Ma Vương (ma vương càn quấy)',
        nickname: '"Demon King of Chaos"',
        image: '061_dia mac tinh_hon the ma vuong_phan thuy.jpg'
    },
    {
        rank: '62',
        nameVietnamese: 'Khổng Minh',
        nicknameVietnamese: 'Mao Đẩu Tinh (sao nhỏ)',
        nickname: '"Hairy Star"',
        image: '062_dia xuong tinh_mao dau tinh_khong minh.jpg'
    },
    {
        rank: '63',
        nameVietnamese: 'Khổng Lượng',
        nicknameVietnamese: 'Độc Hoả Tinh (sao lửa)',
        nickname: '"Lonely Fiery Star"',
        image: '063_dia cuong tinh_doc hoa tinh_khong luong.jpg'
    },
    {
        rank: '64',
        nameVietnamese: 'Hạng Sung',
        nicknameVietnamese: 'Bát Tý Na Tra (Na Tra 8 tay)',
        nickname: '"Eight-armed Nezha"',
        image: '064_dia phi tinh_bat ty na tra_hang sung.jpg'
    },
    {
        rank: '65',
        nameVietnamese: 'Lý Cổn',
        nicknameVietnamese: 'Phi Thiên Đại Thánh (Đại Thánh về trời)',
        nickname: '"Sky Soaring Great Sage"',
        image: '065_dia tau tinh_phi thien dai thanh_ly con.jpg'
    },
    {
        rank: '66',
        nameVietnamese: 'Kim Đại Kiện',
        nicknameVietnamese: 'Ngọc Tý Tượng (tay thợ ngọc)',
        nickname: '"Jade Armed Craftsman"',
        image: '066_dia xao tinh_ngoc ty tuong_kim dai kien.jpg'
    },
    {
        rank: '67',
        nameVietnamese: 'Mã Lân',
        nicknameVietnamese: 'Thiết Địch Tiên (tiên thổi sáo sắt)',
        nickname: '"Iron Flute Deity"',
        image: '067_dia minh tinh_thiet dich tien_ma lan.jpg'
    },
    {
        rank: '68',
        nameVietnamese: 'Đồng Uy',
        nicknameVietnamese: 'Xuất Động Giao (cá sấu rời động)',
        nickname: '"Dragon Emerging from a Cave"',
        image: '068_dia tien tinh_xuat dong giao_dong uy.jpg'
    },
    {
        rank: '69',
        nameVietnamese: 'Đồng Mãnh',
        nicknameVietnamese: 'Phiên Giang Thẩn (sò khuấy nước)',
        nickname: '"River Churning Clam"',
        image: '069_dia thoai tinh_phan giang than_dong manh.jpg'
    },
    {
        rank: '70',
        nameVietnamese: 'Mạnh Khang',
        nicknameVietnamese: 'Ngọc Phan Cang (cán cờ ngọc)',
        nickname: '"Jade Flagpole"',
        image: '070_dia man tinh_ngoc phan cang_manh khang.jpg'
    },
    {
        rank: '71',
        nameVietnamese: 'Hầu Kiện',
        nicknameVietnamese: 'Thông Tý Viên (vượn tay dài)',
        nickname: '"Long Armed Ape"',
        image: '071_dia toai tinh_thong ty vien_hau kien.jpg'
    },
    {
        rank: '72',
        nameVietnamese: 'Trần Đạt',
        nicknameVietnamese: 'Khiêu Giản Hổ (hổ nhảy khe)',
        nickname: '"Stream Leaping Tiger"',
        image: '072_dia chu tinh_khieu gian ho_tran dat.jpg'
    },
    {
        rank: '73',
        nameVietnamese: 'Dương Xuân',
        nicknameVietnamese: 'Bạch Hoa Xà (rắn hoa trắng)',
        nickname: '"White Flower Serpent"',
        image: '073_dia an tinh_bach hoa xa_duong xuan.jpg'
    },
    {
        rank: '74',
        nameVietnamese: 'Trịnh Thiên Thọ',
        nicknameVietnamese: 'Bạch Diện Lang Quân (anh mặt trắng)',
        nickname: '"Fair Skinned Gentleman"',
        image: '074_dia di tinh_bach dien lang quan_trinh thien tho.jpg'
    },
    {
        rank: '75',
        nameVietnamese: 'Đào Tông Vượng',
        nicknameVietnamese: 'Cửu Vĩ Quy (rùa chín đuôi)',
        nickname: '"Nine Tailed Turtle"',
        image: '075_dia ly tinh_cuu vy quy_dao ton vuong.jpg'
    },
    {
        rank: '76',
        nameVietnamese: 'Tống Thanh',
        nicknameVietnamese: 'Thiết Phiến Tử (tay quạt sắt)',
        nickname: '"Iron Fan"',
        image: '076_dia tuan tinh_thiet phien tu_tong thanh.jpg'
    },
    {
        rank: '77',
        nameVietnamese: 'Nhạc Hoà',
        nicknameVietnamese: 'Thiết Khiếu Tử (tay sáo sắt)',
        nickname: '"Iron Whistle"',
        image: '077_dia nhac tinh_thiet khieu tu_nhac hoa.jpg'
    },
    {
        rank: '78',
        nameVietnamese: 'Cung Vượng',
        nicknameVietnamese: 'Hoa Hạng Hổ (hổ sẹo hoa)',
        nickname: '"Flowery Necked Tiger"',
        image: '078_dia tiep tinh_hoa hang ho_cung vuong.jpg'
    },
    {
        rank: '79',
        nameVietnamese: 'Đinh Đắc Tôn',
        nicknameVietnamese: 'Trúng Tiễn Hổ (hổ trúng tên)',
        nickname: '"Arrow-hit Tiger"',
        image: '079_dia toc tinh_tung tien ho_dinh dac ton.jpg'
    },
    {
        rank: '80',
        nameVietnamese: 'Mục Xuân',
        nicknameVietnamese: 'Tiểu Già Lan (giấu chút ít)',
        nickname: '"Little Restrained"',
        image: '080_dia tran tinh_tieu gia lan_muc xuan.jpg'
    },
    {
        rank: '81',
        nameVietnamese: 'Tào Chính',
        nicknameVietnamese: 'Thao Đao Quỷ (quỷ múa dao)',
        nickname: '"Knife Wielding Demon"',
        image: '081_dia co tinh_thao dao quy_tao chinh.jpg'
    },
    {
        rank: '82',
        nameVietnamese: 'Tống Vạn',
        nicknameVietnamese: 'Vân Lý Kim Cương (thần Kim Cương đường mây)',
        nickname: '"Giant in the Clouds"',
        image: '082_dia ma tinh_van ly kim cuong_tong van.jpg'
    },
    {
        rank: '83',
        nameVietnamese: 'Đỗ Thiên',
        nicknameVietnamese: 'Mô Trước Thiên (sờ được trời)',
        nickname: '"Touching the Sky"',
        image: '083_dia yeu tinh_mo truoc thien_do thien.jpg'
    },
    {
        rank: '84',
        nameVietnamese: 'Tiết Vĩnh',
        nicknameVietnamese: 'Bệnh Đại Trùng (hổ ốm)',
        nickname: '"Sick Tiger"',
        image: '084_dia u tinh_benh dai trung_tiet vinh.jpg'
    },
    {
        rank: '85',
        nameVietnamese: 'Thi Ân',
        nicknameVietnamese: 'Kim Nhãn Bưu (beo mắt vàng)',
        nickname: '"Golden Eyed Tiger Cub"',
        image: '085_dia phuc tinh_kim nhan buu_thi an.jpg'
    },
    {
        rank: '86',
        nameVietnamese: 'Lý Trung',
        nicknameVietnamese: 'Đả Hổ Tướng (tướng đánh hổ)',
        nickname: '"Tiger Slaying General"',
        image: '086_dia tich tinh_da ho tuong_ly trung.jpg'
    },
    {
        rank: '87',
        nameVietnamese: 'Chu Thông',
        nicknameVietnamese: 'Tiểu Bá Vương (Bá vương nhỏ)',
        nickname: '"Little Conqueror"',
        image: '087_dia khong tinh_tieu ba vuong_chu thong.jpg'
    },
    {
        rank: '88',
        nameVietnamese: 'Thang Long',
        nicknameVietnamese: 'Kim Tiền Báo Tử (báo đốm vàng)',
        nickname: '"Gold Coin Spotted Leopard"',
        image: '088_dia co tinh_kim tien bao tu_thang long.jpg'
    },
    {
        rank: '89',
        nameVietnamese: 'Đỗ Hưng',
        nicknameVietnamese: 'Quỷ Kiểm Nhi (gã đếm quỷ)',
        nickname: '"Demon Face"',
        image: '089_dia toan tinh_quy kiem nhi_do hung.jpg'
    },
    {
        rank: '90',
        nameVietnamese: 'Trâu Uyên',
        nicknameVietnamese: 'Xuất Lâm Long (rồng rời rừng)',
        nickname: '"Forest Emerging Dragon"',
        image: '090_dia doan tinh_xuat lam long_trau uyen.jpg'
    },
    {
        rank: '91',
        nameVietnamese: 'Trâu Nhuận',
        nicknameVietnamese: 'Độc Giác Long (rồng một sừng)',
        nickname: '"Single Horned Dragon"',
        image: '091_dia gioc tinh_doc giac long_trau nhuan.jpg'
    },
    {
        rank: '92',
        nameVietnamese: 'Chu Quý',
        nicknameVietnamese: 'Hạn Địa Hốt Luật (cá sấu trên cạn)',
        nickname: '"Dry Land Alligator"',
        image: '092_dia tu tinh_han dia hot luat_chu quy.jpg'
    },
    {
        rank: '93',
        nameVietnamese: 'Chu Phú',
        nicknameVietnamese: 'Tiếu Diện Hổ (hổ mặt cười)',
        nickname: '"Sneering Tiger"',
        image: '093_dia tang tinh_tieu dien ho_chu phu.jpg'
    },
    {
        rank: '94',
        nameVietnamese: 'Sái Phúc',
        nicknameVietnamese: 'Thiết Tý Bác (bác tay sắt)',
        nickname: '"Iron Arm"',
        image: '094_dia binh tinh_thiet ty phu_xai phuc.jpg'
    },
    {
        rank: '95',
        nameVietnamese: 'Sái Khánh',
        nicknameVietnamese: 'Nhất Chi Hoa (một nhành hoa)',
        nickname: '"Stalk of Flower"',
        image: '095_dia ton tinh_nhat chi xoa_xai khanh.jpg'
    },
    {
        rank: '96',
        nameVietnamese: 'Lý Lập',
        nicknameVietnamese: 'Thôi Mệnh Phán Quan (phán quan đoạt mệnh)',
        nickname: '"Life Taking Judge"',
        image: '096_dia no tinh_thoi menh phan quan_ly lap.jpg'
    },
    {
        rank: '97',
        nameVietnamese: 'Lý Vân',
        nicknameVietnamese: 'Thanh Nhãn Hổ (hổ mắt xanh)',
        nickname: '"Green Eyed Tiger"',
        image: '097_dia sat tinh_thanh nho ho_ly van.jpg'
    },
    {
        rank: '98',
        nameVietnamese: 'Tiêu Đĩnh',
        nicknameVietnamese: 'Một Diện Mục (anh xấu hổ)',
        nickname: '"Faceless"',
        image: '098_dia ac tinh_mot dien muc_tieu dinh.jpg'
    },
    {
        rank: '99',
        nameVietnamese: 'Thạch Dũng',
        nicknameVietnamese: 'Thạch Tướng Quân (tướng quân họ Thạch)',
        nickname: '"Stone General"',
        image: '099_dia xu tinh_thach tuong quan_thach dung.jpg'
    },
    {
        rank: '100',
        nameVietnamese: 'Tôn Tân',
        nicknameVietnamese: 'Tiểu Uý Trì (Uý Trì nhỏ) ',
        nickname: '"Little Yuchi"',
        image: '100_dia so tinh_tieu uy tri_ton tan.jpg'
    },
    {
        rank: '101',
        nameVietnamese: 'Cố Đại Tẩu',
        nicknameVietnamese: 'Mẫu Đại Trùng (hổ mẹ)',
        nickname: '"Female Tiger"',
        image: '101_dia am tinh_mau dai trung_co dai tau.jpg'
    },
    {
        rank: '102',
        nameVietnamese: 'Trương Thanh',
        nicknameVietnamese: 'Thái Viên Tử (người trông vườn rau)',
        nickname: '"Gardener"',
        image: '102_dia hinh tinh_thai vien tu_truong thanh.jpg'
    },
    {
        rank: '103',
        nameVietnamese: 'Tôn Nhị Nương',
        nicknameVietnamese: 'Mẫu Dạ Xoa (dạ xoa cái)',
        nickname: '"Female Yaksha"',
        image: '103_dia trang tinh_mau da xoa_ton nhi nuong.jpg'
    },
    {
        rank: '104',
        nameVietnamese: 'Vương Định Lục',
        nicknameVietnamese: 'Hoạt Thiểm Bà (Thiểm Bà sống)',
        nickname: '"Living Goddess of Lightning"',
        image: '104_dia tiet tinh_hoat diem la_vuong dinh luc.jpg'
    },
    {
        rank: '105',
        nameVietnamese: 'Úc Bảo Tứ',
        nicknameVietnamese: 'Hiểm Đạo Thần (thần hiểm ác)',
        nickname: '"God of the Dangerous Road"',
        image: '105_dia kien tinh_hiem dao than_uc bao tu.jpg'
    },
    {
        rank: '106',
        nameVietnamese: 'Bạch Thắng',
        nicknameVietnamese: 'Bạch Nhật Thử (chuột chính ngày)',
        nickname: '"Daylight Rat"',
        image: '106_dia hao tinh_bach nhat thu_bach thang.jpg'
    },
    {
        rank: '107',
        nameVietnamese: 'Thời Thiên',
        nicknameVietnamese: 'Cổ Thượng Tảo (bọ trên trống)',
        nickname: '"Flea on a Drum"',
        image: '107_dia tac tinh_co thuong tao_thoi thien.jpg'
    },
    {
        rank: '108',
        nameVietnamese: 'Đoàn Cảnh Trụ',
        nicknameVietnamese: 'Kim Mao Khuyển (chó lông vàng)',
        nickname: '"Golden Haired Hound"',
        image: '108_dia cau tinh_kim mao khuyen_doan canh tru.jpg'
    }
];
