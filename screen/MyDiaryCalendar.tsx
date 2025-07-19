import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyDiaryCalendar = () => {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => setSelected(day.dateString)}

        dayComponent={({ date, state }) => {
          // 3일만 이미지
          if (date.day === 4 || date.day === 31 || date.day === 3) {
            return (
              <View style={styles.dayImageBackground}>
                <Text
                  style={[
                    styles.dayText,
                    state === 'disabled' && { color: '#d9e1e8' },
                    selected === date.dateString && { color: '#fff', fontWeight: 'bold' }
                  ]}
                >
                  {date.day}
                </Text>
                <ImageBackground
                  source={require('../assets/image1.png')}
                  style={{
                    width: 50,
                    height: 70, // 셀 전체(75)에서 텍스트(12~14)만큼만 남기고 거의 다 채움
                    marginTop: 2, // 텍스트와 이미지 사이 최소 간격
                  }}
                />
              </View>
            );
          }
          // 나머지 날짜
          return (
            <View style={styles.dayDefault}>
              <Text
                style={[
                  styles.dayText,
                  state === 'disabled' && { color: '#d9e1e8' }   ]}>
                {date.day}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  dayImageBackground: {
    width: 45,
    height: 75,
    justifyContent: 'flex-start', // 텍스트를 위로
    alignItems: 'center',
    paddingTop: 2, // 더 위로 붙이고 싶으면 0~2
  },
  dayDefault: {
    width: 45,
    height: 75,
    justifyContent: 'flex-start', // 텍스트를 위로
    alignItems: 'center',
    paddingTop: 2,
  },
  dayText: {
    fontSize: 12, // 더 작게
    color: '#222',
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  diaryBox: { marginTop: 24, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 12 },
  diaryText: { fontSize: 16, color: '#333' },
});

export default MyDiaryCalendar;