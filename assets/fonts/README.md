# Gaegu font files

이 폴더에 다음 파일을 추가하세요:

- Gaegu-Regular.ttf
- Gaegu-Bold.ttf

파일을 추가한 뒤 아래 명령을 실행하여 에셋 링크를 갱신하세요:

```bash
npx react-native-asset
```

iOS는 `pod install` 후 앱을 재빌드, Android도 앱을 재설치(또는 gradle clean) 해주세요. 