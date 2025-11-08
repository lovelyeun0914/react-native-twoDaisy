import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


const MAX_IMAGES = 3;

// 프론트 요청 소스예시
// 서버에 이미지 업로드, 이미지 이름 반환


async function uploadImage(file: any) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post("http://10.0.2.2:8000/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(res.data)

  // 서버 응답: { "name": "난수화된이름.png" }
  return res.data;
}

//-----------------------------------------
// 이미지 분석요청 ( 30초가량 소모)

async function analyzeImages(filenames: string[]) {
  const res = await axios.post("http://10.0.2.2:8000/analyze-images", {
    files: filenames,   // ["abc123.png", "def456.jpg"]
// 한장일 때도 배열로 전송하세용
  }, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(res.data)
  return res.data;
  // 서버 응답:{"result_image_path": OUTPUT_IMAGE,        "result_image_name": output_filename      }
}





const Write = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);
  const textAreaRef = useRef<View>(null);
  const [textAreaY, setTextAreaY] = useState(0);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        setIsKeyboardVisible(true);
        setKeyboardHeight(event.endCoordinates.height);
        // 키보드가 나타날 때 "일기 내용" 텍스트가 상단에 오도록 스크롤
        setTimeout(() => {
          if (textAreaY > 0) {
            scrollViewRef.current?.scrollTo({
              y: textAreaY - 20,
              animated: true,
            });
          } else {
            // fallback: 대략적인 값
            scrollViewRef.current?.scrollTo({
              y: 236,
              animated: true,
            });
          }
        }, 100);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [textAreaY]);

  const addImage = async () => {
    if (images.length >= MAX_IMAGES) return;
    
    launchImageLibrary(
      { 
        mediaType: 'photo', 
        selectionLimit: MAX_IMAGES - images.length,
        quality: 0.8
      }, 
      async (response) => {
        if (response.assets && response.assets.length > 0) {
          const newImages = response.assets
            .map(asset => asset.uri)
            .filter(Boolean) as string[];
          setImages([...images, ...newImages].slice(0, MAX_IMAGES));
          
          // 이미지 업로드 실행
          try {
            const uploadPromises = response.assets.map(async (asset) => {
              const file = {
                uri: asset.uri,
                type: asset.type || 'image/jpeg',
                name: asset.fileName || 'image.jpg',
              };
              return await uploadImage(file);
            });
            const uploadResults = await Promise.all(uploadPromises);
            setUploadedFiles([...uploadedFiles, ...uploadResults.map(result => result.name)]);
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
          }
        }
      }
    );
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
    setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== index));
  };

  const handleSave = async () => {
    if (uploadedFiles.length === 0) {
      alert('이미지를 먼저 선택해주세요.');
      return;
    }
    
    try {
      setIsAnalyzing(true);
      const result = await analyzeImages(uploadedFiles);
      console.log('분석 결과:', result);
      
      // MyDiary 페이지로 전환하면서 결과 데이터 전달
      (navigation as any).navigate('내일기 상세', {
        diaryData: {
          text: text,
          resultImage: `http://10.0.2.2:8000/static/outputs/${result.result_image_name}`,
          originalImages: images,
          date: new Date().toISOString().split('T')[0]
        }
      });
    } catch (error) {
      console.error('이미지 분석 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
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
          <View 
            style={styles.textArea} 
            ref={textAreaRef}
            onLayout={(event) => {
              // textArea View의 Y 위치 (ScrollView content 내에서의 상대 위치)
              const { y } = event.nativeEvent.layout;
              // textArea의 margin top(20px)을 고려하면 실제 "일기 내용" 텍스트는
              // y 위치에 있으므로 그대로 사용
              setTextAreaY(y);
            }}
          >
            <Text style={styles.textLabel}>일기 내용</Text>
            <TextInput
              ref={textInputRef}
              style={styles.textInput}
              multiline
              value={text}
              onChangeText={setText}
              placeholder="오늘의 일기를 작성해 주세요"
              onFocus={() => {
                // "일기 내용" 텍스트가 화면 상단에 오도록 스크롤
                setTimeout(() => {
                  if (textAreaY > 0) {
                    scrollViewRef.current?.scrollTo({
                      y: textAreaY - 20, // 약간의 여백을 위해 20px 위로
                      animated: true,
                    });
                  } else {
                    // fallback: 대략적인 값으로 스크롤
                    // guideText(16px margin + ~20px height) + imageArea(200px) = 약 236px
                    scrollViewRef.current?.scrollTo({
                      y: 236,
                      animated: true,
                    });
                  }
                }, 150);
              }}
            />
          </View>

          {/* 저장 버튼 */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name="edit" size={18} color="#fff" style={styles.saveButtonIcon} />
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>

          {/* 키보드 높이만큼 여백 추가 */}
          {isKeyboardVisible && <View style={{ height: keyboardHeight + 20 }} />}
        </ScrollView>

        {isAnalyzing && (
          <View style={styles.overlay}>
            <LottieView
            source={require("../assets/loading.json")}
            autoPlay
            loop
            style={styles.loadingGif} 
          />
          <Text style={styles.loadingText}>그림일기 생성중...</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { height: 63, backgroundColor: '#D9D9D9' },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  guideText: { margin: 16, fontSize: 16, color: '#000' },
  imageArea: { height: 200, marginHorizontal: 20, backgroundColor: '#D9D9D9', borderRadius: 8, flexDirection: 'row', alignItems: 'center', padding: 15, overflow: 'visible' },
  imageContainer: {
    position: 'relative',
    width: 102,
    height: 180,
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
  addButton: { width: 102, height: 180, borderRadius: 8, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  addButtonText: { fontSize: 32, color: '#888' },
  textArea: { margin: 20, backgroundColor: '#fff' },
  textLabel: { fontSize: 16, marginBottom: 8 },
  textInput: { height: SCREEN_HEIGHT * 0.3, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 8, padding: 12, textAlignVertical: 'top', fontFamily: 'Gaegu-Regular', fontSize: 18 },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#b7bb6a',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonIcon: {
    marginRight: 6,
  },
  saveButtonText: { color: '#fff', fontSize: 15 },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Write