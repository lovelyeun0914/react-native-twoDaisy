import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const MAX_IMAGES = 3;

const Write = () => {
  const [images, setImages] = useState<string[]>([]);
  const [text, setText] = useState('');

  const addImage = async () => {
    if (images.length >= MAX_IMAGES) return;
    
    launchImageLibrary(
      { 
        mediaType: 'photo', 
        selectionLimit: MAX_IMAGES - images.length,
        quality: 0.8
      }, 
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const newImages = response.assets
            .map(asset => asset.uri)
            .filter(Boolean) as string[];
          setImages([...images, ...newImages].slice(0, MAX_IMAGES));
        }
      }
    );
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  return (
    <View style={styles.container}>

      {/* 안내 텍스트 */}
      <Text style={styles.guideText}>일기로 만들 사진을 선택해 주세요(최대 3장)</Text>

      {/* 사진 선택 영역 */}
      <View style={styles.imageArea}>
        <ScrollView horizontal>
          {images.map((uri, idx) => (
            <View key={idx} style={styles.imageContainer}>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteImage(idx)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
              <Image source={{ uri }} style={styles.imageThumb} />
              
            </View>
          ))}
          {images.length < MAX_IMAGES && (
            <TouchableOpacity style={styles.addButton} onPress={addImage}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* 텍스트 입력 영역 */}
      <View style={styles.textArea}>
        <Text style={styles.textLabel}>일기 내용</Text>
        <TextInput
          style={styles.textInput}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="오늘의 일기를 작성해 주세요"
        />
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { height: 63, backgroundColor: '#D9D9D9' },
  guideText: { margin: 16, fontSize: 16, color: '#000' },
  imageArea: { height: 120, marginHorizontal: 20, backgroundColor: '#D9D9D9', borderRadius: 8, flexDirection: 'row', alignItems: 'center', padding: 15, overflow: 'visible' },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#eee',
  },
  imageThumb: { width: '100%', height: '100%', borderRadius: 8 },
    deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteButtonText: {
    bottom: 1,
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  addButton: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  addButtonText: { fontSize: 32, color: '#888' },
  textArea: { margin: 20, backgroundColor: '#fff' },
  textLabel: { fontSize: 16, marginBottom: 8 },
  textInput: { height: 120, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 8, padding: 12, textAlignVertical: 'top' },
  saveButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#6750A3',
    borderRadius: 12, // 더 각진 느낌
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },  saveButtonText: { color: '#fff', fontSize: 15 },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, backgroundColor: '#F3EDF7', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
});

export default Write