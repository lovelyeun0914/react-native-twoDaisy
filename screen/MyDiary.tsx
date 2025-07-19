import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MyDiaryScreen() {
  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.topBar} />

      {/* 날짜 네비게이션 */}
      <View style={styles.dateRow}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.dateText}>2025.05.25</Text>
        <TouchableOpacity>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 일기 내용 박스 */}
      <View style={styles.diaryBox}>
        <Text>여기에 일기 내용이 들어갑니다.</Text>
      </View>

      {/* 하단 버튼들 */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { height: 63, backgroundColor: '#D9D9D9' },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 32,
  },
  dateText: { fontSize: 18, fontWeight: 'bold' },
  diaryBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    margin: 24,
    padding: 24,
    minHeight: 200,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 40,
    marginBottom: 24,
  },
});