import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../context/AppContext';
import { compressAndSaveImage } from '../storage';
import { getPresetImageSource } from '../preset';
import type { WordCard } from '../types';

export default function CardFormScreen() {
  const { formMode, editingCard, goToBrowse, saveCard, updateCardData } = useApp();

  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const isEdit = formMode === 'edit';

  useEffect(() => {
    if (editingCard) {
      setEnglish(editingCard.english);
      setChinese(editingCard.chinese);
      setImageUri(editingCard.imageUri);
    } else {
      setEnglish('');
      setChinese('');
      setImageUri(null);
    }
  }, [editingCard]);

  const pickImage = async () => {
    setPermissionError(null);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setPermissionError('需要相册权限才能选择图片，请在设置中开启');
      Alert.alert(
        '权限被拒绝',
        '用于选择单词卡片的图片。请在系统设置中允许访问相册。',
        [
          { text: '取消', style: 'cancel' },
          { text: '去设置', onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;
    setSaving(true);
    try {
      const compressedUri = await compressAndSaveImage(uri);
      setImageUri(compressedUri);
    } catch {
      Alert.alert('错误', '图片处理失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    const en = english.trim();
    const zh = chinese.trim();

    if (!en || !zh) {
      Alert.alert('提示', '请填写英文和中文');
      return;
    }

    if (!imageUri) {
      Alert.alert('提示', '请选择一张图片');
      return;
    }

    setSaving(true);
    try {
      if (isEdit && editingCard) {
        await updateCardData(editingCard.id, {
          english: en,
          chinese: zh,
          imageUri: imageUri!,
        });
      } else {
        await saveCard({
          english: en,
          chinese: zh,
          imageUri: imageUri!,
        });
      }
    } catch {
      Alert.alert('错误', '保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const isPreset = imageUri?.startsWith('asset:');
  const assetKey = isPreset ? (imageUri ?? '').replace('asset:', '') : '';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={goToBrowse} style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>取消</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEdit ? '编辑卡片' : '添加卡片'}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={pickImage}
          disabled={saving}
          activeOpacity={0.8}
        >
          {imageUri ? (
            isPreset ? (
              <Image
                source={getPresetImageSource(assetKey)}
                style={styles.previewImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: imageUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            )
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>点击选择图片</Text>
            </View>
          )}
          {saving && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        {permissionError && (
          <Text style={styles.errorText}>{permissionError}</Text>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>英文</Text>
          <TextInput
            style={styles.input}
            value={english}
            onChangeText={setEnglish}
            placeholder="例如：cat"
            placeholderTextColor="#999"
            autoCapitalize="none"
            editable={!saving}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>中文</Text>
          <TextInput
            style={styles.input}
            value={chinese}
            onChangeText={setChinese}
            placeholder="例如：猫"
            placeholderTextColor="#999"
            editable={!saving}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {saving ? '保存中...' : '保存'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEF2',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cancelBtn: {
    padding: 8,
  },
  cancelBtnText: {
    fontSize: 16,
    color: '#666',
  },
  headerRight: {
    width: 60,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  imagePicker: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#E8EEF2',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#E74C3C',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8EEF2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    color: '#1a1a1a',
  },
  saveButton: {
    marginTop: 24,
    paddingVertical: 18,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});
