# BÁO CÁO BÀI THI THỰC HÀNH - MMA301
## ỨNG DỤNG DI ĐỘNG BOOKSHELF (EXPO / REACT NATIVE & FIREBASE)

---

## 1. THÔNG TIN BÀI NỘP (STUDENT INFORMATION)
*(Bạn thay đổi thông tin cá nhân bên dưới vào file Word `.docx` trước khi nộp)*

| Trường thông tin | Giá trị điền mẫu (Chỉnh sửa thông tin thật của bạn) |
| :--- | :--- |
| **Student Code:** | **QE200012** *(Điền MSSV của bạn)* |
| **Full Name:** | **Nguyen Van A** *(Điền Họ tên đầy đủ của bạn)* |
| **GitHub Repository URL:** | `https://github.com/DevTurtle-Hub/PE_MMA` |
| **Expo Project Link:** | `https://expo.dev/accounts/username/projects/bookshelf/builds/xxxxxxxx` |
| **Firebase Project ID:** | `pemma301` |
| **Test account email:** | `grader.test@example.com` *(Tài khoản test cho giám khảo)* |
| **Test account password:** | `Password123!` |

---

## 2. CHI TIẾT 16 ẢNH CHỤP MÀN HÌNH MINH CHỨNG (SCREENSHOTS)

> **Lưu ý theo quy định đề thi (Mục 3):**
> - Ảnh chụp phải lấy từ thiết bị thật hoặc máy ảo đang đăng nhập tài khoản test của bạn (không dùng ảnh mockup đồ họa).
> - Mỗi ảnh bắt buộc phải có dòng chú thích (Caption) chính xác bên dưới.

---

### Ảnh 1: Firebase console — Authentication
- **Mục đích:** Chứng minh Authentication đã kích hoạt Email/Password Provider và tài khoản test đã tạo sẵn trên Firebase.
- **Triển khai kỹ thuật:** Firebase Auth SDK với hàm `createUserWithEmailAndPassword` và `signInWithEmailAndPassword` từ `firebase/auth`. Tài khoản `grader.test@example.com` được phân quyền.
- **Hướng dẫn chụp ảnh:** Mở trình duyệt -> Firebase Console -> Project `pemma301` -> Build -> Authentication -> tab Users. Chụp thấy rõ dòng email `grader.test@example.com`.
```
[ CHÈN ẢNH VÀO ĐÂY: Firebase console — Authentication ]
```
**Caption:** *Firebase console — Authentication: the Users list showing your test account.*

---

### Ảnh 2: Firebase console — Firestore data
- **Mục đích:** Chứng minh cấu trúc collection `books` với ít nhất 3 documents mẫu thuộc sở hữu của tài khoản test.
- **Triển khai kỹ thuật:** Collection `books` lưu trữ `id`, `userId`, `title` (<= 100 ký tự), `author` (<= 60 ký tự), `genre` (Fiction/Non-Fiction/Academic/Other), `status` (To Read/Reading/Finished), `rating` (0–5), `favorite` (boolean), `notes` (<= 300 ký tự), `createdAt`.
- **Hướng dẫn chụp ảnh:** Firebase Console -> Firestore Database -> Collection `books`. Chọn xem các document sao cho thấy rõ các trường và `userId`.
```
[ CHÈN ẢNH VÀO ĐÂY: Firebase console — Firestore data ]
```
**Caption:** *Firebase console — Firestore data: the books collection with at least 3 sample documents belonging to your test account.*

---

### Ảnh 3: Firebase console — Security Rules
- **Mục đích:** Chứng minh quy tắc bảo mật Firestore đã được Publish trên Cloud, từ chối mọi truy vấn trái phép hoặc sai schema.
- **Triển khai kỹ thuật:** File `firestore.rules` đảm bảo:
  - Chỉ người đăng nhập (`request.auth != null`) mới được thao tác.
  - Người dùng chỉ được đọc/ghi dữ liệu của chính mình (`resource.data.userId == request.auth.uid`).
  - Kiểm tra tính hợp lệ của schema (độ dài title/author, enum genre/status, rating 0–5, notes <= 300).
- **Hướng dẫn chụp ảnh:** Firebase Console -> Firestore Database -> Tab Rules. Chụp toàn bộ editor chứa rules và nút "Publish" đã hoàn tất.
```
[ CHÈN ẢNH VÀO ĐÂY: Firebase console — Security Rules ]
```
**Caption:** *Firebase console — Security Rules: the Rules tab showing the rules you actually have published, not just saved in an editor.*

---

### Ảnh 4: Register screen — validation
- **Mục đích:** Chứng minh kiểm tra dữ liệu đầu vào màn hình Đăng ký, hiển thị thông báo lỗi chuẩn khi Submit form trống.
- **Triển khai kỹ thuật:** `src/screens/RegisterScreen.tsx` kết hợp `validateRegisterForm` tại `src/utils/validators.ts`. Hiển thị:
  - `Email is required`
  - `Password is required`
  - `Confirm password is required`
  - Khi người dùng bắt đầu sửa trường nào hợp lệ, lỗi trường đó tự động biến mất.
- **Hướng dẫn chụp ảnh:** Mở app ở màn hình Home -> Bấm "Register" -> Để trống cả 3 ô -> Bấm nút "Register". Chụp màn hình hiển thị cả 3 câu thông báo lỗi đỏ.
```
[ CHÈN ẢNH VÀO ĐÂY: Register screen — validation ]
```
**Caption:** *Register screen — validation: the form submitted empty, showing the error messages.*

---

### Ảnh 5: Register screen — success
- **Mục đích:** Chứng minh tạo tài khoản mới thành công trên Firebase Authentication và phản hồi thông báo tức thì.
- **Triển khai kỹ thuật:** `testID="form-success"` hiển thị dòng chữ chuẩn: **`Registration successful`**.
- **Hướng dẫn chụp ảnh:** Nhập email mới hợp lệ, mật khẩu >= 6 ký tự và xác nhận mật khẩu khớp nhau. Bấm "Register" và chụp ngay khi khung xanh `Registration successful` xuất hiện.
```
[ CHÈN ẢNH VÀO ĐÂY: Register screen — success ]
```
**Caption:** *Register screen — success: right after a successful sign-up, showing Registration successful.*

---

### Ảnh 6: Login screen
- **Mục đích:** Chứng minh form đăng nhập ban đầu trống, giao diện sạch đẹp, không bị hiển thị lỗi trước khi submit.
- **Triển khai kỹ thuật:** `src/screens/LoginScreen.tsx` với giao diện chuyên nghiệp, minh họa 3D đọc sách, các ô input chuẩn `Email` và `Password`.
- **Hướng dẫn chụp ảnh:** Từ màn hình Home, bấm nút "Login". Chụp màn hình khi form đang để trống hoàn toàn và chưa tương tác.
```
[ CHÈN ẢNH VÀO ĐÂY: Login screen ]
```
**Caption:** *Login screen: the empty sign-in form.*

---

### Ảnh 7: List screen — after login
- **Mục đích:** Chứng minh màn hình danh sách sách sau khi đăng nhập thành công, hiển thị email người dùng, nút Logout và ít nhất 3 cuốn sách.
- **Triển khai kỹ thuật:** `src/screens/ListScreen.tsx` mang `testID="list-screen"`, header hiển thị `currentUser.email`, nút Logout viền đỏ và FlatList lắng nghe Firestore theo thời gian thực.
- **Hướng dẫn chụp ảnh:** Đăng nhập bằng tài khoản test. Chụp thấy rõ: email trên header, nút Logout, nút `[+ Add New Book]` và danh sách có sẵn ít nhất 3 cuốn sách.
```
[ CHÈN ẢNH VÀO ĐÂY: List screen — after login ]
```
**Caption:** *List screen — after login: showing the user’s e-mail, the Logout button, and at least 3 books already in the list.*

---

### Ảnh 8: Add Book form — validation
- **Mục đích:** Kiểm tra dữ liệu sách không hợp lệ trên form thêm sách, thể hiện đầy đủ các thông báo lỗi chuẩn theo barem.
- **Triển khai kỹ thuật:** `src/components/books/BookForm.tsx` mang `testID="book-form"` kết hợp `validateBookData`. Kiểm tra:
  - `Title is required`
  - `Author is required`
  - `Please choose a genre`
  - `Please choose a status`
  - `Rating must be a whole number from 0 to 5` (nếu nhập số âm hoặc > 5)
  - `Notes must be at most 300 characters` (nếu quá 300 ký tự)
- **Hướng dẫn chụp ảnh:** Tại List screen, bấm `[+ Add New Book]`. Để trống toàn bộ các trường rồi bấm nút "Add Book". Chụp màn hình hiển thị form có các thông báo lỗi đỏ.
```
[ CHÈN ẢNH VÀO ĐÂY: Add Book form — validation ]
```
**Caption:** *Add Book form — validation: the form submitted empty or with bad input, showing the error messages.*

---

### Ảnh 9: Add Book form — success
- **Mục đích:** Thêm sách thành công: hiển thị thông báo `Book added`, form được xóa trắng và sách mới xuất hiện ngay lập tức trong danh sách mà không cần tải lại trang.
- **Triển khai kỹ thuật:** `testID="book-success"` hiển thị dòng chữ **`Book added`**. Sử dụng Optimistic State Update trong `BooksContext.tsx` kết hợp Firestore `createBookDocument`, tự động sắp xếp theo thứ tự bảng chữ cái A–Z.
- **Hướng dẫn chụp ảnh:** Điền đầy đủ thông tin một cuốn sách hợp lệ, bấm "Add Book". Chụp ngay khi thông báo xanh `Book added` xuất hiện và cuốn sách vừa thêm đã nằm trong danh sách bên dưới.
```
[ CHÈN ẢNH VÀO ĐÂY: Add Book form — success ]
```
**Caption:** *Add Book form — success: right after adding a book, showing Book added and the new book now in the list.*

---

### Ảnh 10: Filters and search
- **Mục đích:** Tìm kiếm và lọc sách theo trạng thái, thể loại, yêu thích; kết hợp đồng thời (AND logic) và có nút Clear.
- **Triển khai kỹ thuật:** `src/components/books/BookFilter.tsx` & `src/hooks/useBookFilters.ts`. Hỗ trợ:
  - Search box tìm theo Title hoặc Author (không phân biệt hoa thường).
  - Dropdown Genre: All / Fiction / Non-Fiction / Academic / Other.
  - Dropdown Status: All / To Read / Reading / Finished.
  - Switch Favorites only.
  - Nút Clear Filters reset toàn bộ về mặc định.
- **Hướng dẫn chụp ảnh:** Nhập từ khóa tìm kiếm hoặc chọn lọc theo 1 Genre/Status hoặc bật `Favorites only` để danh sách hiển thị các kết quả tương ứng. Chụp lại màn hình.
```
[ CHÈN ẢNH VÀO ĐÂY: Filters and search ]
```
**Caption:** *Filters and search: the genre filter, the status filter, the favorites-only switch, and the search box each changing what is shown.*

---

### Ảnh 11: Summary
- **Mục đích:** Thống kê tổng hợp số lượng sách, số sách yêu thích và phân tích trạng thái (Status Breakdown) có ít nhất 2 trạng thái khác nhau.
- **Triển khai kỹ thuật:** `src/components/books/BookSummary.tsx`:
  - `testID="book-count"`: hiển thị tổng số sách (số nguyên thuần).
  - `testID="favorite-count"`: hiển thị số sách yêu thích (số nguyên thuần).
  - Status Breakdown: hiển thị số lượng theo trạng thái, sắp xếp giảm dần theo số lượng (ưu tiên To Read -> Reading -> Finished).
- **Hướng dẫn chụp ảnh:** Chụp khối Summary (Current View Summary) hiển thị rõ `Total Books`, `Favorites` và bảng `Status Breakdown` có ít nhất 2 trạng thái khác nhau.
```
[ CHÈN ẢNH VÀO ĐÂY: Summary ]
```
**Caption:** *Summary: book-count, favorite-count and the status breakdown visible, with more than one status represented.*

---

### Ảnh 12: Detail screen — view mode
- **Mục đích:** Xem chi tiết một cuốn sách với đầy đủ các trường thông tin: title, author, genre, status, rating, notes.
- **Triển khai kỹ thuật:** `src/screens/DetailScreen.tsx` hiển thị tiêu đề lớn, tác giả, huy hiệu thể loại, trạng thái, sao đánh giá (x/5), ghi chú và biểu tượng ngôi sao yêu thích trên header.
- **Hướng dẫn chụp ảnh:** Bấm vào một cuốn sách bất kỳ từ danh sách. Chụp màn hình chế độ xem (View Mode) thể hiện đầy đủ các trường thông tin.
```
[ CHÈN ẢNH VÀO ĐÂY: Detail screen — view mode ]
```
**Caption:** *Detail screen — view mode: one book’s full details (title, author, genre, status, rating, notes).*

---

### Ảnh 13: Detail screen — edit mode, validation
- **Mục đích:** Chế độ sửa sách (Edit Mode) kiểm tra dữ liệu đầu vào trước khi lưu, hiển thị lỗi nếu nhập dữ liệu không hợp lệ.
- **Triển khai kỹ thuật:** Bấm nút "Edit" chuyển các trường sang ô nhập liệu có nút Save và Cancel. Sử dụng cùng hàm `validateBookData`. Nếu xóa trống Title/Author và bấm Save, hệ thống chặn lưu và hiện thông báo lỗi đỏ.
- **Hướng dẫn chụp ảnh:** Bấm nút "Edit" tại màn hình Detail, xóa trống ô Title hoặc Author rồi bấm "Save". Chụp ảnh màn hình hiển thị lỗi.
```
[ CHÈN ẢNH VÀO ĐÂY: Detail screen — edit mode, validation ]
```
**Caption:** *Detail screen — edit mode, validation: an edit submitted with bad input, showing the error messages.*

---

### Ảnh 14: Detail screen — after Save
- **Mục đích:** Lưu chỉnh sửa thành công: dữ liệu được cập nhật trên Firestore và quay lại View Mode với giá trị đã sửa đổi.
- **Triển khai kỹ thuật:** Gọi `updateBookDocument` lưu lên Firestore, cập nhật React Context và chuyển `isEditing` về false.
- **Hướng dẫn chụp ảnh:** Nhập thông tin chỉnh sửa hợp lệ (ví dụ đổi Status hoặc sửa nội dung Notes), bấm "Save". Chụp màn hình View Mode hiển thị giá trị mới vừa được lưu.
```
[ CHÈN ẢNH VÀO ĐÂY: Detail screen — after Save ]
```
**Caption:** *Detail screen — after Save: showing the edited values now saved.*

---

### Ảnh 15: Favorite toggle and Delete
- **Mục đích:** Đánh dấu yêu thích (ngôi sao đổi màu) và xóa sách (có hộp thoại xác nhận `Alert.alert`), sách bị xóa biến mất lập tức khỏi danh sách.
- **Triển khai kỹ thuật:**
  - Nút ngôi sao kích hoạt `toggleFavoriteDocument`, cập nhật tức thời trên Firestore và UI.
  - Nút "Delete" kích hoạt `Alert.alert("Confirm Delete", ...)`. Khi chọn Delete, gọi `deleteBookDocument`, điều hướng trở về danh sách và sách lập tức biến mất.
- **Hướng dẫn chụp ảnh:** Ghép hoặc chụp 2 ảnh:
  - Ảnh A: Đang bật ngôi sao yêu thích (ngôi sao màu vàng) hoặc popup xác nhận xóa sách.
  - Ảnh B: Danh sách sau khi cuốn sách đã bị xóa thành công.
```
[ CHÈN ẢNH VÀO ĐÂY: Favorite toggle and Delete ]
```
**Caption:** *Favorite toggle and Delete: a before/after pair showing the star toggled, and a book deleted and gone from the list.*

---

### Ảnh 16: Empty state
- **Mục đích:** Hiển thị thông báo `No books found` khi danh sách không có kết quả (`testID="books-empty"`).
- **Triển khai kỹ thuật:** `src/components/books/BookEmpty.tsx` mang `testID="books-empty"` với dòng chữ chuẩn: **`No books found`**. Tự động hiển thị qua `ListEmptyComponent` của `FlatList` khi mảng `filteredBooks` rỗng.
- **Hướng dẫn chụp ảnh:** Nhập vào ô tìm kiếm một chuỗi không tồn tại (ví dụ: `xyz999`) hoặc đăng nhập tài khoản mới chưa có sách. Chụp ảnh màn hình hiển thị thẻ sách kèm chữ `No books found`.
```
[ CHÈN ẢNH VÀO ĐÂY: Empty state ]
```
**Caption:** *Empty state: the books-empty screen with the text No books found.*

---

## 3. QUY ĐỊNH ĐÓNG GÓI VÀ NỘP BÀI (SUBMISSION GUIDELINES)

Tạo một thư mục mang tên Mã số sinh viên của bạn (ví dụ: `QE200012`) chứa **đúng 2 tệp** sau:

1. **`<StudentCode>.docx`** *(Ví dụ: `QE200012.docx`)*:
   - Tệp Word thực tế (.docx hoặc .doc, không đổi đuôi PDF sang).
   - Sử dụng tệp `QE200012_MMA301_REPORT.docx` đã được tạo sẵn trong thư mục dự án, mở ra bằng Microsoft Word, điền thông tin của bạn và dán 16 ảnh chụp màn hình vào các khung tương ứng, sau đó đổi tên tệp thành mã sinh viên của bạn.

2. **`<StudentCode>.zip`** *(Ví dụ: `QE200012.zip`)*:
   - Nén mã nguồn sạch của dự án.
   - `package.json` nằm ngay ở thư mục gốc của file zip (không nằm trong thư mục con lồng nhau).
   - Bao gồm: `package.json`, lockfile, thư mục `src/`, `firestore.rules`, và `.env.example`.
   - **TUYỆT ĐỐI KHÔNG BAO GỒM**: `node_modules`, `.expo`, `.git`, hoặc tệp `.env` thật chứa khóa bí mật.
