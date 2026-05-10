import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TextInput, TouchableOpacity, Alert, Image, Modal, FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

// ==========================================
// DỮ LIỆU PICKER
// ==========================================
const speciesOptions = ['Mèo', 'Chó', 'Thỏ', 'Hamster', 'Chim', 'Khác'];
const genderOptions = ['Đực', 'Cái'];
const statusOptions = ['Đang Làm', 'Đang Ở', 'Chờ Duyệt'];

// ==========================================
// COMPONENT PICKER MODAL DÙNG LẠI
// ==========================================
const PickerModal = ({ visible, title, options, onSelect, onClose }) => (
  <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={modalStyles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={modalStyles.sheet}>
        <Text style={modalStyles.title}>{title}</Text>
        {options.map((opt) => (
          <TouchableOpacity key={opt} style={modalStyles.option} onPress={() => { onSelect(opt); onClose(); }}>
            <Text style={modalStyles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose}>
          <Text style={modalStyles.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#5D4037', marginBottom: 16, textAlign: 'center' },
  option: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', alignItems: 'center' },
  optionText: { fontSize: 16, color: '#4E342E' },
  cancelBtn: { marginTop: 10, paddingVertical: 14, alignItems: 'center', backgroundColor: '#FFF8F0', borderRadius: 12 },
  cancelText: { fontSize: 15, color: '#A1887F', fontWeight: '600' },
});

// ==========================================
// COMPONENT CHÍNH
// ==========================================
const PetDetailScreen = ({ route, navigation }) => {
  // Nhận dữ liệu thú cưng từ navigation params
  const { pet } = route.params;

  const [formData, setFormData] = useState({
    name: pet.name || '',
    species: pet.type || '',
    breed: pet.breed || '',
    gender: pet.gender || '',
    age: pet.age ? String(pet.age) : '',
    weight: pet.weight || '',
    color: pet.color || '',
    description: pet.description || '',
    isVaccinated: pet.isVaccinated ?? true,
    status: pet.status || 'Đang Làm',
    imageUri: pet.imageUri || null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [pickerVisible, setPickerVisible] = useState({ species: false, gender: false, status: false });

  const openPicker = (key) => setPickerVisible(prev => ({ ...prev, [key]: true }));
  const closePicker = (key) => setPickerVisible(prev => ({ ...prev, [key]: false }));

  // HÀM ĐỔI ẢNH
  const handlePickImage = async () => {
    if (!isEditing) return;
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Cấp quyền', 'Bạn cần cho phép truy cập thư viện ảnh!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setFormData(prev => ({ ...prev, imageUri: result.assets[0].uri }));
      }
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
    }
  };

  // LƯU THAY ĐỔI
  const handleSave = () => {
    if (!formData.name || !formData.species || !formData.breed || !formData.gender || !formData.age) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ các trường bắt buộc (*)');
      return;
    }
    Alert.alert('Thành công', 'Thông tin thú cưng đã được cập nhật!', [
      { text: 'OK', onPress: () => { setIsEditing(false); navigation.goBack(); } }
    ]);
  };

  // XÓA THÚ CƯNG
  const handleDelete = () => {
    Alert.alert(
      'Xóa thú cưng',
      `Bạn có chắc muốn xóa ${formData.name} khỏi danh sách?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => navigation.goBack() }
      ]
    );
  };

  // Lấy màu badge theo status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Đang Làm': return { bg: '#E8F5E9', text: '#4CAF50', dot: '#4CAF50' };
      case 'Đang Ở':   return { bg: '#E3F2FD', text: '#2196F3', dot: '#42A5F5' };
      default:          return { bg: '#FFF3E0', text: '#FF9800', dot: '#FF9800' };
    }
  };
  const statusStyle = getStatusStyle(formData.status);

  // ---- LABEL HELPER ----
  const Label = ({ text, required }) => (
    <Text style={styles.label}>
      {text}{required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );

  // ---- SELECT BOX ----
  const SelectBox = ({ value, placeholder, onPress, disabled }) => (
    <TouchableOpacity
      style={[styles.input, styles.selectBox, disabled && styles.inputReadOnly]}
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[styles.inputText, !value && { color: '#999' }]}>
        {value || placeholder}
      </Text>
      {!disabled && <Ionicons name="chevron-down" size={18} color="#8D6E63" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={24} color="#5D4037" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi Tiết Thú Cưng</Text>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Text style={styles.editBtnText}>{isEditing ? 'Lưu' : 'Sửa'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* KHU VỰC AVATAR + TRẠNG THÁI */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={handlePickImage} activeOpacity={isEditing ? 0.7 : 1}>
            {formData.imageUri ? (
              <Image source={{ uri: formData.imageUri }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: pet.avatarColor || '#FFB89E' }]}>
                <Text style={styles.avatarLetter}>{formData.name?.[0]?.toUpperCase() || pet.avatarLetter}</Text>
              </View>
            )}
            {isEditing && (
              <View style={styles.cameraOverlay}>
                <Ionicons name="camera" size={22} color="#FFF" />
              </View>
            )}
            <View style={[styles.statusDotBig, { backgroundColor: statusStyle.dot }]} />
          </TouchableOpacity>

          <Text style={styles.profileName}>{formData.name}</Text>
          <Text style={styles.profileBreed}>{formData.breed} · {formData.species}</Text>

          {/* Badge trạng thái — có thể bấm khi đang edit */}
          <TouchableOpacity
            style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
            onPress={() => isEditing && openPicker('status')}
            activeOpacity={isEditing ? 0.7 : 1}
          >
            <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>{formData.status}</Text>
            {isEditing && <Ionicons name="chevron-down" size={13} color={statusStyle.text} style={{ marginLeft: 4 }} />}
          </TouchableOpacity>

          {/* Rating & Ca làm */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color="#FF9800" />
              <Text style={styles.statValue}>{pet.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color="#8D6E63" />
              <Text style={styles.statValue}>{pet.shifts}</Text>
              <Text style={styles.statLabel}>Ca làm</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="calendar-outline" size={16} color="#8D6E63" />
              <Text style={styles.statValue}>{formData.age}</Text>
              <Text style={styles.statLabel}>Tháng tuổi</Text>
            </View>
          </View>
        </View>

        {/* FORM THÔNG TIN */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="paw" size={18} color="#D4A373" />
            <Text style={styles.cardTitle}>Thông Tin Cơ Bản</Text>
          </View>
          <View style={styles.divider} />

          {/* Tên & Loài */}
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Label text="Tên thú cưng" required />
              <TextInput
                style={[styles.input, !isEditing && styles.inputReadOnly]}
                value={formData.name}
                editable={isEditing}
                onChangeText={(val) => setFormData({ ...formData, name: val })}
                placeholder="Tên thú cưng"
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 12 }]}>
              <Label text="Loài" required />
              <SelectBox
                value={formData.species}
                placeholder="Chọn loài"
                onPress={() => openPicker('species')}
                disabled={!isEditing}
              />
            </View>
          </View>

          {/* Giống & Giới tính */}
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Label text="Giống" required />
              <TextInput
                style={[styles.input, !isEditing && styles.inputReadOnly]}
                value={formData.breed}
                editable={isEditing}
                onChangeText={(val) => setFormData({ ...formData, breed: val })}
                placeholder="Giống"
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 12 }]}>
              <Label text="Giới tính" required />
              <SelectBox
                value={formData.gender}
                placeholder="Chọn"
                onPress={() => openPicker('gender')}
                disabled={!isEditing}
              />
            </View>
          </View>

          {/* Tuổi, Cân nặng, Màu lông */}
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Label text="Tuổi (tháng)" required />
              <TextInput
                style={[styles.input, !isEditing && styles.inputReadOnly]}
                value={formData.age}
                editable={isEditing}
                keyboardType="numeric"
                onChangeText={(val) => setFormData({ ...formData, age: val })}
                placeholder="VD: 24"
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 10 }]}>
              <Label text="Cân nặng (kg)" />
              <TextInput
                style={[styles.input, !isEditing && styles.inputReadOnly]}
                value={formData.weight}
                editable={isEditing}
                keyboardType="numeric"
                onChangeText={(val) => setFormData({ ...formData, weight: val })}
                placeholder="VD: 4.5"
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 10 }]}>
              <Label text="Màu lông" />
              <TextInput
                style={[styles.input, !isEditing && styles.inputReadOnly]}
                value={formData.color}
                editable={isEditing}
                onChangeText={(val) => setFormData({ ...formData, color: val })}
                placeholder="VD: Cam"
              />
            </View>
          </View>

          {/* Đặc điểm */}
          <View style={{ marginBottom: 10 }}>
            <Label text="Đặc điểm nổi bật" />
            <TextInput
              style={[styles.input, styles.textArea, !isEditing && styles.inputReadOnly]}
              value={formData.description}
              editable={isEditing}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={(val) => setFormData({ ...formData, description: val })}
              placeholder="Mô tả tính cách..."
            />
          </View>

          {/* Checkbox tiêm chủng */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => isEditing && setFormData({ ...formData, isVaccinated: !formData.isVaccinated })}
            activeOpacity={isEditing ? 0.7 : 1}
          >
            <View style={[styles.checkbox, formData.isVaccinated && styles.checkboxActive]}>
              {formData.isVaccinated ? <Ionicons name="checkmark" size={14} color="#FFF" /> : null}
            </View>
            <Text style={styles.checkboxLabel}>Đã tiêm chủng đầy đủ</Text>
          </TouchableOpacity>
        </View>

        {/* NÚT XÓA */}
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={18} color="#F44336" />
          <Text style={styles.deleteBtnText}>Xóa thú cưng này</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* FOOTER KHI ĐANG EDIT */}
      {isEditing && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
            <Text style={styles.cancelBtnText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Lưu Thay Đổi</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* PICKER MODALS */}
      <PickerModal
        visible={pickerVisible.species}
        title="Chọn loài"
        options={speciesOptions}
        onSelect={(val) => setFormData({ ...formData, species: val })}
        onClose={() => closePicker('species')}
      />
      <PickerModal
        visible={pickerVisible.gender}
        title="Chọn giới tính"
        options={genderOptions}
        onSelect={(val) => setFormData({ ...formData, gender: val })}
        onClose={() => closePicker('gender')}
      />
      <PickerModal
        visible={pickerVisible.status}
        title="Chọn trạng thái"
        options={statusOptions}
        onSelect={(val) => setFormData({ ...formData, status: val })}
        onClose={() => closePicker('status')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  headerBtn: { padding: 6, minWidth: 44, alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#5D4037' },
  editBtnText: { fontSize: 15, color: '#D4A373', fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 10 },

  // Profile Section
  profileSection: {
    backgroundColor: '#FFF', borderRadius: 24, padding: 24,
    alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: '#EFEBE9',
  },
  avatarWrapper: { position: 'relative', marginBottom: 14 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  avatarLetter: { fontSize: 38, fontWeight: 'bold', color: '#FFF' },
  cameraOverlay: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)', width: 32, height: 32,
    borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FFF',
  },
  statusDotBig: {
    position: 'absolute', bottom: 4, right: 4,
    width: 18, height: 18, borderRadius: 9, borderWidth: 3, borderColor: '#FFF',
  },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#4E342E', marginBottom: 4 },
  profileBreed: { fontSize: 13, color: '#8D6E63', marginBottom: 10 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 5, borderRadius: 14, marginBottom: 20,
  },
  statusBadgeText: { fontSize: 13, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#4E342E', marginTop: 4 },
  statLabel: { fontSize: 11, color: '#A1887F' },
  statDivider: { width: 1, height: 36, backgroundColor: '#EFEBE9' },

  // Card
  card: {
    backgroundColor: '#FFF', borderRadius: 20, padding: 18,
    marginBottom: 16, borderWidth: 1, borderColor: '#EFEBE9',
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#5D4037' },
  divider: { height: 1, backgroundColor: '#EFEBE9', marginBottom: 16 },

  // Form
  row: { flexDirection: 'row', marginBottom: 14 },
  flex1: { flex: 1 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#5D4037', marginBottom: 6 },
  required: { color: '#D4A373' },
  input: {
    backgroundColor: '#FFF8F0', borderWidth: 1, borderColor: '#EFEBE9',
    borderRadius: 12, padding: 11, fontSize: 14, color: '#333',
  },
  inputReadOnly: { backgroundColor: '#FAFAFA', borderColor: '#F0EDE9', color: '#666' },
  inputText: { flex: 1, fontSize: 14, color: '#333' },
  selectBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textArea: { height: 90, paddingTop: 10 },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1.5,
    borderColor: '#D4A373', marginRight: 10, justifyContent: 'center', alignItems: 'center',
  },
  checkboxActive: { backgroundColor: '#8D6E63', borderColor: '#8D6E63' },
  checkboxLabel: { fontSize: 13, color: '#5D4037' },

  // Delete
  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 14, backgroundColor: '#FFEBEE', marginBottom: 10,
  },
  deleteBtnText: { color: '#F44336', fontWeight: 'bold', fontSize: 14 },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', padding: 16, paddingBottom: 30, gap: 12,
    backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F0EDE9',
  },
  cancelBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: 'center',
    borderWidth: 1, borderColor: '#EFEBE9', backgroundColor: '#FFF',
  },
  cancelBtnText: { color: '#8D6E63', fontWeight: 'bold', fontSize: 15 },
  saveBtn: {
    flex: 2, paddingVertical: 14, borderRadius: 14, alignItems: 'center',
    backgroundColor: '#8D6E63',
  },
  saveBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
});

export default PetDetailScreen;