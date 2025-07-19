import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// 색상 변환 함수
const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map(x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

const COLOR_BG = rgbToHex(1, 1, 1); // #ffffff
const COLOR_NAV = rgbToHex(0.95, 0.93, 0.97); // #f3edf7
const COLOR_RECT = rgbToHex(0.85, 0.85, 0.85); // #d9d9d9
const COLOR_ELLIPSE = rgbToHex(0.90, 0.94, 1); // #e6efff

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 캘린더/원형/텍스트 등 */}
        <View style={styles.calendarSection}>
          {['월', '화', '수', '목', '금', '토', '일'].map((day, idx) => (
            <View key={day} style={{ alignItems: 'center' }}>
              <Text style={styles.dayLabel}>{day}</Text>
              {idx === 1 ? (
                <View style={[styles.ellipse, { backgroundColor: 'transparent', borderWidth: 0 }]}>
                  <Text style={styles.dateLabel}>{idx + 1}</Text>
                </View>
              ) : (
                <View style={styles.ellipse}>
                  <Text style={styles.dateLabel}>{idx + 1}</Text>
                </View>
              )}
            </View>
          ))}
          {/* 캘린더, 날짜 등은 별도 컴포넌트로 분리 가능 */}
        </View>

        {/* 어제 작성한 일기 */}
        <Text style={styles.diaryTitle}>어제 작성한 일기</Text>

        {/* 오늘의 일기 작성 안내 + 화살표 */}
        <View style={styles.todaySection}>
          <Text style={styles.todayText}>오늘의 일기를 작성하세요!</Text>
          {/* <ArrowRightIcon /> */}
        </View>

        {/* 본문 영역 (Rectangle 3) */}
        <View style={styles.bodyRect} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLOR_BG },
  container: { flexGrow: 1, backgroundColor: COLOR_BG },
  dayLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  topBar: {
    width: '100%',
    height: 63,
    backgroundColor: COLOR_RECT,
  },
  calendarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  ellipse: {
    width: 34,
    height: 35,
    borderRadius: 17,
    backgroundColor: COLOR_ELLIPSE,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  diaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 34,
    marginTop: 20,
    color: '#000',
  },
  todaySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 36,
    marginRight: 36,
    justifyContent: 'space-between',
  },
  todayText: {
    fontSize: 16,
    color: '#000',
  },
  bodyRect: {
    width: 343,
    height: 300,
    backgroundColor: COLOR_RECT,
    alignSelf: 'center',
    marginVertical: 24,
    borderRadius: 12,
  },
});

export default HomeScreen;