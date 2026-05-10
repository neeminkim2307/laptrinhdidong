import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert, Image 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const PersonalInfoScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: 'Linh Nguyễn',
    email: 'owner@pawswork.vn',
    phone: '0901 234 567',
    address: 'Quận 3, TP.HCM',
    avatarUri: null // Sẽ hiển thị ảnh mặc định nếu null
  });

  // HÀM ĐỔI AVATAR
  const handlePickAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Cấp quyền", "Cần quyền truy cập thư viện ảnh để đổi Avatar!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Cắt ảnh vuông/tròn
      quality: 0.8,
    });
    if (!result.canceled) {
      setFormData({ ...formData, avatarUri: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#5D4037" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quản lý tài khoản</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          
          <View style={styles.cardHeader}>
            <Ionicons name="person" size={20} color="#5D4037" />
            <Text style={styles.cardTitle}>Thông Tin Cá Nhân</Text>
          </View>
          <View style={styles.divider} />

          {/* KHU VỰC ĐỔI AVATAR */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatarContainer} onPress={handlePickAvatar}>
              {formData.avatarUri ? (
                <Image source={{ uri: formData.avatarUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>LN</Text>
                </View>
              )}
              <View style={styles.editBadge}>
                <Ionicons name="camera" size={14} color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarHint}>Chạm để thay đổi ảnh</Text>
          </View>

          {/* FORM THÔNG TIN */}
          <View style={styles.field}>
            <Text style={styles.label}>Họ và Tên</Text>
            <TextInput 
              style={styles.input} 
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              value={formData.email}
              keyboardType="email-address"
              onChangeText={(text) => setFormData({...formData, email: text})}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Số Điện Thoại</Text>
            <TextInput 
              style={styles.input} 
              value={formData.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => setFormData({...formData, phone: text})}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Địa Chỉ</Text>
            <TextInput 
              style={styles.input} 
              value={formData.address}
              onChangeText={(text) => setFormData({...formData, address: text})}
            />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Lưu Thay Đổi</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 16, color: '#8D6E63', fontWeight: '600' },
  backBtn: { padding: 5 },
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#EFEBE9' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#5D4037' },
  divider: { height: 1, backgroundColor: '#EFEBE9', marginBottom: 20 },

  // Avatar styles
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatarContainer: { position: 'relative', width: 80, height: 80, borderRadius: 40, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  avatarImage: { width: '100%', height: '100%', borderRadius: 40 },
  avatarPlaceholder: { width: '100%', height: '100%', borderRadius: 40, backgroundColor: '#8D6E63', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#D4A373', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  avatarHint: { fontSize: 12, color: '#A1887F', marginTop: 8 },

  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#5D4037', marginBottom: 6 },
  input: { backgroundColor: '#FFF8F0', borderWidth: 1, borderColor: '#EFEBE9', borderRadius: 12, padding: 14, fontSize: 14, color: '#5D4037' },
  
  saveBtn: { backgroundColor: '#8D6E63', borderRadius: 25, paddingVertical: 14, alignItems: 'center', marginTop: 10, alignSelf: 'flex-start', paddingHorizontal: 30 },
  saveBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});

export default PersonalInfoScreen;