create database Food;

use Food;

create table role (
  role_id int ,
  name varchar(50),  
  primary key (role_id)
);

create table user (
  user_id int auto_increment,
  full_name varchar(100), devicemanager
  email varchar(100),      
  phone_number varchar(15), 
  password varchar(255),
  role_id int,
  deleted int,devicemanager
  primary key (user_id),
  foreign key (role_id) references role(role_id)
);

create table category (
  category_id int auto_increment,
  name varchar(100),  
  primary key (category_id)
);

create table product (
  product_id int auto_increment,
  category_id int,
  name varchar(100),  
  price decimal(10, 2),
  thumbnail varchar(255),
  description longtext,
  deleted int,
  primary key (product_id),
  foreign key (category_id) references category(category_id)
);

create table gallery (
  id int auto_increment,
  product_id int,
  thumbnail varchar(255),
  primary key (id),
  foreign key (product_id) references product(product_id)
);

create table customer_order (
  order_id int auto_increment,
  full_name varchar(50),  
  email varchar(50),     
  phone_number varchar(15), 
  address varchar(100),    
  note varchar(100),      
  order_date datetime,
  status int,
  user_id int,
  primary key (order_id),
  foreign key (user_id) references user(user_id)
);


create table order_detail (
  order_detail_id int auto_increment,
  order_id int,
  product_id int,
  price decimal(10, 2),
  quantity int,
  primary key (order_detail_id),
  foreign key (order_id) references customer_order(order_id),
  foreign key (product_id) references product(product_id)
);

create table discount (
  id int auto_increment,
  name varchar(100),  
  code varchar(50),   
  value int,
  date_exp datetime,
  count int,
  primary key (id)
);

create table promote (
  id_product int,
  id_discount int,
  primary key (id_product, id_discount),
  foreign key (id_product) references product(product_id),
  foreign key (id_discount) references discount(id)
);

insert into category (name)
values
('Main Course'),
('Appetizers'),
('Desserts'),
('Beverages');


insert into product ( category_id, name, price, thumbnail, description, deleted) 
values
(2, 'Súp Cua', 40.00, '1', 'Một món súp ngon và đẹp mắt có chứa măng tây tươi và thịt cua.', 0);
SELECT * FROM product;

insert into product ( category_id, name, price, thumbnail, description, deleted) 
values
( 2, 'Nem lụi', 45.00, '2', 'Nem lụi là món nướng Huế làm từ thịt heo xay, thơm ngon và đậm đà.', 0),
( 2, 'Gỏi ngó sen', 65.00, '3', 'Gỏi ngó sen là món gỏi truyền thống Việt Nam, giòn ngon và thanh mát.', 0),
( 2, 'Gỏi cuốn', 30.00, '4', 'Gỏi cuốn gồm tôm, thịt, rau sống cuốn bánh tráng, chấm nước mắm.', 0),
( 2, 'Chả tôm', 40.00, '5', 'Tôm tươi giã nhuyễn, ướp gia vị rồi cuốn trong lá và chiên giòn.', 0),
( 2, 'Gỏi xoài xanh', 40.00, '6', 'Xoài xanh bào sợi, trộn cùng tôm khô, đậu phộng, rau thơm và nước mắm chua cay. Món ăn có vị chua giòn sảng khoái, rất kích thích vị giác.', 0),
( 2, 'Bánh bột lọc', 30.00, '7', 'Bánh bột lọc với lớp vỏ trong suốt, nhân tôm thịt đậm đà, hấp hoặc luộc chín, ăn kèm nước mắm pha vừa miệng.', 0),
( 2, 'Nộm đu đủ', 35.00, '8', 'Đu đủ xanh giòn bào sợi, trộn cùng tôm khô, đậu phộng và rau thơm, tạo nên hương vị chua ngọt hài hòa, giòn giòn sần sật.', 0),
( 2, 'Chả giò', 35.00, '9', 'Cuốn thịt heo xay nhuyễn, miến, nấm và cà rốt, sau đó chiên giòn. Chả giò giòn rụm, thơm lừng, thường chấm cùng nước mắm pha đậm đà.', 0),
( 2, 'Bánh bèo chén', 25.00, '10', 'Bánh bèo nhỏ mềm làm từ bột gạo, bên trên là tôm khô giã nhuyễn và mỡ hành. Món ăn có vị béo ngậy, thường ăn kèm với nước mắm chua ngọt.', 0),
( 2, 'Bánh khọt', 40.00, '11', 'Những chiếc bánh nhỏ làm từ bột gạo, chiên giòn, có nhân tôm tươi bên trong, ăn kèm rau sống và nước mắm pha chua ngọt.', 0),
( 2, 'Chạo tôm', 40.00, '12', 'Tôm băm nhuyễn quấn quanh cây mía rồi nướng, tạo ra hương vị ngọt ngào của tôm và mía. Món này ăn kèm với rau sống và bún.', 0),
( 2, 'Bánh hỏi thịt nướng', 35.00, '13', 'Những lát bánh hỏi mềm mịn được ăn kèm với thịt nướng, rau sống, và nước chấm chua ngọt.', 0),
( 2, 'Bánh cuốn', 35.00, '14', 'Bánh cuốn làm từ bột gạo mỏng, cuốn cùng thịt heo băm và mộc nhĩ, thường ăn kèm với nước mắm pha đậm đà và chả lụa.', 0),
( 2, 'Nem chua rán', 30.00, '15', 'Nem chua được chiên giòn, món này giòn ngoài và mềm dai bên trong, thường chấm cùng tương ớt.', 0),
( 2, 'Bánh phồng tôm', 20.00, '16', 'Bánh phồng giòn tan, được chiên từ bột tôm, rất phổ biến để ăn kèm với các món gỏi hoặc chấm với sốt mayonnaise.', 0),
( 2, 'Xôi chiên phồng', 30.00, '17', 'Xôi được chiên giòn phồng lên, lớp ngoài giòn rụm, bên trong dẻo, thường ăn kèm với thịt nướng và nước chấm.', 0),
( 2, 'Chả cá', 30.00, '18', 'Miếng chả cá giòn ngoài, mềm trong, ăn kèm với rau sống và bún, chấm nước mắm pha cay.', 0),
( 2, 'Khoai môn lệ phố', 30.00, '19', 'Khoai môn nghiền nhuyễn, bao quanh nhân thịt, tôm rồi chiên giòn, tạo ra lớp vỏ giòn và nhân mềm bùi.', 0),
( 2, 'Gỏi bò bắp chuối', 45.00, '20', 'Gỏi làm từ hoa chuối giòn bào sợi, trộn với thịt bò tái và rau thơm, tạo ra hương vị chua ngọt và thanh mát.', 0),
( 4, 'Nước dừa tươi', 15.00, '21', 'Nước dừa tươi ngọt thanh, mát lành, bổ sung năng lượng tự nhiên.', 0),
( 4, 'Trà chanh mật ong', 25.00, '22', 'Trà xanh pha cùng mật ong và chanh tươi, mang đến hương vị thanh mát và bổ dưỡng.', 0),
( 4, 'Bia', 25.00, '23', 'Bia với hương vị đậm đà, tươi mát và chút vị đắng nhẹ, rất phổ biến trên toàn thế giới.', 0),
( 4, 'Nước cam ép', 15.00, '24', 'Nước cam tươi mát, giàu vitamin C, mang lại cảm giác sảng khoái và bổ dưỡng.', 0),
( 4, 'Mojito', 60.00, '25', 'Cocktail từ rượu rum, lá bạc hà, đường, chanh và soda, tạo nên hương vị sảng khoái, mát lạnh.', 0),
( 4, 'Margarita', 55.00, '26', 'Cocktail nổi tiếng với sự kết hợp giữa tequila, nước cốt chanh và rượu Cointreau, vị chua ngọt độc đáo.', 0),
( 4, 'Nước ép dưa hấu', 20.00, '27', 'Nước ép dưa hấu tươi mát, ngọt tự nhiên, giúp giải nhiệt hiệu quả.', 0),
( 4, 'Sinh tố bơ', 25.00, '28', 'Sinh tố bơ sánh mịn, béo ngậy, kết hợp với sữa đặc và đá bào, tạo nên hương vị thơm ngon.', 0),
( 4, 'Coca-Cola', 20.00, '29', 'Nước ngọt có ga phổ biến với hương vị cola, sảng khoái và tươi mát.', 0),
( 4, 'Sinh tố xoài', 30.00, '30', 'Sinh tố xoài chín ngọt ngào, pha chút sữa tươi, tạo nên thức uống thơm ngon và giàu dinh dưỡng.', 0),
( 4, 'Nước ép cam', 25.00, '31', 'Nước ép từ cam tươi, giàu vitamin C, giúp tăng cường sức đề kháng và mang lại hương vị chua ngọt dễ chịu.', 0),
( 4, 'Nước chanh tươi', 20.00, '32', 'Nước chanh pha chút đường và đá, tạo nên hương vị chua ngọt thanh mát, rất phổ biến trong mùa hè.', 0),
( 4, 'Cà phê sữa đá', 25.00, '33', 'Cà phê Việt Nam pha cùng sữa đặc và đá, mang lại vị đắng nhẹ xen lẫn với sự béo ngậy của sữa.', 0),
( 4, 'Nước ép táo', 25.00, '34', 'Nước ép từ táo tươi, giàu vitamin và chất chống oxy hóa, hương vị ngọt thanh, dễ uống.', 0),
( 4, 'Trà sữa trân châu', 25.00, '35', 'Thức uống trà pha cùng sữa và đường, ăn kèm với trân châu dẻo, rất được ưa chuộng bởi giới trẻ.', 0),
( 4, 'Sinh tố dừa', 35.00, '36', 'Sinh tố dừa mát lạnh, vị ngọt béo từ nước cốt dừa, kết hợp với đá bào tạo cảm giác sảng khoái.', 0),
( 4, 'Soda chanh', 30.00, '37', 'Soda pha với chanh tươi, mang đến hương vị chua nhẹ kết hợp với cảm giác có ga sảng khoái.', 0),
( 4, 'Cà phê đen', 35.00, '38', 'Cà phê nguyên chất, vị đắng đậm, dành cho những ai yêu thích hương vị cà phê truyền thống.', 0),
( 4, 'Nước ép cà rốt', 25.00, '39', 'Nước ép từ cà rốt tươi, giàu vitamin A, giúp cải thiện làn da và sức khỏe mắt.', 0),
( 4, 'Nước ép dứa', 25.00, '40', 'Nước ép từ dứa tươi, hương vị chua ngọt, rất tốt cho tiêu hóa và giải khát.', 0);

insert into product ( category_id, name, price, thumbnail, description, deleted) 
values
( 1, 'Phở bò truyền thống', 60.00, '41', 'Phở bò với nước dùng đậm đà từ xương hầm, ăn kèm bánh phở mềm, thịt bò tái, chín và gân bò, rau thơm và hành tây.', 0),
( 1, 'Bún Chả Hà Nội', 55.00, '42', 'Bún tươi ăn kèm thịt nướng thơm lừng, chả viên và nước mắm chua ngọt, đi kèm rau sống và dưa leo.', 0),
( 1, 'Bánh Xèo Miền Tây', 50.00, '43', 'Bánh xèo giòn rụm, nhân tôm, thịt ba chỉ và giá, ăn kèm với rau sống và nước chấm pha chuẩn miền Tây.', 0),
( 1, 'Cơm Tấm Sườn Nướng', 65.00, '44', 'Cơm tấm dẻo mềm, sườn nướng đậm đà, chả trứng, bì và đồ chua, kèm nước mắm pha vừa vị.', 0),
( 1, 'Gỏi Cuốn Tôm Thịt', 40.00, '45', 'Cuốn tươi với tôm, thịt luộc, bún, rau thơm, chấm cùng nước mắm chua ngọt hoặc tương đậu phộng đặc trưng.', 0),
( 1, 'Lẩu Hải Sản Chua Cay (cho 2 người)', 250.00, '46', 'Lẩu hải sản với tôm, mực, nghêu, đậu hũ non và rau các loại, nước lẩu chua cay đặc trưng từ sả, ớt, và cà chua.', 0),
( 1, 'Chả Cá Lã Vọng', 150.00, '47', 'Cá lăng chiên vàng, ăn kèm bún, rau thơm, thì là, và mắm tôm pha chanh ớt đặc trưng.', 0),
( 1, 'Mì Quảng Gà', 55.00, '48', 'Mì quảng sợi to, ăn cùng thịt gà xé, đậu phộng rang, bánh đa, và nước lèo từ gà, sả, nghệ thơm lừng.', 0),
( 1, 'Bò Kho', 60.00, '49', 'Thịt bò hầm mềm, thấm gia vị, ăn kèm bánh mì hoặc bún, kèm theo cà rốt và nước sốt đặc sánh.', 0),
( 1, 'Lẩu Thái Chua Cay (cho 2-3 người)', 280.00, '50', 'Lẩu Thái chua cay đặc trưng với hương vị cay nồng của ớt và chua nhẹ từ sả, chanh, và lá chanh Thái. Nước lẩu đậm đà nấu từ tôm, mực, nghêu, và cá, kèm các loại nấm, đậu hũ non, cà chua, và rau cải. Lẩu còn đi kèm với bún hoặc mì để khách hàng lựa chọn.', 0),
( 1, 'Thịt Nướng Lá Lốt', 70.00, '51', 'Thịt heo băm nhỏ, tẩm ướp gia vị, cuốn trong lá lốt thơm lừng rồi nướng trên than hồng, ăn kèm bún, rau sống và nước mắm chua ngọt.', 0),
( 1, 'Gà Nướng Mật Ong', 85.00, '52', 'Gà ta ướp mật ong, tỏi và gia vị đặc trưng, nướng đến khi da vàng giòn, thịt mềm thơm, ăn kèm dưa leo và nước chấm chua ngọt.', 0),
( 1, 'Sườn Nướng Ngũ Vị', 90.00, '53', 'Sườn non ướp ngũ vị hương, nướng chín vừa tới, giữ được độ mềm và thấm vị, đi kèm với cơm trắng hoặc bánh mì và salad tươi.', 0),
( 1, 'Bạch Tuộc Nướng Sa Tế', 95.00, '54', 'Bạch tuộc tươi ướp sa tế cay nồng, nướng trên than cho lớp ngoài giòn rụm, bên trong dai ngọt, ăn kèm rau sống và nước chấm hải sản.', 0),
( 1, 'Tôm Sú Nướng Muối Ớt', 120.00, '55', 'Tôm sú tươi ướp muối ớt, nướng trên than hồng, vỏ tôm cháy xém thơm nồng, thịt tôm săn chắc ngọt tự nhiên, ăn kèm nước chấm hải sản.', 0),
( 1, 'Cá Kho Tộ', 85.00, '56', 'Cá basa hoặc cá lóc được kho trong nồi đất với nước màu, nước mắm và tiêu, mang lại hương vị đậm đà và thơm lừng. Ăn kèm cơm trắng và rau sống.', 0),
( 1, 'Gà Xào Sả Ớt', 70.00, '57', 'Thịt gà được xào với sả và ớt, tạo ra món ăn cay nhẹ, thơm nồng hương sả, vị ngọt của thịt gà hòa quyện cùng gia vị đậm đà. Ăn kèm cơm trắng.', 0),
( 1, 'Vịt Om Sấu', 120.00, '58', 'Vịt om với sấu chua, khoai sọ và rau thơm, nước dùng chua nhẹ, thịt vịt mềm và thấm gia vị. Món này ăn kèm với bún hoặc cơm trắng.', 0),
( 1, 'Bò Xào Lúc Lắc', 95.00, '59', 'Thịt bò được xào nhanh trên lửa lớn cùng ớt chuông, hành tây và gia vị, tạo nên món ăn có độ mềm thơm, đậm đà, kết hợp hoàn hảo với cơm nóng.', 0),
( 1, 'Tôm Rang Thịt Ba Chỉ', 90.00, '60', 'Tôm tươi và thịt ba chỉ được rang cùng nước mắm và hành tỏi, tạo nên món ăn mặn ngọt đậm đà, ăn kèm cơm nóng.', 0),
( 3, 'Chè Trôi Nước', 35.00, '61', 'Bánh trôi nước làm từ bột nếp dẻo mềm, nhân đậu xanh ngọt bùi, ăn kèm nước đường gừng ấm nóng và nước cốt dừa béo ngậy.', 0),
( 3, 'Chè Đậu Đỏ Nước Cốt Dừa', 30.00, '62', 'Chè đậu đỏ nấu mềm, ăn cùng nước cốt dừa thơm béo và đá bào mát lạnh, tạo nên hương vị thanh mát và ngọt nhẹ.', 0),
( 3, 'Bánh Flan Caramel', 40.00, '63', 'Bánh flan mềm mịn với hương vị béo ngậy của trứng và sữa, phủ lớp caramel ngọt đắng vừa phải, ăn kèm với đá hoặc cà phê.', 0),
( 3, 'Xôi Xoài Nước Cốt Dừa', 45.00, '64', 'Xôi nếp dẻo kết hợp với xoài chín ngọt và nước cốt dừa béo thơm, món tráng miệng đặc trưng với vị ngọt dịu và mát.', 0),
( 3, 'Sương Sáo Hạt É', 30.00, '65', 'Sương sáo mát lạnh kết hợp với hạt é và nước đường phèn thanh mát, món tráng miệng giải nhiệt lý tưởng cho mùa hè.', 0),
( 3, 'Kem Chuối Dừa', 35.00, '66', 'Chuối được bọc trong nước cốt dừa và dừa nạo, sau đó làm đông thành kem mát lạnh, món ăn vừa ngọt dịu vừa thơm lừng.', 0),
( 3, 'Chè Khúc Bạch', 40.00, '67', 'Chè khúc bạch thanh mát, làm từ sữa và gelatin, ăn kèm vải thiều, hạnh nhân giòn và nước đường hoa nhài thơm dịu.', 0),
( 3, 'Dĩa Trái Cây Tươi', 50.00, '68', 'Một dĩa trái cây tươi ngon, bao gồm dưa hấu, dứa, nho, và táo, là món ăn nhẹ nhàng, tốt cho sức khỏe.', 0),
( 3, 'Xoài Dầm Sữa Chua', 40.00, '69', 'Xoài chín ngọt được dầm cùng sữa chua, tạo nên món tráng miệng mát lạnh, thanh mát và tốt cho sức khỏe.', 0),
( 3, 'Dưa Hấu ướp lạnh', 30.00, '70', 'Dưa hấu tươi mát được ướp lạnh, cắt thành miếng vừa ăn, thích hợp cho những ngày hè nóng nực.', 0),
( 3, 'Chè Bưởi', 35.00, '71', 'Chè bưởi làm từ cùi bưởi giòn tan, ăn kèm nước cốt dừa và đậu xanh bùi béo, tạo ra món chè có vị ngọt thanh và giòn sần sật.', 0),
( 3, 'Sinh Tố Bơ', 40.00, '72', 'Sinh tố bơ béo mịn, thơm ngon và bổ dưỡng, làm từ bơ tươi xay nhuyễn với sữa và đá, tạo nên hương vị ngọt ngào, mát lạnh.', 0),
( 3, 'Dứa Nướng Mật Ong', 45.00, '73', 'Dứa chín nướng với mật ong, tạo ra món tráng miệng có vị ngọt đậm đà, chua nhẹ, ăn kèm với một chút kem tươi mát.', 0),
( 3, 'Bánh Chuối Nướng', 40.00, '74', 'Bánh chuối nướng thơm lừng với lớp chuối chín ngọt ngào, ăn kèm nước cốt dừa béo ngậy và chút mè rang vàng giòn.', 0),
( 3, 'Kem Dừa Truyền Thống', 45.00, '75', 'Kem dừa mịn màng, được làm từ nước cốt dừa tươi và cơm dừa non, ăn kèm dừa khô giòn và đậu phộng rang.', 0),
( 3, 'Bánh Da Lợn', 30.00, '76', 'Bánh da lợn nhiều tầng màu sắc làm từ bột nếp và đậu xanh, có vị ngọt dịu và thơm mùi lá dứa, tạo cảm giác dẻo mềm khi ăn.', 0),
( 3, 'Bánh Bò Nướng Lá Dứa', 35.00, '77', 'Bánh bò nướng có màu xanh từ lá dứa, dẻo dai, thơm ngọt tự nhiên, ăn kèm chút dừa nạo tươi.', 0),
( 3, 'Bánh Pía Sầu Riêng', 40.00, '78', 'Bánh pía nhân sầu riêng thơm nồng kết hợp với đậu xanh và lòng đỏ trứng muối, mang đến hương vị độc đáo, ngọt bùi.', 0),
( 3, 'Sương Sa Hột Lựu', 35.00, '79', 'Thạch sương sa dẻo mềm, kết hợp với hột lựu giòn và nước cốt dừa béo ngậy, tạo nên món ăn mát lạnh và ngon miệng.', 0),
( 3, 'Kem Trà Xanh', 45.00, '80', 'Kem vị trà xanh mát lạnh, thơm nồng hương trà đặc trưng, kết hợp với chút sữa tươi ngọt dịu, tạo nên món tráng miệng nhẹ nhàng.', 0);

