import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput,
  TouchableOpacity, Alert, Image, Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

// ==========================================
// DỮ LIỆU PICKER
// ==========================================
const speciesOptions = ['Mèo', 'Chó', 'Thỏ', 'Hamster', 'Chim', 'Khác'];
const genderOptions  = ['Đực', 'Cái'];

// ==========================================
// COMPONENT PICKER MODAL DÙNG LẠI
// ==========================================
const PickerModal = ({ visible, title, options, onSelect, onClose }) => (
  <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={modalStyles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={modalStyles.sheet}>
        <Text style={modalStyles.title}>{title}</Text>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={modalStyles.option}
            onPress={() => { onSelect(opt); onClose(); }}
          >
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
const AddPetScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    gender: '',
    age: '',
    weight: '',
    color: '',
    description: '',
    isVaccinated: false,
    imageUri: null,
  });

  // Quản lý modal picker
  const [pickerVisible, setPickerVisible] = useState({ species: false, gender: false });
  const openPicker  = (key) => setPickerVisible(prev => ({ ...prev, [key]: true }));
  const closePicker = (key) => setPickerVisible(prev => ({ ...prev, [key]: false }));

  // CHỌN ẢNH
  const handlePickImage = async () => {
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
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
    }
  };

  // ĐĂNG KÝ
  const handleRegister = () => {
    const { name, species, breed, gender, age, isVaccinated } = formData;
    if (!name || !species || !breed || !gender || !age) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    if (!isVaccinated) {
      Alert.alert('Thông báo', 'Thú cưng cần đã tiêm chủng đầy đủ mới được duyệt (*)');
      return;
    }
    Alert.alert('Thành công', 'Thú cưng của bạn đã được gửi xét duyệt!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const Label = ({ text, required }) => (
    <Text style={styles.label}>
      {text}{required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );

  // SELECT BOX hiển thị giá trị đã chọn hoặc placeholder
  const SelectBox = ({ value, placeholder, onPress }) => (
    <TouchableOpacity style={styles.selectBox} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.selectText, value && styles.selectTextSelected]}>
        {value || placeholder}
      </Text>
      <Ionicons name="chevron-down" size={18} color="#8D6E63" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Thêm Thú Cưng Mới 🐾</Text>
            <Text style={styles.headerSubtitle}>Điền đầy đủ thông tin để đăng ký</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#A1887F" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>

          {/* HÀNG 1: Tên & Loài */}
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Label text="Tên thú cưng" required />
              <TextInput
                style={styles.input}
                placeholder="Vd: Mochi, Bông..."
                onChangeText={(val) => setFormData({ ...formData, name: val })}
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 15 }]}>
              <Label text="Loài" required />
              <SelectBox
                value={formData.species}
                placeholder="Chọn loài"
                onPress={() => openPicker('species')}
              />
            </View>
          </View>

          {/* HÀNG 2: Giống & Giới tính */}
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Label text="Giống" required />
              <TextInput
                style={styles.input}
                placeholder="Vd: Corgi..."
                onChangeText={(val) => setFormData({ ...formData, breed: val })}
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 15 }]}>
              <Label text="Giới tính" required />
              <SelectBox
                value={formData.gender}
                placeholder="Chọn"
                onPress={() => openPicker('gender')}
              />
            </View>
          </View>

          {/* HÀNG 3: Tuổi, Cân nặng, Màu lông */}
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Label text="Tuổi (tháng)" required />
              <TextInput
                style={styles.input}
                placeholder="Vd: 24"
                keyboardType="numeric"
                onChangeText={(val) => setFormData({ ...formData, age: val })}
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 10 }]}>
              <Label text="Cân nặng (kg)" />
              <TextInput
                style={styles.input}
                placeholder="Vd: 4.5"
                keyboardType="numeric"
                onChangeText={(val) => setFormData({ ...formData, weight: val })}
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 10 }]}>
              <Label text="Màu lông" />
              <TextInput
                style={styles.input}
                placeholder="Vd: Cam..."
                onChangeText={(val) => setFormData({ ...formData, color: val })}
              />
            </View>
          </View>

          {/* Đặc điểm nổi bật */}
          <View style={styles.fieldContainer}>
            <Label text="Đặc điểm nổi bật" />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mô tả tính cách..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={(val) => setFormData({ ...formData, description: val })}
            />
          </View>

          {/* UPLOAD ẢNH */}
          <View style={styles.fieldContainer}>
            <Label text="Ảnh đại diện" />
            <TouchableOpacity
              style={[styles.uploadArea, formData.imageUri && styles.uploadAreaHasImage]}
              onPress={handlePickImage}
            >
              {formData.imageUri ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: formData.imageUri }} style={styles.imagePreview} />
                  <View style={styles.changeImageBadge}>
                    <Ionicons name="camera" size={16} color="#FFF" />
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.uploadIconCircle}>
                    <Ionicons name="camera-outline" size={24} color="#8D6E63" />
                  </View>
                  <Text style={styles.uploadText}>
                    Nhấp để chọn ảnh từ điện thoại{'\n'}(JPG, PNG — tối đa 5MB)
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* CHECKBOX TIÊM CHỦNG */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setFormData({ ...formData, isVaccinated: !formData.isVaccinated })}
          >
            <View style={[styles.checkbox, formData.isVaccinated && styles.checkboxActive]}>
              {formData.isVaccinated ? <Ionicons name="checkmark" size={16} color="#FFF" /> : null}
            </View>
            <Text style={styles.checkboxLabel}>
              Đã tiêm chủng đầy đủ{' '}
              <Text style={styles.required}>(Bắt buộc để được duyệt)</Text>
            </Text>
          </TouchableOpacity>

          {/* FOOTER BUTTONS */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelBtnText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
              <Text style={styles.submitBtnText}>Đăng Ký Thú Cưng ➝</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 15 },
  card: { flex: 1, backgroundColor: '#FFF', borderRadius: 25, overflow: 'hidden', borderWidth: 1, borderColor: '#EFEBE9' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#5D4037' },
  headerSubtitle: { fontSize: 13, color: '#8D6E63', marginTop: 4 },
  closeBtn: { padding: 5 },

  formContent: { padding: 20 },
  row: { flexDirection: 'row', marginBottom: 15 },
  flex1: { flex: 1 },
  fieldContainer: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#5D4037', marginBottom: 8 },
  required: { color: '#D4A373' },

  input: {
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFEBE9',
    borderRadius: 12, padding: 12, fontSize: 14, color: '#333',
  },
  textArea: { height: 100, paddingTop: 12 },

  // Select box — dùng giống input nhưng có chevron
  selectBox: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFEBE9',
    borderRadius: 12, padding: 12, minHeight: 46,
  },
  selectText: { color: '#999', fontSize: 14, flex: 1 },
  selectTextSelected: { color: '#333' }, // Màu đậm hơn khi đã chọn

  // Upload ảnh
  uploadArea: {
    borderWidth: 1, borderColor: '#D4A373', borderStyle: 'dashed',
    borderRadius: 15, padding: 30, alignItems: 'center', backgroundColor: '#FEF6ED',
    minHeight: 140, justifyContent: 'center',
  },
  uploadAreaHasImage: { padding: 10, borderStyle: 'solid', borderColor: '#EFEBE9' },
  uploadIconCircle: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#EFEBE9',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  uploadText: { fontSize: 12, color: '#8D6E63', textAlign: 'center', lineHeight: 18 },

  imagePreviewContainer: { position: 'relative', width: 120, height: 120 },
  imagePreview: { width: '100%', height: '100%', borderRadius: 12 },
  changeImageBadge: {
    position: 'absolute', bottom: -5, right: -5, backgroundColor: '#8D6E63',
    width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FFF',
  },

  // Checkbox
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginBottom: 30 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1,
    borderColor: '#D4A373', marginRight: 10, justifyContent: 'center', alignItems: 'center',
  },
  checkboxActive: { backgroundColor: '#8D6E63', borderColor: '#8D6E63' },
  checkboxLabel: { fontSize: 13, color: '#5D4037', flex: 1 },

  // Footer
  footer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, paddingBottom: 10 },
  cancelBtn: {
    paddingVertical: 14, paddingHorizontal: 25, borderRadius: 12,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFEBE9',
  },
  cancelBtnText: { color: '#8D6E63', fontWeight: 'bold' },
  submitBtn: { paddingVertical: 14, paddingHorizontal: 25, borderRadius: 12, backgroundColor: '#8D6E63' },
  submitBtnText: { color: '#FFF', fontWeight: 'bold' },
});

export default AddPetScreen;