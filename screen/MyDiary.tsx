import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';

export default function MyDiaryScreen() {
  const route = useRoute();
  const routeData = (route.params as any)?.diaryData;
  
  // 테스트용 임시 데이터 (실제 데이터가 없을 때 사용)
  const testData = {
    // text: "오늘은 정말 좋은 하루였어요! 친구들과 함께 맛있는 음식을 먹고 즐거운 시간을 보냈습니다. 이런 소중한 순간들을 잊지 않고 계속 기록하고 싶어요.",
    // resultImage: "http://10.0.2.2:8000/static/outputs/d9df863b8e2f4df3bf36fac4bc87b26e.png",
    // date: "2025.10.04"
  };
  
  // 실제 데이터가 있으면 사용하고, 없으면 테스트 데이터 사용
  const diaryData = routeData || testData;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 날짜 네비게이션 */}
        <View style={styles.dateRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.dateText}>
            {diaryData?.date ? diaryData.date.replace(/-/g, '.') : '2025.05.25'}
          </Text>
          <TouchableOpacity>
            <Ionicons name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* 일기 내용 영역 */}
        {diaryData.resultImage && (
          <View style={styles.resultImageContainer}>
            <Image 
              source={{ uri: diaryData.resultImage }} 
              style={styles.resultImage}
              resizeMode="contain"
            />
          </View>
        )}
        
        {diaryData.text && (
          <View style={styles.textContainer}>
            <Text style={styles.diaryText}>{diaryData.text}</Text>
          </View>
        )}
      </ScrollView>

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
  scrollView: { flex: 1 },
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
  resultImageContainer: {
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 20,
    marginTop: 16
  },
  resultImage: {
    width: '100%',
    height: 400,
    borderRadius: 12,
  },
  textContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 20,
  },
  diaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Gaegu-Bold',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});