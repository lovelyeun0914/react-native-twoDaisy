import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
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
    <ImageBackground 
      source={require('../assets/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
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
          <View style={styles.bodyRect}>
            <Image 
              source={require('../assets/draw.png')} 
              style={styles.bodyImage}
              resizeMode="cover"
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flexGrow: 1, backgroundColor: 'transparent' },
  dayLabel: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Gaegu-Regular',
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
    backgroundColor: '#cdd177',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateLabel: {
    // fontWeight: 'bold',

    fontSize: 16,
    color: '#333',
    // fontFamily: 'Gaegu-Regular',
  },
  diaryTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginLeft: 34,
    marginTop: 20,
    color: '#000',
    fontFamily: 'Gaegu-Bold',
  },
  todaySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    marginLeft: 36,
    marginRight: 36,
    justifyContent: 'space-between',
  },
  todayText: {
    fontSize: 16,
    color: '#000'
    },
  bodyRect: {
    width: 343,
    height: 300,
    backgroundColor: COLOR_RECT,
    alignSelf: 'center',
    marginVertical: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bodyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});

export default HomeScreen;