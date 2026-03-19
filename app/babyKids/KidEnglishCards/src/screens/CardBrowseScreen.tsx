import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useApp } from '../context/AppContext';
import { getPresetImageSource } from '../preset';
import type { WordCard } from '../types';

function CardImage({
  card,
  onError,
}: {
  card: WordCard;
  onError?: () => void;
}) {
  const isPreset = card.imageUri.startsWith('asset:');
  const assetKey = isPreset ? card.imageUri.replace('asset:', '') : '';

  if (isPreset) {
    return (
      <Image
        source={getPresetImageSource(assetKey)}
        style={styles.cardImage}
        resizeMode="cover"
      />
    );
  }
  return (
    <Image
      source={{ uri: card.imageUri }}
      style={styles.cardImage}
      resizeMode="cover"
      onError={onError}
    />
  );
}

export default function CardBrowseScreen() {
  const {
    cards,
    currentIndex,
    settings,
    loading,
    speechError,
    setCurrentIndex,
    goToForm,
    goToSettings,
    removeCard,
    setSpeechError,
  } = useApp();

  const [imageError, setImageError] = useState(false);

  const currentCard = cards[currentIndex];

  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  // 预加载 TTS 引擎（Android 首次调用可能无声，需提前初始化）
  useEffect(() => {
    Speech.getAvailableVoicesAsync().catch(() => {});
  }, []);

  const hasMultiple = cards.length > 1;
  const isEmpty = cards.length === 0;

  const speak = (text: string, _lang: 'en-US' | 'zh-CN') => {
    setSpeechError(null);
    try {
      Speech.stop(); // 清除可能卡住的语音队列
      // 不指定 language，使用系统默认 TTS（华为等设备兼容性更好）
      Speech.speak(text, {
        rate: settings.speechRate,
        volume: 1,
        onError: () => {
          setSpeechError('语音不可用，请在 设置→辅助功能→文字转语音 中安装语音包');
        },
      });
    } catch {
      setSpeechError('语音不可用，请检查设备设置');
    }
  };

  const handleDelete = () => {
    if (!currentCard) return;
    Alert.alert('删除卡片', `确定要删除「${currentCard.english}」吗？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: () => removeCard(currentCard),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>还没有单词卡片</Text>
        <Text style={styles.emptyHint}>点击下方按钮添加第一张卡片</Text>
        <TouchableOpacity
          style={styles.addFirstButton}
          onPress={() => goToForm('add')}
          activeOpacity={0.8}
        >
          <Text style={styles.addFirstButtonText}>添加卡片</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToSettings} style={styles.settingsBtn}>
          <Text style={styles.settingsBtnText}>设置</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>宝宝英语卡</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.cardArea}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardWrapper}>
          {imageError ? (
            <View style={[styles.cardImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>图片加载失败</Text>
            </View>
          ) : (
            <CardImage card={currentCard} onError={() => setImageError(true)} />
          )}

          <View style={styles.cardContent}>
            <TouchableOpacity
              style={styles.wordButton}
              onPress={() => speak(currentCard.english, 'en-US')}
              activeOpacity={0.7}
            >
              <Text style={styles.englishText}>{currentCard.english}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wordButton}
              onPress={() => speak(currentCard.chinese, 'zh-CN')}
              activeOpacity={0.7}
            >
              <Text style={styles.chineseText}>{currentCard.chinese}</Text>
            </TouchableOpacity>

            <View style={styles.playRow}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => speak(currentCard.english, 'en-US')}
                activeOpacity={0.8}
              >
                <Text style={styles.playButtonText}>▶ 播放英文</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => speak(currentCard.chinese, 'zh-CN')}
                activeOpacity={0.8}
              >
                <Text style={styles.playButtonText}>▶ 播放中文</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {speechError && (
          <Text style={styles.errorText}>{speechError}</Text>
        )}

        {hasMultiple && (
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
              onPress={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              activeOpacity={0.8}
            >
              <Text style={styles.navButtonText}>上一个</Text>
            </TouchableOpacity>
            <Text style={styles.navIndicator}>
              {currentIndex + 1} / {cards.length}
            </Text>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentIndex === cards.length - 1 && styles.navButtonDisabled,
              ]}
              onPress={() =>
                setCurrentIndex(Math.min(cards.length - 1, currentIndex + 1))
              }
              disabled={currentIndex === cards.length - 1}
              activeOpacity={0.8}
            >
              <Text style={styles.navButtonText}>下一个</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => goToForm('edit', currentCard)}
          activeOpacity={0.8}
        >
          <Text style={styles.footerButtonText}>编辑</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.deleteButton]}
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Text style={[styles.footerButtonText, styles.deleteButtonText]}>删除</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.addButton]}
          onPress={() => goToForm('add')}
          activeOpacity={0.8}
        >
          <Text style={[styles.footerButtonText, styles.addButtonText]}>添加</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  settingsBtn: {
    padding: 8,
  },
  settingsBtnText: {
    fontSize: 16,
    color: '#4A90E2',
  },
  headerRight: {
    width: 60,
  },
  cardArea: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 24,
  },
  cardWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#E8EEF2',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  cardContent: {
    padding: 24,
    gap: 16,
  },
  wordButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  englishText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  chineseText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4A90E2',
  },
  playRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    justifyContent: 'center',
  },
  playButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: '#E74C3C',
    textAlign: 'center',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 8,
  },
  navButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
  },
  navButtonDisabled: {
    backgroundColor: '#B0C4DE',
    opacity: 0.8,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  navIndicator: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E8EEF2',
  },
  footerButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#E8EEF2',
  },
  footerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FFE8E8',
  },
  deleteButtonText: {
    color: '#E74C3C',
  },
  addButton: {
    backgroundColor: '#4A90E2',
  },
  addButtonText: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  emptyHint: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  addFirstButton: {
    paddingVertical: 18,
    paddingHorizontal: 48,
    backgroundColor: '#4A90E2',
    borderRadius: 14,
  },
  addFirstButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});
