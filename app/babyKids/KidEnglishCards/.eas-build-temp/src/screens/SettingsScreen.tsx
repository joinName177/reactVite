import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useApp } from '../context/AppContext';
import { DEFAULT_SPEECH_RATE } from '../constants';

export default function SettingsScreen() {
  const { settings, goToBrowse, updateSettings } = useApp();

  const rateLabel =
    settings.speechRate <= 0.6
      ? '很慢'
      : settings.speechRate <= 0.9
        ? '较慢'
        : settings.speechRate <= 1.1
          ? '正常'
          : settings.speechRate <= 1.5
            ? '较快'
            : '很快';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToBrowse} style={styles.backBtn}>
          <Text style={styles.backBtnText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>设置</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>语音</Text>
          <View style={styles.row}>
            <Text style={styles.label}>语速</Text>
            <Text style={styles.value}>{rateLabel}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2}
            step={0.1}
            value={settings.speechRate}
            onValueChange={(v) => updateSettings({ speechRate: v })}
            minimumTrackTintColor="#4A90E2"
            maximumTrackTintColor="#E8EEF2"
            thumbTintColor="#4A90E2"
          />
          <Text style={styles.hint}>较慢语速更适合儿童学习</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>关于</Text>
          <Text style={styles.aboutText}>宝宝英语卡 v1.0.0</Text>
          <Text style={styles.aboutDesc}>
            帮助 2-8 岁儿童通过图片和声音认知英语单词
          </Text>
        </View>
      </ScrollView>
    </View>
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
  backBtn: {
    padding: 8,
  },
  backBtnText: {
    fontSize: 16,
    color: '#4A90E2',
  },
  headerRight: {
    width: 60,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  hint: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  aboutDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});
